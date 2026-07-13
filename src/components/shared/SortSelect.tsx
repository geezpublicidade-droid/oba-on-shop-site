import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import type { SortOption } from '#/lib/search-params'

const SORT_LABELS: Record<SortOption, string> = {
  recentes: 'Mais recentes',
  'menor-preco': 'Menor preço',
  'maior-desconto': 'Maior desconto',
  populares: 'Mais populares',
}

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption | undefined
  onChange: (value: SortOption | undefined) => void
}) {
  return (
    <Select
      value={value ?? 'recentes'}
      onValueChange={(next) => onChange(next === 'recentes' ? undefined : (next as SortOption))}
    >
      <SelectTrigger aria-label="Ordenar produtos" className="w-full sm:w-48">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
          <SelectItem key={option} value={option}>
            {SORT_LABELS[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
