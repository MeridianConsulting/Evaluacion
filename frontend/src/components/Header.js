import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout, userRole = "empleado" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  // Función para redirigir a las distintas páginas
  const goToPage = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/LandingPage">
            <img src={logoMeridian} alt="Meridian Logo" />
          </Link>
        </div>
        <div className="menu-container">
          <div className="navbar-menu" onClick={handleToggleMenu}>
            <img src={burgerMenu} alt="Menú" className="burger-icon" />
          </div>
          <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <button className="menu-item" onClick={() => goToPage('/LandingPage')}>Inicio</button>
            
            {/* Todos pueden ver resultados */}
            <button className="menu-item" onClick={() => goToPage('/results')}>Resultados</button>
            
            {/* Todos pueden ver su perfil */}
            <button className="menu-item" onClick={() => goToPage('/profile')}>Perfil</button>
            
            {/* Todos pueden realizar evaluaciones */}
            <button className="menu-item" onClick={() => goToPage('/performance')}>Evaluación</button>
            
            {/* Solo jefes y administradores pueden ver evaluaciones de subordinados */}
            {(userRole === "jefe" || userRole === "admin") && (
              <button className="menu-item" onClick={() => goToPage('/team-evaluations')}>
                Evaluar Equipo
              </button>
            )}
            
            {/* Solo administradores pueden acceder al panel de administración */}
            {userRole === "admin" && (
              <button className="menu-item admin" onClick={() => goToPage('/admin')}>
                Panel de Administración
              </button>
            )}
            
            {/* Mostrar el rol actual del usuario */}
            <div className="user-role-indicator">
              <span className={`role-badge ${userRole}`}>
                {userRole === "admin" ? "Administrador" : 
                 userRole === "jefe" ? "Jefe" : "Empleado"}
              </span>
            </div>
            
            <button className="menu-item logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
