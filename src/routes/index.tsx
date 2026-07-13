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

export const Route = createFileRoute('/')({
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
