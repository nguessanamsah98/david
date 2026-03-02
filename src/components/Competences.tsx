import { Code, Megaphone, ShoppingCart, CreditCard, Users, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import GeometricMotifs from './GeometricMotifs';

const CATEGORY_KEYS = ['productManagement', 'marketingDigital', 'ecommerce', 'monetique', 'outils', 'softSkills'] as const;
const ICONS = [TrendingUp, Megaphone, ShoppingCart, CreditCard, Code, Users];

export default function Competences() {
  const { t } = useTranslation();
  const categories = t('competences.categories', { returnObjects: true }) as Record<string, string>;
  const skillsObj = t('competences.skills', { returnObjects: true }) as Record<string, string[]>;

  return (
    <section id="competences" className="relative py-10 sm:py-14 md:py-20 lg:py-24 border-t border-stone-100 overflow-hidden">
      <GeometricMotifs mode="absolute" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-down">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
              <span className="text-stone-800">{t('competences.title')} </span>
              <span className="text-accent-500">{t('competences.titleHighlight')}</span>
            </h2>
          </AnimateOnScroll>

          {/* Grille de cartes par catégorie — compétences en badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
            {CATEGORY_KEYS.map((key, index) => {
              const Icon = ICONS[index];
              const noms = skillsObj[key] ?? [];
              return (
                <AnimateOnScroll key={key} variant="scale-up" delay={(index % 3) as 0 | 1 | 2} className="h-full">
                  <div className="h-full flex flex-col rounded-xl border border-stone-200 bg-white p-4 sm:p-5 md:p-6 hover:border-accent-200 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-50 text-accent-600 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-stone-800">{categories[key] ?? key}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {noms.map((nom, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 text-xs sm:text-sm font-medium text-stone-600 bg-stone-100 rounded-md hover:bg-accent-50 hover:text-accent-700 transition-colors"
                        >
                          {nom}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* Langues et certifications — liste simple, sans barres */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 items-stretch">
            <AnimateOnScroll variant="slide-right" delay={1} className="h-full">
              <div className="h-full p-4 sm:p-6 md:p-8 rounded-xl border border-stone-200 bg-white hover:border-accent-200 hover:shadow-md transition-all duration-300 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-stone-800 mb-3 sm:mb-4">{t('competences.languages')}</h3>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-center gap-3 text-stone-700">
                    <img src="/flags/fr.svg" alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" aria-hidden />
                    <span className="font-medium">{t('competences.french')}</span>
                    <span className="text-accent-500 font-semibold text-sm">{t('competences.frenchLevel')}</span>
                  </li>
                  <li className="flex items-center gap-3 text-stone-700">
                    <img src="/flags/gb.svg" alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" aria-hidden />
                    <span className="font-medium">{t('competences.english')}</span>
                    <span className="text-accent-500 font-semibold text-sm">{t('competences.englishLevel')}</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slide-left" delay={2} className="h-full">
              <div className="h-full p-4 sm:p-6 md:p-8 rounded-xl border border-stone-200 bg-white hover:border-accent-200 hover:shadow-md transition-all duration-300 flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-3 sm:mb-4">{t('competences.certifications')}</h3>
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div className="flex items-start gap-2 sm:gap-3 group">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-500 rounded-full mt-1.5 sm:mt-2 group-hover:scale-150 transition-transform flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-stone-800 font-semibold text-sm sm:text-base">{t('competences.cert1Title')}</p>
                      <p className="text-stone-600 text-xs sm:text-sm">{t('competences.cert1Sub')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 group">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-500 rounded-full mt-1.5 sm:mt-2 group-hover:scale-150 transition-transform flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-stone-800 font-semibold text-sm sm:text-base">{t('competences.cert2Title')}</p>
                      <p className="text-stone-600 text-xs sm:text-sm">{t('competences.cert2Sub')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
