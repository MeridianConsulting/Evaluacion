import React from 'react';
import '../assets/css/Styles1.css';// Archivo de estilos exclusivos para la página de Términos de Uso
import Header from '../components/Header';
import Footer from '../components/Footer';

function Terms({ onLogout }) {
  return (
    <div className="terms-page-unique">
      <Header onLogout={onLogout} />
      <main className="terms-main-unique">
        <div className="terms-container-unique">
          <h2 className="terms-title-unique">Términos de Uso</h2>
          <p className="terms-text-unique">
            Bienvenido a Meridian Consulting LTDA. Al acceder y utilizar nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes términos. Le recomendamos leer detenidamente este documento antes de usar nuestro sitio.
          </p>
          
          <h3 className="terms-subtitle-unique">Uso de la Información</h3>
          <p className="terms-text-unique">
            Toda la información contenida en este sitio web se proporciona únicamente con fines informativos. Meridian Consulting LTDA no garantiza la exactitud o integridad de la información y se reserva el derecho de modificarla en cualquier momento.
          </p>
          
          <h3 className="terms-subtitle-unique">Responsabilidad del Usuario</h3>
          <p className="terms-text-unique">
            Usted se compromete a utilizar nuestros servicios de manera ética y de acuerdo con la ley. El uso indebido del sitio o de la información allí contenida podrá dar lugar a sanciones legales.
          </p>
          
          <h3 className="terms-subtitle-unique">Propiedad Intelectual</h3>
          <p className="terms-text-unique">
            Todos los contenidos, incluyendo textos, gráficos, logotipos, imágenes y software, son propiedad de Meridian Consulting LTDA o de sus respectivos licenciantes y están protegidos por las leyes de propiedad intelectual.
          </p>
          
          <h3 className="terms-subtitle-unique">Modificaciones de los Términos</h3>
          <p className="terms-text-unique">
            Meridian Consulting LTDA se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en nuestro sitio web y entrarán en vigor inmediatamente tras su publicación.
          </p>
          
          <h3 className="terms-subtitle-unique">Contacto</h3>
          <p className="terms-text-unique">
            Si tiene alguna pregunta o comentario respecto a estos términos, por favor contáctenos a través del correo: info@meridian.com.co
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Terms;
