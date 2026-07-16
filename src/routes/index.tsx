import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '#/components/home/Hero'
import { HighlightsSection } from '#/components/home/HighlightsSection'
import { WeeklyPickSection } from '#/components/home/WeeklyPickSection'
import { DepartmentsSection } from '#/components/home/DepartmentsSection'
import { FeaturedSection } from '#/components/home/FeaturedSection'
import { OffersSection } from '#/components/home/OffersSection'
import { DigitalSection } from '#/components/home/DigitalSection'
import { BusinessSection } from '#/components/home/BusinessSection'
import { HowItWorksSection } from '#/components/home/HowItWorksSection'
import { BenefitsSection } from '#/components/home/BenefitsSection'
import { InstagramSection } from '#/components/home/InstagramSection'
import { NewsletterSection } from '#/components/home/NewsletterSection'
import { buildPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    buildPageMeta({
      title: 'Oba On Shop | Achados, Ofertas e Soluções Digitais',
      description: 'Encontre produtos, ofertas, soluções digitais e bons achados selecionados pela Oba On Shop.',
      path: '/',
    }),
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <HighlightsSection />
      <WeeklyPickSection />
      <DepartmentsSection />
      <FeaturedSection />
      <OffersSection />
      <DigitalSection />
      <BusinessSection />
      <HowItWorksSection />
      <BenefitsSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  )
}
