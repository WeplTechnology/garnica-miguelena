'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import Lightbox from './Lightbox'

type GalleryImage = {
  src: string
  srcFull: string
  alt: string
}

interface ProjectGalleryProps {
  images: GalleryImage[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.19, 1, 0.22, 1],
            }}
            className={`relative cursor-pointer overflow-hidden group ${
              index === 0 ? 'md:col-span-2 aspect-wide' : 'aspect-landscape'
            }`}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={`${title} - ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              sizes={index === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={images.map((img) => ({ src: img.srcFull, alt: img.alt }))}
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </>
  )
}
