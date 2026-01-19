import { RefObject } from 'react';

interface TodoFormProps {
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (formData: FormData) => Promise<void>;
  onReset: () => void;
}

export default function TodoForm({ formRef, onSubmit, onReset }: TodoFormProps) {
  return (
    <form action={onSubmit} ref={formRef} style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          name="textVal"
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#4CAF50'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
        />
        <button style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Add
        </button>
        <button
          type="button"
          onClick={onReset}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
