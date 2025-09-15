import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const SEO = ({ 
  title = "Sistema de Evaluación de Desempeño | Meridian Consulting LTDA",
  description = "Sistema integral de evaluación de desempeño para empleados. Autoevaluación, evaluación del jefe directo y evaluación HSEQ. Herramienta profesional para el desarrollo del talento humano.",
  keywords = "evaluación de desempeño, recursos humanos, autoevaluación, evaluación 360, desarrollo profesional, talento humano, Meridian Consulting, gestión del desempeño, competencias laborales",
  image = "https://evaluacion.meridianltda.com/logo192.png",
  url = "https://evaluacion.meridianltda.com",
  type = "website",
  structuredData = null
}) => {
  const fullTitle = title.includes('Meridian') ? title : `${title} | Meridian Consulting LTDA`;
  
  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Meridian Consulting LTDA" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Meridian Consulting LTDA" />
      <meta property="og:locale" content="es_CO" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Geo tags para Colombia */}
      <meta name="geo.region" content="CO" />
      <meta name="geo.country" content="Colombia" />
      <meta name="geo.placename" content="Colombia" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Evaluación Meridian" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
