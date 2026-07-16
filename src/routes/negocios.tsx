import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CategoryPage } from '#/components/category/CategoryPage'
import { validateCategorySearch } from '#/lib/search-params'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/negocios')({
  validateSearch: validateCategorySearch,
  head: () =>
    buildPageMeta({
      title: 'Negócios | Oba On Shop',
      description: 'Ferramentas, produtos e indicações para ajudar pequenos negócios a vender, organizar e crescer.',
      path: '/negocios',
    }),
  component: NegociosPage,
})

function NegociosPage() {
  const search = useSearch({ from: '/negocios' })
  return <CategoryPage category="negocios" routePath="/negocios" search={search} />
}
