import React from 'react';
import '../assets/css/Styles1.css'; // Archivo de estilos exclusivo para esta página
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function Services({ onLogout }) {
  return (
    <>
      <SEO 
        title="Servicios - Meridian Consulting LTDA"
        description="Descubre los servicios de consultoría de Meridian Consulting LTDA especializados en hidrocarburos, evaluación de desempeño y desarrollo del talento humano en Colombia."
        keywords="servicios consultoría, hidrocarburos, evaluación desempeño, desarrollo talento humano, Meridian Consulting, Colombia, consultoría especializada"
        url="https://evaluacion.meridianltda.com/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Servicios de Consultoría - Meridian Consulting LTDA",
          "description": "Servicios especializados en hidrocarburos y evaluación de desempeño",
          "url": "https://evaluacion.meridianltda.com/services",
          "provider": {
            "@type": "Organization",
            "name": "Meridian Consulting LTDA",
            "url": "https://meridianltda.com"
          },
          "serviceType": "Consultoría en Hidrocarburos y Evaluación de Desempeño",
          "areaServed": "Colombia"
        }}
      />
      <div className="services-page-unique">
      <Header onLogout={onLogout} />

      <main className="services-main-unique">
        <div className="services-container-unique">
          <h2 className="services-title-unique">Nuestros Servicios</h2>
          <p className="services-subtitle-unique">
            Meridian Consulting LTDA se especializa en brindar consultoría integral para el sector petrolero, de hidrocarburos y minería. Con más de 20 años de experiencia, colaboramos con compañías líderes en Colombia, ofreciendo asesoría especializada en cada etapa de sus proyectos.
          </p>

          <div className="services-list-unique">
            <div className="service-item-unique">
              <h3 className="service-item-title-unique">Consultoría Geo Científica</h3>
              <p className="service-item-description-unique">
                Asesoría especializada en geociencia aplicada al petróleo, minería y medio ambiente. (Geoscience, Hydrocarbon, Mining and Environmental Consultancy)
              </p>
            </div>
            <div className="service-item-unique">
              <h3 className="service-item-title-unique">Consultoría Ambiental y Social</h3>
              <p className="service-item-description-unique">
                Brindamos consultoría para gestionar impactos ambientales y sociales, garantizando el cumplimiento normativo y la sostenibilidad en las operaciones.
              </p>
            </div>
            <div className="service-item-unique">
              <h3 className="service-item-title-unique">Consultoría en Ingeniería de Petróleos</h3>
              <p className="service-item-description-unique">
                Asesoría experta en ingeniería de petróleos para optimizar procesos y maximizar la eficiencia en exploración y producción.
              </p>
            </div>
            <div className="service-item-unique">
              <h3 className="service-item-title-unique">Consultoría para Minería</h3>
              <p className="service-item-description-unique">
                Servicios especializados para la industria minera, abarcando análisis, planificación y optimización de recursos.
              </p>
            </div>
            <div className="service-item-unique">
              <h3 className="service-item-title-unique">Manejo de Información Técnica</h3>
              <p className="service-item-description-unique">
                Implementamos soluciones de data management para el manejo eficiente de información técnica y operativa.
              </p>
            </div>
            <div className="service-item-unique">
              <h3 className="service-item-title-unique">Bioenergía y Energías Renovables</h3>
              <p className="service-item-description-unique">
                Asesoría en proyectos de bioenergía e ingeniería de energías renovables, promoviendo soluciones sostenibles.
              </p>
            </div>
          </div>

          <p className="services-tagline-unique">
            <strong className="services-strong">Tu satisfacción, nuestra prioridad.</strong>
          </p>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

export default Services;
