import type { ProductCategory } from '#/data/products'

export type SortOption = 'recentes' | 'menor-preco' | 'maior-desconto' | 'populares'

export interface CategorySearch {
  q?: string
  type?: string
  platform?: string
  category?: ProductCategory
  offer?: boolean
  sort?: SortOption
}

const SORT_OPTIONS: SortOption[] = ['recentes', 'menor-preco', 'maior-desconto', 'populares']
const CATEGORY_OPTIONS: ProductCategory[] = ['achados', 'ofertas', 'digital', 'negocios']

export function validateCategorySearch(search: Record<string, unknown>): CategorySearch {
  const sort = typeof search.sort === 'string' && SORT_OPTIONS.includes(search.sort as SortOption)
    ? (search.sort as SortOption)
    : undefined
  const category =
    typeof search.category === 'string' && CATEGORY_OPTIONS.includes(search.category as ProductCategory)
      ? (search.category as ProductCategory)
      : undefined

  return {
    q: typeof search.q === 'string' && search.q.length > 0 ? search.q : undefined,
    type: typeof search.type === 'string' && search.type.length > 0 ? search.type : undefined,
    platform:
      typeof search.platform === 'string' && search.platform.length > 0 ? search.platform : undefined,
    category,
    offer: search.offer === true || search.offer === 'true' ? true : undefined,
    sort,
  }
}
