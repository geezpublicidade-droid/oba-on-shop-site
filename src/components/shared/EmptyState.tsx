import { PackageSearch } from 'lucide-react'

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="oba-card flex flex-col items-center gap-3 px-6 py-16 text-center">
      <PackageSearch className="size-10 text-muted-foreground" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
