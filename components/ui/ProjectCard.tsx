'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'motion/react'

interface ProjectCardProps {
  title: string
  slug: string
  category: string
  location: string
  year: number
  image?: string
  index?: number
}

export default function ProjectCard({
  title,
  slug,
  category,
  location,
  year,
  image,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <Link href={`/projects/${slug}`} className="project-card block">
        {/* Image Container */}
        <div className="relative aspect-portrait overflow-hidden bg-sand-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover project-card-image"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sand-400 font-display text-lg">
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="project-card-overlay" />

          {/* Hover Content */}
          <div className="project-card-content">
            <span className="text-xs tracking-widest uppercase opacity-80">
              {category}
            </span>
            <h3 className="font-display text-2xl mt-2">{title}</h3>
          </div>
        </div>

        {/* Info below image */}
        <div className="mt-4 space-y-1">
          <h3 className="font-display text-xl tracking-wide">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-dark-muted">
            <span>{location}</span>
            <span className="w-1 h-1 rounded-full bg-sand-400" />
            <span>{year}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
