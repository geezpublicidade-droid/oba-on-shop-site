import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { Button } from '#/components/ui/button'
import type { CategorySearch } from '#/lib/search-params'
import type { ProductPlatform, ProductType } from '#/data/products'

const TYPE_LABELS: Record<ProductType, string> = {
  physical: 'Produto físico',
  digital: 'Produto digital',
  business: 'Para negócios',
  service: 'Serviço',
}

const PLATFORMS: ProductPlatform[] = ['Shopee', 'Mercado Livre', 'Amazon', 'Kiwify', 'Hotmart', 'Loja parceira']

export function FilterBar({
  search,
  availableTypes,
  onChange,
}: {
  search: CategorySearch
  availableTypes: ProductType[]
  onChange: (next: Partial<CategorySearch>) => void
}) {
  const hasFilters = Boolean(search.type || search.platform || search.offer)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={search.type ?? 'all'}
        onValueChange={(value) => onChange({ type: value === 'all' ? undefined : value })}
      >
        <SelectTrigger aria-label="Filtrar por tipo" className="w-full sm:w-44">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          {availableTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {TYPE_LABELS[type]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={search.platform ?? 'all'}
        onValueChange={(value) => onChange({ platform: value === 'all' ? undefined : value })}
      >
        <SelectTrigger aria-label="Filtrar por plataforma" className="w-full sm:w-44">
          <SelectValue placeholder="Plataforma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as plataformas</SelectItem>
          {PLATFORMS.map((platform) => (
            <SelectItem key={platform} value={platform}>
              {platform}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant={search.offer ? 'default' : 'outline'}
        className="rounded-full"
        onClick={() => onChange({ offer: search.offer ? undefined : true })}
        aria-pressed={Boolean(search.offer)}
      >
        Somente ofertas
      </Button>

      {hasFilters && (
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => onChange({ type: undefined, platform: undefined, offer: undefined })}
        >
          Limpar filtros
        </Button>
      )}
    </div>
  )
}
