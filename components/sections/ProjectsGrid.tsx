'use client'

import { motion } from 'motion/react'
import ProjectCard from '@/components/ui/ProjectCard'

type Project = {
  _id: string
  title: string
  slug: string
  category: string
  location: string
  year: number
  image?: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div>
      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
          >
            <ProjectCard
              title={project.title}
              slug={project.slug}
              category={project.category}
              location={project.location}
              year={project.year}
              image={project.image}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-dark-muted">No hay proyectos disponibles.</p>
        </div>
      )}
    </div>
  )
}
