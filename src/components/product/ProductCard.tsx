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
        className="relative block aspect-[4/3] w-full"
        aria-label={product.name}
      >
        <ProductImage image={product.image} alt={product.name} className="h-full w-full" />
        <ProductBadge badge={product.badge} className="absolute left-3 top-3" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {product.subcategory}
        </span>

        <Link to="/produto/$slug" params={{ slug: product.slug }} className="no-underline">
          <h3 className="line-clamp-2 text-base font-semibold text-foreground hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
                {product.discountPercentage && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground">{product.platform}</span>
          </div>

          <OfferButton product={product} className="w-full" />
        </div>
      </div>
    </article>
  )
}
