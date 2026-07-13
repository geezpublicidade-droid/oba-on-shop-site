import { MousePointerClick, PackageCheck, SearchCheck } from 'lucide-react'
import { SectionHeader } from '#/components/shared/SectionHeader'

const STEPS = [
  {
    icon: SearchCheck,
    title: '1. Escolha',
    description: 'Encontre o produto ou solução ideal.',
  },
  {
    icon: MousePointerClick,
    title: '2. Acesse',
    description: 'Clique no botão e vá para a plataforma responsável.',
  },
  {
    icon: PackageCheck,
    title: '3. Compre',
    description: 'Finalize diretamente na loja parceira.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="page-wrap py-14">
      <SectionHeader kicker="Como funciona" title="Comprar pela Oba é simples" align="center" />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.title} className="oba-card flex flex-col items-center gap-3 px-6 py-8 text-center">
            <span className="gradient-oba-hero flex size-12 items-center justify-center rounded-2xl text-white">
              <step.icon className="icon-shadow-soft size-6" aria-hidden="true" />
            </span>
            <h3 className="text-base font-bold text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
        A Oba On Shop reúne produtos próprios, indicações selecionadas e links de afiliados.
      </p>
    </section>
  )
}
