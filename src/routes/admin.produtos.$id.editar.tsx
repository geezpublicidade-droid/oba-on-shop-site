import { createFileRoute, redirect } from '@tanstack/react-router'
import { adminCheckAuth, adminGetProduct } from '#/server/admin'
import { AdminShell } from '#/components/admin/AdminShell'
import { ProductForm } from '#/components/admin/ProductForm'

export const Route = createFileRoute('/admin/produtos/$id/editar')({
  beforeLoad: async () => {
    const { authenticated } = await adminCheckAuth()
    if (!authenticated) throw redirect({ to: '/admin/login' })
  },
  loader: ({ params }) => adminGetProduct({ data: { id: params.id } }),
  head: () => ({
    meta: [{ title: 'Editar produto | Admin Oba On Shop' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: EditarProdutoPage,
})

function EditarProdutoPage() {
  const product = Route.useLoaderData()
  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-foreground">Editar produto</h1>
      <ProductForm initialProduct={product} />
    </AdminShell>
  )
}
