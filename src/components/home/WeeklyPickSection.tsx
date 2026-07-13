import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'
import { getWeeklyPick } from '#/data/products'
import { ProductImage } from '#/components/product/ProductImage'
import { OfferButton } from '#/components/product/OfferButton'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function WeeklyPickSection() {
  const product = getWeeklyPick()
  if (!product) return null

  return (
    <section className="page-wrap py-14">
      <div className="oba-shell grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2">
        <Link
          to="/produto/$slug"
          params={{ slug: product.slug }}
          className="relative block aspect-[4/3] lg:aspect-auto"
        >
          <ProductImage image={product.image} alt={product.name} className="h-full w-full" />
        </Link>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
          <span className="gradient-oba-hero inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white">
            <Sparkles className="icon-shadow-soft size-3.5" aria-hidden="true" />
            Achado da semana
          </span>

          <Link to="/produto/$slug" params={{ slug: product.slug }} className="no-underline">
            <h2 className="display-title text-2xl font-extrabold text-foreground sm:text-3xl">
              {product.name}
            </h2>
          </Link>
          <p className="text-base text-muted-foreground">{product.shortDescription}</p>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.discountPercentage && (
              <span className="rounded-full bg-primary px-2.5 py-1 text-sm font-bold text-primary-foreground">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <OfferButton product={product} className="w-fit" />

          <p className="text-xs text-muted-foreground">
            Escolhido pela curadoria da Oba. Preço e condições são definidos pela plataforma parceira.
          </p>
        </div>
      </div>
    </section>
  )
}
