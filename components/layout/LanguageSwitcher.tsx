'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: 'es' | 'en') => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-2 font-sans text-sm tracking-wider">
      <button
        onClick={() => switchLocale('es')}
        className={`transition-colors duration-300 ${
          locale === 'es' ? 'text-dark' : 'text-dark-muted hover:text-dark'
        }`}
      >
        ES
      </button>
      <span className="text-sand-400">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={`transition-colors duration-300 ${
          locale === 'en' ? 'text-dark' : 'text-dark-muted hover:text-dark'
        }`}
      >
        EN
      </button>
    </div>
  )
}
