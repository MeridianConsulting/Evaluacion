import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const handleLoginStatus = (loggedIn) => {
    // Aquí puedes guardar el estado o realizar otras acciones según sea necesario.
    console.log("Estado de login:", loggedIn);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLoginStatus} />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
