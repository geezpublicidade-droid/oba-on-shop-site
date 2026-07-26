import { Link } from '@tanstack/react-router'
import type { Product } from '#/data/products'
import { ProductImage } from '#/components/product/ProductImage'
import { ProductBadge } from '#/components/product/ProductBadge'
import { OfferButton } from '#/components/product/OfferButton'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="oba-card flex h-full flex-col overflow-hidden">
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square w-full sm:aspect-[4/3]"
        aria-label={product.name}
      >
        <ProductImage image={product.image} alt={product.name} className="h-full w-full" />
        <ProductBadge
          badge={product.badge}
          className="absolute left-1.5 top-1.5 px-1.5 py-0.5 text-[10px] sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:gap-2 sm:p-4">
        <span className="hidden text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:block">
          {product.subcategory}
        </span>

        <Link to="/produto/$slug" params={{ slug: product.slug }} className="no-underline">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary sm:text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="hidden text-base text-muted-foreground line-clamp-2 sm:block">{product.shortDescription}</p>

        <div className="mt-auto flex flex-col gap-2 pt-1 sm:gap-3 sm:pt-2">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-sm font-bold text-foreground sm:text-lg">{formatPrice(product.currentPrice)}</span>
                {product.discountPercentage && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground sm:px-2 sm:text-xs">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-[11px] text-muted-foreground line-through sm:text-xs">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">{product.platform}</span>
          </div>

          <OfferButton product={product} className="h-8 w-full px-3 text-xs sm:h-9 sm:text-sm" />
        </div>
      </div>
    </article>
  )
}
