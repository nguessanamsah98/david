import { Mail, Phone, Linkedin, CalendarDays, Briefcase, FolderKanban } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import { useInView } from '../hooks/useInView';
import GeometricMotifs from './GeometricMotifs';
import { useCountUp } from '../hooks/useCountUp';

export default function Apropos() {
  const { t } = useTranslation();
  const { ref: statsRef, isInView } = useInView({ threshold: 0.2 });
  const countExp = useCountUp(5, 1200, isInView);
  const countProjets = useCountUp(6, 1200, isInView);

  const CONTACT_ITEMS = [
    { Icon: Mail, labelKey: 'about.labels.email', value: 'nguessanamsah98@gmail.com', href: 'mailto:nguessanamsah98@gmail.com' },
    { Icon: Phone, labelKey: 'about.labels.phone', value: '+225 07 11 46 14 80', href: 'tel:+2250711461480' },
    { Icon: Linkedin, labelKey: 'contact.labels.linkedin', value: "Amsah David-Alexandre N'Guessan", href: 'https://www.linkedin.com/in/amsah-david-alexandre-n%E2%80%99guessan-52a6541a3/', external: true },
    { Icon: CalendarDays, labelKey: 'about.labels.age', value: t('about.labels.ageValue'), href: undefined },
  ] as const;

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-28 border-t border-stone-100 overflow-hidden">
      {/* Fond discret pour la section */}
      <div className="absolute inset-0 bg-white pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-pattern-dots opacity-[0.06] pointer-events-none" aria-hidden />
      <GeometricMotifs mode="absolute" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Cartes statistiques améliorées */}
          <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
            <AnimateOnScroll variant="scale-up">
              <div className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-lg hover:border-accent-200 transition-all duration-300 cursor-default overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent-100/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                <div className="relative flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-500/20 transition-colors">
                    <Briefcase className="text-accent-500" size={22} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-accent-500 tabular-nums">{countExp}+</span>
                    <span className="text-stone-600 text-xs sm:text-sm font-medium">{t('about.yearsExp')}</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll variant="scale-up" delay={1}>
              <div className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-lg hover:border-accent-200 transition-all duration-300 cursor-default overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent-100/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                <div className="relative flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-500/20 transition-colors">
                    <FolderKanban className="text-accent-500" size={22} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-accent-500 tabular-nums">{countProjets}+</span>
                    <span className="text-stone-600 text-xs sm:text-sm font-medium">{t('about.projectsLed')}</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-start">
            {/* Bloc contact – liens cliquables */}
            <div className="space-y-2 sm:space-y-3">
              {CONTACT_ITEMS.map(({ Icon, labelKey, value, href, external }, i) => (
                <AnimateOnScroll key={labelKey} variant="slide-right" delay={i as 0 | 1 | 2}>
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 sm:gap-4 rounded-xl p-3 sm:p-4 -m-2 transition-all hover:bg-white/80 hover:shadow-md hover:border-accent-100 border border-transparent"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="text-white" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-stone-500 text-[10px] sm:text-xs uppercase tracking-wider font-medium">{t(labelKey)}</p>
                        <p className="text-stone-800 font-semibold text-sm sm:text-base truncate">{value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 sm:gap-4 rounded-xl p-3 sm:p-4 -m-2">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="text-white" size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-stone-500 text-[10px] sm:text-xs uppercase tracking-wider font-medium">{t(labelKey)}</p>
                        <p className="text-stone-800 font-semibold text-sm sm:text-base">{value}</p>
                      </div>
                    </div>
                  )}
                </AnimateOnScroll>
              ))}
            </div>

            {/* À Propos De Moi – sans carte */}
            <div className="space-y-4 sm:space-y-5">
              <AnimateOnScroll variant="flip">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  <span className="text-stone-800">{t('about.title')} </span>
                  <span className="text-accent-500">{t('about.titleHighlight')}</span>
                </h2>
              </AnimateOnScroll>
              <div className="space-y-3 sm:space-y-4 text-stone-600 leading-relaxed text-sm sm:text-base">
                <AnimateOnScroll variant="fade-in" delay={0}>
                  <p>
                    {t('about.paragraph1', { count: 5 })}
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll variant="fade-in" delay={1}>
                  <p>
                    {t('about.paragraph2')}
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll variant="fade-in" delay={2}>
                  <p>
                    {t('about.paragraph3')}
                  </p>
                </AnimateOnScroll>
              </div>
              <div className="pt-1 flex flex-wrap gap-2 sm:gap-2.5">
                {['Product Management', 'e-Commerce', 'Digital Marketing', 'Monétique'].map((spec, i) => (
                  <AnimateOnScroll key={spec} variant="zoom-in" delay={i as 0 | 1 | 2}>
                    <span
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium rounded-full border border-stone-200/80 hover:bg-accent-500 hover:text-white hover:border-accent-500 transition-all duration-300 cursor-default"
                    >
                      {spec}
                    </span>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
