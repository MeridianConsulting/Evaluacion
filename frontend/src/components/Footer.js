import React from 'react';
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
          <img
            src={logoMeridian}
            alt="Meridian Logo Footer"
            className="footer-logo"
          />
        </div>

        <div className="footer-contact">
          <p>Email: info@meridian.com.co</p>
          <p>Teléfono: (571) 7469090 Ext 1190.</p>
          <p>Dirección: Cl. 67 #7-94, Bogotá</p>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <a href="#services">Servicios</a>
            </li>
            <li>
              <a href="#about">Acerca de</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Parte inferior con texto legal y redes sociales centradas */}
      <div className="footer-bottom">
        <p>© 2025 Meridian Consulting LTDA. Todos los derechos reservados.</p>
        <p>
          <a href="#privacy">Política de Privacidad</a> | <a href="#terms">Términos de Uso</a>
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
