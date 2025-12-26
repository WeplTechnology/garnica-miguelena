import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllProjects, getProjectImagePath, projectCategories } from '@/lib/content'
import ProjectsGrid from '@/components/sections/ProjectsGrid'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects' })
  const tMeta = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: `${t('title')} | Garnica Miguelena`,
    description: tMeta('description'),
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('projects')
  const tFilters = await getTranslations('projects.filters')

  const projects = getAllProjects()

  const projectsWithImages = projects.map((project) => ({
    _id: project.slug,
    title: project.title,
    slug: project.slug,
    category: tFilters(project.category),
    location: project.location,
    year: project.year,
    image: project.mainImage
      ? getProjectImagePath(project.slug, project.mainImage)
      : undefined,
  }))

  return (
    <div className="pt-32 pb-24 md:pb-32">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="divider mb-6 block" />
          <h1 className="heading-section mb-4">{t('title')}</h1>
          <p className="text-body-lg max-w-2xl">{t('subtitle')}</p>
        </div>

        {/* Projects Grid */}
        <ProjectsGrid projects={projectsWithImages} />
      </div>
    </div>
  )
}
