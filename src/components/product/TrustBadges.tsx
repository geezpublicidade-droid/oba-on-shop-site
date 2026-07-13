import { BadgeCheck, ShieldCheck, Sparkles, Undo2 } from 'lucide-react'

const TRUST_POINTS = [
  { icon: BadgeCheck, label: 'Produto selecionado pela curadoria da Oba' },
  { icon: ShieldCheck, label: 'Compra protegida, direto na plataforma oficial' },
  { icon: Sparkles, label: 'Sem custo extra por comprar pelo nosso link' },
  { icon: Undo2, label: 'Trocas e devoluções conforme a política da loja parceira' },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {TRUST_POINTS.map((point) => (
        <div key={point.label} className="oba-card flex flex-col items-center gap-2 px-3 py-4 text-center">
          <point.icon className="size-5 text-primary" aria-hidden="true" />
          <span className="text-xs font-medium text-muted-foreground">{point.label}</span>
        </div>
      ))}
    </div>
  )
}
