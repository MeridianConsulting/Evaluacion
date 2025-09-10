import React from 'react';

const ValidationSummaryAlert = ({ title = 'Campos obligatorios', items = [], message = '', onClose }) => {
  const alertStyle = {
    backgroundColor: '#ffdddd',
    color: '#ff3860',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '4px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'block',
    animation: 'fadeIn 0.5s ease',
    opacity: 1,
    position: 'fixed',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100051,
    maxWidth: '1000px',
    width: 'calc(100% - 32px)'
  };

  const listText = items && items.length ? `Faltan: ${items.join(', ')}.` : (message || 'Complete los campos requeridos.');

  return (
    <div style={alertStyle} role="alert" aria-live="assertive">
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
          <path fill="#ff3860" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        {title}: {listText}
      </span>
      {onClose && (
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#ff3860', 
            cursor: 'pointer',
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
          aria-label="Cerrar alerta"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ValidationSummaryAlert;


