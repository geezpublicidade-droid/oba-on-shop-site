import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { FilterBar } from '#/components/shared/FilterBar'
import { SortSelect } from '#/components/shared/SortSelect'
import { ProductGrid } from '#/components/product/ProductGrid'
import { getProductsByCategory } from '#/data/products'
import type { ProductCategory } from '#/data/products'
import { CATEGORY_META } from '#/data/departments'
import type { CategorySearch } from '#/lib/search-params'
import { filterAndSortProducts } from '#/lib/product-filters'
import type { AppRoute } from '#/lib/nav'

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
  const results = useMemo(() => filterAndSortProducts(products, search), [products, search])

  function updateSearch(next: Partial<CategorySearch>) {
    navigate({
      to: routePath,
      search: { ...search, ...next },
    })
  }

  return (
    <div className="page-wrap py-10">
      <div
        className="oba-shell relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl px-6 py-10 text-white sm:aspect-[16/7] sm:justify-center sm:px-10 sm:py-14"
        style={{ background: meta.banner }}
      >
        <img
          src={meta.image}
          alt=""
          className="absolute inset-0 h-full w-full rounded-[inherit] object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/25 sm:to-transparent" />
        <div className="relative sm:max-w-md">
          <p className="text-shadow-soft text-sm font-bold uppercase tracking-widest text-white/90">
            {meta.kicker}
          </p>
          <h1 className="text-shadow-soft display-title mt-2 text-4xl font-extrabold sm:text-5xl">
            {meta.title}
          </h1>
          <p className="text-shadow-soft mt-3 max-w-xl text-lg text-white/95">{meta.description}</p>
        </div>
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
