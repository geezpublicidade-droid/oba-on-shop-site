import type { ProductBadge as ProductBadgeType } from '#/data/products'
import { Badge } from '#/components/ui/badge'

const BADGE_STYLES: Record<ProductBadgeType, string> = {
  'Achado Oba': 'bg-primary text-primary-foreground',
  Oferta: 'bg-accent text-accent-foreground',
  'Produto digital': 'bg-[#9b5de5] text-white',
  'Para negócios': 'bg-secondary text-secondary-foreground',
  Recomendado: 'bg-[#ff6fa5] text-white',
  'Mais procurado': 'bg-primary text-primary-foreground',
  Novo: 'bg-foreground text-background',
}

export function ProductBadge({ badge, className }: { badge: ProductBadgeType; className?: string }) {
  return (
    <Badge className={`rounded-full border-0 font-semibold shadow-sm ${BADGE_STYLES[badge]} ${className ?? ''}`}>
      {badge}
    </Badge>
  )
}
