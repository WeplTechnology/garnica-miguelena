import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default async function Footer() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-warm-white">
      {/* Main Footer */}
      <div className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <span className="font-display text-2xl tracking-widest uppercase">Garnica</span>
              <span className="w-px h-6 bg-warm-white/40" />
              <span className="font-display text-2xl tracking-widest uppercase">Miguelena</span>
            </Link>
            <p className="text-warm-stone/80 font-light max-w-md leading-relaxed">
              {t('tagline')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://www.instagram.com/garnica_miguelena/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-warm-stone/30 rounded-full transition-all duration-300 hover:border-warm-white hover:bg-warm-white/10"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/garnicamiguelena/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-warm-stone/30 rounded-full transition-all duration-300 hover:border-warm-white hover:bg-warm-white/10"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/garnicamiguelena/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-warm-stone/30 rounded-full transition-all duration-300 hover:border-warm-white hover:bg-warm-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-sm tracking-wider uppercase mb-6 text-warm-stone">
              {tNav('home')}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/projects" className="text-warm-white/80 hover:text-warm-white transition-colors duration-300">
                {tNav('projects')}
              </Link>
              <Link href="/studio" className="text-warm-white/80 hover:text-warm-white transition-colors duration-300">
                {tNav('studio')}
              </Link>
              <Link href="/services" className="text-warm-white/80 hover:text-warm-white transition-colors duration-300">
                {tNav('services')}
              </Link>
              <Link href="/press" className="text-warm-white/80 hover:text-warm-white transition-colors duration-300">
                {tNav('press')}
              </Link>
              <Link href="/contact" className="text-warm-white/80 hover:text-warm-white transition-colors duration-300">
                {tNav('contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-sans text-sm tracking-wider uppercase mb-6 text-warm-stone">
              {tNav('contact')}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.google.com/?q=Calle+Pintor+Rivera+1+Marbella"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-warm-white/80 hover:text-warm-white transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Calle Pintor Rivera 1, Local B<br />
                  29602 Marbella
                </span>
              </a>
              <a
                href="tel:+34951040751"
                className="flex items-center gap-3 text-warm-white/80 hover:text-warm-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+34 951 040 751</span>
              </a>
              <a
                href="mailto:info@garnicamiguelena.com"
                className="flex items-center gap-3 text-warm-white/80 hover:text-warm-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">info@garnicamiguelena.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-stone/20">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-warm-stone/60">
            <p>
              © {currentYear} Garnica Miguelena. {t('rights')}.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-warm-white transition-colors duration-300">
                {t('privacy')}
              </Link>
              <Link href="/legal" className="hover:text-warm-white transition-colors duration-300">
                {t('legal')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="border-t border-warm-stone/10">
        <div className="container-wide py-4">
          <p className="text-center text-xs text-warm-stone/40">
            Desarrollado por{' '}
            <a
              href="mailto:wepltechnology@gmail.com"
              className="hover:text-warm-white transition-colors duration-300"
            >
              WepL Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
