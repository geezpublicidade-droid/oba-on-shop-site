import { Link } from '@tanstack/react-router'
import { getOfferProducts } from '#/data/products'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { ProductGrid } from '#/components/product/ProductGrid'
import { AffiliateDisclosure } from '#/components/product/AffiliateDisclosure'
import { Button } from '#/components/ui/button'

export function OffersSection() {
  const offers = getOfferProducts().slice(0, 8)

  return (
    <section className="page-wrap py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          kicker="Promoções"
          title="Ofertas que valem a pena"
          description="Promoções e oportunidades selecionadas pela Oba On Shop."
        />
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/ofertas">Ver todas as ofertas</Link>
        </Button>
      </div>
      <div className="mt-8">
        <ProductGrid products={offers} />
      </div>
      <div className="mt-6">
        <AffiliateDisclosure compact />
      </div>
    </section>
  )
}
