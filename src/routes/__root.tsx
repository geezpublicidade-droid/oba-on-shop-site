import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'
import logo from '#/assets/logo.png'
import { Header } from '#/components/layout/Header'
import { Footer } from '#/components/layout/Footer'
import { setProducts } from '#/data/products'
import { getLiveProducts } from '#/server/admin'

const SITE_URL = 'https://obaonshop.com.br'
const SITE_TITLE = 'Oba On Shop | Achados, Ofertas e Soluções Digitais'
const SITE_DESCRIPTION =
  'Encontre produtos, ofertas, soluções digitais e bons achados selecionados pela Oba On Shop.'

export const Route = createRootRoute({
  beforeLoad: async () => {
    setProducts(await getLiveProducts())
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
      { property: 'og:site_name', content: 'Oba On Shop' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: `${SITE_URL}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: logo, type: 'image/png' },
      { rel: 'canonical', href: SITE_URL },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <Outlet />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function NotFoundComponent() {
  return (
    <div className="page-wrap flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
      <h1 className="display-title text-4xl font-bold text-foreground">Página não encontrada</h1>
      <p className="text-muted-foreground">A página que você procura não existe ou foi movida.</p>
    </div>
  )
}
