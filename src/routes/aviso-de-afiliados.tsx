import { createFileRoute } from '@tanstack/react-router'
import { AffiliateDisclosure } from '#/components/product/AffiliateDisclosure'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/aviso-de-afiliados')({
  head: () =>
    buildPageMeta({
      title: 'Aviso de Afiliados | Oba On Shop',
      description: 'Entenda como funcionam os links de afiliados na Oba On Shop.',
      path: '/aviso-de-afiliados',
    }),
  component: AvisoDeAfiliadosPage,
})

function AvisoDeAfiliadosPage() {
  return (
    <div className="page-wrap max-w-2xl py-14">
      <h1 className="display-title text-4xl font-extrabold text-foreground sm:text-5xl">
        Aviso de Afiliados
      </h1>
      <div className="mt-6">
        <AffiliateDisclosure />
      </div>
      <div className="prose prose-neutral mt-6 max-w-none text-base text-muted-foreground">
        <p>
          A Oba On Shop reúne produtos próprios, indicações selecionadas e links de afiliados de
          plataformas parceiras, como Shopee, Mercado Livre, Amazon, Hotmart e Kiwify.
        </p>
        <p>
          Isso significa que, ao clicar em determinados links e concluir uma compra na plataforma
          parceira, a Oba On Shop pode receber uma comissão. Essa comissão não altera o valor pago por
          você.
        </p>
        <p>
          A compra, o pagamento, a entrega e o atendimento são sempre de responsabilidade da plataforma
          onde a compra foi finalizada.
        </p>
      </div>
    </div>
  )
}
