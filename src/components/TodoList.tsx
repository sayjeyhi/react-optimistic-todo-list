import TodoItem from './TodoItem';
import { TodosState } from '../types/todo';

interface TodoListProps {
  todos: TodosState;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        {Object.entries(todos)
          .sort(([_, a], [__, b]) => a.dateCreated.getTime() - b.dateCreated.getTime())
          .map(([id, todo]) => (
            <TodoItem
              key={id}
              id={id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
      </ul>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
