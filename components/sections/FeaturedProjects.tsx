import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { getAllProjects, getProjectImagePath } from '@/lib/content'
import ProjectCardCompact from '@/components/ui/ProjectCardCompact'
import { ArrowRight } from 'lucide-react'

export default async function FeaturedProjects() {
  const t = await getTranslations('home.featured')
  const tFilters = await getTranslations('projects.filters')

  // Obtener los primeros 3 proyectos por orden
  const allProjects = getAllProjects()
  const projects = allProjects.slice(0, 3)

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="divider mb-6 block" />
            <h2 className="heading-section">{t('title')}</h2>
          </div>
          <Link href="/projects" className="btn-text">
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Row - Solo muestra los que caben en una fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
          {/* En móvil solo se ve 1, en tablet 2, en desktop 3 */}
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`
                ${index === 0 ? '' : 'hidden md:block'}
                ${index === 2 ? 'md:hidden lg:block' : ''}
              `}
            >
              <ProjectCardCompact
                title={project.title}
                slug={project.slug}
                category={tFilters(project.category)}
                location={project.location}
                year={project.year}
                image={project.mainImage ? getProjectImagePath(project.slug, project.mainImage) : undefined}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
