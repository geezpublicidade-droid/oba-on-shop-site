import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sobre')({
  head: () => ({
    meta: [
      { title: 'Sobre a Oba On Shop | Oba On Shop' },
      {
        name: 'description',
        content: 'Conheça a Oba On Shop, seu shopping online de soluções, produtos e bons achados.',
      },
    ],
  }),
  component: SobrePage,
})

function SobrePage() {
  return (
    <div className="page-wrap max-w-2xl py-14">
      <h1 className="display-title text-4xl font-extrabold text-foreground sm:text-5xl">
        Sobre a Oba On Shop
      </h1>
      <div className="prose prose-neutral mt-6 max-w-none text-base text-muted-foreground">
        <p>
          A Oba On Shop nasceu para reunir produtos, ofertas, soluções digitais e bons achados em um só
          lugar.
        </p>
        <p>
          Nosso objetivo é facilitar sua busca e apresentar opções úteis, selecionadas e organizadas para
          sua rotina e seu negócio.
        </p>
        <p>
          A Oba pode trabalhar com produtos próprios, produtos digitais, indicações e links de afiliados.
          Quando você compra por um link parceiro, a Oba pode receber uma comissão, sem alterar o valor da
          sua compra.
        </p>
      </div>
    </div>
  )
}
