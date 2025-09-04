import React from 'react';
import { useNotification } from './NotificationSystem';
import './NotificationDemo.css';

function NotificationDemo() {
  const { success, error, warning, info } = useNotification();

  const handleSuccess = () => {
    success('¡Operación exitosa!', 'Los datos se han guardado correctamente en la base de datos.');
  };

  const handleError = () => {
    error('Error de conexión', 'No se pudo conectar con el servidor. Verifique su conexión a internet.');
  };

  const handleWarning = () => {
    warning('Advertencia importante', 'Esta acción no se puede deshacer. ¿Está seguro de continuar?');
  };

  const handleInfo = () => {
    info('Información del sistema', 'Los datos se actualizarán automáticamente en los próximos 5 minutos.');
  };

  const handleCustomDuration = () => {
    success('Notificación personalizada', 'Esta notificación se cerrará en 10 segundos.', { duration: 10000 });
  };

  const handlePersistent = () => {
    warning('Notificación persistente', 'Esta notificación no se cerrará automáticamente.', { autoClose: false });
  };

  return (
    <div className="notification-demo">
      <div className="demo-header">
        <h1>Sistema de Notificaciones Profesional</h1>
        <p>Demostración del nuevo sistema de notificaciones que reemplaza las alertas básicas del navegador.</p>
      </div>

      <div className="demo-buttons">
        <div className="button-group">
          <h3>Tipos de Notificación</h3>
          <button className="demo-btn success-btn" onClick={handleSuccess}>
            <span className="btn-icon">✓</span>
            Notificación de Éxito
          </button>
          <button className="demo-btn error-btn" onClick={handleError}>
            <span className="btn-icon">✕</span>
            Notificación de Error
          </button>
          <button className="demo-btn warning-btn" onClick={handleWarning}>
            <span className="btn-icon">⚠</span>
            Notificación de Advertencia
          </button>
          <button className="demo-btn info-btn" onClick={handleInfo}>
            <span className="btn-icon">ℹ</span>
            Notificación de Información
          </button>
        </div>

        <div className="button-group">
          <h3>Opciones Avanzadas</h3>
          <button className="demo-btn custom-btn" onClick={handleCustomDuration}>
            <span className="btn-icon">⏱</span>
            Duración Personalizada (10s)
          </button>
          <button className="demo-btn persistent-btn" onClick={handlePersistent}>
            <span className="btn-icon">🔒</span>
            Notificación Persistente
          </button>
        </div>
      </div>

      <div className="demo-features">
        <h3>Características del Sistema</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h4>Diseño Moderno</h4>
            <p>Interfaz elegante con animaciones suaves y efectos visuales profesionales.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h4>Responsive</h4>
            <p>Se adapta perfectamente a dispositivos móviles, tablets y desktop.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">♿</div>
            <h4>Accesible</h4>
            <p>Cumple con estándares de accesibilidad web y soporte para lectores de pantalla.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Rápido</h4>
            <p>Rendimiento optimizado con animaciones CSS y JavaScript eficiente.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Flexible</h4>
            <p>Múltiples tipos, duraciones personalizables y opciones de configuración.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h4>Tema Oscuro</h4>
            <p>Soporte automático para modo oscuro basado en preferencias del sistema.</p>
          </div>
        </div>
      </div>

      <div className="demo-code">
        <h3>Ejemplo de Uso</h3>
        <pre className="code-block">
{`import { useNotification } from '../components/NotificationSystem';

function MiComponente() {
  const { success, error, warning, info } = useNotification();

  const handleAction = () => {
    success('¡Éxito!', 'Operación completada correctamente.');
  };

  return (
    <button onClick={handleAction}>
      Ejecutar Acción
    </button>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default NotificationDemo;
