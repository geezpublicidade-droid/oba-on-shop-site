import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'

export const Route = createFileRoute('/achados')({
  validateSearch: validateCategorySearch,
  head: () => ({
    meta: [
      { title: 'Achados | Oba On Shop' },
      { name: 'description', content: 'Produtos úteis, diferentes e selecionados pela Oba On Shop.' },
    ],
  }),
  component: AchadosPage,
})

function AchadosPage() {
  const search = useSearch({ from: '/achados' })
  return <CategoryPage category="achados" routePath="/achados" search={search} />
}
