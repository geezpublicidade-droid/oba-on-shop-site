import { createFileRoute } from '@tanstack/react-router'
import { Instagram, MessageCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#/components/ui/accordion'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { SITE } from '#/lib/nav'

const FAQ = [
  {
    question: 'A compra é feita dentro da Oba?',
    answer:
      'Não. A Oba On Shop apresenta os produtos e ofertas, mas a compra é finalizada na plataforma parceira responsável (como Shopee, Mercado Livre, Amazon, Hotmart ou Kiwify).',
  },
  {
    question: 'Onde finalizo o pagamento?',
    answer: 'O pagamento é feito diretamente na plataforma parceira, após você clicar em "Ver oferta".',
  },
  {
    question: 'A Oba realiza a entrega?',
    answer:
      'Não. A entrega é de responsabilidade da plataforma parceira onde a compra foi finalizada.',
  },
  {
    question: 'Como funciona um link de afiliado?',
    answer:
      'Ao clicar em um link de afiliado e concluir uma compra, a Oba On Shop pode receber uma comissão da plataforma parceira, sem custo adicional para você.',
  },
  {
    question: 'O preço pode mudar?',
    answer:
      'Sim. Preços, estoque e condições são definidos e podem ser alterados a qualquer momento pela plataforma responsável.',
  },
  {
    question: 'Com quem falar sobre um pedido?',
    answer:
      'Como a compra é finalizada na plataforma parceira, dúvidas sobre pedidos, entrega ou pagamento devem ser tratadas diretamente com ela.',
  },
  {
    question: 'A Oba possui produtos próprios?',
    answer:
      'A Oba On Shop pode trabalhar com produtos próprios, produtos digitais, indicações e links de afiliados, tudo reunido no mesmo lugar.',
  },
  {
    question: 'Como entrar em contato?',
    answer: 'Você pode falar com a Oba On Shop pelo Instagram @obaonshop.',
  },
]

export const Route = createFileRoute('/suporte')({
  head: () => ({
    meta: [
      { title: 'Suporte | Oba On Shop' },
      { name: 'description', content: 'Tire suas dúvidas sobre como funciona a Oba On Shop.' },
    ],
  }),
  component: SuportePage,
})

function SuportePage() {
  return (
    <div className="page-wrap max-w-3xl py-14">
      <SectionHeader kicker="Ajuda" title="Suporte" description="Dúvidas frequentes sobre a Oba On Shop." />

      <div className="oba-card mt-8 p-2 sm:p-4">
        <Accordion type="single" collapsible>
          {FAQ.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="px-3 text-left text-base font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-3 text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="oba-card flex flex-1 items-center gap-3 px-5 py-4 no-underline"
        >
          <Instagram className="size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">Instagram</p>
            <p className="text-sm text-muted-foreground">{SITE.instagramHandle}</p>
          </div>
        </a>

        {SITE.whatsappUrl && (
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="oba-card flex flex-1 items-center gap-3 px-5 py-4 no-underline"
          >
            <MessageCircle className="size-5 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Fale com a Oba</p>
            </div>
          </a>
        )}
      </div>
    </div>
  )
}
