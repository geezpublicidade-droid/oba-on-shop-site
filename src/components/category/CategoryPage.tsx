import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { FilterBar } from '#/components/shared/FilterBar'
import { SortSelect } from '#/components/shared/SortSelect'
import { ProductGrid } from '#/components/product/ProductGrid'
import { getProductsByCategory } from '#/data/products'
import type { Product, ProductCategory } from '#/data/products'
import { CATEGORY_META } from '#/data/departments'
import type { CategorySearch } from '#/lib/search-params'
import type { AppRoute } from '#/lib/nav'

function filterAndSort(products: Product[], search: CategorySearch): Product[] {
  let result = products

  if (search.q) {
    const query = search.q.toLowerCase()
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  if (search.type) {
    result = result.filter((product) => product.type === search.type)
  }

  if (search.platform) {
    result = result.filter((product) => product.platform === search.platform)
  }

  if (search.offer) {
    result = result.filter((product) => product.offer)
  }

  const sorted = [...result]
  switch (search.sort) {
    case 'menor-preco':
      sorted.sort((a, b) => a.currentPrice - b.currentPrice)
      break
    case 'maior-desconto':
      sorted.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
      break
    case 'populares':
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
      break
    case 'recentes':
    default:
      sorted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      break
  }

  return sorted
}

export function CategoryPage({
  category,
  routePath,
  search,
}: {
  category: ProductCategory
  routePath: AppRoute
  search: CategorySearch
}) {
  const navigate = useNavigate()
  const meta = CATEGORY_META[category]
  const products = useMemo(() => getProductsByCategory(category), [category])
  const availableTypes = useMemo(
    () => Array.from(new Set(products.map((product) => product.type))),
    [products],
  )
  const results = useMemo(() => filterAndSort(products, search), [products, search])

  function updateSearch(next: Partial<CategorySearch>) {
    navigate({
      to: routePath,
      search: { ...search, ...next },
    })
  }

  return (
    <div className="page-wrap py-10">
      <div
        className="oba-shell relative overflow-hidden rounded-3xl px-6 py-10 text-white sm:px-10 sm:py-14"
        style={{ background: meta.banner }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">{meta.kicker}</p>
        <h1 className="display-title mt-2 text-3xl font-extrabold sm:text-4xl">{meta.title}</h1>
        <p className="mt-3 max-w-xl text-white/90">{meta.description}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search.q ?? ''}
            onChange={(event) => updateSearch({ q: event.target.value || undefined })}
            placeholder={`Buscar em ${meta.title.toLowerCase()}...`}
            aria-label={`Buscar em ${meta.title}`}
            className="rounded-full bg-background pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterBar search={search} availableTypes={availableTypes} onChange={updateSearch} />
          <SortSelect value={search.sort} onChange={(sort) => updateSearch({ sort })} />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>

      <div className="mt-4">
        <ProductGrid products={results} />
      </div>
    </div>
  )
}
