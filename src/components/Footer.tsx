import { Mail, Phone, Linkedin, MapPin, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import GeometricMotifs from './GeometricMotifs';

export default function Footer() {
  const { t } = useTranslation();
  const links = [
    { labelKey: 'nav.accueil', href: '#accueil' },
    { labelKey: 'nav.experiences', href: '#experiences' },
    { labelKey: 'nav.projets', href: '#projets' },
    { labelKey: 'nav.competences', href: '#competences' },
    { labelKey: 'nav.formation', href: '#formation' },
    { labelKey: 'nav.contact', href: '#contact' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-300 relative overflow-hidden">
      {/* Motifs de fond discrets */}
      <div className="absolute inset-0 bg-pattern-dots-dark opacity-[0.06] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-pattern-grid-dark opacity-[0.04] pointer-events-none" aria-hidden />
      <GeometricMotifs mode="absolute" variant="light" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 py-10 sm:py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Bloc principal : identité + 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-8">
            <AnimateOnScroll variant="fade-up" className="lg:col-span-5">
              <a href="#accueil" className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 group">
                <img
                  src="/logo.svg"
                  alt=""
                  width={44}
                  height={44}
                  className="h-9 w-9 sm:h-11 sm:w-11 object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                />
                <span className="text-white font-bold text-sm sm:text-base md:text-lg tracking-tight group-hover:text-accent-400 transition-colors">
                  N'GUESSAN AMSAH DAVID-ALEXANDRE
                </span>
              </a>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-400 max-w-sm">
                {t('footer.tagline')}
              </p>
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-relaxed text-stone-400 max-w-sm">
                {t('footer.openTo')}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={1} className="lg:col-span-3">
              <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-5">
                {t('footer.navigation')}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link, i) => (
                  <li key={link.href}>
                    <AnimateOnScroll variant="slide-right" delay={Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-stone-300 hover:text-accent-400 transition-colors inline-block hover:translate-x-1 duration-200"
                      >
                        {t(link.labelKey)}
                      </a>
                    </AnimateOnScroll>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={2} className="lg:col-span-4">
              <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-5">
                {t('footer.contactTitle')}
              </h3>
              <ul className="space-y-2 sm:space-y-4 text-xs sm:text-sm text-stone-300">
                <li>
                  <AnimateOnScroll variant="fade-in" delay={0}>
                  <a
                    href="mailto:nguessanamsah98@gmail.com"
                    className="flex items-center gap-3 hover:text-accent-400 transition-colors"
                  >
                    <Mail size={18} className="flex-shrink-0 text-accent-400" />
                    nguessanamsah98@gmail.com
                  </a>
                  </AnimateOnScroll>
                </li>
                <li>
                  <AnimateOnScroll variant="fade-in" delay={1}>
                  <a
                    href="tel:+2250711461480"
                    className="flex items-center gap-3 hover:text-accent-400 transition-colors"
                  >
                    <Phone size={18} className="flex-shrink-0 text-accent-400" />
                    +225 07 11 46 14 80
                  </a>
                  </AnimateOnScroll>
                </li>
                <li>
                  <AnimateOnScroll variant="fade-in" delay={2}>
                  <a
                    href="https://www.linkedin.com/in/amsah-david-alexandre-n%E2%80%99guessan-52a6541a3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-accent-400 transition-colors"
                  >
                    <Linkedin size={18} className="flex-shrink-0 text-accent-400" />
                    LinkedIn
                  </a>
                  </AnimateOnScroll>
                </li>
                <li className="flex items-center gap-3 text-stone-400">
                  <AnimateOnScroll variant="fade-in" delay={3}>
                    <span className="flex items-center gap-3">
                      <MapPin size={18} className="flex-shrink-0 text-accent-400" />
                      Abidjan, Côte d'Ivoire
                    </span>
                  </AnimateOnScroll>
                </li>
              </ul>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="relative z-10 border-t border-stone-800">
        <AnimateOnScroll variant="fade-in">
          <div className="w-full px-4 sm:px-6 lg:px-16 py-3 sm:py-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-400 text-center sm:text-left">
              <p>© {new Date().getFullYear()} N'GUESSAN AMSAH DAVID-ALEXANDRE. {t('footer.rights')}</p>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-accent-400 transition-colors hover:translate-y-[-2px] duration-200"
                aria-label={t('footer.backToTop')}
              >
                <ChevronUp size={18} />
                {t('footer.backToTop')}
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  );
}
