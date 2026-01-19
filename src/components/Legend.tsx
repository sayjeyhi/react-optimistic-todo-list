export default function Legend() {
  return (
    <div style={{
      marginTop: '30px',
      padding: '16px',
      backgroundColor: '#e3f2fd',
      borderRadius: '8px',
      border: '1px solid #2196F3'
    }}>
      <h3 style={{ marginTop: 0, color: '#1976D2', fontSize: '16px' }}>
        Optimistic UI States:
      </h3>
      <div style={{ fontSize: '14px', color: '#424242', lineHeight: '1.8' }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>⏳ Adding...</strong> New todo is being saved to server (yellow background)
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>🔄 Updating...</strong> Todo status is being toggled on server (blue background)
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>🗑️ Deleting...</strong> Todo is being removed from server (red background)
        </div>
        <div>
          <strong>✓ Confirmed:</strong> All changes have been confirmed by the server
        </div>
      </div>
    </div>
  );
}
