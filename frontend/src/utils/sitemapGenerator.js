// Generador automático de sitemap para SEO
// Usa @dr.pogodin/react-helmet para meta tags dinámicos
const generateSitemap = () => {
  const baseUrl = 'https://evaluacion.meridianltda.com';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  const routes = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/LandingPage',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/login',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/results',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/performance',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/hseq-evaluation',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/profile',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/team-evaluations',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/services',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/contact',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/about',
      priority: '0.5',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/privacy',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: currentDate
    },
    {
      url: '/terms',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: currentDate
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}

</urlset>`;

  return sitemap;
};

// Función para generar robots.txt dinámico
const generateRobotsTxt = () => {
  return `# Robots.txt para evaluacion.meridianltda.com
# Sistema de Evaluación de Desempeño - Meridian Consulting LTDA

User-agent: *
Allow: /

# Permitir acceso a archivos estáticos importantes
Allow: /static/
Allow: /favicon.ico
Allow: /logo192.png
Allow: /manifest.json

# Bloquear acceso a archivos sensibles
Disallow: /api/
Disallow: /admin/
Disallow: /node_modules/
Disallow: /.env
Disallow: /package.json
Disallow: /package-lock.json

# Sitemap
Sitemap: https://evaluacion.meridianltda.com/sitemap.xml

# Crawl-delay para ser amigable con el servidor
Crawl-delay: 1`;
};

// Función para notificar a Google sobre cambios (ping)
const pingGoogle = async () => {
  try {
    const sitemapUrl = 'https://evaluacion.meridianltda.com/sitemap.xml';
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    // Solo funciona en el servidor, no en el cliente
    if (typeof window === 'undefined') {
      const response = await fetch(pingUrl);
      console.log('Google ping response:', response.status);
    }
  } catch (error) {
    console.log('Error pinging Google:', error);
  }
};

// Función para generar meta tags dinámicos
const generateMetaTags = (pageData) => {
  const {
    title,
    description,
    keywords,
    image = 'https://evaluacion.meridianltda.com/logo192.png',
    url,
    type = 'website'
  } = pageData;

  const fullTitle = title.includes('Meridian') ? title : `${title} | Meridian Consulting LTDA`;

  return {
    title: fullTitle,
    description,
    keywords,
    image,
    url,
    type,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": fullTitle,
      "description": description,
      "url": url,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
        "url": "https://evaluacion.meridianltda.com"
      },
      "provider": {
        "@type": "Organization",
        "name": "Meridian Consulting LTDA",
        "url": "https://meridianltda.com"
      }
    }
  };
};

export { generateSitemap, generateRobotsTxt, pingGoogle, generateMetaTags };
