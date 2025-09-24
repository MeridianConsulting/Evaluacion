import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
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
import CargosCRUD from "./admin/CargosCRUD";
import TeamEvaluations from "./pages/TeamEvaluations";
import HseqEvaluation from "./pages/HseqEvaluation";
import { NotificationProvider } from "./components/NotificationSystem";
import "./App.css";

function App() {
  // Estado de carga para evitar redirecciones prematuras
  const [isLoading, setIsLoading] = useState(true);
  
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
    } else if (requiredRole === "HSEQ") {
      return (userRole || '').toLowerCase() === 'hseq';
    }
    return false;
  };

  // useEffect para manejar la carga inicial
  useEffect(() => {
    // Verificar autenticación al cargar la aplicación
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const storedRole = localStorage.getItem("userRole") || "empleado";
      
      setIsAuthenticated(authStatus);
      setUserRole(storedRole);
      setIsLoading(false);
    };

    // Pequeño delay para asegurar que localStorage esté disponible
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Asegura rol admin para la cédula especial aún si vino del backend con otro rol
    const cedula = localStorage.getItem('cedula');
    if (isAuthenticated && cedula === '1011202252' && userRole !== 'admin') {
      setUserRole('admin');
      localStorage.setItem('userRole', 'admin');
    }
  }, [isAuthenticated, userRole]);

  // Cargar rol desde el backend para usuarios autenticados
  useEffect(() => {
    const loadRoleFromBackend = async () => {
      if (!isAuthenticated) return;
      
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (!currentUserId || !apiUrl) return;
        
        const resp = await fetch(`${apiUrl}/api/employees/${currentUserId}`);
        if (!resp.ok) return;
        
        const data = await resp.json();
        
        // Intentar obtener el rol de diferentes formas posibles
        let role = '';
        if (data) {
          role = data.data?.rol || data.rol || data.role || '';
        }
        
        if (role) {
          const backendRole = String(role).trim();
          // Solo actualizar si el rol del backend es diferente al actual
          if (backendRole.toLowerCase() !== userRole?.toLowerCase()) {
            setUserRole(backendRole);
            localStorage.setItem('userRole', backendRole);
          }
        }
      } catch (error) {
        // Error silencioso
      }
    };
    
    loadRoleFromBackend();
  }, [isAuthenticated, userRole]);

  // Mostrar spinner de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <HelmetProvider>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #1F3B73 0%, #0A0F1A 100%)',
          color: 'white',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(255,255,255,0.3)',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <div>Cargando aplicación...</div>
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
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
        <Route  
          path="/evaluaciones/:empleadoId/revision-jefe"
          element={
            isAuthenticated ? (
              <PerformanceEvaluationBoss onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/" replace />
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
        {/* Ruta /admin/funciones eliminada */}
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

        {/* Ruta para evaluación HSEQ - solo rol HSEQ */}
        <Route
          path="/hseq-evaluation"
          element={
            isAuthenticated && hasAccess("HSEQ") ? (
              <HseqEvaluation onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to={isAuthenticated ? "/LandingPage" : "/"} replace />
            )
          }
        />
          </Routes>
        </Router>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;
