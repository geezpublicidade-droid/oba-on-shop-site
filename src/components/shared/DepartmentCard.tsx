import { Link } from '@tanstack/react-router'
import { ArrowRight  } from 'lucide-react'
import type {LucideIcon} from 'lucide-react';
import type { AppRoute } from '#/lib/nav'

export function DepartmentCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  href,
  accent,
}: {
  icon: LucideIcon
  title: string
  description: string
  buttonLabel: string
  href: AppRoute
  accent: string
}) {
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
