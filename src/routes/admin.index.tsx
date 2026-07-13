import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { Pencil, Trash2 } from 'lucide-react'
import { adminCheckAuth, adminDeleteProduct, adminListProducts, adminToggleActive } from '#/server/admin'
import { AdminShell } from '#/components/admin/AdminShell'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const { authenticated } = await adminCheckAuth()
    if (!authenticated) throw redirect({ to: '/admin/login' })
  },
  loader: () => adminListProducts(),
  head: () => ({
    meta: [{ title: 'Produtos | Admin Oba On Shop' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: AdminDashboard,
})

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function AdminDashboard() {
  const products = Route.useLoaderData()
  const router = useRouter()

  async function handleToggleActive(id: string) {
    await adminToggleActive({ data: { id } })
    await router.invalidate()
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Excluir "${name}"? Essa ação não pode ser desfeita.`)) return
    await adminDeleteProduct({ data: { id } })
    await router.invalidate()
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Produtos ({products.length})</h1>
      </div>

      <div className="oba-card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-[var(--line)] text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[var(--line)] last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.slug}</p>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{product.category}</td>
                <td className="px-4 py-3 font-medium text-foreground">{formatPrice(product.currentPrice)}</td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => handleToggleActive(product.id)}>
                    <Badge variant={product.active ? 'default' : 'outline'} className="cursor-pointer">
                      {product.active ? 'Ativo' : 'Oculto'}
                    </Badge>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button asChild size="icon-sm" variant="ghost">
                      <Link to="/admin/produtos/$id/editar" params={{ id: product.id }} aria-label="Editar">
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Excluir"
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  )
}
