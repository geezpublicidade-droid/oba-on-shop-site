import type { Product } from '#/data/products'

export const SITE_URL = 'https://obaonshop.com.br'
export const SITE_NAME = 'Oba On Shop'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

/** Imagens "placeholder:xxx" não são URLs reais (renderizadas via CSS) — não servem pra og:image. */
function resolveOgImage(image?: string): string {
  if (image && /^https?:\/\//.test(image)) return image
  return DEFAULT_OG_IMAGE
}

/** Monta meta tags + canonical padronizados pra uma página. Usar no `head()` de cada rota pública. */
export function buildPageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'product'
}) {
  const url = `${SITE_URL}${path}`
  const ogImage = resolveOgImage(image)

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImage },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

// Dados estruturados (schema.org/Product) para SEO. Omitimos "availability" porque
// o estoque real é controlado pela plataforma parceira, não pela Oba On Shop.
export function buildProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    category: product.subcategory,
    image: resolveOgImage(product.image),
    url: `${SITE_URL}/produto/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
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

// Dados estruturados (schema.org/Organization) — usado uma vez, na raiz do site.
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo512.png`,
  }
}

// Dados estruturados (schema.org/WebSite) — habilita a caixa de busca do site nos resultados do Google.
export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }
}
