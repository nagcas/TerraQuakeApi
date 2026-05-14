import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = 'https://terraquakeapi.com';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/explore-data/earthquakes', changefreq: 'weekly', priority: 0.8 },
  { url: '/explore-data/stations', changefreq: 'weekly', priority: 0.8 },
  { url: '/explore-data/table-earthquakes', changefreq: 'monthly', priority: 0.5 },
  { url: '/explore-data/table-stations', changefreq: 'monthly', priority: 0.5 },
  { url: '/api-access', changefreq: 'weekly', priority: 0.9 },
  { url: '/docs-earthquakes', changefreq: 'weekly', priority: 0.9 },
  { url: '/docs-stations', changefreq: 'weekly', priority: 0.9 },
  { url: '/use-cases', changefreq: 'weekly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.3 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/faq', changefreq: 'monthly', priority: 0.5 },
  { url: '/contribute', changefreq: 'monthly', priority: 0.7 }
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="sitemaps.org">\n';

  links.forEach(link => {
    xml += '  <url>\n';
    xml += `    <loc>${hostname}${link.url === '/' ? '' : link.url}</loc>\n`;
    xml += `    <changefreq>${link.changefreq}</changefreq>\n`;
    xml += `    <priority>${link.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  const publicDir = path.join(__dirname, 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir);
  }

  writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  console.log('Static sitemap successfully generated in /public/sitemap.xml');
}

generateSitemap();
