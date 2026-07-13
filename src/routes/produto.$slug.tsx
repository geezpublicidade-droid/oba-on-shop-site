import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '#/data/products'
import { ProductImage } from '#/components/product/ProductImage'
import { ProductBadge } from '#/components/product/ProductBadge'
import { OfferButton } from '#/components/product/OfferButton'
import { AffiliateDisclosure } from '#/components/product/AffiliateDisclosure'
import { ProductGrid } from '#/components/product/ProductGrid'
import { SectionHeader } from '#/components/shared/SectionHeader'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const Route = createFileRoute('/produto/$slug')({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug)
    if (!product) throw notFound()
    return { product, related: getRelatedProducts(product) }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} | Oba On Shop` },
          { name: 'description', content: loaderData.product.shortDescription },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="page-wrap flex min-h-[40vh] flex-col items-center justify-center gap-3 py-20 text-center">
      <h1 className="display-title text-3xl font-bold text-foreground">Produto não encontrado</h1>
      <p className="text-muted-foreground">Esse produto não existe mais ou foi removido.</p>
      <Link to="/departamentos" className="text-sm font-semibold text-primary">
        Voltar para os departamentos
      </Link>
    </div>
  ),
})

function ProductPage() {
  const { product, related } = Route.useLoaderData()

  return (
    <div className="page-wrap py-10">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <ProductImage image={product.image} alt={product.name} className="h-full w-full" />
          <ProductBadge badge={product.badge} className="absolute left-4 top-4" />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {product.subcategory}
          </span>
          <h1 className="display-title text-3xl font-extrabold text-foreground">{product.name}</h1>
          <p className="text-base text-muted-foreground">{product.shortDescription}</p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.discountPercentage && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-muted-foreground">Vendido por {product.platform}</p>

          <div className="oba-card flex flex-col gap-3 p-5">
            <OfferButton product={product} fullLabel className="w-full" />
            <p className="text-xs text-muted-foreground">
              Você será direcionado para a plataforma parceira para concluir a compra.
            </p>
            <AffiliateDisclosure compact />
          </div>

          {product.benefits.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-foreground">Benefícios</h2>
              <ul className="mt-2 space-y-1.5">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="text-sm text-muted-foreground">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <h2 className="text-lg font-semibold text-foreground">Sobre o produto</h2>
        <p className="mt-2 text-base text-muted-foreground">{product.description}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Preços, estoque, entrega, pagamento e condições são definidos pela plataforma responsável.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeader kicker="Você também pode gostar" title="Produtos relacionados" />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  )
}
