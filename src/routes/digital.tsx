import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'

export const Route = createFileRoute('/digital')({
  validateSearch: validateCategorySearch,
  head: () => ({
    meta: [
      { title: 'Oba Digital | Oba On Shop' },
      { name: 'description', content: 'E-books, cursos, ferramentas e produtos digitais selecionados pela Oba On Shop.' },
    ],
  }),
  component: DigitalPage,
})

function DigitalPage() {
  const search = useSearch({ from: '/digital' })
  return <CategoryPage category="digital" routePath="/digital" search={search} />
}
