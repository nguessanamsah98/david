import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import { useInView } from '../hooks/useInView';
import GeometricMotifs from './GeometricMotifs';

interface Experience {
  titre: string;
  entreprise: string;
  periode: string;
  localisation?: string;
  description: string[];
  technologies?: string[];
  logo?: string;
  logoFallback?: string;
}

function ExperienceCard({ exp, accentSide }: { exp: Experience; accentSide: 'left' | 'right' }) {
  const [logoError, setLogoError] = useState(false);
  const showLogo = exp.logo && !logoError;
  const fallbackText = exp.logoFallback ?? exp.entreprise.charAt(0);

  return (
    <div className="experience-card-parcours rounded-lg border border-stone-600/80 bg-stone-800/90 shadow-lg p-4 sm:p-5 md:p-6 transition-all duration-300 overflow-hidden hover:border-accent-500/50 hover:shadow-accent-500/10 hover:shadow-xl relative">
      {/* Barre d'accent côté timeline */}
      <div
        className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-accent-500 to-accent-400 experience-card-accent-parcours transition-all duration-300 ${accentSide === 'left' ? 'left-0 rounded-l-lg' : 'right-0 rounded-r-lg'}`}
      />
      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-2 sm:p-2.5 rounded-lg bg-stone-700/80 experience-icon-wrap-parcours transition-all duration-300 shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden">
            {showLogo ? (
              <img
                src={exp.logo}
                alt=""
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-accent-400 font-bold text-sm sm:text-base">
                {fallbackText}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-white text-base sm:text-lg">{exp.titre}</h3>
            <p className="text-accent-400 font-medium text-sm">{exp.entreprise}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-stone-400 text-xs sm:text-sm shrink-0">
          <Calendar size={14} className="text-accent-400 shrink-0" />
          <span>{exp.periode}</span>
        </div>
      </div>
      <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
        {exp.description.map((desc, i) => (
          <li
            key={i}
            className="text-stone-300 text-sm sm:text-base leading-relaxed flex items-start gap-2 experience-desc-item-parcours"
          >
            <span className="text-accent-400 mt-1 shrink-0 experience-bullet-parcours font-bold">›</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
      {exp.technologies && exp.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              className="experience-tag-parcours px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md border border-accent-500/40 text-accent-300 bg-accent-500/10 hover:bg-accent-500/20 hover:border-accent-400/50 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experiences() {
  const { t } = useTranslation();
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });
  const experiences = t('experiences.list', { returnObjects: true }) as Experience[];

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className={`py-10 sm:py-14 md:py-20 lg:py-28 relative overflow-hidden bg-stone-900 border-t border-stone-800 ${isInView ? 'in-view' : ''}`}
    >
      {/* Motifs de fond */}
      <div className="absolute inset-0 bg-pattern-dots-dark opacity-[0.08] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-pattern-grid-dark opacity-[0.06] pointer-events-none" aria-hidden />
      <GeometricMotifs mode="absolute" variant="light" />
      {/* Accent lumineux discret */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent-400/8 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll variant="fade-down">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                <span className="text-white">{t('experiences.title')} </span>
                <span className="text-accent-500">{t('experiences.titleHighlight')}</span>
              </h2>
              <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full timeline-title-underline" />
            </div>
          </AnimateOnScroll>

          <div className="relative">
            {/* Ligne de temps : à gauche sur mobile, au centre sur md+ */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-stone-600 rounded-full overflow-hidden md:left-1/2 md:-translate-x-px">
              <div
                className="timeline-line-progress absolute inset-0 bg-gradient-to-b from-accent-500 via-accent-400 to-accent-500/60 rounded-full origin-top scale-y-0"
                style={{ transformOrigin: 'top' }}
              />
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {experiences.map((exp, index) => {
                const isRight = index % 2 === 0;
                return (
                  <AnimateOnScroll
                    key={index}
                    variant={isRight ? 'slide-right' : 'slide-left'}
                    delay={(index % 3) as 0 | 1 | 2}
                  >
                    <div className="relative flex items-stretch min-h-[120px]">
                      {/* Spacer : gauche sur mobile (timeline), 50% sur desktop selon côté carte */}
                      <div
                        className={`w-14 flex-none md:w-1/2 ${isRight ? 'md:order-1' : 'md:order-2'} pr-2 md:pr-6`}
                        aria-hidden
                      />
                      {/* Carte : à droite du spacer sur mobile, alternée sur desktop */}
                      <div
                        className={`flex-1 min-w-0 md:w-1/2 md:flex-none flex ${isRight ? 'justify-start md:order-2' : 'justify-end md:order-1'} pl-2 md:pl-6`}
                      >
                        <div className="w-full max-w-md">
                          <ExperienceCard
                            exp={exp}
                            accentSide={isRight ? 'left' : 'right'}
                          />
                        </div>
                      </div>
                      {/* Point accent : gauche sur mobile, centre sur desktop */}
                      <div
                        className="absolute left-6 top-6 sm:top-7 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-accent-500 shadow-md shadow-accent-500/30 timeline-dot-expand z-10 ring-4 ring-stone-900 md:left-1/2"
                        aria-hidden
                      />
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
