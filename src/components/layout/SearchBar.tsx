import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { Input } from '#/components/ui/input'

type SearchableRoute = '/busca' | '/achados' | '/ofertas' | '/digital' | '/negocios'

export function SearchBar({
  className,
  defaultValue = '',
  onSubmitTo = '/busca',
  placeholder = 'Buscar produtos, ofertas, soluções...',
}: {
  className?: string
  defaultValue?: string
  onSubmitTo?: SearchableRoute
  placeholder?: string
}) {
  const [value, setValue] = useState(defaultValue)
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    navigate({ to: onSubmitTo, search: { q: value || undefined } })
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className ?? ''}`} role="search">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Buscar na Oba On Shop"
        className="rounded-full bg-background pl-9"
      />
    </form>
  )
}
