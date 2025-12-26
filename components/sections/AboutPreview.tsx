'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export default function AboutPreview() {
  const t = useTranslations('home.about')

  return (
    <section className="py-24 md:py-32 bg-sand-50">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-sand-200 relative overflow-hidden">
              <Image
                src="/images/estudio.jpg"
                alt="Garnica Miguelena Estudio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Decorative frame */}
              <div className="absolute inset-4 border border-warm-white/30 pointer-events-none" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-terracotta-100 -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="divider mb-8 block" />

            <h2 className="heading-section mb-8">
              {t('title')}
            </h2>

            <p className="text-body-lg mb-10 max-w-lg">
              {t('description')}
            </p>

            <Link href="/studio" className="btn-text">
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
