import type { Package} from 'lucide-react';
import { Armchair, Cpu, Home, Laptop, ShoppingBag, Sparkles, UtensilsCrossed } from 'lucide-react'

const PLACEHOLDER_STYLES: Record<
  string,
  { gradient: string; Icon: typeof Package }
> = {
  home: { gradient: 'from-[#ffb020] via-[#ff8a3d] to-[#ff6b6b]', Icon: Home },
  tech: { gradient: 'from-[#ff8a3d] via-[#ff6b6b] to-[#9b5de5]', Icon: Cpu },
  kitchen: { gradient: 'from-[#ffd166] via-[#ffb020] to-[#ff7a1a]', Icon: UtensilsCrossed },
  office: { gradient: 'from-[#ff7a1a] via-[#ff6fa5] to-[#9b5de5]', Icon: Laptop },
  digital: { gradient: 'from-[#9b5de5] via-[#ff6fa5] to-[#ff7a1a]', Icon: Sparkles },
  business: { gradient: 'from-[#ff6b6b] via-[#ff7a1a] to-[#ffb020]', Icon: Armchair },
}

export function ProductImage({ image, alt, className }: { image: string; alt: string; className?: string }) {
  if (!image.startsWith('placeholder:')) {
    return (
      <div className={`relative overflow-hidden ${className ?? ''}`}>
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )
  }

  const key = image.replace('placeholder:', '')
  const style = PLACEHOLDER_STYLES[key] ?? PLACEHOLDER_STYLES.home

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${style.gradient} ${className ?? ''}`}
      role="img"
      aria-label={alt}
    >
      <style.Icon className="size-12 text-white/90" strokeWidth={1.5} aria-hidden="true" />
      <ShoppingBag
        className="absolute -bottom-3 -right-3 size-16 text-white/15"
        strokeWidth={1}
        aria-hidden="true"
      />
    </div>
  )
}
