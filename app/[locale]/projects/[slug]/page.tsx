import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getProjectBySlug, getProjectSlugs, getProjectImagePath } from '@/lib/content'
import { Link } from '@/i18n/routing'
import ProjectGallery from '@/components/ui/ProjectGallery'
import { ArrowLeft, MapPin, Calendar, Camera } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Proyecto no encontrado' }
  }

  return {
    title: `${project.title} | Garnica Miguelena`,
    description: project.description || `Proyecto de interiorismo: ${project.title} en ${project.location}`,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations('projects')
  const tFilters = await getTranslations('projects.filters')

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const description = locale === 'en' && project.descriptionEn
    ? project.descriptionEn
    : project.description

  const mainImageUrl = project.mainImage
    ? getProjectImagePath(slug, project.mainImage)
    : null

  const galleryImages = project.gallery?.map((img) => ({
    src: getProjectImagePath(slug, img),
    srcFull: getProjectImagePath(slug, img),
    alt: project.title,
  })) || []

  return (
    <article className="pt-24 pb-24 md:pb-32">
      {/* Hero Image */}
      {mainImageUrl && (
        <div className="relative h-[60vh] md:h-[80vh] mb-16 md:mb-24">
          <Image
            src={mainImageUrl}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
        </div>
      )}

      <div className="container-wide">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-dark-muted hover:text-dark transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider uppercase">
            {t('backToProjects')}
          </span>
        </Link>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 md:mb-24">
          {/* Title & Description */}
          <div className="lg:col-span-2">
            <span className="text-sm tracking-widest uppercase text-terracotta-600 mb-4 block">
              {tFilters(project.category) || project.category}
            </span>
            <h1 className="font-display text-display-lg mb-8">{project.title}</h1>
            {description && (
              <p className="text-body-lg max-w-2xl whitespace-pre-line">{description}</p>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-terracotta-500 mt-0.5" />
              <div>
                <span className="text-xs tracking-widest uppercase text-dark-muted block mb-1">
                  {t('location')}
                </span>
                <span className="font-display text-lg">{project.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-terracotta-500 mt-0.5" />
              <div>
                <span className="text-xs tracking-widest uppercase text-dark-muted block mb-1">
                  {t('year')}
                </span>
                <span className="font-display text-lg">{project.year}</span>
              </div>
            </div>

            {project.photographer && (
              <div className="flex items-start gap-4">
                <Camera className="w-5 h-5 text-terracotta-500 mt-0.5" />
                <div>
                  <span className="text-xs tracking-widest uppercase text-dark-muted block mb-1">
                    {t('photographer')}
                  </span>
                  <span className="font-display text-lg">{project.photographer}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <ProjectGallery images={galleryImages} title={project.title} />
        )}
      </div>
    </article>
  )
}
