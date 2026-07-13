import { ExternalLink } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { trackAffiliateClick } from '#/lib/affiliate'
import type { Product } from '#/data/products'

export function OfferButton({
  product,
  className,
  fullLabel = false,
}: {
  product: Product
  className?: string
  fullLabel?: boolean
}) {
  if (!product.affiliateUrl) {
    return (
      <Button disabled variant="secondary" className={`rounded-full ${className ?? ''}`}>
        Disponível em breve
      </Button>
    )
  }

  return (
    <Button asChild className={`rounded-full ${fullLabel ? 'btn-glow' : ''} ${className ?? ''}`}>
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        onClick={() =>
          trackAffiliateClick({
            productId: product.id,
            productName: product.name,
            category: product.category,
            platform: product.platform,
            affiliateUrl: product.affiliateUrl,
          })
        }
      >
        {fullLabel ? 'Ver oferta na loja parceira' : 'Ver oferta'}
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </Button>
  )
}
