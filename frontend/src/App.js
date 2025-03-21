import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import PerformanceEvaluation from "./pages/PerformanceEvaluation"; // Se corrigió la importación duplicada
import "./App.css";

function App() {
  // Se inicializa el estado a partir del valor almacenado en localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Actualiza el estado y lo guarda en localStorage cuando se inicia sesión
  const handleLoginStatus = (loggedIn) => {
    setIsAuthenticated(loggedIn);
    localStorage.setItem("isAuthenticated", loggedIn);
  };

  // Función para cerrar sesión: se actualiza el estado y se elimina el valor del localStorage
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    console.log("Estado de autenticación:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Si está autenticado, redirige a LandingPage; de lo contrario, muestra Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/LandingPage" replace />
            ) : (
              <Login onLogin={handleLoginStatus} />
            )
          }
        />
        {/* Ruta protegida para LandingPage */}
        <Route
          path="/LandingPage"
          element={
            isAuthenticated ? (
              <LandingPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para Contact */}
        <Route
          path="/contact"
          element={
            isAuthenticated ? (
              <Contact onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para About */}
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <About onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para Services */}
        <Route
          path="/services"
          element={
            isAuthenticated ? (
              <Services onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para Privacy */}
        <Route
          path="/privacy"
          element={
            isAuthenticated ? (
              <Privacy onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para Terms */}
        <Route
          path="/terms"
          element={
            isAuthenticated ? (
              <Terms onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para Profile */}
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para Results */}
        <Route
          path="/results"
          element={
            isAuthenticated ? (
              <Results onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta protegida para PerformanceEvaluation */}
        <Route  
          path="/performance"
          element={
            isAuthenticated ? (
              <PerformanceEvaluation onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }  
        />
      </Routes>
    </Router>
  );
}

export default App;
