import { Link, useRouter } from '@tanstack/react-router'
import { LogOut, Package, Plus } from 'lucide-react'
import { adminLogout } from '#/server/admin'
import { Button } from '#/components/ui/button'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function handleLogout() {
    await adminLogout()
    await router.navigate({ to: '/admin/login' })
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-[var(--line)] bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/admin" className="flex items-center gap-2 font-bold text-foreground no-underline">
            <Package className="size-5 text-primary" aria-hidden="true" />
            Painel Oba On Shop
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="rounded-full">
              <Link to="/admin/produtos/novo">
                <Plus className="size-4" aria-hidden="true" />
                Novo produto
              </Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              <LogOut className="size-4" aria-hidden="true" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  )
}
