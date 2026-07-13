import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/politica-de-privacidade')({
  head: () => ({
    meta: [
      { title: 'Política de Privacidade | Oba On Shop' },
      { name: 'description', content: 'Saiba como a Oba On Shop trata seus dados.' },
    ],
  }),
  component: PoliticaDePrivacidadePage,
})

function PoliticaDePrivacidadePage() {
  return (
    <div className="page-wrap max-w-2xl py-14">
      <h1 className="display-title text-4xl font-extrabold text-foreground sm:text-5xl">
        Política de Privacidade
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Última atualização: julho de 2026</p>

      <div className="prose prose-neutral mt-6 max-w-none space-y-5 text-base text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Quais dados coletamos</h2>
          <p>
            A Oba On Shop não exige cadastro para navegar ou acessar as ofertas. Podemos coletar dados de
            navegação (como páginas visitadas e cliques em links de afiliados) para entender o desempenho
            do site, e o e-mail informado voluntariamente ao se inscrever para receber novidades.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Como usamos os dados</h2>
          <p>
            Usamos os dados coletados para melhorar a experiência de navegação, entender quais produtos e
            ofertas têm mais interesse, e enviar novidades para quem se inscreveu voluntariamente.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Compartilhamento com terceiros</h2>
          <p>
            Ao clicar em um link de oferta, você é direcionado para a plataforma parceira responsável pela
            venda (como Shopee, Mercado Livre, Amazon, Hotmart ou Kiwify). O tratamento de dados nessas
            plataformas segue a política de privacidade de cada uma delas.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Cookies e ferramentas de análise</h2>
          <p>
            Podemos utilizar ferramentas de análise (como Google Analytics ou Meta Pixel) para entender o
            uso do site de forma agregada, incluindo o clique em links de afiliados.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Seus direitos</h2>
          <p>
            Você pode solicitar informações sobre os dados que temos sobre você, bem como pedir a exclusão
            do seu e-mail da nossa lista de novidades, entrando em contato pelo Instagram
            @obaonshop.
          </p>
        </section>
      </div>
    </div>
  )
}
