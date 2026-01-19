import { TodosState } from '../types/todo';

interface StateDebuggerProps {
  optimisticTodos: TodosState;
  todos: TodosState;
}

export default function StateDebugger({ optimisticTodos, todos }: StateDebuggerProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      marginTop: '40px',
      borderTop: '2px solid #e0e0e0',
      paddingTop: '20px'
    }}>
      <details style={{ flex: 1 }} open>
        <summary style={{
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '10px',
          cursor: 'pointer',
          color: '#4CAF50'
        }}>
          Optimistic State
        </summary>
        <pre style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '12px',
          border: '1px solid #dee2e6'
        }}>
          {JSON.stringify({ optimisticTodos }, null, 2)}
        </pre>
      </details>

      <details style={{ flex: 1 }} open>
        <summary style={{
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '10px',
          cursor: 'pointer',
          color: '#2196F3'
        }}>
          Actual State
        </summary>
        <pre style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '12px',
          border: '1px solid #dee2e6'
        }}>
          {JSON.stringify({ todos }, null, 2)}
        </pre>
      </details>
    </div>
  );
}
