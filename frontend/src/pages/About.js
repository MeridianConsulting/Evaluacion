import React from 'react';
import '../assets/css/Styles1.css'; // Archivo de estilos exclusivos para la página Acerca de
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function About({ onLogout }) {
  return (
    <>
      <SEO 
        title="Acerca de Nosotros - Meridian Consulting LTDA"
        description="Conoce más sobre Meridian Consulting LTDA, nuestra misión, visión y compromiso con el desarrollo del talento humano a través de sistemas de evaluación de desempeño."
        keywords="Meridian Consulting, empresa, misión, visión, valores, desarrollo talento humano, evaluación desempeño, Colombia"
        url="https://evaluacion.meridianltda.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Acerca de Nosotros - Meridian Consulting LTDA",
          "description": "Información sobre Meridian Consulting LTDA y nuestro sistema de evaluación de desempeño",
          "url": "https://evaluacion.meridianltda.com/about",
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
      <div className="about-page-unique">
      <Header onLogout={onLogout} />
      
      <main className="about-main-unique">
        <div className="about-container-unique">
          <h2 className="about-title-unique">Nuestra Historia</h2>
          <p className="about-text-unique">
            Meridian Consulting LTDA fue fundada el 20 de febrero de 2003 por geólogos con amplia experiencia en la industria minero-energética. Surgió con el objetivo de prestar servicios diferenciadores en el sector de hidrocarburos, colaborando con empresas líderes como Ecopetrol, Repsol, Petrocolombia y muchas otras.
          </p>
          <p className="about-text-unique">
            Además, hemos trabajado en la industria minera para compañías como Vale Colombia, Argos SAS y otras, desarrollando más de 200 contratos exitosos que avalan nuestra experiencia y compromiso con la calidad.
          </p>
          
          <h2 className="about-title-unique">Misión</h2>
          <p className="about-text-unique">
            Generar bienestar y recursos económicos para nuestros socios, empleados y clientes a través de servicios de consultoría integral que impulsan el crecimiento y la eficiencia en la industria petrolera y de hidrocarburos, siempre operando de manera ética, transparente y sostenible.
          </p>
          
          <h2 className="about-title-unique">Visión</h2>
          <p className="about-text-unique">
            Para el 2028, queremos consolidarnos como referentes locales en calidad, innovación y eficiencia en consultoría para el sector de hidrocarburos, manteniendo nuestra rentabilidad y ampliando nuestras alianzas estratégicas en el mercado nacional e internacional.
          </p>
          
          <h2 className="about-title-unique">Valores Corporativos</h2>
          <ul className="about-list-unique">
            <li><strong>Integridad:</strong> Actuamos con honestidad y ética en todas nuestras acciones.</li>
            <li><strong>Transparencia:</strong> Operamos de manera abierta para generar confianza en clientes y socios.</li>
            <li><strong>Responsabilidad Social:</strong> Estamos comprometidos con el desarrollo sostenible y el bienestar social.</li>
            <li><strong>Calidad:</strong> Ofrecemos servicios de alta calidad que cumplen los estándares más exigentes.</li>
            <li><strong>Innovación:</strong> Impulsamos la transformación digital y la mejora continua en la industria.</li>
          </ul>
          
          <h2 className="about-title-unique">Principios Ambientales</h2>
          <p className="about-text-unique">
            Nos comprometemos a utilizar de manera responsable los recursos naturales, minimizar la generación de residuos y evitar actividades que perjudiquen el medio ambiente durante el desarrollo de nuestros proyectos.
          </p>
        </div>
      </main>
      
      <Footer />
      </div>
    </>
  );
}

export default About;
