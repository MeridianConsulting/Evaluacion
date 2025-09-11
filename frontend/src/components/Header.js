import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout, userRole: propUserRole }) {
  // Usar SIEMPRE el rol que viene por props (estado global de autenticación)
  const [userRole, setUserRole] = useState(propUserRole || 'empleado');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasEvaluationToken, setHasEvaluationToken] = useState(false);
  const [hasAssignedAsEvaluator, setHasAssignedAsEvaluator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  // IMPORTANTE: No sincronizar el rol desde localStorage dinámicamente para evitar
  // contaminar el rol del usuario autenticado con el rol del empleado evaluado

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

  // Consultar si el usuario actual tiene evaluaciones asignadas como evaluador (en DB)
  useEffect(() => {
    const checkAssignedEvaluations = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) {
          setHasAssignedAsEvaluator(false);
          return;
        }
        const resp = await fetch(`${apiUrl}/api/evaluations/assigned/${currentUserId}`);
        if (!resp.ok) {
          setHasAssignedAsEvaluator(false);
          return;
        }
        const data = await resp.json();
        const assigned = (data && (data.data || data.evaluaciones || data)) || [];
        setHasAssignedAsEvaluator(Array.isArray(assigned) && assigned.length > 0);
      } catch (_) {
        setHasAssignedAsEvaluator(false);
      }
    };

    checkAssignedEvaluations();
    if (menuOpen) {
      checkAssignedEvaluations();
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

  // Mostrar Evaluar Equipo solo si el usuario tiene evaluaciones asignadas en la base de datos
  const canSeeTeamEvaluations = hasAssignedAsEvaluator;

  // Rol efectivo: prioriza prop; si falta, usa localStorage
  const effectiveRole = (propUserRole && String(propUserRole)) || localStorage.getItem('userRole') || userRole || 'empleado';
  const isHseqRole = String(effectiveRole || '').toLowerCase() === 'hseq';

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/LandingPage">
            <img src={logoMeridian} alt="Meridian Logo" />
          </Link>
        </div>
        {/* Botón rápido visible para ir al Panel de Administración solo si es admin autenticado */}
        {effectiveRole === 'admin' && (
          <button className="admin-quick-button" onClick={() => goToPage('/admin')}>
            Panel de Administración
          </button>
        )}
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
            
            
            {/* Mostrar Evaluar Equipo si rol es jefe/admin o si tiene asignaciones */}
            {canSeeTeamEvaluations && (
              <button className="menu-item" onClick={() => goToPage('/team-evaluations')}>
                Evaluar Equipo
              </button>
            )}

            {/* Solo HSEQ: acceso a evaluación HSEQ global */}
            {isHseqRole && (
              <button className="menu-item" onClick={() => goToPage('/hseq-evaluation')}>
                Evaluar HSEQ
              </button>
            )}
            
            {/* Botón de administración solo se muestra como botón rápido superior para evitar duplicados */}
            
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
