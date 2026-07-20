import type { Product } from '#/data/products'
import type { CategorySearch } from '#/lib/search-params'

export function filterAndSortProducts(products: Product[], search: CategorySearch): Product[] {
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

  if (search.category) {
    result = result.filter((product) => product.category === search.category)
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
