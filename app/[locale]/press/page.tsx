import { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { getPress, getProjectBySlug } from '@/lib/content'
import { ExternalLink, ArrowRight } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'press' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: locale === 'es'
      ? 'Garnica Miguelena en los medios de comunicación.'
      : 'Garnica Miguelena in the media.',
  }
}

function formatDate(dateString: string, locale: string): string {
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  })
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('press')

  const pressItems = getPress()

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="divider mb-8 block" />
          <h1 className="heading-section mb-4">{t('title')}</h1>
          {t('subtitle') && (
            <p className="text-body-lg max-w-2xl">{t('subtitle')}</p>
          )}
        </div>

        {/* Press Grid */}
        {pressItems && pressItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {pressItems.map((item) => {
              const project = item.projectSlug ? getProjectBySlug(item.projectSlug) : null
              const title = locale === 'es' ? item.title.es : item.title.en
              const excerpt = locale === 'es' ? item.excerpt.es : item.excerpt.en

              return (
                <article
                  key={item.id}
                  className="group bg-warm-white border border-sand-200 hover:border-sand-400 transition-all duration-500 overflow-hidden"
                >
                  {/* Image */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="aspect-[16/10] relative bg-sand-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Overlay with publication logo */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-warm-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-sans uppercase tracking-wider">
                          {item.publication}
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block flex-1"
                      >
                        <h2 className="font-display text-xl md:text-2xl leading-tight group-hover:text-terracotta-600 transition-colors duration-300">
                          {title}
                        </h2>
                      </a>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <ExternalLink className="w-5 h-5 text-dark-muted group-hover:text-terracotta-600 transition-colors duration-300" />
                      </a>
                    </div>

                    <p className="text-body mb-6 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <time className="text-sm text-dark-muted">
                        {formatDate(item.date, locale)}
                      </time>

                      {project && (
                        <Link
                          href={`/projects/${item.projectSlug}`}
                          className="inline-flex items-center gap-2 text-sm text-dark-muted hover:text-dark transition-colors duration-300"
                        >
                          {t('viewProject')}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-sand-50">
            <p className="text-dark-muted">
              {t('empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
