import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Styles1.css";
import logoMeridian from "../assets/img/logo_meridian_blanco.png";

const PerformanceEvaluation = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Evaluación enviada");
  };

  return (
    <div className="performance-evaluation-page">
      {/* Header con logo y posible menú */}
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logoMeridian} alt="Meridian Logo" />
        </div>
        {/* Puedes agregar un menú o botones aquí si lo requieres */}
      </header>

      {/* Sección Hero para el título y descripción */}
      <section className="hero">
        <h1>Performance Evaluation</h1>
        <p>
          Welcome to your performance evaluation page. Please follow the instructions below to complete your evaluation.
        </p>
      </section>

      {/* Contenido principal de la evaluación */}
      <section className="evaluation-content" style={{ padding: "2rem" }}>
        <div className="evaluation-container" style={{ backgroundColor: "rgba(7, 7, 7, 0.9)", borderRadius: "8px", padding: "2rem", color: "#fff" }}>
          <h2>Instructions</h2>
          <p>Please fill out the form below to submit your evaluation:</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label htmlFor="employeeName">Employee Name:</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  marginTop: "0.5rem"
                }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label htmlFor="evaluationScore">Evaluation Score:</label>
              <input
                type="number"
                id="evaluationScore"
                name="evaluationScore"
                min="0"
                max="10"
                placeholder="0 - 10"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  marginTop: "0.5rem"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-secondary)",
                border: "none",
                padding: "1rem 2rem",
                fontSize: "1.6rem",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              Submit Evaluation
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-branding">
            <img className="footer-logo" src={logoMeridian} alt="Meridian Logo" />
            <p>© 2025 Meridian Consulting Ltda.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PerformanceEvaluation;
