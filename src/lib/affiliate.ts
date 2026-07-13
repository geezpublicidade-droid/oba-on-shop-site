import { recordAffiliateClick } from '#/server/analytics'

export interface AffiliateClickParams {
  productId: string
  productName: string
  category: string
  platform: string
  affiliateUrl: string
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// Função central de rastreamento de cliques em links de afiliado.
// Integra automaticamente com GA4 (gtag) e Meta Pixel (fbq) quando disponíveis na página.
// Sem essas ferramentas instaladas, apenas registra em console durante desenvolvimento.
export function trackAffiliateClick({
  productId,
  productName,
  category,
  platform,
  affiliateUrl,
}: AffiliateClickParams): void {
  if (typeof window === 'undefined') return

  const payload = {
    product_id: productId,
    product_name: productName,
    category,
    platform,
    page_location: window.location.href,
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_link_click', payload)
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'affiliate_link_click', payload)
  }

  if (import.meta.env.DEV) {
    console.info('[affiliate_link_click]', { ...payload, affiliateUrl })
  }

  // Best-effort: não bloqueia a navegação para o link de afiliado.
  recordAffiliateClick({ data: { productId } }).catch(() => {})
}
