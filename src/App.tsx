import { useState, useOptimistic, startTransition, useRef } from 'react';
import { addTodo, getID, toggleTodo, deleteTodoServer } from './services/add-todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Legend from './components/Legend';
import StateDebugger from './components/StateDebugger';
import { Todo, TodosState } from './types/todo';

type OptimisticAction =
  | { type: 'add'; payload: Todo }
  | { type: 'toggle'; payload: { id: string } }
  | { type: 'delete'; payload: { id: string } };

function App() {
  const [todos, setTodos] = useState<TodosState>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic<TodosState, OptimisticAction>(
    todos,
    (prev, action) => {
      switch (action.type) {
        case 'add':
          if (action.payload.id in prev) {
            return prev;
          }
          return {
            ...prev,
            [action.payload.id]: { ...action.payload, adding: true, done: false },
          };

        case 'toggle':
          const todo = prev[action.payload.id];
          if (!todo) return prev;
          return {
            ...prev,
            [action.payload.id]: {
              ...todo,
              done: !todo.done,
              toggling: true,
            },
          };

        case 'delete':
          const todoToDelete = prev[action.payload.id];
          if (!todoToDelete) return prev;
          return {
            ...prev,
            [action.payload.id]: {
              ...todoToDelete,
              deleting: true,
            },
          };

        default:
          return prev;
      }
    }
  );

  const sendTodoToServer = async (formData: FormData) => {
    const val = formData.get('textVal') as string;
    formRef.current?.reset();

    const newTodo: Todo = {
      val,
      id: getID(),
      dateCreated: new Date(),
      done: false,
    };

    startTransition(() => {
      updateOptimisticTodos({ type: 'add', payload: newTodo });
    });

    await addTodo(newTodo);
    setTodos((prev) => ({ ...prev, [newTodo.id]: newTodo }));
  };

  function toggleDone(todoId: string) {
    const currentTodo = todos[todoId];
    if (!currentTodo) return;

    startTransition(async () => {
      updateOptimisticTodos({ type: 'toggle', payload: { id: todoId } });
      await toggleTodo(todoId, currentTodo.done);
      setTodos((prev) => {
        const todo = prev[todoId];
        return { ...prev, [todoId]: { ...todo, done: !todo.done } };
      });
    });
  }

  function deleteTodo(todoId: string) {
    startTransition(async () => {
      updateOptimisticTodos({ type: 'delete', payload: { id: todoId } });
      await deleteTodoServer(todoId);
      setTodos((prev) => {
        const { [todoId]: _, ...rest } = prev;
        return rest;
      });
    });
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '30px',
        color: '#333'
      }}>
        Todo List with Optimistic UI
      </h1>

      <TodoForm
        formRef={formRef}
        onSubmit={sendTodoToServer}
        onReset={() => setTodos({})}
      />

      <TodoList
        todos={optimisticTodos}
        onToggle={toggleDone}
        onDelete={deleteTodo}
      />

      <StateDebugger
        optimisticTodos={optimisticTodos}
        todos={todos}
      />

      <Legend />
    </div>
  );
}

export default App;
