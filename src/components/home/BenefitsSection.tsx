import {
  Boxes,
  Link2,
  ListChecks,
  Sparkles,
  Tag,
  Briefcase,
  Home,
} from 'lucide-react'
import { SectionHeader } from '#/components/shared/SectionHeader'

const BENEFITS = [
  { icon: ListChecks, label: 'Produtos selecionados' },
  { icon: Boxes, label: 'Categorias organizadas' },
  { icon: Link2, label: 'Links diretos' },
  { icon: Tag, label: 'Ofertas em destaque' },
  { icon: Home, label: 'Soluções para sua rotina' },
  { icon: Briefcase, label: 'Produtos para negócios' },
  { icon: Sparkles, label: 'Curadoria simples e prática' },
]

export function BenefitsSection() {
  return (
    <section className="page-wrap py-14">
      <SectionHeader kicker="Vantagens" title="Por que comprar pela Oba?" align="center" />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div key={benefit.label} className="oba-card flex flex-col items-center gap-2.5 px-4 py-6 text-center">
            <benefit.icon className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground">{benefit.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
