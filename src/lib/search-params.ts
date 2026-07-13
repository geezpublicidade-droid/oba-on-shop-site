export type SortOption = 'recentes' | 'menor-preco' | 'maior-desconto' | 'populares'

export interface CategorySearch {
  q?: string
  type?: string
  platform?: string
  offer?: boolean
  sort?: SortOption
}

const SORT_OPTIONS: SortOption[] = ['recentes', 'menor-preco', 'maior-desconto', 'populares']

export function validateCategorySearch(search: Record<string, unknown>): CategorySearch {
  const sort = typeof search.sort === 'string' && SORT_OPTIONS.includes(search.sort as SortOption)
    ? (search.sort as SortOption)
    : undefined

  return {
    q: typeof search.q === 'string' && search.q.length > 0 ? search.q : undefined,
    type: typeof search.type === 'string' && search.type.length > 0 ? search.type : undefined,
    platform:
      typeof search.platform === 'string' && search.platform.length > 0 ? search.platform : undefined,
    offer: search.offer === true || search.offer === 'true' ? true : undefined,
    sort,
  }
}
