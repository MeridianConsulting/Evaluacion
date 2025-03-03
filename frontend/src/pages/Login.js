import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validación simple
    if (!usuario || !contrasena) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError("");

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usuario, password: contrasena }),
      });

      const data = await response.json();

      if (data.success) {
        // Si deseas usar el "recordarme" para persistir la sesión, podrías guardarlo en localStorage
        // localStorage.setItem("recordarme", recordarme);
        onLogin(true);
        navigate("/admin");
      } else {
        setError(data.message || "Credenciales inválidas.");
        onLogin(false);
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("No se pudo conectar con el servidor. Verifique su conexión.");
      onLogin(false);
    }
  };

  return (
    <div className="login-container">
      {/* Cabecera opcional: puedes agregar aquí un ícono o imagen de perfil */}
      <div className="login-header">
        {/* <img className="login-avatar" src="ruta-de-tu-avatar.png" alt="Avatar" /> */}
        <h2>Iniciar Sesión</h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
          />
        </div>

        <div className="password-input-container">
          <label>Contraseña</label>
          <div className="password-wrapper">
            <input
              type={mostrarContrasena ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              aria-label={
                mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {/* Íconos de “ver” y “ocultar” (puedes usar SVG propios o librerías de íconos) */}
              {mostrarContrasena ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8-4 8-11 8-11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="extra-options">
          <a className="forgot-password" href="#">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button type="button" className="login-button" onClick={handleLogin}>
          Iniciar Sesión
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
