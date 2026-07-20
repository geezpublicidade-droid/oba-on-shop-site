import { defineHandler } from 'nitro'
import { setHeader } from 'nitro/h3'
import { readProducts } from '#/server/admin'
import { SITE_URL } from '#/lib/seo'

const STATIC_PAGES: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/departamentos', changefreq: 'weekly', priority: '0.8' },
  { path: '/busca', changefreq: 'daily', priority: '0.7' },
  { path: '/achados', changefreq: 'daily', priority: '0.8' },
  { path: '/ofertas', changefreq: 'daily', priority: '0.8' },
  { path: '/digital', changefreq: 'daily', priority: '0.8' },
  { path: '/negocios', changefreq: 'daily', priority: '0.8' },
  { path: '/sobre', changefreq: 'monthly', priority: '0.4' },
  { path: '/suporte', changefreq: 'monthly', priority: '0.4' },
  { path: '/venda-na-oba', changefreq: 'monthly', priority: '0.4' },
  { path: '/aviso-de-afiliados', changefreq: 'yearly', priority: '0.2' },
  { path: '/termos', changefreq: 'yearly', priority: '0.2' },
  { path: '/politica-de-privacidade', changefreq: 'yearly', priority: '0.2' },
]

function urlEntry(loc: string, changefreq: string, priority: string, lastmod?: string) {
  return `  <url>
    <loc>${loc}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export default defineHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  const products = await readProducts()
  const staticEntries = STATIC_PAGES.map((page) => urlEntry(`${SITE_URL}${page.path}`, page.changefreq, page.priority))
  const productEntries = products
    .filter((product) => product.active)
    .map((product) => urlEntry(`${SITE_URL}/produto/${product.slug}`, 'weekly', '0.6', product.createdAt))

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...productEntries].join('\n')}
</urlset>
`
})
