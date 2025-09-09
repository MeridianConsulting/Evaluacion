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
import PerformanceEvaluation from "./pages/PerformanceEvaluation";
import PerformanceEvaluationBoss from "./pages/PerformanceEvaluationBoss";
import DashboardSelector from "./admin/DashboardSelector";
import EmpleadosCRUD from "./admin/EmpleadosCRUD";
import FuncionesCRUD from "./admin/FuncionesCRUD";
import CargosCRUD from "./admin/CargosCRUD";
import TeamEvaluations from "./pages/TeamEvaluations";
import { NotificationProvider } from "./components/NotificationSystem";
import "./App.css";

function App() {
  // Se inicializa el estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  
  // Se inicializa el rol del usuario
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "empleado"
  );

  // Actualiza el estado y lo guarda en localStorage cuando se inicia sesión
  const handleLoginStatus = (loggedIn, role = "empleado") => {
    setIsAuthenticated(loggedIn);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", loggedIn);
    localStorage.setItem("userRole", role);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("empleado");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("employeeId");
  };

  // Función para verificar si el usuario tiene acceso a una ruta basado en su rol
  const hasAccess = (requiredRole) => {
    if (requiredRole === "empleado") {
      return true; // Todos los roles tienen acceso a rutas de empleado
    } else if (requiredRole === "jefe") {
      return userRole === "jefe" || userRole === "admin"; // Jefes y admins tienen acceso
    } else if (requiredRole === "admin") {
      return userRole === "admin"; // Solo admins tienen acceso a rutas de admin
    }
    return false;
  };

  useEffect(() => {
    // Asegura rol admin para la cédula especial aún si vino del backend con otro rol
    const cedula = localStorage.getItem('cedula');
    if (isAuthenticated && cedula === '1011202252' && userRole !== 'admin') {
      setUserRole('admin');
      localStorage.setItem('userRole', 'admin');
    }
  }, [isAuthenticated, userRole]);

  return (
    <NotificationProvider>
      <Router>
        <Routes>
        {/* Ruta de login pública */}
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
        
        {/* Rutas accesibles para todos los usuarios autenticados */}
        <Route
          path="/LandingPage"
          element={
            isAuthenticated ? (
              <LandingPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/contact"
          element={
            isAuthenticated ? (
              <Contact onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <About onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/services"
          element={
            isAuthenticated ? (
              <Services onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/privacy"
          element={
            isAuthenticated ? (
              <Privacy onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/terms"
          element={
            isAuthenticated ? (
              <Terms onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/results"
          element={
            isAuthenticated ? (
              <Results onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route  
          path="/performance"
          element={
            isAuthenticated ? (
              <PerformanceEvaluation onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }  
        />
        <Route  
          path="/performance-evaluation-boss"
          element={
            isAuthenticated && hasAccess("jefe") ? (
              <PerformanceEvaluationBoss onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to={isAuthenticated ? "/LandingPage" : "/"} replace />
            )
          }  
        />
        
        {/* Rutas accesibles solo para administradores */}
        <Route
          path="/admin"
          element={
            isAuthenticated && hasAccess("admin") ? (
              <DashboardSelector onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to={isAuthenticated ? "/LandingPage" : "/"} replace />
            )
          }
        />
        <Route
          path="/admin/empleados"
          element={
            isAuthenticated && hasAccess("admin") ? (
              <EmpleadosCRUD onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to={isAuthenticated ? "/LandingPage" : "/"} replace />
            )
          }
        />
        <Route
          path="/admin/funciones"
          element={
            isAuthenticated && hasAccess("admin") ? (
              <FuncionesCRUD onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to={isAuthenticated ? "/LandingPage" : "/"} replace />
            )
          }
        />
        <Route
          path="/admin/cargos"
          element={
            isAuthenticated && hasAccess("admin") ? (
              <CargosCRUD onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to={isAuthenticated ? "/LandingPage" : "/"} replace />
            )
          }
        />
        
        {/* Ruta para evaluaciones de equipo: visible si está autenticado.
            El propio Header controla la visibilidad del botón según asignaciones. */}
        <Route
          path="/team-evaluations"
          element={
            isAuthenticated ? (
              <TeamEvaluations onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
