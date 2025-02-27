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



      <footer>
        <div className="footer-top">
          <div className="footer-branding">
            <img src={logoMeridian} alt="Meridian Logo Footer" className="footer-logo" />
          </div>
          <div className="footer-contact">
            <p>Email: contacto@meridianconsulting.com</p>
            <p>Teléfono: (571) 7469090 Ext 1190.</p>
            <p>Dirección: Cl. 67 #7-94, Bogotá</p>
          </div>
          <div className="footer-links">
            <a href="#services">Servicios</a>
            <a href="#about">Acerca de</a>
            <a href="#contact">Contacto</a>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p>© 2025 Meridian Consulting LTDA. Todos los derechos reservados.</p>
          <p>
            <a href="#privacy">Política de Privacidad</a> | <a href="#terms">Términos de Uso</a>
          </p>
        </div>
      </footer>


    </div>
    
  );
}

export default LandingPage;
