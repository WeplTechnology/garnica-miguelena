import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSiteSettings } from '@/lib/content'
import ContactForm from '@/components/sections/ContactForm'
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: locale === 'es'
      ? 'Contacta con Garnica Miguelena, estudio de arquitectura e interiorismo en Marbella.'
      : 'Contact Garnica Miguelena, architecture and interior design studio in Marbella.',
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('contact')

  const settings = getSiteSettings()

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="divider mb-8 block" />
          <h1 className="heading-section mb-4">{t('title')}</h1>
          <p className="text-xl font-display text-terracotta-600 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-body-lg">{t('intro')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="lg:pl-8">
            <div className="sticky top-32 space-y-10">
              {/* Address */}
              <div>
                <h3 className="text-xs tracking-widest uppercase text-dark-muted mb-4">
                  {t('info.address')}
                </h3>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    settings ? `${settings.address}, ${settings.city}` : 'Calle Pintor Rivera 1, Marbella'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <MapPin className="w-5 h-5 text-terracotta-500 mt-1" />
                  <div className="text-lg font-display group-hover:text-terracotta-600 transition-colors duration-300">
                    {settings ? (
                      <>
                        {settings.address}<br />
                        {settings.city}
                      </>
                    ) : (
                      <>
                        Calle Pintor Rivera 1, Local B<br />
                        29602 Marbella
                      </>
                    )}
                  </div>
                </a>
              </div>

              {/* Phone */}
              <div>
                <h3 className="text-xs tracking-widest uppercase text-dark-muted mb-4">
                  {t('info.phone')}
                </h3>
                <a
                  href={`tel:${settings?.phone || '+34951040751'}`}
                  className="flex items-center gap-4 group"
                >
                  <Phone className="w-5 h-5 text-terracotta-500" />
                  <span className="text-lg font-display group-hover:text-terracotta-600 transition-colors duration-300">
                    {settings?.phone || '+34 951 040 751'}
                  </span>
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-xs tracking-widest uppercase text-dark-muted mb-4">
                  {t('info.email')}
                </h3>
                <a
                  href={`mailto:${settings?.email || 'info@garnicamiguelena.com'}`}
                  className="flex items-center gap-4 group"
                >
                  <Mail className="w-5 h-5 text-terracotta-500" />
                  <span className="text-lg font-display group-hover:text-terracotta-600 transition-colors duration-300">
                    {settings?.email || 'info@garnicamiguelena.com'}
                  </span>
                </a>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-xs tracking-widest uppercase text-dark-muted mb-4">
                  Social
                </h3>
                <div className="flex items-center gap-4">
                  {settings?.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-sand-300 hover:border-dark hover:bg-dark hover:text-warm-white transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {settings?.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-sand-300 hover:border-dark hover:bg-dark hover:text-warm-white transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {!settings?.instagram && !settings?.linkedin && (
                    <>
                      <a
                        href="https://instagram.com/garnicamiguelena"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-sand-300 hover:border-dark hover:bg-dark hover:text-warm-white transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-sand-300 hover:border-dark hover:bg-dark hover:text-warm-white transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-sand-100 relative overflow-hidden mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.8876088456973!2d-4.886841684771!3d36.50847897999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72d7fdb2d9f8e5%3A0x8c4d9c8d9c9c9c9c!2sCalle%20Pintor%20Rivera%2C%201%2C%2029602%20Marbella%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
