import React from 'react';
import '../assets/css/Styles1.css'; // Archivo de estilos exclusivos para la página de Privacidad
import Header from '../components/Header';
import Footer from '../components/Footer';

function Privacy({ onLogout }) {
  return (
    <div className="privacy-page-unique">
      <Header onLogout={onLogout} />

      <main className="privacy-main-unique">
        <div className="privacy-container-unique">
          <h2 className="privacy-title-unique">Políticas de Privacidad</h2>
          <p className="privacy-text-unique">
            En Meridian Consulting LTDA, nos comprometemos a proteger la privacidad y seguridad de la información personal de nuestros clientes, empleados y socios. Esta política describe cómo recopilamos, utilizamos y protegemos los datos personales en el marco de nuestros servicios de consultoría para el sector petrolero, de hidrocarburos y minería.
          </p>
          
          <h3 className="privacy-subtitle-unique">Recopilación de Datos</h3>
          <p className="privacy-text-unique">
            Recopilamos información personal cuando interactúa con nuestros servicios, ya sea a través de registros, formularios de contacto o comunicaciones electrónicas. Esta información puede incluir nombres, direcciones de correo electrónico, números de teléfono, entre otros datos relevantes.
          </p>
          
          <h3 className="privacy-subtitle-unique">Uso de la Información</h3>
          <p className="privacy-text-unique">
            Los datos recopilados se utilizan para brindar y mejorar nuestros servicios, gestionar comunicaciones, cumplir con obligaciones legales y, cuando sea aplicable, para enviar información sobre actualizaciones o promociones. Solo usamos sus datos con el consentimiento expreso y siempre de forma responsable.
          </p>
          
          <h3 className="privacy-subtitle-unique">Protección de Datos</h3>
          <p className="privacy-text-unique">
            Implementamos medidas técnicas y organizativas para garantizar la seguridad y confidencialidad de su información. Entre estas medidas se incluyen el cifrado de datos, el acceso restringido y auditorías periódicas para evitar accesos no autorizados.
          </p>
          
          <h3 className="privacy-subtitle-unique">Derechos del Usuario</h3>
          <p className="privacy-text-unique">
            Usted tiene derecho a acceder, corregir y eliminar sus datos personales, así como a oponerse al tratamiento de los mismos. Para ejercer estos derechos, puede contactarnos a través de nuestro correo electrónico oficial.
          </p>
          
          <h3 className="privacy-subtitle-unique">Uso de Cookies</h3>
          <p className="privacy-text-unique">
            Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario y analizar el tráfico. Al continuar navegando, usted acepta el uso de cookies conforme a nuestra política.
          </p>
          
          <h3 className="privacy-subtitle-unique">Cambios en la Política</h3>
          <p className="privacy-text-unique">
            Nos reservamos el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en nuestro sitio web y, en caso de modificaciones significativas, se notificará a los usuarios por los canales de comunicación correspondientes.
          </p>
          
          <p className="privacy-text-unique">
            Al utilizar nuestros servicios, usted acepta los términos de esta política de privacidad.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;
