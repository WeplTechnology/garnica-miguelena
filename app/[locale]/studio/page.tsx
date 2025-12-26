import { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSiteSettings } from '@/lib/content'
import { Link } from '@/i18n/routing'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'studio' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: locale === 'es'
      ? 'Conoce el estudio de arquitectura e interiorismo Garnica Miguelena en Marbella.'
      : 'Discover the architecture and interior design studio Garnica Miguelena in Marbella.',
  }
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('studio')
  const tNav = await getTranslations('nav')

  const settings = getSiteSettings()

  return (
    <div className="pt-32 pb-24 md:pb-32">
      {/* Hero Section */}
      <section className="container-wide mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <span className="divider mb-8 block" />
            <h1 className="heading-section mb-8">{t('title')}</h1>
            <p className="text-body-lg">{t('intro')}</p>
          </div>

          {/* Image - Socias */}
          <div className="relative">
            <div className="aspect-[4/5] bg-sand-100 relative overflow-hidden">
              <Image
                src="/images/equipo-01.jpg"
                alt="Fundadoras de Garnica Miguelena"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta-100 -z-10" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-sand-50 py-24 md:py-32 mb-24 md:mb-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">{t('philosophy.title')}</h2>
            <p className="text-body-lg whitespace-pre-line">{t('philosophy.text')}</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-wide mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Team Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] bg-sand-100 relative overflow-hidden">
              <Image
                src="/images/equipo-02.jpg"
                alt="Equipo Garnica Miguelena"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-sand-200 -z-10" />
          </div>

          {/* Team Text */}
          <div className="order-1 lg:order-2">
            <span className="divider mb-8 block" />
            <h2 className="heading-section mb-6">{t('team.title')}</h2>
            <p className="text-body-lg">{t('team.text')}</p>
          </div>
        </div>
      </section>

      {/* Studio Space */}
      <section className="container-wide mb-24 md:mb-32">
        <div className="aspect-[21/9] bg-sand-100 relative overflow-hidden">
          <Image
            src="/images/socias.jpg"
            alt="Estudio Garnica Miguelena"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-wide">
        <div className="bg-dark text-warm-white p-12 md:p-16 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-display-sm mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-warm-stone/80 mb-8">
                {t('cta.description')}
              </p>
              <Link href="/contact" className="btn-outline border-warm-white text-warm-white hover:bg-warm-white hover:text-dark">
                {tNav('contact')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-4 text-warm-white/80 hover:text-warm-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>{settings.email}</span>
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 text-warm-white/80 hover:text-warm-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>{settings.phone}</span>
              </a>
              <div className="flex items-start gap-4 text-warm-white/80">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>
                  {settings.address}<br />
                  {settings.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
