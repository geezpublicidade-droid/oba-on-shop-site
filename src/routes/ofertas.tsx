import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/ofertas')({
  validateSearch: validateCategorySearch,
  head: () =>
    buildPageMeta({
      title: 'Ofertas | Oba On Shop',
      description: 'Promoções, descontos e oportunidades selecionadas pela Oba On Shop.',
      path: '/ofertas',
    }),
  component: OfertasPage,
})

function OfertasPage() {
  const search = useSearch({ from: '/ofertas' })
  return <CategoryPage category="ofertas" routePath="/ofertas" search={search} />
}
