import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout, userRole: propUserRole }) {
  // Si no se pasa userRole como prop, lo obtenemos del localStorage
  const [userRole, setUserRole] = useState(propUserRole || localStorage.getItem('userRole') || 'empleado');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasEvaluationToken, setHasEvaluationToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "%c🚀 Developed by José Mateo López Cifuentes",
      "font-size: 14px; color: #2ecc71; font-weight: bold;"
    );
    console.log(
      "%c📧 Email: josemateolopezcifuentes@gmail.com",
      "font-size: 12px; color: #3498db;"
    );
    console.log(
      "%c🔗 LinkedIn: José Mateo López Cifuentes (Visit: https://shorturl.at/Sx0PY)",
      "font-size: 12px; color: #e74c3c;"
    );

    if (!localStorage.getItem("authorMessageShown")) {
      localStorage.setItem("authorMessageShown", "true");
    }
  }, []);

  // Actualizamos el userRole si cambia la prop
  useEffect(() => {
    if (propUserRole) {
      setUserRole(propUserRole);
    }
  }, [propUserRole]);

  // También verificamos el localStorage por si cambia
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole && storedRole !== userRole) {
      setUserRole(storedRole);
    }
  }, [menuOpen]); // Verificamos cuando se abre el menú para tener datos actualizados

  // Verificar si existe un token de evaluación válido
  useEffect(() => {
    const checkEvaluationToken = () => {
      const token = localStorage.getItem('evaluationToken');
      const tokenExpiry = localStorage.getItem('evaluationTokenExpiry');
      
      if (token && tokenExpiry) {
        const now = new Date().getTime();
        const expiry = parseInt(tokenExpiry);
        
        if (now < expiry) {
          setHasEvaluationToken(true);
        } else {
          // Token expirado, limpiar
          localStorage.removeItem('evaluationToken');
          localStorage.removeItem('evaluationTokenExpiry');
          setHasEvaluationToken(false);
        }
      } else {
        setHasEvaluationToken(false);
      }
    };

    checkEvaluationToken();
    
    // Verificar cada vez que se abre el menú
    if (menuOpen) {
      checkEvaluationToken();
    }
  }, [menuOpen]);

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
            {/* Botón de evaluación solo si hay token válido */}
            {hasEvaluationToken && (
              <button className="menu-item evaluation" onClick={() => goToPage('/performance')}>
                Evaluación de Desempeño
              </button>
            )}
            
            {/* Todos pueden ver resultados */}
            <button className="menu-item" onClick={() => goToPage('/results')}>Resultados</button>
            
            {/* Todos pueden ver su perfil */}
            <button className="menu-item" onClick={() => goToPage('/profile')}>Perfil</button>
            
            
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
