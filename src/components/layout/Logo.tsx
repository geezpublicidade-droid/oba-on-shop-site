import { Link } from '@tanstack/react-router'
import logo from '#/assets/logo.png'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 shrink-0 ${className ?? ''}`}
      aria-label="Oba On Shop — início"
    >
      <img src={logo} alt="" className="h-9 w-9 rounded-xl object-cover" width={36} height={36} />
      <span className="display-title text-lg font-bold text-foreground">
        Oba <span className="gradient-oba-text">On Shop</span>
      </span>
    </Link>
  )
}
