'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'motion/react'
import { ArrowRight, Compass, Palette, ClipboardCheck, Sofa } from 'lucide-react'

const services = [
  { key: 'interior', icon: Palette },
  { key: 'furniture', icon: Sofa },
  { key: 'management', icon: ClipboardCheck },
  { key: 'architecture', icon: Compass },
] as const

export default function ServicesPreview() {
  const t = useTranslations('home.services')
  const tServices = useTranslations('services.list')

  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="divider mx-auto mb-8 block" />
          <h2 className="heading-section mb-6">{t('title')}</h2>
          <p className="text-xl font-display text-terracotta-600 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-body-lg">
            {t('description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="group p-8 bg-sand-50 hover:bg-sand-100 transition-colors duration-500"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-terracotta-500 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-xl mb-3">
                  {tServices(`${service.key}.title`)}
                </h3>
                <p className="text-body text-sm">
                  {tServices(`${service.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/services" className="btn-text">
            {t('cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
