import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import GeometricMotifs from './GeometricMotifs';

const FORMATION_IMAGES = [
  'https://media.licdn.com/dms/image/v2/D4E22AQH68ICPbBCWWQ/feedshare-shrink_2048_1536/B4EZfUzIhfHsAo-/0/1751621872587?e=1773878400&v=beta&t=6gBKlo0jLwfv58HOVH0w-Si-hp91yJ03xlnKSRmahKQ',
  'https://media.licdn.com/dms/image/v2/D4E22AQH68ICPbBCWWQ/feedshare-shrink_2048_1536/B4EZfUzIhfHsAo-/0/1751621872587?e=1773878400&v=beta&t=6gBKlo0jLwfv58HOVH0w-Si-hp91yJ03xlnKSRmahKQ',
  'https://www.patrimoine-nouvelle-aquitaine.fr/graphQlProxy.ashx?urlgraphql=https://rna-gertrude-diffusion-graphql-prod.atolcd.com/api/file/244b8345-ed96-4767-8ac7-76b6efa96fd7.jpg',
];

const INTEREST_IMAGES = [
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9kY2FzdHxlbnwwfHwwfHx8MA%3D%3D',
  'https://media.istockphoto.com/id/1292791906/fr/photo/cerceau-de-tir-et-points-de-notation.webp?a=1&b=1&s=612x612&w=0&k=20&c=0kD76427AZodyaFPK4zVSURapW3VZdCfTyAmketajW4=',
  'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlYXRyZXxlbnwwfHwwfHx8MA%3D%3D',
];

interface FormationItem {
  diplome: string;
  ecole: string;
  periode: string;
  lieu: string;
  specialite?: string;
}

export default function Formation() {
  const { t } = useTranslation();
  const items = t('formation.items', { returnObjects: true }) as FormationItem[];
  const formations = items.map((item, i) => ({ ...item, image: FORMATION_IMAGES[i] ?? '' }));
  const interestNames = t('formation.interests', { returnObjects: true }) as string[];
  const interets = interestNames.map((nom, i) => ({ nom, image: INTEREST_IMAGES[i] ?? '' }));

  return (
    <section id="formation" className="relative py-10 sm:py-14 md:py-20 lg:py-28 border-t border-stone-100 bg-white overflow-hidden">
      <GeometricMotifs mode="absolute" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-accent-500 text-xs sm:text-sm font-medium uppercase tracking-widest">{t('formation.pathway')}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                <span className="text-stone-800">{t('formation.title')} </span>
                <span className="text-accent-500">{t('formation.titleHighlight')}</span>
              </h2>
            </div>
          </AnimateOnScroll>

          {/* Formation : disposition alternée image / texte, atypique */}
          <div className="space-y-10 sm:space-y-14 md:space-y-20 lg:space-y-24">
            {formations.map((formation, index) => (
              <AnimateOnScroll key={index} variant="fade-up" delay={(index % 2) as 0 | 1}>
                <article
                  className={`flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-12 ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                  } md:items-center`}
                >
                  <div className="md:w-[45%] flex-shrink-0">
                    <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={formation.image}
                        alt={formation.ecole}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/600x800/e7e5e4/78716c?text=${encodeURIComponent(formation.ecole)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
                        <span className="text-white/90 text-xs sm:text-sm font-medium">{formation.ecole}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`md:w-[55%] ${index % 2 === 1 ? 'md:text-right md:pr-12' : 'md:pl-4'}`}>
                    <div className="inline-flex items-center gap-2 text-accent-600 mb-2 sm:mb-3">
                      <GraduationCap size={18} />
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-700">{formation.periode}</span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-stone-800 mb-1.5 sm:mb-2 leading-tight">
                      {formation.diplome}
                    </h3>
                    {formation.specialite && (
                      <p className="text-stone-600 italic text-xs sm:text-sm mb-3 sm:mb-4">{formation.specialite}</p>
                    )}
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-stone-600 text-xs sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-accent-500 flex-shrink-0" />
                        {formation.periode}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-accent-500 flex-shrink-0" />
                        {formation.lieu}
                      </span>
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Centres d'intérêt : cartes avec images Unsplash */}
          <AnimateOnScroll variant="fade-up">
            <div className="mt-10 sm:mt-14 md:mt-20 pt-8 sm:pt-12 md:pt-16 border-t border-stone-200">
              <AnimateOnScroll variant="slide-right">
                <h3 className="text-lg sm:text-xl font-bold text-stone-800 mb-1 sm:mb-2">
                  {t('formation.interestsTitle')}<span className="text-accent-500">{t('formation.interestsTitleHighlight')}</span>
                </h3>
              </AnimateOnScroll>
              <AnimateOnScroll variant="slide-left" delay={1}>
                <p className="text-stone-600 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 max-w-md">
                  {t('formation.interestsSubtitle')}
                </p>
              </AnimateOnScroll>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {interets.map((interet, i) => (
                  <AnimateOnScroll key={interet.nom} variant="zoom-in" delay={(i % 4) as 0 | 1 | 2 | 3}>
                    <div
                      className="group formation-card-hover relative aspect-[3/4] overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm hover:border-accent-200"
                    >
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <img
                      src={interet.image}
                      alt={interet.nom}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/400x500/e7e5e4/78716c?text=${encodeURIComponent(interet.nom)}`;
                      }}
                    />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                      <span className="text-white font-semibold text-xs sm:text-sm drop-shadow-md">{interet.nom}</span>
                    </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
