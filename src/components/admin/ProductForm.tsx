import { useState } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Plus, Sparkles, Trash2 } from 'lucide-react'
import { adminSaveProduct } from '#/server/admin'
import { adminImportProductFromUrl } from '#/server/product-import'
import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductPlatform,
  ProductSpec,
  ProductType,
} from '#/data/products'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'

const CATEGORIES: ProductCategory[] = ['achados', 'ofertas', 'digital', 'negocios']
const TYPES: ProductType[] = ['physical', 'digital', 'business', 'service']
const PLATFORMS: ProductPlatform[] = ['Shopee', 'Mercado Livre', 'Amazon', 'Kiwify', 'Hotmart', 'Loja parceira']
const BADGES: ProductBadge[] = [
  'Achado Oba',
  'Oferta',
  'Produto digital',
  'Para negócios',
  'Recomendado',
  'Mais procurado',
  'Novo',
]

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function blankProduct(): Product {
  return {
    id: `produto-${Date.now()}`,
    slug: '',
    name: '',
    shortDescription: '',
    description: '',
    benefits: [],
    image: 'placeholder:home',
    gallery: [],
    stories: [],
    specs: [],
    howItWorks: [],
    category: 'achados',
    subcategory: '',
    type: 'physical',
    platform: 'Shopee',
    affiliateUrl: '',
    currentPrice: 0,
    tags: [],
    badge: 'Achado Oba',
    featured: false,
    offer: false,
    weeklyPick: false,
    active: true,
    createdAt: new Date().toISOString().slice(0, 10),
  }
}

export function ProductForm({ initialProduct }: { initialProduct?: Product }) {
  const isNew = !initialProduct
  const navigate = useNavigate()
  const router = useRouter()
  const [product, setProduct] = useState<Product>(initialProduct ?? blankProduct())
  const [benefitsText, setBenefitsText] = useState(product.benefits.join('\n'))
  const [galleryText, setGalleryText] = useState(product.gallery.join('\n'))
  const [tagsText, setTagsText] = useState(product.tags.join(', '))
  const [howItWorksText, setHowItWorksText] = useState((product.howItWorks ?? []).join('\n'))
  const [specs, setSpecs] = useState<ProductSpec[]>(product.specs ?? [])
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [importUrl, setImportUrl] = useState(product.affiliateUrl)
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)

  function update<TKey extends keyof Product>(key: TKey, value: Product[TKey]) {
    setProduct((prev) => ({ ...prev, [key]: value }))
  }

  async function handleImport() {
    if (!importUrl.trim()) {
      setImportError('Cole o link do produto primeiro.')
      return
    }
    setImporting(true)
    setImportError(null)
    try {
      const data = await adminImportProductFromUrl({ data: { url: importUrl.trim() } })
      handleNameChange(data.name || product.name)
      setProduct((prev) => ({
        ...prev,
        shortDescription: data.shortDescription || prev.shortDescription,
        description: data.description || prev.description,
        image: data.image || prev.image,
        gallery: data.gallery.length > 0 ? data.gallery : prev.gallery,
        currentPrice: data.currentPrice || prev.currentPrice,
        oldPrice: data.oldPrice ?? prev.oldPrice,
        platform: data.platform,
        affiliateUrl: importUrl.trim(),
      }))
      if (data.benefits.length > 0) setBenefitsText(data.benefits.join('\n'))
      if (data.gallery.length > 0) setGalleryText(data.gallery.join('\n'))
      if (data.tags.length > 0) setTagsText(data.tags.join(', '))
      if (data.specs.length > 0) setSpecs(data.specs)
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Não foi possível importar os dados do produto.')
    } finally {
      setImporting(false)
    }
  }

  function handleNameChange(value: string) {
    update('name', value)
    if (!slugTouched) {
      update('slug', slugify(value))
    }
  }

  function updateSpec(index: number, field: keyof ProductSpec, value: string) {
    setSpecs((prev) => prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec)))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    if (!product.name || !product.slug || !product.subcategory) {
      setError('Preencha nome, slug e subcategoria.')
      return
    }

    const finalProduct: Product = {
      ...product,
      benefits: benefitsText.split('\n').map((line) => line.trim()).filter(Boolean),
      gallery: galleryText.split('\n').map((line) => line.trim()).filter(Boolean),
      tags: tagsText.split(',').map((tag) => tag.trim()).filter(Boolean),
      howItWorks: howItWorksText.split('\n').map((line) => line.trim()).filter(Boolean),
      specs: specs.filter((spec) => spec.label.trim() && spec.value.trim()),
    }

    setSaving(true)
    try {
      await adminSaveProduct({ data: { product: finalProduct, isNew } })
      await router.invalidate()
      await navigate({ to: '/admin' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o produto.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <p className="oba-card border-destructive/40 px-4 py-3 text-sm font-medium text-destructive">{error}</p>
      )}

      <section className="oba-card flex flex-col gap-3 border-[var(--oba-orange)]/40 bg-[var(--oba-orange)]/5 p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-[var(--oba-orange)]" /> Importar automaticamente
        </h2>
        <p className="text-xs text-muted-foreground">
          Cole o link do produto (já com seu link de afiliado, se tiver) e a IA preenche nome, descrição,
          fotos, preço e ficha técnica. Confira tudo antes de salvar.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1"
          />
          <Button type="button" onClick={handleImport} disabled={importing} className="rounded-full">
            {importing ? 'Buscando...' : 'Buscar dados'}
          </Button>
        </div>
        {importError && <p className="text-sm font-medium text-destructive">{importError}</p>}
      </section>

      <section className="oba-card flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-foreground">Informações principais</h2>

        <Field label="Nome do produto">
          <Input value={product.name} onChange={(e) => handleNameChange(e.target.value)} required />
        </Field>

        <Field label="Slug (URL)" hint="Gerado automaticamente a partir do nome. Só edite se necessário.">
          <Input
            value={product.slug}
            onChange={(e) => {
              setSlugTouched(true)
              update('slug', slugify(e.target.value))
            }}
            required
          />
        </Field>

        <Field label="Descrição curta">
          <Input value={product.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} />
        </Field>

        <Field label="Descrição completa">
          <textarea
            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={product.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </Field>

        <Field label="Benefícios" hint="Um por linha.">
          <textarea
            className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={benefitsText}
            onChange={(e) => setBenefitsText(e.target.value)}
          />
        </Field>
      </section>

      <section className="oba-card flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-foreground">Categoria e tipo</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Categoria">
            <Select value={product.category} onValueChange={(v) => update('category', v as ProductCategory)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Subcategoria" hint="Ex: casa, cursos, ferramentas...">
            <Input value={product.subcategory} onChange={(e) => update('subcategory', e.target.value)} required />
          </Field>

          <Field label="Tipo">
            <Select value={product.type} onValueChange={(v) => update('type', v as ProductType)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Selo">
            <Select value={product.badge} onValueChange={(v) => update('badge', v as ProductBadge)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BADGES.map((badge) => (
                  <SelectItem key={badge} value={badge}>
                    {badge}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </section>

      <section className="oba-card flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-foreground">Preço e plataforma</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Plataforma">
            <Select value={product.platform} onValueChange={(v) => update('platform', v as ProductPlatform)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Link de afiliado" hint="Deixe vazio para mostrar 'Disponível em breve'.">
            <Input
              value={product.affiliateUrl}
              onChange={(e) => update('affiliateUrl', e.target.value)}
              placeholder="https://..."
            />
          </Field>

          <Field label="Preço atual (R$)">
            <Input
              type="number"
              step="0.01"
              min="0"
              value={product.currentPrice}
              onChange={(e) => update('currentPrice', Number(e.target.value))}
              required
            />
          </Field>

          <Field label="Preço anterior (R$)" hint="Opcional, para mostrar desconto.">
            <Input
              type="number"
              step="0.01"
              min="0"
              value={product.oldPrice ?? ''}
              onChange={(e) => update('oldPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </Field>

          <Field label="Desconto (%)" hint="Opcional.">
            <Input
              type="number"
              min="0"
              max="99"
              value={product.discountPercentage ?? ''}
              onChange={(e) =>
                update('discountPercentage', e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </Field>

          <Field label="Tags" hint="Separadas por vírgula.">
            <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
          </Field>
        </div>
      </section>

      <section className="oba-card flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Ficha técnica (produto físico)</h2>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setSpecs((prev) => [...prev, { label: '', value: '' }])}
          >
            <Plus className="size-4" /> Adicionar
          </Button>
        </div>
        {specs.map((spec, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Característica (ex: Material)"
              value={spec.label}
              onChange={(e) => updateSpec(index, 'label', e.target.value)}
            />
            <Input
              placeholder="Valor (ex: ABS resistente)"
              value={spec.value}
              onChange={(e) => updateSpec(index, 'value', e.target.value)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setSpecs((prev) => prev.filter((_, i) => i !== index))}
              aria-label="Remover"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
      </section>

      <section className="oba-card flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-foreground">Como funciona (opcional)</h2>
        <Field label="Passos personalizados" hint="Um por linha. Se vazio, usa o padrão do tipo de produto.">
          <textarea
            className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={howItWorksText}
            onChange={(e) => setHowItWorksText(e.target.value)}
          />
        </Field>
      </section>

      <section className="oba-card flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-foreground">Imagens</h2>
        <Field
          label="Imagem principal"
          hint="Use uma URL de imagem real, ou um placeholder: placeholder:home, placeholder:tech, placeholder:kitchen, placeholder:office, placeholder:digital, placeholder:business."
        >
          <Input value={product.image} onChange={(e) => update('image', e.target.value)} />
        </Field>
        <Field label="Galeria" hint="Uma URL de imagem por linha (opcional).">
          <textarea
            className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
          />
        </Field>
        <p className="text-xs text-muted-foreground">
          Stories/vídeos em formato Status podem ser adicionados diretamente no arquivo{' '}
          <code>src/data/products.json</code> (campo <code>stories</code>) por enquanto — a interface do
          admin para isso ainda não foi construída.
        </p>
      </section>

      <section className="oba-card flex flex-wrap gap-6 p-5">
        <Checkbox label="Produto ativo (visível no site)" checked={product.active} onChange={(v) => update('active', v)} />
        <Checkbox label="Destacar na home" checked={product.featured} onChange={(v) => update('featured', v)} />
        <Checkbox label="Marcar como oferta" checked={product.offer} onChange={(v) => update('offer', v)} />
        <Checkbox
          label="Achado da semana"
          checked={product.weeklyPick ?? false}
          onChange={(v) => update('weeklyPick', v)}
        />
      </section>
      {product.weeklyPick && (
        <p className="-mt-4 text-xs text-muted-foreground">
          Marcar este produto como Achado da Semana remove automaticamente o destaque de qualquer outro
          produto ao salvar.
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin' })}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving} className="rounded-full">
          {saving ? 'Salvando...' : 'Salvar produto'}
        </Button>
      </div>
    </form>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-input accent-[var(--oba-orange)]"
      />
      {label}
    </label>
  )
}
