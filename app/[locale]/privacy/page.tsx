import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: t('metaDescription'),
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('privacy')

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="divider mb-6 block" />
          <h1 className="heading-section mb-4">{t('title')}</h1>
          <p className="text-body text-dark-muted">{t('lastUpdated')}: Diciembre 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Responsable */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('responsible.title')}</h2>
            <div className="bg-sand-50 p-6 rounded-sm">
              <ul className="space-y-2 text-body list-none pl-0">
                <li><strong>{t('responsible.company')}:</strong> Garnica Miguelena S.L.</li>
                <li><strong>{t('responsible.cif')}:</strong> [CIF]</li>
                <li><strong>{t('responsible.address')}:</strong> Calle Pintor Rivera 1, Local B, 29602 Marbella (Málaga)</li>
                <li><strong>{t('responsible.phone')}:</strong> +34 951 040 751</li>
                <li><strong>{t('responsible.email')}:</strong> info@garnicamiguelena.com</li>
              </ul>
            </div>
          </section>

          {/* Finalidad */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('purpose.title')}</h2>
            <p className="text-body mb-4">{t('purpose.intro')}</p>
            <ul className="space-y-2 text-body list-disc pl-6">
              <li>{t('purpose.item1')}</li>
              <li>{t('purpose.item2')}</li>
              <li>{t('purpose.item3')}</li>
              <li>{t('purpose.item4')}</li>
            </ul>
          </section>

          {/* Legitimación */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('legitimation.title')}</h2>
            <p className="text-body">{t('legitimation.text')}</p>
          </section>

          {/* Destinatarios */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('recipients.title')}</h2>
            <p className="text-body">{t('recipients.text')}</p>
          </section>

          {/* Derechos */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('rights.title')}</h2>
            <p className="text-body mb-4">{t('rights.intro')}</p>
            <ul className="space-y-2 text-body list-disc pl-6">
              <li><strong>{t('rights.access')}:</strong> {t('rights.accessDesc')}</li>
              <li><strong>{t('rights.rectification')}:</strong> {t('rights.rectificationDesc')}</li>
              <li><strong>{t('rights.deletion')}:</strong> {t('rights.deletionDesc')}</li>
              <li><strong>{t('rights.opposition')}:</strong> {t('rights.oppositionDesc')}</li>
              <li><strong>{t('rights.portability')}:</strong> {t('rights.portabilityDesc')}</li>
              <li><strong>{t('rights.limitation')}:</strong> {t('rights.limitationDesc')}</li>
            </ul>
            <p className="text-body mt-4">{t('rights.howTo')}</p>
          </section>

          {/* Conservación */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('retention.title')}</h2>
            <p className="text-body">{t('retention.text')}</p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('cookies.title')}</h2>
            <p className="text-body mb-4">{t('cookies.intro')}</p>
            <ul className="space-y-2 text-body list-disc pl-6">
              <li><strong>{t('cookies.technical')}:</strong> {t('cookies.technicalDesc')}</li>
              <li><strong>{t('cookies.analytics')}:</strong> {t('cookies.analyticsDesc')}</li>
            </ul>
            <p className="text-body mt-4">{t('cookies.disable')}</p>
          </section>

          {/* Seguridad */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('security.title')}</h2>
            <p className="text-body">{t('security.text')}</p>
          </section>

          {/* Cambios */}
          <section>
            <h2 className="font-display text-2xl mb-4">{t('changes.title')}</h2>
            <p className="text-body">{t('changes.text')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
