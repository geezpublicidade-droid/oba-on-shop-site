import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { SectionHeader } from '#/components/shared/SectionHeader'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // Sem backend configurado nesta versão: apenas confirma localmente.
    setSubmitted(true)
  }

  return (
    <section className="page-wrap py-14">
      <div className="oba-card mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 py-12 text-center sm:px-10">
        <span className="gradient-oba-hero flex size-12 items-center justify-center rounded-2xl text-white">
          <Mail className="icon-shadow-soft size-6" aria-hidden="true" />
        </span>
        <SectionHeader
          title="Receba novidades e ofertas da Oba"
          description="Fique por dentro dos novos produtos, achados e promoções."
          align="center"
        />

        {submitted ? (
          <p className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" role="status">
            Prontinho! Você vai receber nossas novidades em breve.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu melhor e-mail"
              className="rounded-full"
            />
            <Button type="submit" className="rounded-full">
              Quero receber
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
