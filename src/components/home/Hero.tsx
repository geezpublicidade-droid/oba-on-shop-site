import { Link } from '@tanstack/react-router'
import { ShoppingBag, Sparkles, Tag } from 'lucide-react'
import { Button } from '#/components/ui/button'

export function Hero() {
  return (
    <section className="page-wrap pt-10 pb-16 sm:pt-16 sm:pb-20">
      <div className="gradient-oba-soft oba-shell relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-[var(--oba-pink)]/25 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/4 size-64 rounded-full bg-[var(--oba-purple)]/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center gap-6 text-center">
          <span className="oba-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Curadoria Oba On Shop
          </span>

          <h1 className="display-title max-w-3xl text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
            Tudo que facilita sua vida e seu negócio, em um só lugar.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Produtos, ofertas, soluções digitais e bons achados selecionados para você.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="btn-glow rounded-full">
              <Link to="/departamentos">
                <ShoppingBag className="size-4" aria-hidden="true" />
                Explorar o shopping
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-background">
              <Link to="/ofertas">
                <Tag className="size-4" aria-hidden="true" />
                Ver ofertas
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
