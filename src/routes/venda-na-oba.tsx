import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Rocket, Store, Users, Sparkles } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { SITE } from '#/lib/nav'

export const Route = createFileRoute('/venda-na-oba')({
  head: () => ({
    meta: [
      { title: 'Venda na Oba On Shop | Em breve' },
      {
        name: 'description',
        content: 'A Oba On Shop está estudando um jeito de você cadastrar e vender seus produtos na plataforma. Deixe seu contato para ser avisado em primeira mão.',
      },
    ],
  }),
  component: VendaNaObaPage,
})

const BENEFITS = [
  {
    icon: Store,
    title: 'Sua vitrine dentro da Oba',
    description: 'Seus produtos aparecendo para quem já está buscando bons achados e ofertas.',
  },
  {
    icon: Users,
    title: 'Alcance da curadoria Oba',
    description: 'Apareça para o público que confia nas recomendações da Oba On Shop.',
  },
  {
    icon: Sparkles,
    title: 'Feito para pequenos negócios',
    description: 'Pensado para quem vende produtos próprios, digitais ou físicos, sem complicação.',
  },
]

function VendaNaObaPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // Sem backend configurado nesta versão: apenas confirma localmente.
    setSubmitted(true)
  }

  return (
    <div className="page-wrap py-14">
      <div className="gradient-oba-soft oba-shell mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl px-6 py-14 text-center sm:px-12">
        <span className="oba-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
          <Rocket className="size-3.5" aria-hidden="true" />
          Em breve
        </span>

        <h1 className="display-title text-4xl font-extrabold text-foreground sm:text-5xl">
          Venda seus produtos na Oba On Shop
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          Estamos estudando como abrir a Oba para que outros vendedores e pequenos negócios possam
          cadastrar seus próprios produtos na plataforma. Ainda não está disponível — mas queremos avisar
          você assim que estiver.
        </p>

        {submitted ? (
          <p className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" role="status">
            Prontinho! Você será avisado quando abrirmos o cadastro.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Label htmlFor="seller-email" className="sr-only">
              Seu e-mail
            </Label>
            <Input
              id="seller-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu melhor e-mail"
              className="rounded-full bg-background"
            />
            <Button type="submit" className="btn-glow shrink-0 rounded-full">
              Quero ser avisado
            </Button>
          </form>
        )}

        <p className="text-xs text-muted-foreground">
          Prefere falar direto? Manda mensagem no Instagram{' '}
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
            {SITE.instagramHandle}
          </a>
          .
        </p>
      </div>

      <div className="mt-16">
        <SectionHeader
          kicker="O que estamos pensando"
          title="Como imaginamos que vai funcionar"
          description="Nada disso está fechado ainda — é a direção que estamos estudando."
          align="center"
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="oba-card flex flex-col items-center gap-3 px-6 py-8 text-center">
              <span className="gradient-oba-hero flex size-12 items-center justify-center rounded-2xl text-white">
                <benefit.icon className="icon-shadow-soft size-6" aria-hidden="true" />
              </span>
              <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
