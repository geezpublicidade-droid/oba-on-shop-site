import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/termos')({
  head: () => ({
    meta: [
      { title: 'Termos de Uso | Oba On Shop' },
      { name: 'description', content: 'Termos de uso da Oba On Shop.' },
    ],
  }),
  component: TermosPage,
})

function TermosPage() {
  return (
    <div className="page-wrap max-w-2xl py-14">
      <h1 className="display-title text-3xl font-extrabold text-foreground sm:text-4xl">Termos de Uso</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última atualização: julho de 2026</p>

      <div className="prose prose-neutral mt-6 max-w-none space-y-5 text-base text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Sobre a Oba On Shop</h2>
          <p>
            A Oba On Shop é um shopping online de curadoria que reúne produtos físicos, ofertas, produtos
            digitais e indicações de plataformas parceiras. A Oba não realiza a venda direta, o
            processamento de pagamento nem a entrega dos produtos apresentados.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Como funciona a navegação</h2>
          <p>
            Ao clicar em "Ver oferta", você é direcionado para a plataforma parceira responsável, onde a
            compra é finalizada. Preços, estoque, formas de pagamento, entrega e trocas são de
            responsabilidade exclusiva dessa plataforma.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Links de afiliados</h2>
          <p>
            Parte dos links disponíveis na Oba On Shop são links de afiliados. Ao concluir uma compra por
            esses links, a Oba pode receber uma comissão, sem custo adicional para você.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Responsabilidade sobre o conteúdo</h2>
          <p>
            A Oba On Shop busca selecionar produtos e ofertas relevantes, mas não garante disponibilidade,
            prazo de entrega ou qualidade final do produto, que dependem da plataforma parceira.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Alterações nestes termos</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento para refletir mudanças no funcionamento
            da Oba On Shop.
          </p>
        </section>
      </div>
    </div>
  )
}
