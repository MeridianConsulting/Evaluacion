import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Función para alternar la visibilidad del menú
  const handleToggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoMeridian} alt="Meridian Logo" />
        </div>
        <div className="menu-container">
          <div className="navbar-menu" onClick={handleToggleMenu}>
            <img src={burgerMenu} alt="Menú" className="burger-icon" />
          </div>
          <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <button className="menu-item">Inicio</button>
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
