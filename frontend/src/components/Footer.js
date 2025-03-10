import React from 'react';
import { Link } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import facebookLogo from '../assets/img/facebook_white.png';
import twitterLogo from '../assets/img/twitter_white.png';
import linkedinLogo from '../assets/img/linkedin_white.png';

function Footer() {
  return (
    <footer>
      {/* Parte superior con 3 columnas */}
      <div className="footer-top">
        <div className="footer-branding">
          <Link to="/LandingPage">
            <img
              src={logoMeridian}
              alt="Meridian Logo Footer"
              className="footer-logo"
            />
          </Link>
        </div>

        <div className="footer-contact">
          <p>Email: info@meridian.com.co</p>
          <p>Teléfono: (571) 7469090 Ext 1190.</p>
          <p>Dirección: Cl. 67 #7-94, Bogotá</p>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link to="/services">Servicios</Link>
            </li>
            <li>
              <Link to="/about">Acerca de</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Parte inferior con texto legal y redes sociales */}
      <div className="footer-bottom">
        <p>© 2025 Meridian Consulting LTDA. Todos los derechos reservados.</p>
        <p>
          <Link to="/privacy">Política de Privacidad</Link> | <Link to="/terms">Términos de Uso</Link>
        </p>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" className="social-logo" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt="Twitter" className="social-logo" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" className="social-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
