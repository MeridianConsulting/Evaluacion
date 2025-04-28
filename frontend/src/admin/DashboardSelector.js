import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardSelector.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DashboardSelector({ onLogout }) {
  const navigate = useNavigate();

  // Funciones para manejar los clicks en los botones
  const handleEmpleadosClick = () => {
    alert('Redirigiendo al CRUD de Empleados');
    // Una vez implementadas las rutas, se usaría:
    // navigate('/admin/empleados');
  };

  const handleFuncionesClick = () => {
    alert('Redirigiendo al CRUD de Funciones');
    // navigate('/admin/funciones');
  };

  const handleCargosClick = () => {
    alert('Redirigiendo al CRUD de Cargos');
    // navigate('/admin/cargos');
  };

  return (
    <div className="admin-dashboard">
      <Header onLogout={onLogout} />
      
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-title">Panel de Administrador</h1>
          <p className="admin-subtitle">Seleccione el módulo al que desea acceder:</p>
          
          <div className="admin-buttons">
            <button 
              className="admin-button empleados"
              onClick={handleEmpleadosClick}
            >
              <div className="button-content">
                <i className="button-icon empleados-icon"></i>
                <span>Gestión de Empleados</span>
              </div>
            </button>
            
            <button 
              className="admin-button funciones"
              onClick={handleFuncionesClick}
            >
              <div className="button-content">
                <i className="button-icon funciones-icon"></i>
                <span>Gestión de Funciones</span>
              </div>
            </button>
            
            <button 
              className="admin-button cargos"
              onClick={handleCargosClick}
            >
              <div className="button-content">
                <i className="button-icon cargos-icon"></i>
                <span>Gestión de Cargos</span>
              </div>
            </button>
          </div>
          
          <div className="admin-info">
            <p>Desde este panel podrá administrar los datos fundamentales del sistema de evaluación de desempeño.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DashboardSelector; 