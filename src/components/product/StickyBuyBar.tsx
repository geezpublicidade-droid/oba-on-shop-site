import type { Product } from '#/data/products'
import { OfferButton } from '#/components/product/OfferButton'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function StickyBuyBar({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-background/95 p-3 backdrop-blur-md sm:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted-foreground">{product.name}</p>
          <p className="text-base font-bold text-foreground">{formatPrice(product.currentPrice)}</p>
        </div>
        <OfferButton product={product} className="shrink-0" />
      </div>
    </div>
  )
}
