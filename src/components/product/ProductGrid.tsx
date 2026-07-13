import type { Product } from '#/data/products'
import { ProductCard } from '#/components/product/ProductCard'
import { EmptyState } from '#/components/shared/EmptyState'

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="Nenhum produto encontrado"
        description="Tente ajustar os filtros ou buscar por outro termo."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
