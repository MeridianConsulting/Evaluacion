import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';

function Header({ onLogout }) {
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

  useEffect(() => {
    const body = document.body;
    const prev = body.style.overflow;
    body.style.overflow = menuOpen ? 'hidden' : prev || '';
    return () => { body.style.overflow = prev || ''; };
  }, [menuOpen]);

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
      } catch (_) {}
    };
    loadRoleFromBackend();
  }, []);

  useEffect(() => {
    const checkEvaluationToken = () => {
      const token = localStorage.getItem('evaluationToken');
      const tokenExpiry = localStorage.getItem('evaluationTokenExpiry');
      if (token && tokenExpiry) {
        const now = Date.now();
        const expiry = parseInt(tokenExpiry, 10);
        if (now < expiry) setHasEvaluationToken(true);
        else {
          localStorage.removeItem('evaluationToken');
          localStorage.removeItem('evaluationTokenExpiry');
          setHasEvaluationToken(false);
        }
      } else setHasEvaluationToken(false);
    };
    checkEvaluationToken();
    if (menuOpen) checkEvaluationToken();
  }, [menuOpen]);

  useEffect(() => {
    const checkAssignedEvaluations = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) { setHasAssignedAsEvaluator(false); return; }
        const periodo = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
        const resp = await fetch(`${apiUrl}/api/evaluations/hseq-evaluated/${currentUserId}/${periodo}`);
        if (!resp.ok) { setHasAssignedAsEvaluator(false); return; }
        const data = await resp.json();
        const assigned = (data && (data.data || data.evaluaciones || data)) || [];
        setHasAssignedAsEvaluator(Array.isArray(assigned) && assigned.length > 0);
      } catch (_) { setHasAssignedAsEvaluator(false); }
    };
    checkAssignedEvaluations();
    if (menuOpen) checkAssignedEvaluations();
  }, [menuOpen]);

  useEffect(() => {
    const checkAssignedAsBoss = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) { setHasAssignedAsBoss(false); return; }
        const resp = await fetch(`${apiUrl}/api/evaluations/assigned/${currentUserId}`);
        if (!resp.ok) { setHasAssignedAsBoss(false); return; }
        const data = await resp.json();
        const assigned = (data && (data.data || data.evaluaciones || data)) || [];
        setHasAssignedAsBoss(Array.isArray(assigned) && assigned.length > 0);
      } catch (_) { setHasAssignedAsBoss(false); }
    };
    checkAssignedAsBoss();
    if (menuOpen) checkAssignedAsBoss();
  }, [menuOpen]);

  const goToPage = (path) => { navigate(path); setMenuOpen(false); };
  const handleLogout = () => { localStorage.clear(); onLogout?.(); navigate('/'); };

  const canSeeTeamEvaluations = hasAssignedAsBoss || hasAssignedAsEvaluator;
  const effectiveRole = String(backendRole || '');
  const isHseqRole = effectiveRole.toLowerCase() === 'hseq';
  const isAdmin = effectiveRole.toLowerCase() === 'admin';

  return (
    <header className="mc-header">
      <nav className="mc-navbar" role="navigation" aria-label="Principal">
        <div className="mc-left">
          <Link to="/LandingPage" aria-label="Inicio" className="mc-logo-link">
            <img src={logoMeridian} alt="Meridian Consulting" className="mc-logo" />
          </Link>
        </div>

        <div className="mc-right">
          {isAdmin && (
            <button className="mc-admin-quick" onClick={() => goToPage('/admin')}>
              Panel de Administración
            </button>
          )}

          <ul className="mc-inline-links">
            <li><button className="mc-link" onClick={() => goToPage('/results')}>Resultados</button></li>
            <li className="mc-sep" aria-hidden="true" />
            <li><button className="mc-link" onClick={() => goToPage('/profile')}>Perfil</button></li>
            <li className="mc-sep" aria-hidden="true" />
            <li><button className="mc-link" onClick={handleLogout}>Cerrar Sesión</button></li>
          </ul>

          <button
            className="mc-burger"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mc-drawer"
            onClick={() => setMenuOpen(v => !v)}
          >
            <img src={burgerMenu} alt="" className="mc-burger-icon" />
          </button>
        </div>
      </nav>

      <div className={`mc-backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      <aside id="mc-drawer" className={`mc-drawer ${menuOpen ? 'open' : ''}`} role="menu">
        {isAdmin && (
          <button className="mc-menu-item mc-menu-accent" onClick={() => goToPage('/admin')}>
            Panel de Administración
          </button>
        )}
        {hasEvaluationToken && (
          <button className="mc-menu-item mc-menu-eval" onClick={() => goToPage('/performance')}>
            Evaluación de Desempeño
          </button>
        )}
        <button className="mc-menu-item" onClick={() => goToPage('/results')}>Resultados</button>
        <button className="mc-menu-item" onClick={() => goToPage('/profile')}>Perfil</button>
        {canSeeTeamEvaluations && (
          <button className="mc-menu-item" onClick={() => goToPage('/team-evaluations')}>
            Evaluar Equipo
          </button>
        )}
        {isHseqRole && (
          <button className="mc-menu-item" onClick={() => goToPage('/hseq-evaluation')}>
            Evaluar HSEQ
          </button>
        )}
        <button className="mc-menu-item mc-menu-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </aside>

      <style>{`
        :root{
  --mc-bg-1: rgba(14,26,54,.92);
  --mc-bg-2: rgba(31,59,115,.92);
  --mc-border: rgba(255,255,255,.10);
  --mc-text: #e5e7eb;
  --mc-yellow:#facc15;
  --mc-red:#f87171;
}

/* Usa la MISMA fuente del resto de la página */
.mc-header{ position:sticky; top:0; z-index:1000; font-family:"Libre Franklin", sans-serif; }
.mc-header button,
.mc-header a,
.mc-header li,
.mc-header * { font-family: inherit; }

/* NAVBAR más alto y amplio */
.mc-navbar{
  display:flex; align-items:center; justify-content:space-between;
  padding: calc(16px + env(safe-area-inset-top)) 28px 16px 28px;
  background: linear-gradient(135deg, var(--mc-bg-1), var(--mc-bg-2));
  border-bottom: 1px solid var(--mc-border);
  box-shadow: 0 8px 28px rgba(2,8,23,.28);
  backdrop-filter: saturate(120%) blur(6px);
}

/* LOGO más grande */
.mc-logo{ height:56px; filter: drop-shadow(0 2px 6px rgba(0,0,0,.25));
  transition: transform .2s ease, filter .2s ease; }
.mc-logo:hover{ transform: translateY(-1px) scale(1.02); filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)); }

.mc-right{ display:flex; align-items:center; gap:18px; }

/* BOTÓN DORADO (usa peso 700 disponible) */
.mc-admin-quick{
  padding:14px 20px; border-radius:14px;
  background:#d4b018; color:#0e1a36;
  font-weight:700; font-size:16.5px; line-height:1;  /* <= peso 700 */
  border:1px solid rgba(255,255,255,.18);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 8px 18px rgba(0,0,0,.25);
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  cursor:pointer;
}
.mc-admin-quick:hover{ transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 12px 26px rgba(0,0,0,.35); }

/* LINKS de cabecera más grandes */
.mc-inline-links{ display:none; list-style:none; margin:0; padding:0; align-items:center; gap:18px; }
.mc-link{
  background:transparent; border:0; color:var(--mc-text); cursor:pointer;
  font-weight:700; font-size:18px; letter-spacing:.2px;   /* <= peso 700 */
  padding:12px 12px; border-radius:12px;
  transition: background .15s ease, transform .15s ease;
}
.mc-link:hover{ background: rgba(255,255,255,.08); transform: translateY(-1px); }
.mc-sep{ width:1.5px; height:24px; background: rgba(255,255,255,.28); border-radius:1px; }

/* HAMBURGUESA más grande */
.mc-burger{ background:transparent; border:0; padding:10px; display:flex; }
.mc-burger-icon{ width:34px; height:34px; filter: drop-shadow(0 2px 6px rgba(0,0,0,.25)); }

/* BACKDROP */
.mc-backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.4); opacity:0; visibility:hidden; pointer-events:none; transition:opacity .2s ease; }
.mc-backdrop.open{ opacity:1; visibility:visible; pointer-events:auto; }

/* DRAWER más ancho + elementos más grandes */
.mc-drawer{
  position:fixed; right:0; top:0;
  width:min(90vw, 360px);
  height:100svh; max-height:100dvh;
  padding: calc(22px + env(safe-area-inset-top)) 22px 24px 22px;
  background: linear-gradient(180deg, rgba(14,26,54,.98), rgba(31,59,115,.98));
  border-left:1px solid var(--mc-border);
  box-shadow:-20px 0 40px rgba(2,8,23,.35);
  display:flex; flex-direction:column; gap:14px;
  transform: translate3d(110%,0,0);
  transition: transform .25s ease;
  z-index:1001;
}
.mc-drawer.open{ transform: translate3d(0,0,0); }

.mc-menu-item{
  width:100%; text-align:left;
  padding:16px 16px; border-radius:14px;
  border:1px solid var(--mc-border);
  background: rgba(255,255,255,.06);
  color:var(--mc-text); font-weight:700; font-size:18px; /* <= peso 700 */
  cursor:pointer;
  transition: background .15s ease, transform .15s ease, box-shadow .15s ease;
}
.mc-menu-item:hover{ background: rgba(255,255,255,.10); transform: translateY(-1px); box-shadow: 0 8px 18px rgba(0,0,0,.25); }
.mc-menu-eval{ color:var(--mc-yellow); }
.mc-menu-logout{ color:var(--mc-red); }
.mc-menu-accent{ color:#0e1a36; background: rgba(250,204,21,.92); }

/* RESPONSIVE */
@media (max-width:1023px){
  .mc-admin-quick{ display:none; }
  .mc-inline-links{ display:none; }
  .mc-burger{ display:flex; }
  .mc-logo{ height:48px; }
  .mc-navbar{ padding: calc(14px + env(safe-area-inset-top)) 22px 14px 22px; }
}
@media (min-width:1024px){
  .mc-inline-links{ display:flex; }
  .mc-burger{ display:none; }
  .mc-navbar{ padding: 18px 30px; }
}

      `}</style>
    </header>
  );
}

export default Header;
