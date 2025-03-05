import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para actualizar el estado al iniciar sesión
  const handleLoginStatus = (loggedIn) => {
    setIsAuthenticated(loggedIn);
  };

  // Función para cerrar sesión (cambia isAuthenticated a false)
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Si está autenticado, redirige a LandingPage, sino muestra Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/LandingPage" replace /> : <Login onLogin={handleLoginStatus} />
          }
        />
        {/* Ruta protegida: si no está autenticado, redirige a Login */}
        <Route
          path="/LandingPage"
          element={isAuthenticated ? <LandingPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
