import type { Product } from '#/data/products'

const SITE_URL = 'https://obaonshop.com.br'

// Dados estruturados (schema.org/Product) para SEO. Omitimos "availability" porque
// o estoque real é controlado pela plataforma parceira, não pela Oba On Shop.
export function buildProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    category: product.subcategory,
    url: `${SITE_URL}/produto/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Oba On Shop',
    },
    offers: {
      '@type': 'Offer',
      price: product.currentPrice.toFixed(2),
      priceCurrency: 'BRL',
      url: product.affiliateUrl || `${SITE_URL}/produto/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: product.platform,
      },
    },
  }
}
