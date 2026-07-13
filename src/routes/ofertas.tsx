import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'

export const Route = createFileRoute('/ofertas')({
  validateSearch: validateCategorySearch,
  head: () => ({
    meta: [
      { title: 'Ofertas | Oba On Shop' },
      { name: 'description', content: 'Promoções, descontos e oportunidades selecionadas pela Oba On Shop.' },
    ],
  }),
  component: OfertasPage,
})

function OfertasPage() {
  const search = useSearch({ from: '/ofertas' })
  return <CategoryPage category="ofertas" routePath="/ofertas" search={search} />
}
