import React from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function Contact({ onLogout }) {
  return (
    <>
      <SEO 
        title="Contacto - Meridian Consulting LTDA"
        description="Contacta con Meridian Consulting LTDA para consultas sobre nuestro sistema de evaluación de desempeño. Información de contacto, ubicación y soporte técnico."
        keywords="contacto, Meridian Consulting, soporte técnico, consultas, evaluación desempeño, Colombia, hidrocarburos"
        url="https://evaluacion.meridianltda.com/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contacto - Meridian Consulting LTDA",
          "description": "Página de contacto de Meridian Consulting LTDA",
          "url": "https://evaluacion.meridianltda.com/contact",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          },
          "mainEntity": {
            "@type": "Organization",
            "name": "Meridian Consulting LTDA",
            "url": "https://meridianltda.com"
          }
        }}
      />
      <div className="contact-page-unique">
      <Header onLogout={onLogout} />

      <main className="contact-main-unique">
        <div className="contact-container-unique">
          {/* Sección izquierda: Mapa de Google */}
          <div className="contact-map-section-unique">
            <div className="contact-map-content-unique">
              <h2 className="contact-title-unique">Nuestra Ubicación</h2>
              <p className="contact-subtitle-unique">Cl. 67 #7-94, Bogotá, Colombia</p>
              <iframe
                title="Mapa Cl. 67 #7-94, Bogotá"
                className="contact-iframe-unique"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.265304907977!2d-74.06227!3d4.65221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99c3d9cce3a1%3A0xa833f22a56147b3f!2sCl.+67+%237-94%2C+Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1694046633547!5m2!1ses-419!2sco"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Sección derecha: Información de contacto */}
          <div className="contact-info-section-unique">
            <h3 className="contact-info-title-unique">Contáctanos</h3>
            <div className="contact-info-unique">
              <p>Dirección: Cl. 67 #7-94, Bogotá</p>
              <p>Teléfono: (571) 7469090 Ext 1190.</p>
              <p>Email: info@meridian.com.co</p>
              <p>Horario de atención: 8:00 AM - 5:00 PM (Lun - Vie)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

export default Contact;
