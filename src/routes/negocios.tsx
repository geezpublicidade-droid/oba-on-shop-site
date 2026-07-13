import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'

export const Route = createFileRoute('/negocios')({
  validateSearch: validateCategorySearch,
  head: () => ({
    meta: [
      { title: 'Negócios | Oba On Shop' },
      {
        name: 'description',
        content: 'Ferramentas, produtos e indicações para ajudar pequenos negócios a vender, organizar e crescer.',
      },
    ],
  }),
  component: NegociosPage,
})

function NegociosPage() {
  const search = useSearch({ from: '/negocios' })
  return <CategoryPage category="negocios" routePath="/negocios" search={search} />
}
