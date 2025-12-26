'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'motion/react'

interface ProjectCardCompactProps {
  title: string
  slug: string
  category: string
  location: string
  year: number
  image?: string
  index?: number
}

export default function ProjectCardCompact({
  title,
  slug,
  category,
  location,
  year,
  image,
  index = 0,
}: ProjectCardCompactProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <Link href={`/projects/${slug}`} className="group block">
        {/* Image Container - Más compacto */}
        <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sand-400 font-display text-lg">
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay sutil en hover */}
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500" />
        </div>

        {/* Info below image - Más compacto */}
        <div className="mt-3 space-y-0.5">
          <h3 className="font-display text-lg tracking-wide group-hover:text-terracotta-600 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-dark-muted">
            <span>{category}</span>
            <span className="w-1 h-1 rounded-full bg-sand-400" />
            <span>{location}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
