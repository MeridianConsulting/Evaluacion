import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/Styles1.css';
import logoMeridian from "../assets/img/logo_meridian_blanco.png";
import SEO from '../components/SEO';

// Mensajes de error seguros que no comprometen la seguridad
const SAFE_ERRORS = {
  emptyFields: "Completa tu cédula y contraseña.",
  invalidFormat: "Revisa el formato de la cédula.",
  invalidCredentials: "Los datos ingresados no son correctos.",
  lockedOut: "Demasiados intentos fallidos. Inténtalo de nuevo más tarde.",
  serviceUnavailable: "No pudimos iniciar sesión en este momento. Inténtalo más tarde.",
  network: "No fue posible conectarnos. Verifica tu conexión e inténtalo de nuevo.",
  noAccess: "Tu cuenta no tiene acceso a este sistema. Contacta a soporte."
};

const Login = ({ onLogin }) => {
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validaciones básicas en cliente
    if (!cedula || !contrasena) {
      setError(SAFE_ERRORS.emptyFields);
      return;
    }
    
    // Validación sintáctica de cédula (formato básico)
    if (!/^\d{6,12}$/.test(cedula)) {
      setError(SAFE_ERRORS.invalidFormat);
      return;
    }

    setError("");
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ cedula, contrasena }),
      });

      // Si falla HTTP, mapea por status (no uses el mensaje crudo del server)
      if (!response.ok) {
        switch (response.status) {
          case 401:
          case 403:
            setError(SAFE_ERRORS.invalidCredentials);
            break;
          case 423: // Locked
          case 429: // Too Many Requests
            setError(SAFE_ERRORS.lockedOut);
            break;
          case 500:
          case 502:
          case 503:
          case 504:
          default:
            setError(SAFE_ERRORS.serviceUnavailable);
            break;
        }
        onLogin(false);
        return;
      }

      const data = await response.json();

      // Flujos posteriores a credenciales válidas (seguros de especificar)
      if (data?.access === "denied") {
        setError(SAFE_ERRORS.noAccess);
        onLogin(false);
        return;
      }

      if (data.success) {
        const cedulaValue = data.empleado?.cedula;
        const finalRole = data.empleado?.rol || 'empleado';

        localStorage.setItem('employeeId', data.empleado.id_empleado);
        if (cedulaValue) localStorage.setItem('cedula', cedulaValue);
        localStorage.setItem('userRole', finalRole);

        onLogin(true, finalRole);
        navigate("/LandingPage");
      } else {
        // fallback seguro si el backend retorna success=false sin status HTTP de error
        setError(SAFE_ERRORS.invalidCredentials);
        onLogin(false);
      }
    } catch (err) {
      setError(SAFE_ERRORS.network);
      onLogin(false);
    }
  };

  return (
    <>
      <SEO 
        title="Iniciar Sesión - Sistema de Evaluación de Desempeño"
        description="Accede al sistema de evaluación de desempeño de Meridian Consulting LTDA. Inicia sesión con tu cédula y contraseña para comenzar tu evaluación."
        keywords="login, iniciar sesión, evaluación de desempeño, Meridian Consulting, autenticación"
        url="https://evaluacion.meridianltda.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Iniciar Sesión - Sistema de Evaluación de Desempeño",
          "description": "Página de inicio de sesión del sistema de evaluación de desempeño de Meridian Consulting LTDA",
          "url": "https://evaluacion.meridianltda.com/",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          }
        }}
      />
      <div className="login-page">
      <div className="login-logo">
        <img src={logoMeridian} alt="Logo Meridian" className="login-logo-img" />
      </div>
      <div className="login-container">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="login-input-container">
            <label>Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese su cédula"
              autoComplete="username"
            />
          </div>
          <div className="login-password-container">
            <label>Contraseña</label>
            <div className="login-password-wrapper">
              <input
                type={mostrarContrasena ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
              >
                {mostrarContrasena ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                }
              </button>
            </div>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          {error && (
            <div className="login-error-message" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
