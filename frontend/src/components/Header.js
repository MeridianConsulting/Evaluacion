import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout }) {
  // Rol exclusivamente desde backend
  const [backendRole, setBackendRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasEvaluationToken, setHasEvaluationToken] = useState(false);
  const [hasAssignedAsEvaluator, setHasAssignedAsEvaluator] = useState(false);
  const [hasAssignedAsBoss, setHasAssignedAsBoss] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authorMessageShown")) {
      localStorage.setItem("authorMessageShown", "true");
    }
  }, []);

  // Cargar rol real del backend
  useEffect(() => {
    const loadRoleFromBackend = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) return;
        const resp = await fetch(`${apiUrl}/employees/${currentUserId}`);
        if (!resp.ok) return;
        const data = await resp.json();
        const role = (data && (data.data?.rol || data.rol)) || '';
        if (role) setBackendRole(String(role));
      } catch (_) { /* noop */ }
    };
    loadRoleFromBackend();
  }, []);

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

  // Consultar si el usuario actual tiene evaluaciones asignadas como evaluador HSEQ (en DB)
  useEffect(() => {
    const checkAssignedEvaluations = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) {
          setHasAssignedAsEvaluator(false);
          return;
        }
        
        // Verificar si tiene evaluaciones HSEQ asignadas para el período actual
        const periodo = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
        const resp = await fetch(`${apiUrl}/api/evaluations/hseq-evaluated/${currentUserId}/${periodo}`);
        
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

  // Consultar si el usuario actual tiene evaluaciones asignadas como jefe inmediato
  useEffect(() => {
    const checkAssignedAsBoss = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) {
          setHasAssignedAsBoss(false);
          return;
        }
        
        // Verificar si tiene evaluaciones asignadas como jefe
        const resp = await fetch(`${apiUrl}/api/evaluations/assigned/${currentUserId}`);
        
        if (!resp.ok) {
          setHasAssignedAsBoss(false);
          return;
        }
        
        const data = await resp.json();
        const assigned = (data && (data.data || data.evaluaciones || data)) || [];
        setHasAssignedAsBoss(Array.isArray(assigned) && assigned.length > 0);
      } catch (_) {
        setHasAssignedAsBoss(false);
      }
    };

    checkAssignedAsBoss();
    if (menuOpen) {
      checkAssignedAsBoss();
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

  // Mostrar Evaluar Equipo si el usuario tiene evaluaciones asignadas como jefe o como evaluador HSEQ
  const canSeeTeamEvaluations = hasAssignedAsBoss || hasAssignedAsEvaluator;

  // Rol efectivo exclusivamente desde backend
  const effectiveRole = String(backendRole || '');
  const isHseqRole = effectiveRole.toLowerCase() === 'hseq';

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/LandingPage">
            <img src={logoMeridian} alt="Meridian Logo" className="navbar-logo-img" />
          </Link>
        </div>
        <div className="menu-container">
          {/* Botón rápido visible para ir al Panel de Administración solo si rol=admin */}
          {String(effectiveRole).toLowerCase() === 'admin' && (
            <button className="admin-quick-button" onClick={() => goToPage('/admin')}>
              Panel de Administración
            </button>
          )}
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
        <style>{`
          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 18px;
            background: linear-gradient(135deg, rgba(14,26,54,.92), rgba(31,59,115,.92));
            border-bottom: 1px solid rgba(255,255,255,.10);
            box-shadow: 0 6px 24px rgba(2,8,23,.25);
            backdrop-filter: saturate(120%) blur(6px);
            position: sticky; top: 0; z-index: 1000;
          }
          .navbar-logo-img {
            height: 42px;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,.25));
            transition: transform .2s ease, filter .2s ease;
          }
          .navbar-logo-img:hover {
            transform: translateY(-1px) scale(1.02);
            filter: drop-shadow(0 6px 14px rgba(0,0,0,.35));
          }
          .menu-container {
            display: flex; align-items: center; gap: 10px;
          }
          .burger-icon {
            width: 28px; height: 28px; cursor: pointer; transition: transform .15s ease;
          }
          .navbar-menu:hover .burger-icon {
            transform: scale(1.05);
          }

          /* ===== BOTONES UNIFICADOS ===== */
          .header-btn {
            margin-right: 8px;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,.12);
            background: rgba(255,255,255,.06);
            color: #e5e7eb;
            font-weight: 700;
            cursor: pointer;
            transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
            text-align: left;
            width: 100%;
          }
          .header-btn:hover {
            background: rgba(255,255,255,.10);
            box-shadow: 0 6px 16px rgba(0,0,0,.25);
            transform: translateY(-1px);
          }

          /* Variantes */
          .header-btn.logout { color: #f87171; }
          .header-btn.evaluation { color: #facc15; }

          /* Menú lateral */
          .side-menu {
            position: fixed; top: 64px; right: 0; bottom: 0; width: min(320px, 86vw);
            background: linear-gradient(180deg, rgba(14,26,54,.98), rgba(31,59,115,.98));
            border-left: 1px solid rgba(255,255,255,.10);
            box-shadow: -16px 0 30px rgba(2,8,23,.35);
            transform: translateX(100%);
            transition: transform .25s ease;
            padding: 16px; display: flex; flex-direction: column; gap: 12px;
          }
          .side-menu.open { transform: translateX(0); }

          @media (max-width: 640px) {
            .navbar { padding: 10px 12px; }
            .navbar-logo-img { height: 38px; }
            .admin-quick-button { display: none; }
          }
    `}</style>

    </header>
  );
}

export default Header;
