import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { FilterBar } from '#/components/shared/FilterBar'
import { SortSelect } from '#/components/shared/SortSelect'
import { ProductGrid } from '#/components/product/ProductGrid'
import { getActiveProducts } from '#/data/products'
import type { CategorySearch } from '#/lib/search-params'
import { filterAndSortProducts } from '#/lib/product-filters'

export function SearchResultsPage({ search }: { search: CategorySearch }) {
  const navigate = useNavigate()
  const products = useMemo(() => getActiveProducts(), [])
  const availableTypes = useMemo(
    () => Array.from(new Set(products.map((product) => product.type))),
    [products],
  )
  const results = useMemo(() => filterAndSortProducts(products, search), [products, search])

  function updateSearch(next: Partial<CategorySearch>) {
    navigate({ to: '/busca', search: { ...search, ...next } })
  }

  return (
    <div className="page-wrap py-10">
      <h1 className="display-title text-3xl font-extrabold sm:text-4xl">
        {search.q ? `Resultados para "${search.q}"` : 'Buscar produtos'}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Achados, ofertas e soluções de todas as categorias da Oba On Shop, em um só lugar.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search.q ?? ''}
            onChange={(event) => updateSearch({ q: event.target.value || undefined })}
            placeholder="Buscar produtos, ofertas, soluções..."
            aria-label="Buscar em toda a Oba On Shop"
            className="rounded-full bg-background pl-9"
            autoFocus
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterBar search={search} availableTypes={availableTypes} onChange={updateSearch} showCategory />
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
