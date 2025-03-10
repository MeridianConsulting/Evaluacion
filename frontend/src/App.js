import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Actualiza el estado cuando se inicia sesión
  const handleLoginStatus = (loggedIn) => {
    setIsAuthenticated(loggedIn);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Si está autenticado, redirige a LandingPage; de lo contrario, muestra Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/LandingPage" replace /> : <Login onLogin={handleLoginStatus} />
          }
        />
        {/* Ruta protegida para LandingPage */}
        <Route
          path="/LandingPage"
          element={isAuthenticated ? <LandingPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        {/* Ruta protegida para Contact */}
        <Route
          path="/contact"
          element={isAuthenticated ? <Contact onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        {/* Ruta protegida para About */}
        <Route
          path="/about"
          element={isAuthenticated ? <About onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        {/* Ruta protegida para Services */}
        <Route
          path="/services"
          element={isAuthenticated ? <Services onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
