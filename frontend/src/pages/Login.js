import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/Styles1.css';
import logoMeridian from "../assets/img/logo_meridian_blanco.png";

const Login = ({ onLogin }) => {
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!cedula || !contrasena) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    setError("");
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/login`, {
        mode: "no-cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ cedula, contrasena }),
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('employeeId', data.empleado.id_empleado);
        onLogin(true);
        navigate("/LandingPage");
      } else {
        setError(data.message || "Credenciales inválidas.");
        onLogin(false);
      }
    } catch (err) {
      console.error("Error en el login:", err);
      setError("No se pudo conectar con el servidor.");
      onLogin(false);
    }
  };

  return (
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
              />
              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrarContrasena ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="login-extra-options">
            <a className="login-forgot-password" href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          {error && <p className="login-error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
