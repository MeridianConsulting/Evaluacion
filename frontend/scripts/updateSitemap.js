#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Script para actualizar sitemap automáticamente
// Compatible con @dr.pogodin/react-helmet

// Función para generar sitemap
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

// Función para generar robots.txt
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

// Función para notificar a Google (solo funciona en servidor)
const pingGoogle = async () => {
  try {
    const sitemapUrl = 'https://evaluacion.meridianltda.com/sitemap.xml';
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    const response = await fetch(pingUrl);
    console.log('✅ Google ping response:', response.status);
    return response.ok;
  } catch (error) {
    console.log('❌ Error pinging Google:', error.message);
    return false;
  }
};

// Función principal
const updateSitemap = async () => {
  try {
    console.log('🚀 Actualizando sitemap y robots.txt...');
    
    // Generar sitemap
    const sitemap = generateSitemap();
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('✅ Sitemap actualizado:', sitemapPath);
    
    // Generar robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ Robots.txt actualizado:', robotsPath);
    
    // Notificar a Google (opcional)
    console.log('📡 Notificando a Google sobre el sitemap...');
    await pingGoogle();
    
    console.log('🎉 ¡Actualización completada!');
    
  } catch (error) {
    console.error('❌ Error actualizando sitemap:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  updateSitemap();
}

module.exports = { updateSitemap, generateSitemap, generateRobotsTxt, pingGoogle };
