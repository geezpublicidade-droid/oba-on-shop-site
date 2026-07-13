import { Link } from '@tanstack/react-router'
import { getProductsByCategory } from '#/data/products'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { ProductGrid } from '#/components/product/ProductGrid'
import { Button } from '#/components/ui/button'

const DIGITAL_CATEGORIES = [
  'E-books',
  'Cursos',
  'Inteligência artificial',
  'Marketing',
  'Vendas',
  'Produtividade',
  'Empreendedorismo',
  'Ferramentas digitais',
]

export function DigitalSection() {
  const digitalProducts = getProductsByCategory('digital').slice(0, 4)

  return (
    <section className="page-wrap py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          kicker="Oba Digital"
          title="Produtos digitais para aprender, organizar e evoluir."
        />
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/digital">Explorar o digital</Link>
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {DIGITAL_CATEGORIES.map((category) => (
          <span key={category} className="oba-card rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
            {category}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={digitalProducts} />
      </div>
    </section>
  )
}
