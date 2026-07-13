import type { ProductSpec } from '#/data/products'

export function ProductSpecsTable({ specs }: { specs: ProductSpec[] }) {
  if (specs.length === 0) return null

  return (
    <div className="oba-card overflow-hidden">
      <h2 className="border-b border-[var(--line)] px-5 py-3 text-sm font-semibold text-foreground">
        Ficha técnica
      </h2>
      <dl>
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className={`flex justify-between gap-4 px-5 py-3 text-sm ${index % 2 === 1 ? 'bg-muted/50' : ''}`}
          >
            <dt className="text-muted-foreground">{spec.label}</dt>
            <dd className="text-right font-medium text-foreground">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
