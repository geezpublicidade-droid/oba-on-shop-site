import { createFileRoute, useSearch } from '@tanstack/react-router'
import { SearchResultsPage } from '#/components/category/SearchResultsPage'
import { validateCategorySearch } from '#/lib/search-params'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/busca')({
  validateSearch: validateCategorySearch,
  head: () =>
    buildPageMeta({
      title: 'Busca | Oba On Shop',
      description: 'Busque produtos, ofertas e soluções em todas as categorias da Oba On Shop.',
      path: '/busca',
    }),
  component: BuscaPage,
})

function BuscaPage() {
  const search = useSearch({ from: '/busca' })
  return <SearchResultsPage search={search} />
}
