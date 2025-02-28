import React, { useState } from 'react';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar la visibilidad del menú
  const handleToggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoMeridian} alt="Meridian Logo" />
        </div>
        <div className="menu-container">
          {/* Se usa solo onClick para abrir/cerrar el menú */}
          <div className="navbar-menu" onClick={handleToggleMenu}>
            <img src={burgerMenu} alt="Menú" className="burger-icon" />
          </div>
          <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <button className="menu-item">Inicio</button>
            <button className="menu-item">Resultados</button>
            <button className="menu-item">Perfil</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
