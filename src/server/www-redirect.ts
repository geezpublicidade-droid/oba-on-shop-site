import { createServerFn } from '@tanstack/react-start'
import { getRequestHost, getRequestUrl } from '@tanstack/react-start/server'
import { SITE_URL } from '#/lib/seo'

const WWW_HOST = 'www.obaonshop.com.br'

/**
 * O vercel.json ja tem um redirect www->apex, mas o preset Nitro/Vercel usado por este
 * projeto nao aplica corretamente redirects baseados em host pra apps com SSR (confirmado:
 * o config gerado tem a regra certa, mas o edge nunca a honra em producao). Este server fn
 * cobre o mesmo caso na camada da aplicacao, como fallback confiavel.
 */
export const getWwwRedirectTarget = createServerFn({ method: 'GET' }).handler(() => {
  if (getRequestHost() !== WWW_HOST) return null
  const url = getRequestUrl()
  return `${SITE_URL}${url.pathname}${url.search}`
})
