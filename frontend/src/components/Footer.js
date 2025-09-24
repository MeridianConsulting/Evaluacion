import React from 'react';
import { Link } from 'react-router-dom';
import logoMeridian from '../assets/img/logo_meridian_blanco.png';
import facebookLogo from '../assets/img/facebook_white.png';
import twitterLogo from '../assets/img/twitter_white.png';
import linkedinLogo from '../assets/img/linkedin_white.png';
import instagramLogo from '../assets/img/instagram.png';

function Footer() {
  return (
    <>
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
          <p>Dirección: Cl. 67 #7 - 35, Bogotá</p>
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
        <p style={{ margin: '6px 0', fontWeight: 600 }}>Desarrollado por José Mateo López Cifuentes</p>
        <p>© 2025 Meridian Consulting LTDA. Todos los derechos reservados.</p>
        <p>
          <Link to="/privacy">Política de Privacidad</Link> | <Link to="/terms">Términos de Uso</Link>
        </p>
        <div className="footer-social">
          <a href="https://www.facebook.com/share/19QZ1UQ4tC/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" className="social-logo" />
          </a>
          <a href="https://x.com/meridianLTDA" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt="Twitter" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/meridian.consulting/" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram" className="social-logo" />
          </a>
          <a href="https://co.linkedin.com/company/meridian-consulting-ltda" target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" className="social-logo" />
          </a>
        </div>
      </div>
    </footer>
    <style>{`
      footer {
        background: linear-gradient(135deg, rgba(14,26,54,.96), rgba(31,59,115,.96));
        color: #e5e7eb;
        border-top: 1px solid rgba(255,255,255,.08);
        box-shadow: 0 -10px 30px rgba(2,8,23,.35);
      }
      .footer-top {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
        padding: 22px 24px 10px;
        align-items: start;
      }
      .footer-branding { display: flex; align-items: center; justify-content: center; }
      .footer-logo { height: 48px; filter: drop-shadow(0 2px 6px rgba(0,0,0,.35)); transition: transform .2s ease, filter .2s ease; }
      .footer-logo:hover { transform: translateY(-1px) scale(1.02); filter: drop-shadow(0 8px 18px rgba(0,0,0,.45)); }
      .footer-contact p { margin: 6px 0; opacity: .9; }
      .footer-links ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
      .footer-links a { color: #f3f4f6; text-decoration: none; border-bottom: 1px dashed transparent; transition: color .2s ease, border-color .2s ease; }
      .footer-links a:hover { color: #fff; border-color: rgba(255,255,255,.25); }
      .footer-divider { border: none; border-top: 1px solid rgba(255,255,255,.08); margin: 8px 0; }
      .footer-bottom { display: grid; place-items: center; gap: 6px; padding: 10px 16px 18px; text-align: center; font-size: .95rem; }
      .footer-bottom p { margin: 0; }
      .footer-social { display: flex; gap: 12px; align-items: center; justify-content: center; margin-top: 6px; }
      .social-logo { width: 26px; height: 26px; filter: drop-shadow(0 2px 6px rgba(0,0,0,.25)); transition: transform .15s ease, filter .15s ease; }
      .social-logo:hover { transform: translateY(-1px) scale(1.05); filter: drop-shadow(0 6px 12px rgba(0,0,0,.35)); }
      @media (max-width: 768px) {
        .footer-top { grid-template-columns: 1fr; text-align: center; gap: 14px; }
        .footer-contact p { margin: 4px 0; }
      }
    `}</style>
    </>
  );
}

export default Footer;
