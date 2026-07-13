import { Link } from '@tanstack/react-router'
import { getProductsByCategory } from '#/data/products'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { ProductGrid } from '#/components/product/ProductGrid'
import { Button } from '#/components/ui/button'

const BUSINESS_CATEGORIES = [
  'Marketing',
  'Vendas',
  'Inteligência artificial',
  'Sites',
  'Sistemas',
  'Automação',
  'Gestão',
  'Organização',
  'Produtividade',
]

export function BusinessSection() {
  const businessProducts = getProductsByCategory('negocios').slice(0, 4)

  return (
    <section className="page-wrap py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          kicker="Negócios"
          title="Soluções para quem empreende"
          description="Ferramentas, produtos e indicações para ajudar pequenos negócios a vender, organizar e crescer."
        />
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/negocios">Ver soluções</Link>
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {BUSINESS_CATEGORIES.map((category) => (
          <span key={category} className="oba-card rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
            {category}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={businessProducts} />
      </div>
    </section>
  )
}
