import React from 'react';
import '../assets/css/LandingPage.css';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import burgerMenu from '../assets/img/burger.png';
import mainImage from '../assets/img/image4.png';


function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logoMeridian} alt="Meridian Logo" />
          </div>
          <div className="navbar-menu">
            <img src={burgerMenu} alt="Menú" />
          </div>
        </nav>
      </header>

      <section className="hero">
        <h1>Evalúa y Potencia el Desempeño de tu Equipo</h1>
        <p>Optimiza el rendimiento de tus colaboradores con nuestra evaluación profesional</p>
        <button>Comenzar Evaluación</button>
      </section>

      <section className="content">
        <img src={mainImage} alt="Evaluación" className="content-image" />
        <div className="content-text">
          <p>
            Las evaluaciones de desempeño ayudan a identificar áreas de mejora para los empleados,
            lo que puede llevar a un aumento en la productividad y eficiencia.
          </p>
        </div>
      </section>

      <footer>
        <p>Email: contact@meridianconsulting.co</p>
        <p>Teléfono: (571) 7469699 en Bogotá</p>
      </footer>
    </div>
    
  );
}

export default LandingPage;
