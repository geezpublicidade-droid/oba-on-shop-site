import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, KeyRound } from 'lucide-react'
import { adminLogin } from '#/server/admin'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

export const Route = createFileRoute('/admin/login')({
  head: () => ({
    meta: [{ title: 'Admin | Oba On Shop' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await adminLogin({ data: { password } })
      if (!result.success) {
        setError('Senha incorreta.')
        return
      }
      await navigate({ to: '/admin' })
    } catch {
      setError('Não foi possível entrar. Verifique se ADMIN_PASSWORD está configurado no .env.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form onSubmit={handleSubmit} className="oba-card flex w-full max-w-sm flex-col gap-4 p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="gradient-oba-hero flex size-12 items-center justify-center rounded-2xl text-white">
            <KeyRound className="icon-shadow-soft size-6" aria-hidden="true" />
          </span>
          <h1 className="text-lg font-bold text-foreground">Painel Oba On Shop</h1>
          <p className="text-sm text-muted-foreground">Acesso restrito à administração de produtos.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-password">Senha</Label>
          <Input
            id="admin-password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}

        <Button type="submit" disabled={loading} className="rounded-full">
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar ao site
        </Link>
      </form>
    </div>
  )
}
