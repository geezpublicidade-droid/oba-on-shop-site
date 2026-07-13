import { Link } from '@tanstack/react-router'
import type { AppRoute } from '#/lib/nav'

interface Highlight {
  label: string
  image: string
  href: AppRoute
}

const HIGHLIGHTS: Highlight[] = [
  { label: 'Comece aqui', image: '/highlights/comece-aqui.png', href: '/departamentos' },
  { label: 'Achados', image: '/highlights/achados.png', href: '/achados' },
  { label: 'Ofertas', image: '/highlights/ofertas.png', href: '/ofertas' },
  { label: 'Oba Digital', image: '/highlights/digital.png', href: '/digital' },
  { label: 'Negócios', image: '/highlights/negocios.png', href: '/negocios' },
  { label: 'Clientes', image: '/highlights/clientes.png', href: '/sobre' },
  { label: 'Suporte', image: '/highlights/suporte.png', href: '/suporte' },
]

export function HighlightsSection() {
  return (
    <section className="page-wrap py-4 sm:py-8">
      <div className="flex gap-5 overflow-x-auto pb-2 sm:justify-center sm:gap-8" style={{ scrollbarWidth: 'thin' }}>
        {HIGHLIGHTS.map((highlight) => (
          <Link
            key={highlight.href + highlight.label}
            to={highlight.href}
            className="flex shrink-0 flex-col items-center gap-2 text-center no-underline"
          >
            <span className="block aspect-square size-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_2px_10px_rgba(58,31,15,0.14)] sm:size-20">
              <img
                src={highlight.image}
                alt=""
                className="block aspect-square size-full rounded-full object-cover"
                width={80}
                height={80}
                loading="lazy"
              />
            </span>
            <span className="w-16 text-xs font-semibold text-foreground sm:w-20 sm:text-sm">
              {highlight.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
