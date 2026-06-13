import PageTransition from '@/components/ui/PageTransition'
import HeroSection from '@/components/landing/HeroSection'
import TrackRecordSection from '@/components/landing/TrackRecordSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import LivePreviewSection from '@/components/landing/LivePreviewSection'
import KlementCallSection from '@/components/landing/KlementCallSection'
import FooterCTA from '@/components/landing/FooterCTA'

export default function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <TrackRecordSection />
      <HowItWorksSection />
      <LivePreviewSection />
      <KlementCallSection />
      <FooterCTA />
    </PageTransition>
  )
}
