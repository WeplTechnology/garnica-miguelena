import { setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import AboutPreview from '@/components/sections/AboutPreview'
import ServicesPreview from '@/components/sections/ServicesPreview'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <AboutPreview />
      <ServicesPreview />
    </>
  )
}
