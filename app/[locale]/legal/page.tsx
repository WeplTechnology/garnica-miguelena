import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: t('metaDescription'),
  }
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('legal')

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
          {/* Identificación */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('identification.title')}</h2>
            <p className="text-body mb-4">{t('identification.intro')}</p>
            <div className="bg-sand-50 p-6 rounded-sm">
              <ul className="space-y-2 text-body list-none pl-0">
                <li><strong>{t('identification.company')}:</strong> Garnica Miguelena S.L.</li>
                <li><strong>{t('identification.cif')}:</strong> [CIF]</li>
                <li><strong>{t('identification.address')}:</strong> Calle Pintor Rivera 1, Local B, 29602 Marbella (Málaga)</li>
                <li><strong>{t('identification.phone')}:</strong> +34 951 040 751</li>
                <li><strong>{t('identification.email')}:</strong> info@garnicamiguelena.com</li>
                <li><strong>{t('identification.activity')}:</strong> Estudio de Arquitectura e Interiorismo</li>
              </ul>
            </div>
          </section>

          {/* Objeto */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('object.title')}</h2>
            <p className="text-body">{t('object.text')}</p>
          </section>

          {/* Condiciones de uso */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('conditions.title')}</h2>
            <p className="text-body mb-4">{t('conditions.intro')}</p>
            <ul className="space-y-2 text-body list-disc pl-6">
              <li>{t('conditions.item1')}</li>
              <li>{t('conditions.item2')}</li>
              <li>{t('conditions.item3')}</li>
              <li>{t('conditions.item4')}</li>
            </ul>
          </section>

          {/* Propiedad intelectual */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('intellectual.title')}</h2>
            <p className="text-body mb-4">{t('intellectual.text1')}</p>
            <p className="text-body">{t('intellectual.text2')}</p>
          </section>

          {/* Exclusión de responsabilidad */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('liability.title')}</h2>
            <p className="text-body mb-4">{t('liability.intro')}</p>
            <ul className="space-y-2 text-body list-disc pl-6">
              <li>{t('liability.item1')}</li>
              <li>{t('liability.item2')}</li>
              <li>{t('liability.item3')}</li>
              <li>{t('liability.item4')}</li>
            </ul>
          </section>

          {/* Enlaces externos */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('links.title')}</h2>
            <p className="text-body">{t('links.text')}</p>
          </section>

          {/* Modificaciones */}
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">{t('modifications.title')}</h2>
            <p className="text-body">{t('modifications.text')}</p>
          </section>

          {/* Legislación aplicable */}
          <section>
            <h2 className="font-display text-2xl mb-4">{t('jurisdiction.title')}</h2>
            <p className="text-body">{t('jurisdiction.text')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
