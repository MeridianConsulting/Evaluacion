import React, { useState, useEffect, createContext, useContext } from 'react';
import './NotificationSystem.css';

// Context para manejar las notificaciones globalmente
const NotificationContext = createContext();

// Hook personalizado para usar las notificaciones
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }
  return context;
};

// Componente de notificación individual
const Notification = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animación de entrada
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-remover después del tiempo especificado
    if (notification.autoClose !== false) {
      const timer = setTimeout(() => {
        handleRemove();
      }, notification.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.autoClose]);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`notification notification-${notification.type} ${isVisible ? 'notification-visible' : ''} ${isLeaving ? 'notification-leaving' : ''}`}
      onClick={handleRemove}
    >
      <div className="notification-content">
        <div className="notification-icon-container">
          {getIcon()}
        </div>
        <div className="notification-text">
          <div className="notification-title">{notification.title}</div>
          {notification.message && (
            <div className="notification-message">{notification.message}</div>
          )}
        </div>
        <button 
          className="notification-close" 
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          aria-label="Cerrar notificación"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {notification.autoClose !== false && (
        <div className="notification-progress">
          <div className="notification-progress-bar" style={{ animationDuration: `${notification.duration || 5000}ms` }}></div>
        </div>
      )}
    </div>
  );
};

// Componente contenedor de notificaciones
const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

// Provider principal
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      autoClose: true,
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Métodos de conveniencia
  const success = (title, message, options = {}) => {
    return addNotification({ type: 'success', title, message, ...options });
  };

  const error = (title, message, options = {}) => {
    return addNotification({ type: 'error', title, message, duration: 7000, ...options });
  };

  const warning = (title, message, options = {}) => {
    return addNotification({ type: 'warning', title, message, duration: 6000, ...options });
  };

  const info = (title, message, options = {}) => {
    return addNotification({ type: 'info', title, message, ...options });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
