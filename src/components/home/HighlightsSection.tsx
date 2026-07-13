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
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:snap-none sm:justify-center sm:gap-10">
        {HIGHLIGHTS.map((highlight) => (
          <Link
            key={highlight.href + highlight.label}
            to={highlight.href}
            className="flex shrink-0 snap-center flex-col items-center gap-2.5 text-center no-underline"
          >
            <span className="block aspect-square size-24 shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-[0_4px_16px_rgba(58,31,15,0.2)] transition-transform duration-200 hover:scale-105 sm:size-28 md:size-32">
              <img
                src={highlight.image}
                alt=""
                className="block aspect-square size-full rounded-full object-cover"
                width={128}
                height={128}
                loading="lazy"
              />
            </span>
            <span className="w-24 text-sm font-semibold text-foreground sm:w-28 md:w-32 md:text-base">
              {highlight.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
