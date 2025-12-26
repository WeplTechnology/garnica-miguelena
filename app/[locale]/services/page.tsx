import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Compass, Palette, ClipboardCheck, Sofa, ArrowRight } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: locale === 'es'
      ? 'Servicios de arquitectura, interiorismo y gestión integral de proyectos en Marbella.'
      : 'Architecture, interior design and full project management services in Marbella.',
  }
}

const services = [
  { key: 'interior', icon: Palette },
  { key: 'furniture', icon: Sofa },
  { key: 'management', icon: ClipboardCheck },
  { key: 'architecture', icon: Compass },
] as const

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('services')
  const tNav = await getTranslations('nav')

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="divider mb-8 block" />
          <h1 className="heading-section mb-4">{t('title')}</h1>
          <p className="text-xl font-display text-terracotta-600 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-body-lg">{t('intro')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article
                key={service.key}
                className="group p-8 md:p-12 bg-sand-50 hover:bg-sand-100 transition-colors duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-warm-white border border-sand-200 transition-all duration-500 group-hover:border-terracotta-300 group-hover:bg-terracotta-50">
                    <Icon className="w-8 h-8 text-terracotta-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl mb-4">
                      {t(`list.${service.key}.title`)}
                    </h2>
                    <p className="text-body">
                      {t(`list.${service.key}.description`)}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Process Section */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-section mb-4">
              {locale === 'es' ? 'Nuestro Proceso' : 'Our Process'}
            </h2>
            <p className="text-body-lg">
              {locale === 'es'
                ? 'Un enfoque estructurado para garantizar resultados excepcionales.'
                : 'A structured approach to ensure exceptional results.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: locale === 'es' ? 'Consulta' : 'Consultation', desc: locale === 'es' ? 'Escuchamos tu visión y entendemos tus necesidades.' : 'We listen to your vision and understand your needs.' },
              { step: '02', title: locale === 'es' ? 'Diseño' : 'Design', desc: locale === 'es' ? 'Desarrollamos un concepto a medida para tu espacio.' : 'We develop a bespoke concept for your space.' },
              { step: '03', title: locale === 'es' ? 'Ejecución' : 'Execution', desc: locale === 'es' ? 'Gestionamos cada detalle de la obra.' : 'We manage every detail of the construction.' },
              { step: '04', title: locale === 'es' ? 'Entrega' : 'Delivery', desc: locale === 'es' ? 'Tu espacio listo para disfrutar.' : 'Your space ready to enjoy.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-display text-5xl text-sand-300 mb-4 block">
                  {item.step}
                </span>
                <h3 className="font-display text-xl mb-2">{item.title}</h3>
                <p className="text-body text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark text-warm-white p-12 md:p-16 text-center">
          <h2 className="font-display text-display-sm mb-6">
            {locale === 'es'
              ? '¿Listo para transformar tu espacio?'
              : 'Ready to transform your space?'}
          </h2>
          <p className="text-warm-stone/80 max-w-xl mx-auto mb-8">
            {locale === 'es'
              ? 'Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad.'
              : 'Tell us about your project and we\'ll help you make it happen.'}
          </p>
          <Link
            href="/contact"
            className="btn-outline border-warm-white text-warm-white hover:bg-warm-white hover:text-dark"
          >
            {tNav('contact')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </section>
      </div>
    </div>
  )
}
