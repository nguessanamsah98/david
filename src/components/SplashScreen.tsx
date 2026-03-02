import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DURATION_MS = 3200;
const LETTERS = ['D', 'A', 'V', 'I', 'D'];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation();
  const [exiting, setExiting] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const letterInterval = setInterval(() => {
      setVisibleLetters((n) => {
        if (n >= LETTERS.length) {
          clearInterval(letterInterval);
          return n;
        }
        return n + 1;
      });
    }, 120);
    return () => clearInterval(letterInterval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      const t2 = setTimeout(onComplete, 800);
      return () => clearTimeout(t2);
    }, DURATION_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      className={`splash-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
        exiting ? 'splash-exit' : ''
      }`}
      aria-hidden="true"
    >
      {/* Fond clair sobre type WordPress */}
      <div className="absolute inset-0 bg-white" />
      {/* Légère texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cercles orbitaux décoratifs */}
      <div className="splash-orb splash-orb-1" />
      <div className="splash-orb splash-orb-2" />
      <div className="splash-orb splash-orb-3" />

      {/* Ligne d'accent animée */}
      <div className="splash-line" />

      {/* Contenu central */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="splash-title flex font-light tracking-[0.4em] text-stone-800">
          {LETTERS.map((letter, i) => (
            <span
              key={letter + i}
              className="splash-letter overflow-hidden"
              style={{
                opacity: visibleLetters > i ? 1 : 0,
                transform: visibleLetters > i ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <p
          className="mt-4 text-[10px] uppercase tracking-[0.5em] text-accent-500"
          style={{
            opacity: visibleLetters >= LETTERS.length ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}
        >
          {t('splash.subtitle')}
        </p>
      </div>

      {/* Barre de chargement minimaliste */}
      <div className="splash-progress" />
    </div>
  );
}
