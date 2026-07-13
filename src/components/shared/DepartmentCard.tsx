import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AppRoute } from '#/lib/nav'

export function DepartmentCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  href,
  accent,
  image,
}: {
  icon: LucideIcon
  title: string
  description: string
  buttonLabel: string
  href: AppRoute
  accent: string
  image?: string
}) {
  if (image) {
    return (
      <Link
        to={href}
        className="oba-card group relative flex min-h-[260px] flex-col justify-end overflow-hidden p-6 no-underline"
      >
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="relative">
          <h3 className="text-shadow-soft text-lg font-bold text-white">{title}</h3>
          <p className="text-shadow-soft mt-1.5 text-sm text-white/90">{description}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            {buttonLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link to={href} className="oba-card group flex flex-col gap-4 p-6 no-underline">
      <span
        className="flex size-12 items-center justify-center rounded-2xl text-white"
        style={{ background: accent }}
      >
        <Icon className="icon-shadow-soft size-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        {buttonLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}
