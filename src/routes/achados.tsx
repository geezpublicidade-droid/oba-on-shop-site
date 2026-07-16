import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/achados')({
  validateSearch: validateCategorySearch,
  head: () =>
    buildPageMeta({
      title: 'Achados | Oba On Shop',
      description: 'Produtos úteis, diferentes e selecionados pela Oba On Shop.',
      path: '/achados',
    }),
  component: AchadosPage,
})

function AchadosPage() {
  const search = useSearch({ from: '/achados' })
  return <CategoryPage category="achados" routePath="/achados" search={search} />
}
