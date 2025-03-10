import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout }) {
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

  // Función para ir a la LandingPage
  const handleGoToLanding = () => {
    navigate('/LandingPage');
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
            <button className="menu-item" onClick={handleGoToLanding}>Inicio</button>
            <button className="menu-item">Resultados</button>
            <button className="menu-item">Perfil</button>
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
