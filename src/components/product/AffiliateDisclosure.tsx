export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-muted-foreground">
        Preços, estoque e condições podem mudar na plataforma responsável.
      </p>
    )
  }

  return (
    <p className="text-sm text-muted-foreground">
      Alguns links disponíveis na Oba On Shop são links de afiliados. Podemos receber uma comissão pela
      indicação, sem custo adicional para você. Preços, estoque, entrega, pagamento e condições são
      definidos pelas plataformas responsáveis.
    </p>
  )
}
