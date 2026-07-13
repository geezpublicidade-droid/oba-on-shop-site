import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { MousePointerClick, Pencil, Trash2 } from 'lucide-react'
import { adminCheckAuth, adminDeleteProduct, adminListProducts, adminToggleActive } from '#/server/admin'
import { adminGetClickStats } from '#/server/analytics'
import { AdminShell } from '#/components/admin/AdminShell'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const { authenticated } = await adminCheckAuth()
    if (!authenticated) throw redirect({ to: '/admin/login' })
  },
  loader: async () => {
    const [products, clickStats] = await Promise.all([adminListProducts(), adminGetClickStats()])
    return { products, clickStats }
  },
  head: () => ({
    meta: [{ title: 'Produtos | Admin Oba On Shop' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: AdminDashboard,
})

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function AdminDashboard() {
  const { products, clickStats } = Route.useLoaderData()
  const router = useRouter()
  const topClicked = clickStats.stats.filter((item) => item.clicks > 0).slice(0, 5)

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
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="oba-card p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Produtos ativos</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {products.filter((p) => p.active).length}
            <span className="text-sm font-normal text-muted-foreground"> / {products.length}</span>
          </p>
        </div>
        <div className="oba-card p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Cliques em ofertas (total)</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{clickStats.totalClicks}</p>
        </div>
        <div className="oba-card p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Mais clicado</p>
          <p className="mt-1 truncate text-base font-bold text-foreground">
            {topClicked[0]?.name ?? 'Sem cliques ainda'}
          </p>
        </div>
      </div>

      <div className="oba-card mb-8 p-5">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <MousePointerClick className="size-4 text-primary" aria-hidden="true" />
          Produtos mais clicados
        </h2>
        {topClicked.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum clique registrado ainda. Os números aparecem aqui assim que os visitantes clicarem em
            "Ver oferta".
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {topClicked.map((item, index) => {
              const maxClicks = topClicked[0].clicks
              return (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold text-muted-foreground">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <Link
                        to="/admin/produtos/$id/editar"
                        params={{ id: item.id }}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <span className="font-semibold text-foreground">{item.clicks}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(item.clicks / maxClicks) * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          Contagem local ao servidor — confiável rodando em um servidor próprio contínuo (VPS/Railway).
          Em hospedagem serverless (Vercel/Cloudflare), use o Google Analytics/Meta Pixel para números
          confiáveis em produção.
        </p>
      </div>

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
