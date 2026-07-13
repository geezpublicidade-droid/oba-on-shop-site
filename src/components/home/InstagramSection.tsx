import { Instagram } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { SITE } from '#/lib/nav'

export function InstagramSection() {
  return (
    <section className="page-wrap py-14">
      <div className="gradient-oba-hero oba-shell flex flex-col items-center gap-5 rounded-3xl px-6 py-12 text-center text-white sm:px-12">
        <Instagram className="size-10" aria-hidden="true" />
        <SectionHeader
          title="Acompanhe a Oba On Shop"
          description="Novos achados, ofertas e indicações todos os dias."
          align="center"
          tone="light"
        />
        <p className="text-sm font-semibold text-white/90">{SITE.instagramHandle}</p>
        <Button asChild size="lg" variant="secondary" className="rounded-full">
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
            Seguir no Instagram
          </a>
        </Button>
      </div>
    </section>
  )
}
