import { Todo } from '../types/todo';

interface TodoItemProps {
  id: string;
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ id, todo, onToggle, onDelete }: TodoItemProps) {
  const getBackgroundColor = () => {
    // if (todo.deleting) return '#ffe0e0';
    // if (todo.adding) return '#fff3cd';
    // if (todo.toggling) return '#e3f2fd';
    return '#f8f9fa';
  };

  const getBorderColor = () => {
    // if (todo.deleting) return '#f44336';
    // if (todo.adding) return '#ffc107';
    // if (todo.toggling) return '#2196F3';
    return '#dee2e6';
  };

  const getIcon = () => {
    // if (todo.deleting) return '🗑️';
    // if (todo.adding) return '⏳';
    // if (todo.toggling) return '🔄';
    return '✓';
  };

  const getIconTitle = () => {
    // if (todo.deleting) return 'Deleting...';
    // if (todo.adding) return 'Saving...';
    // if (todo.toggling) return 'Updating...';
    return 'Confirmed';
  };

  const getBadge = () => {
    // if (todo.deleting) return { text: 'Deleting...', color: '#c62828', bg: '#fff', border: '#f44336' };
    // if (todo.adding) return { text: 'Adding...', color: '#856404', bg: '#fff', border: '#ffc107' };
    // if (todo.toggling) return { text: 'Updating...', color: '#0d47a1', bg: '#fff', border: '#2196F3' };
    return null;
  };

  const badge = getBadge();

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      marginBottom: '10px',
      backgroundColor: getBackgroundColor(),
      border: `2px solid ${getBorderColor()}`,
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      boxShadow: (todo.adding || todo.toggling || todo.deleting)
        ? `0 2px 8px ${getBorderColor()}33`
        : '0 1px 3px rgba(0,0,0,0.1)',
      opacity: todo.deleting ? 0.6 : 1,
    }}>
      <span style={{
        fontSize: '20px',
        minWidth: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }} title={getIconTitle()}>
        {getIcon()}
      </span>
      <span
        style={{
          flex: 1,
          textDecoration: todo.done ? 'line-through' : undefined,
          color: todo.deleting ? '#c62828' : todo.adding ? '#856404' : todo.toggling ? '#0d47a1' : todo.done ? '#6c757d' : '#212529',
          fontSize: '16px',
          fontWeight: (todo.adding || todo.toggling || todo.deleting) ? '500' : '400',
          opacity: todo.done && !todo.toggling ? 0.6 : 1
        }}
      >
        {todo.val}
      </span>
      {!todo.adding && !todo.deleting && (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            disabled={todo.toggling}
            onClick={() => onToggle(id)}
            style={{
              width: '20px',
              height: '20px',
              cursor: todo.toggling ? 'not-allowed' : 'pointer',
              opacity: todo.toggling ? 0.5 : 1
            }}
          />
          <button
            type="button"
            onClick={() => onDelete(id)}
            disabled={todo.toggling}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: todo.toggling ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: todo.toggling ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              opacity: todo.toggling ? 0.5 : 1
            }}
            onMouseEnter={(e) => !todo.toggling && (e.currentTarget.style.backgroundColor = '#c82333')}
            onMouseLeave={(e) => !todo.toggling && (e.currentTarget.style.backgroundColor = '#dc3545')}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
