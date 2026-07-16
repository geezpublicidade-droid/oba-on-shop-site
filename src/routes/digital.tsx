import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/digital')({
  validateSearch: validateCategorySearch,
  head: () =>
    buildPageMeta({
      title: 'Oba Digital | Oba On Shop',
      description: 'E-books, cursos, ferramentas e produtos digitais selecionados pela Oba On Shop.',
      path: '/digital',
    }),
  component: DigitalPage,
})

function DigitalPage() {
  const search = useSearch({ from: '/digital' })
  return <CategoryPage category="digital" routePath="/digital" search={search} />
}
