import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function LandingPage({ onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [canAccept, setCanAccept] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFirstLoginNotice, setShowFirstLoginNotice] = useState(true);
  const navigate = useNavigate();

  // Elevar a admin por cédula específica
  useEffect(() => {
    const cedula = localStorage.getItem('cedula');
    if (cedula === '1011202252') {
      const currentRole = localStorage.getItem('userRole') || 'empleado';
      if (currentRole !== 'admin') {
        localStorage.setItem('userRole', 'admin');
      }
    }
  }, []);

  const handleOpenModal = () => {
    // Verificar si ya se han leído las instrucciones
    const instructionsRead = localStorage.getItem('instructionsRead');
    const token = localStorage.getItem('evaluationToken');
    const tokenExpiry = localStorage.getItem('evaluationTokenExpiry');
    
    if (instructionsRead === 'true' && token && tokenExpiry) {
      const now = new Date().getTime();
      const expiry = parseInt(tokenExpiry);
      
      if (now < expiry) {
        // Token válido, ir directamente a la evaluación
        navigate('/performance');
        return;
      } else {
        // Token expirado, limpiar y mostrar modal
        localStorage.removeItem('evaluationToken');
        localStorage.removeItem('evaluationTokenExpiry');
        localStorage.removeItem('instructionsRead');
      }
    }
    
    setShowModal(true);
    setAccepted(false);
    setCountdown(15);
    setCanAccept(false);
    setIsTransitioning(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCountdown(15);
    setCanAccept(false);
    setIsTransitioning(false);
  };

  const handleAccept = () => {
    if (accepted && canAccept) {
      // Generar token de evaluación válido por 24 horas
      const token = 'eval_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas
      
      localStorage.setItem('evaluationToken', token);
      localStorage.setItem('evaluationTokenExpiry', expiry.toString());
      
      // Marcar que ya se han leído las instrucciones
      localStorage.setItem('instructionsRead', 'true');
      
      setIsTransitioning(true);
      setShowModal(false);
      
      // Animación de transición antes de navegar
      setTimeout(() => {
        navigate('/performance');
      }, 1500);
    }
  };

  // Efecto para la cuenta regresiva
  useEffect(() => {
    let timer;
    if (showModal && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showModal && countdown === 0) {
      setCanAccept(true);
    }
    return () => clearTimeout(timer);
  }, [showModal, countdown]);

  return (
    <>
      <SEO 
        title="Dashboard Principal - Sistema de Evaluación de Desempeño"
        description="Panel principal del sistema de evaluación de desempeño de Meridian Consulting LTDA. Accede a tus evaluaciones, resultados y herramientas de desarrollo profesional."
        keywords="dashboard, evaluación de desempeño, panel principal, Meridian Consulting, desarrollo profesional"
        url="https://evaluacion.meridianltda.com/LandingPage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Dashboard Principal - Sistema de Evaluación de Desempeño",
          "description": "Panel principal del sistema de evaluación de desempeño de Meridian Consulting LTDA",
          "url": "https://evaluacion.meridianltda.com/LandingPage",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          }
        }}
      />
      <div className="landing-page">
      <style>{`
        :root {
          --bg-1: #0e1a36;
          --bg-2: #1f3b73;
          --accent: #ffd700;
          --text: #ffffff;
        }

        /* ===== Keyframes ===== */
        @keyframes fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes rotate {
          100% { transform: rotate(360deg) }
        }
        @keyframes dash {
          0%   { stroke-dasharray: 1, 150; stroke-dashoffset: 0 }
          50%  { stroke-dasharray: 90, 150; stroke-dashoffset: -35 }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124 }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }

        /* ===== Loading Overlay ===== */
        .loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          animation: fadeIn .35s ease both;
          background:
            radial-gradient(1200px 700px at 20% 0%, rgba(255,255,255,.06), transparent 70%),
            radial-gradient(1000px 600px at 80% 100%, rgba(255,255,255,.04), transparent 70%),
            linear-gradient(135deg, var(--bg-1), var(--bg-2));
          backdrop-filter: saturate(120%) blur(2px);
        }
        .loading-panel {
          width: min(92vw, 520px);
          padding: 28px 28px 24px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 10px 30px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.06);
          text-align: center;
          color: var(--text);
          animation: fadeInUp .4s ease both;
        }

        .spinner {
          width: 64px; height: 64px;
          margin: 6px auto 14px;
          animation: rotate 2s linear infinite;
        }
        .spinner .path {
          stroke: var(--accent);
          stroke-linecap: round;
          animation: dash 1.5s ease-in-out infinite;
        }

        .title {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: .2px;
          margin: 2px 0 6px;
        }
        .subtitle {
          font-size: .975rem;
          opacity: .85;
          margin: 0 0 18px;
        }

        .progress {
          position: relative;
          height: 6px;
          width: 260px;
          margin: 0 auto 6px;
          border-radius: 999px;
          background: rgba(255,255,255,.16);
          overflow: hidden;
        }
        .progress::before {
          content: "";
          position: absolute; inset: 0;
          width: 50%;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,.10),
            var(--accent),
            rgba(255,255,255,.10)
          );
          animation: shimmer 1.2s ease-in-out infinite;
        }

        .brand {
          display: block;
          margin-top: 10px;
          font-size: .8rem;
          letter-spacing: .4px;
          opacity: .7;
        }

        /* Accesibilidad: respeta reducción de movimiento */
        @media (prefers-reduced-motion: reduce) {
          .loading-overlay, .loading-panel, .spinner, .progress::before {
            animation: none !important;
          }
        }

        /* ===== Modal ===== */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: grid; place-items: center;
          background: rgba(14,26,54,.6);
          backdrop-filter: blur(12px);
          animation: fadeIn .3s ease both;
          padding: 20px;
          align-items: start;
          padding-top: 10vh;
        }

        /* ===== Aviso primera vez ===== */
        .notice-banner {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          margin: 0 auto;
          z-index: 100000;
          display: grid;
          grid-template-columns: auto 1fr auto auto; /* última columna para el botón de cierre */
          align-items: center;
          gap: 14px;
          width: clamp(280px, 92vw, 980px);
          padding: 14px 16px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(6,12,28,.88), rgba(10,20,40,.88));
          border: 1px solid rgba(255,255,255,.12);
          color: var(--text);
          box-shadow: 0 10px 30px rgba(0,0,0,.35);
          backdrop-filter: saturate(140%) blur(6px);
          animation: fadeInUp .35s ease both;
          pointer-events: auto;
        }
        .notice-banner::before {
          content: '';
          position: absolute; inset: 0 0 0 0;
          border-radius: 14px;
          pointer-events: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }
        .notice-banner strong { color: #ffffff; }
        .notice-icon {
          display: grid; place-items: center;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), #fbbf24);
          color: #1F3B73;
          box-shadow: 0 4px 12px rgba(244,211,94,.35);
        }
        .notice-text { line-height: 1.4; }
        .notice-text .notice-inline-link {
          background: none; border: none; padding: 0; margin: 0 0 0 6px; /* espacio extra tras "recomendamos" */
          color: #93c5fd; font-weight: 700; cursor: pointer; text-decoration: underline;
        }
        .notice-link {
          border: 2px solid rgba(255,255,255,.12);
          background: linear-gradient(135deg, var(--accent), #fbbf24);
          color: #1F3B73;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all .2s ease;
          box-shadow: 0 6px 16px rgba(0,0,0,.25);
        }
        .notice-link:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0,0,0,.35);
        }
        .notice-close {
          justify-self: end; /* ubicar al extremo derecho de la grilla */
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          color: #e5e7eb;
          font-size: 16px; line-height: 1;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 12px;
        }
        .notice-close:hover { background: rgba(255,255,255,.16); }
        .modal {
          width: min(90vw, 900px);
          max-height: 85vh;
          overflow: auto;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          color: #0f172a;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 
            0 25px 80px rgba(2,8,23,.2),
            0 0 0 1px rgba(255,255,255,0.1),
            inset 0 1px 0 rgba(255,255,255,0.3);
          padding: 28px 32px;
          animation: fadeInUp .4s ease both;
          position: relative;
        }
        
        .modal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent), #fbbf24, var(--accent));
          border-radius: 20px 20px 0 0;
        }

        .modal h2 {
          margin: 0 0 8px;
          font-size: 1.6rem;
          font-weight: 700;
          color: #0e1a36;
          letter-spacing: .3px;
          text-align: center;
          position: relative;
          padding-bottom: 10px;
        }
        
        .modal h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, var(--accent), #fbbf24);
          border-radius: 2px;
        }
        
        .modal .intro {
          margin: 0 0 16px;
          font-size: 1rem;
          color: #55637a;
          text-align: center;
          line-height: 1.5;
          font-weight: 500;
        }

        .divider {
          height: 2px;
          background: linear-gradient(to right, transparent, var(--accent), transparent);
          margin: 12px 0 16px;
          border-radius: 1px;
        }

        .modal-content {
          display: grid;
          gap: 16px;
        }
        /* Por defecto, si existen múltiples columnas, esta sección ocupará todo el ancho */
        .modal-content .section.section-full {
          grid-column: 1 / -1;
        }
        
        @media (min-width: 900px) {
          .modal-content { 
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          /* Ya ocupa ambas columnas; mantenemos la regla explícita para claridad */
          .modal-content .section.section-full { grid-column: 1 / -1; }
        }

        .section {
          background: rgba(255,255,255,0.6);
          border-radius: 12px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .section:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        
        .section h3 {
          display: flex; 
          align-items: center; 
          gap: 12px;
          margin: 0 0 12px;
          font-size: 1.2rem; 
          color: #1F3B73; 
          font-weight: 700;
        }
        
        .section h3::before {
          content: "";
          width: 8px; 
          height: 24px; 
          border-radius: 4px;
          background: linear-gradient(180deg, var(--accent), #fbbf24);
          box-shadow: 0 2px 4px rgba(244, 211, 94, 0.3);
        }

        /* Lista numerada elegante */
        .steps {
          counter-reset: step;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .steps li{
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr); /* la 2ª columna puede encoger sin romper */
          align-items: start;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px dashed rgba(31,59,115,0.2);
          line-height: 1.5;
        }

        .steps li:hover {
          background-color: rgba(31,59,115,0.03);
          border-radius: 8px;
          padding-left: 8px;
          padding-right: 8px;
        }

        .steps li:last-child { 
          border-bottom: none;
        }

        .steps li::before{
          counter-increment: step;
          content: counter(step);
          display: grid; place-items: center;
          width: 32px; height: 32px; border-radius: 50%;
          font-weight: 700; font-size: 1rem;
          background: linear-gradient(135deg, var(--accent), #fbbf24);
          color: #1F3B73;
          box-shadow: 0 3px 8px rgba(244,211,94,.3);
          margin-top: 2px;
          grid-column: 1;                /* número a la 1ª columna */
        }

        .steps li .step-text{
          grid-column: 2;                /* TODO el texto a la 2ª columna */
          overflow-wrap: break-word;     /* envolver si hace falta */
          word-break: normal;
          white-space: normal;
        }

        .steps li strong{
          color: #1F3B73;
          font-weight: 700;
          background: rgba(244,211,94,.2);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(244,211,94,.4);
          white-space: normal;           /* que pueda partir en línea */
          display: inline;
        }

        /* Checklist con "check" */
        .checklist { 
          list-style: none; 
          padding: 0; 
          margin: 0;
        }
        
        .checklist li {
          display: grid; 
          grid-template-columns: 28px 1fr; 
          gap: 10px;
          padding: 10px 0; 
          line-height: 1.4;
          transition: background-color 0.2s ease;
        }
        
        .checklist li:hover {
          background-color: rgba(16,185,129,0.05);
          border-radius: 8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        
        .checklist li::before {
          content: "✓"; 
          display: grid; 
          place-items: center;
          width: 24px; 
          height: 24px; 
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(16,185,129,.2), rgba(16,185,129,.1)); 
          color: #059669;
          font-weight: 700; 
          font-size: .9rem; 
          margin-top: 2px;
          box-shadow: 0 2px 6px rgba(16,185,129,0.2);
        }

        .terms-box {
          margin-top: 12px; 
          padding: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid rgba(31,59,115,0.1);
          border-radius: 12px;
          color: #334155; 
          line-height: 1.5;
          font-size: 0.95rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: relative;
        }
        
        .terms-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent), #fbbf24);
          border-radius: 12px 12px 0 0;
        }
        
        .terms-box p { 
          margin: 8px 0;
          font-weight: 500;
        }
        
        .terms-box strong {
          color: #1F3B73;
          font-weight: 700;
        }

        .acceptance-container {
          margin-top: 20px; 
          padding: 16px;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border: 2px dashed rgba(31,59,115,0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .acceptance-container:hover {
          border-color: var(--accent);
          background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
        }
        
        .checkbox-label { 
          display: flex; 
          gap: 12px; 
          align-items: flex-start;
          cursor: pointer;
        }
        
        .checkbox-label input {
          width: 20px; 
          height: 20px; 
          margin-top: 2px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        
        .wait-hint {
          text-align: center; 
          margin-top: 12px;
          font-size: .9rem; 
          color: #6b7280; 
          font-style: italic;
          padding: 8px;
          background: rgba(31,59,115,0.05);
          border-radius: 8px;
        }

        .modal-buttons {
          display: flex; 
          justify-content: center; 
          gap: 16px; 
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(31,59,115,0.1);
        }
        
        .modal-buttons button {
          border-radius: 12px; 
          padding: 12px 24px;
          border: 2px solid transparent; 
          background: #fff; 
          color: #1f2937;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .modal-buttons button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border-color: rgba(31,59,115,0.2);
        }
        
        .modal-buttons button:last-child {
          background: linear-gradient(135deg, var(--accent), #fbbf24); 
          border-color: var(--accent); 
          color: #1F3B73; 
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(244, 211, 94, 0.3);
        }
        
        .modal-buttons button:last-child:hover {
          background: linear-gradient(135deg, #fbbf24, var(--accent));
          box-shadow: 0 8px 25px rgba(244, 211, 94, 0.4);
          transform: translateY(-2px);
        }
        
        .modal-buttons button:last-child:disabled {
          background: #e5e7eb; 
          border-color: #e5e7eb; 
          color: #6b7280;
          box-shadow: none; 
          transform: none;
          cursor: not-allowed;
        }

        /* Estilos para pantallas de alta resolución */
        @media (min-width: 1920px) {
          .modal {
            width: min(80vw, 800px);
            max-height: 80vh;
            padding: 24px 28px;
          }
          
          .modal h2 {
            font-size: 1.5rem;
            margin-bottom: 8px;
          }
          
          .modal .intro {
            font-size: 0.95rem;
            margin-bottom: 16px;
          }
          
          .divider {
            margin: 12px 0 16px;
          }
          
          .modal-content {
            gap: 16px;
          }
          
          @media (min-width: 900px) {
            .modal-content { 
              gap: 20px;
            }
          }
          
          .section {
            padding: 14px;
          }
          
          .section h3 {
            font-size: 1.1rem;
            margin-bottom: 10px;
          }
          
          .steps li {
            padding: 10px 0;
            gap: 12px;
          }
          
          .checklist li {
            padding: 8px 0;
            gap: 8px;
          }
          
          .terms-box {
            padding: 14px;
            font-size: 0.9rem;
          }
          
          .acceptance-container {
            padding: 14px;
            margin-top: 16px;
          }
          
          .modal-buttons {
            margin-top: 16px;
            padding-top: 14px;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modal {
            width: 95vw;
            padding: 24px 20px;
            margin: 10px;
          }
          
          .modal h2 {
            font-size: 1.5rem;
            margin-bottom: 16px;
          }
          
          .modal .intro {
            font-size: 1rem;
            margin-bottom: 20px;
          }
          
          .modal-content {
            gap: 20px;
          }
          
          .section {
            padding: 16px;
          }
          
          .section h3 {
            font-size: 1.1rem;
            margin-bottom: 12px;
          }
          
          .steps li {
            padding: 12px 0;
            gap: 12px;
          }
          
          .steps li::before {
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
          }
          
          .terms-box {
            padding: 16px;
            font-size: 0.95rem;
          }
          
          .acceptance-container {
            padding: 16px;
          }
          
          .modal-buttons {
            flex-direction: column;
            gap: 12px;
          }
          
          .modal-buttons button {
            width: 100%;
            padding: 14px 20px;
          }
        }

        @media (max-width: 480px) {
          .modal {
            width: 98vw;
            padding: 20px 16px;
            margin: 5px;
          }
          
          .modal h2 {
            font-size: 1.3rem;
          }
          
          .modal .intro {
            font-size: 0.95rem;
          }
          
          .section {
            padding: 12px;
          }
          
          .steps li{ 
            grid-template-columns: 32px minmax(0,1fr); 
          }
          
          .steps li::before {
            width: 24px;
            height: 24px;
            font-size: 0.8rem;
          }
          
          .terms-box {
            padding: 12px;
            font-size: 0.9rem;
          }
          
          .acceptance-container {
            padding: 12px;
          }
        }
      `}</style>
      <Header onLogout={onLogout} />

      {showFirstLoginNotice && (
        <div className="notice-banner" role="alert" aria-live="polite">
          <div className="notice-icon" aria-hidden="true">!</div>
          <div className="notice-text">
            Si es primera vez que inicias sesión, recomendamos
            <button className="notice-inline-link" onClick={() => navigate('/profile')}> cambiar tu contraseña</button>.
          </div>
          <button className="notice-link" onClick={() => navigate('/profile')}>
            Ir a Perfil
          </button>
          <button
            className="notice-close"
            aria-label="Cerrar aviso"
            onClick={() => setShowFirstLoginNotice(false)}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Animación de transición profesional */}
      {isTransitioning && (
        <div className="loading-overlay" aria-busy="true" role="status">
          <div className="loading-panel">
            <svg className="spinner" viewBox="0 0 50 50" aria-hidden="true">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
            </svg>

            <h2 className="title">Redirigiendo a la evaluación…</h2>
            <p className="subtitle">Preparando su evaluación de desempeño</p>

            <div className="progress" />

            <small className="brand">Meridian Consulting</small>
          </div>
        </div>
      )}

      <section className="hero">
        <h1>Evaluación de Desempeño</h1>
        <p>Descubre tu potencial con nuestra evaluación de desempeño.</p>
        <button onClick={handleOpenModal}>Comenzar Evaluación</button>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-instrucciones">
            <h2 id="modal-instrucciones">Instrucciones para la evaluación de desempeño</h2>
            <p className="intro">Siga los pasos a continuación para completar correctamente su evaluación de desempeño profesional.</p>
            <div className="divider" />

            <div className="modal-content">
              <div className="section">
                <h3>Pasos principales</h3>
                <ol className="steps">
                  <li><span className="step-text">Complete los datos generales y fechas requeridas.</span></li>
                  <li><span className="step-text">Evalúe cada competencia con calificaciones del 1 al 5.</span></li>
                  <li><span className="step-text">Registre fortalezas y aspectos a mejorar.</span></li>
                  <li><span className="step-text">Suba las firmas digitales requeridas.</span></li>
                  <li>
                    <span className="step-text">
                      Presione el botón <strong>Finalizar Evaluación</strong> para completar.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="section">
                <h3>Flujo de evaluación</h3>
                <p style={{ margin: '0 0 8px' }}>
                  Está realizando la <strong>Autoevaluación del Colaborador (Fase 1)</strong>. Al finalizar esta fase,
                  el estado quedará <strong>Autoevaluado</strong>. Luego, la evaluación continuará con:
                </p>
                <ol className="steps">
                  <li><span className="step-text">Evaluación del Líder Inmediato (Fase 2)</span></li>
                  <li><span className="step-text">Evaluación HSEQ Institucional (Fase 3)</span></li>
                </ol>
              </div>

              <div className="section section-full">
                <h3>Términos y condiciones</h3>
                <div className="terms-box">
                  <p><strong>Al diligenciar la autoevaluación, usted autoriza de manera previa, expresa e informada el tratamiento de sus datos personales por parte de Meridian Consulting conforme a lo establecido en la Ley 1581 de 2012 y demás normas concordantes.</strong> La información recolectada será utilizada exclusivamente para fines relacionados con la actividad correspondiente. El manejo de sus datos se realizará bajo estrictos criterios de seguridad y confidencialidad, garantizando en todo momento sus derechos como titular de la información.</p>
                  <p><strong>Confidencialidad:</strong> información exclusiva para evaluación y desarrollo profesional.</p>
                  <p><strong>Integridad:</strong> los datos deben ser veraces y reflejar el desempeño real.</p>
                </div>
              </div>
            </div>

            <div className="acceptance-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={accepted}
                  disabled={!canAccept}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span style={{ color: canAccept ? '#0f172a' : '#9ca3af', opacity: canAccept ? 1 : .7 }}>
                  Acepto que he leído las instrucciones del sistema de evaluación
                </span>
              </label>
              {!canAccept && (
                <div className="wait-hint">Podrá aceptar en {countdown} segundos…</div>
              )}
            </div>

            <div className="modal-buttons">
              <button onClick={handleCloseModal}>Cerrar</button>
              <button
                onClick={handleAccept}
                disabled={!accepted || !canAccept}
                aria-disabled={!accepted || !canAccept}
              >
                {!canAccept ? `Esperar ${countdown}s` : 'Acepto y Continuar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      </div>
    </>
  );
}

export default LandingPage;
