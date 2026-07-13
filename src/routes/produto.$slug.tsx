import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { getHowItWorks, getProductBySlug, getRelatedProducts } from '#/data/products'
import { StoryViewer } from '#/components/product/StoryViewer'
import { OfferButton } from '#/components/product/OfferButton'
import { AffiliateDisclosure } from '#/components/product/AffiliateDisclosure'
import { ProductGrid } from '#/components/product/ProductGrid'
import { ProductHowItWorks } from '#/components/product/ProductHowItWorks'
import { ProductSpecsTable } from '#/components/product/ProductSpecsTable'
import { TrustBadges } from '#/components/product/TrustBadges'
import { StickyBuyBar } from '#/components/product/StickyBuyBar'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { buildProductJsonLd } from '#/lib/seo'

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
          { property: 'og:title', content: loaderData.product.name },
          { property: 'og:description', content: loaderData.product.shortDescription },
          { property: 'og:type', content: 'product' },
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
  const howItWorks = getHowItWorks(product)
  const jsonLd = buildProductJsonLd(product)

  return (
    <div className="page-wrap pb-16 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <StoryViewer items={product.stories} fallbackImage={product.image} alt={product.name} badge={product.badge} />

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {product.subcategory}
          </span>
          <h1 className="display-title text-3xl font-extrabold text-foreground sm:text-4xl">{product.name}</h1>
          <p className="text-base text-muted-foreground">{product.shortDescription}</p>

          <div className="flex flex-wrap items-baseline gap-3">
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

          {product.benefits.length > 0 && (
            <ul className="flex flex-col gap-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          )}

          <div className="oba-card hidden flex-col gap-3 p-5 sm:flex">
            <OfferButton product={product} fullLabel className="w-full" />
            <p className="text-xs text-muted-foreground">
              Você será direcionado para a plataforma parceira para concluir a compra.
            </p>
            <AffiliateDisclosure compact />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TrustBadges />
      </div>

      <div className="mt-12">
        <ProductHowItWorks steps={howItWorks} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground">Sobre o produto</h2>
          <p className="mt-2 text-base text-muted-foreground">{product.description}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Preços, estoque, entrega, pagamento e condições são definidos pela plataforma responsável.
          </p>
        </div>
        {product.specs && product.specs.length > 0 && (
          <div>
            <ProductSpecsTable specs={product.specs} />
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeader kicker="Você também pode gostar" title="Produtos relacionados" />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      )}

      <StickyBuyBar product={product} />
    </div>
  )
}
