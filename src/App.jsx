import { useState, useOptimistic, startTransition, useRef } from 'react';
import { addTodo, getID } from './services/add-todo';

function App() {
  const [todos, setTodos] = useState({});
  const formRef = useRef(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (prev, newTodo) => {
      if (newTodo.id in prev) {
        return prev;
      }
      return {
        ...prev,
        [newTodo.id]: { ...newTodo, adding: true, done: false },
      };
    }
  );

  const sendTodoToServer = async (formData) => {
    const val = formData.get('textVal');
    formRef.current?.reset();

    const newTodo = { val, id: getID(), dateCreated: new Date() };

    addOptimisticTodo(newTodo);
    await addTodo(newTodo);
    setTodos((prev) => ({ ...prev, [newTodo.id]: newTodo }));
  };

  function toggleDone(todoId) {
    setTodos((prev) => {
      const { [todoId]: todo, ...rest } = prev;
      return { [todoId]: { ...todo, done: !todo.done }, ...rest };
    });
  }

  function deleteTodo(todoId) {
    setTodos((prev) => {
      const { [todoId]: todo, ...rest } = prev;
      return rest;
    });
  }

  return (
    <div>
      <h1>UseOptmistic</h1>
      <ul>
        {Object.entries(optimisticTodos)
          .sort(([_, a], [__, b]) => a.dateCreated - b.dateCreated)
          .map(([id, todo]) => {
            return (
              <li key={id}>
                <span
                  style={{
                    textDecoration: todo.done ? 'line-through' : null,
                    color: todo.adding ? 'grey' : 'black',
                  }}
                >
                  {todo.val}
                </span>
                {!todo.adding && (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onClick={() => {
                        toggleDone(id);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        deleteTodo(id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          })}
      </ul>
      <form action={sendTodoToServer} ref={formRef}>
        <input name="textVal" />
        <button>Add</button>
        <button
          type="button"
          onClick={() => {
            setTodos({});
          }}
        >
          Reset
        </button>
      </form>

      <div style={{ display: 'flex', width: '100%' }}>
        <details style={{ flex: 1 }} open>
          <summary style={{ fontWeight: 'bold' }}>Optimistic State</summary>
          <pre>{JSON.stringify({ optimisticTodos }, null, 2)}</pre>
        </details>

        <details style={{ flex: 1 }} open>
          <summary style={{ fontWeight: 'bold' }}> State </summary>
          <pre>{JSON.stringify({ todos }, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}

export default App;
