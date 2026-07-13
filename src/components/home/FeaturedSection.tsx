import { getFeaturedProducts } from '#/data/products'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { ProductGrid } from '#/components/product/ProductGrid'

export function FeaturedSection() {
  const featured = getFeaturedProducts().slice(0, 8)

  return (
    <section className="page-wrap py-14">
      <SectionHeader
        kicker="Curadoria Oba"
        title="Destaques da Oba"
        description="Produtos e soluções selecionadas para facilitar sua rotina."
      />
      <div className="mt-8">
        <ProductGrid products={featured} />
      </div>
    </section>
  )
}
