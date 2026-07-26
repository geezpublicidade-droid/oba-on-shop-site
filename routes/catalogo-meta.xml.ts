import { defineHandler } from 'nitro'
import { setHeader } from 'nitro/h3'
import { readProducts } from '#/server/admin'
import { SITE_NAME, SITE_URL } from '#/lib/seo'
import type { Product } from '#/data/products'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function isRealImage(url: string | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\//.test(url)
}

function money(value: number): string {
  return `${value.toFixed(2)} BRL`
}

/** Link de destino do anúncio: sempre o link de afiliado do produto (Shopee/Amazon/etc), não a página do site. */
function offerLink(product: Product): string {
  return product.affiliateUrl
}

function productItem(product: Product): string | null {
  // Sem foto real (produto ainda com imagem placeholder/CSS) não dá pra anunciar no catálogo.
  if (!isRealImage(product.image)) return null
  if (!product.affiliateUrl) return null

  const hasDiscount =
    product.offer && typeof product.oldPrice === 'number' && product.oldPrice > product.currentPrice
  const regularPrice = hasDiscount ? (product.oldPrice as number) : product.currentPrice

  const galleryImages = product.gallery.filter(isRealImage).slice(0, 10)

  const fields: string[] = [
    `<g:id>${escapeXml(product.id)}</g:id>`,
    `<g:title>${escapeXml(product.name)}</g:title>`,
    `<g:description>${escapeXml(product.description || product.shortDescription)}</g:description>`,
    `<g:link>${escapeXml(offerLink(product))}</g:link>`,
    `<g:image_link>${escapeXml(product.image)}</g:image_link>`,
    ...galleryImages.map((url) => `<g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`),
    `<g:availability>in stock</g:availability>`,
    `<g:condition>new</g:condition>`,
    `<g:price>${money(regularPrice)}</g:price>`,
    ...(hasDiscount ? [`<g:sale_price>${money(product.currentPrice)}</g:sale_price>`] : []),
    `<g:brand>${escapeXml(SITE_NAME)}</g:brand>`,
    `<g:product_type>${escapeXml(`${product.category} > ${product.subcategory}`)}</g:product_type>`,
    `<g:custom_label_0>${escapeXml(product.platform)}</g:custom_label_0>`,
  ]

  return `  <item>\n    ${fields.join('\n    ')}\n  </item>`
}

export default defineHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  const products = await readProducts()
  const items = products
    .filter((product) => product.active)
    .map(productItem)
    .filter((item): item is string => item !== null)

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>${escapeXml(SITE_NAME)}</title>
  <link>${SITE_URL}</link>
  <description>Catálogo de produtos ${escapeXml(SITE_NAME)} para anúncios dinâmicos (Meta/Facebook)</description>
${items.join('\n')}
</channel>
</rss>
`
})
