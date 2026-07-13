import { createFileRoute, redirect } from '@tanstack/react-router'
import { adminCheckAuth } from '#/server/admin'
import { AdminShell } from '#/components/admin/AdminShell'
import { ProductForm } from '#/components/admin/ProductForm'

export const Route = createFileRoute('/admin/produtos/novo')({
  beforeLoad: async () => {
    const { authenticated } = await adminCheckAuth()
    if (!authenticated) throw redirect({ to: '/admin/login' })
  },
  head: () => ({
    meta: [{ title: 'Novo produto | Admin Oba On Shop' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: NovoProdutoPage,
})

function NovoProdutoPage() {
  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-foreground">Novo produto</h1>
      <ProductForm />
    </AdminShell>
  )
}
