import { ExternalLink, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import GeometricMotifs from './GeometricMotifs';

const PROJECT_IMAGES = [
  'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/25/13/59/2513593b-92e3-e367-32c4-96512517c849/AppIcon-0-0-1x_U007ephone-0-0-0-P3-85-220.png/1200x630wa.png',
  'https://1telsa.fr/photopresentation/176041699811.jpg',
  'https://play-lh.googleusercontent.com/lXHVixaS-2GlXMym7mILYSOknwg1l9x9D5c0AJKCQYPLtZDatIDGxuYXaYmFNiyUIWNI=w600-h300-pc0xffffff-pd',
  'https://media.licdn.com/dms/image/v2/C4E22AQG0a09H9F1avw/feedshare-shrink_800/feedshare-shrink_800/0/1676309173159?e=2147483647&v=beta&t=PIAHXK_4vj-jBX9Xw4mZ2O9HS8N5qoKyQMKSFHi81HQ',
  'https://bstrade.bridge-securities.com/img/logo2.png',
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/5e/95/89/5e958983-8a71-dedf-6f04-1041896162b8/Placeholder.mill/1200x630wa.jpg',
  'https://media.licdn.com/dms/image/v2/D4E0BAQGal7mhJ8G_hA/company-logo_200_200/company-logo_200_200/0/1714095675136?e=1773878400&v=beta&t=eHOt6xh1V0gZGbl0RiOZHqTzsqh9ZKF820_TkTBw6u0', 
];

interface Projet {
  nom: string;
  description: string;
  details: string[];
  technologies: string[];
}

export default function Projets() {
  const { t } = useTranslation();
  const items = t('projets.items', { returnObjects: true }) as Projet[];
  const projets = items.map((item, i) => ({ ...item, image: PROJECT_IMAGES[i] ?? '' }));

  return (
    <section id="projets" className="relative py-10 sm:py-14 md:py-24 border-t border-stone-100 overflow-hidden">
      <GeometricMotifs mode="absolute" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll variant="fade-down">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-stone-800">{t('projets.title')} </span>
              <span className="text-accent-500">{t('projets.titleHighlight')}</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fade-up" delay={1}>
            <p className="text-stone-600 text-xs sm:text-sm mb-6 sm:mb-10 max-w-xl">
              {t('projets.subtitle')}
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {projets.map((projet, index) => (
              <AnimateOnScroll key={index} variant="fade-up" delay={(index % 2) as 0 | 1 | 2}>
                <article className="group projet-card-shine projet-card-lift relative h-full bg-white rounded-lg border border-stone-200 overflow-hidden shadow-md hover:shadow-2xl hover:border-accent-200 transition-all duration-500">
                  {/* Bandeau accent type dashboard */}
                  <div className="h-1.5 bg-gradient-to-r from-accent-500 to-accent-400" aria-hidden />
                  <div className="aspect-[16/10] sm:aspect-[2/1] bg-stone-100 relative overflow-hidden rounded-t-lg">
                    <img
                      src={projet.image}
                      alt={projet.nom}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/800x500/f5f5f4/78716c?text=${encodeURIComponent(projet.nom)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-flex items-center gap-2 text-white text-sm sm:text-base font-medium">
                        <ExternalLink size={18} /> {t('projets.viewProject')}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <Zap className="text-accent-500 flex-shrink-0 mt-1" size={22} />
                      <h3 className="font-bold text-stone-800 text-xl sm:text-2xl md:text-[1.4rem] leading-tight">{projet.nom}</h3>
                    </div>
                    <p className="text-accent-500 text-sm sm:text-base font-semibold mb-4">{projet.description}</p>
                    <ul className="space-y-2 sm:space-y-2.5 mb-5 text-stone-600 text-sm sm:text-base">
                      {projet.details.slice(0, 3).map((detail, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-accent-500 mt-1 font-bold">·</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {projet.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-stone-100 text-stone-600 text-xs sm:text-sm font-medium rounded-lg border border-stone-200/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
