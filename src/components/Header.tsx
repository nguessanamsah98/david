import { Menu, X, Download, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  scrollY: number;
  activeSection: string;
  isVisible?: boolean;
}

export default function Header({ scrollY, activeSection, isVisible = true }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [navAnimated, setNavAnimated] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setNavAnimated(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setEntranceDone(true), 50);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  useEffect(() => {
    const fallback = setTimeout(() => setEntranceDone(true), 2000);
    return () => clearTimeout(fallback);
  }, []);

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'fr' as const, labelKey: 'lang.french', flagSrc: '/flags/fr.svg' },
    { code: 'en' as const, labelKey: 'lang.english', flagSrc: '/flags/gb.svg' },
  ];
  const currentLang = languages.find((l) => l.code === (i18n.language?.slice(0, 2) ?? 'fr')) ?? languages[0];

  const changeLanguage = (lng: 'fr' | 'en') => {
    i18n.changeLanguage(lng);
    if (typeof window !== 'undefined') localStorage.setItem('lang', lng);
    setLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [langDropdownOpen]);

  const liens = [
    { nomKey: 'nav.accueil', href: '#accueil', id: 'accueil' },
    { nomKey: 'nav.experiences', href: '#experiences', id: 'experiences' },
    { nomKey: 'nav.projets', href: '#projets', id: 'projets' },
    { nomKey: 'nav.competences', href: '#competences', id: 'competences' },
    { nomKey: 'nav.formation', href: '#formation', id: 'formation' },
    { nomKey: 'nav.contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-[100] w-full transition-all duration-300 header-entrance ${
        entranceDone ? 'header-entrance-done' : ''
      } ${scrollY > 30 ? 'bg-white border-b border-stone-200 shadow-sm' : 'bg-white'}`}
    >
      <nav className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between min-h-[4.5rem] py-4 gap-6">
          {/* Zone gauche : logo */}
          <a
            href="#accueil"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label={t('nav.home')}
          >
            <img
              src="/logo.svg"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-stone-800 tracking-tight">
              DA<span className="text-accent-500">N</span>
            </span>
          </a>

          {/* Zone centre : liens de navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-12 xl:gap-14">
            {liens.map((lien, i) => {
              const isActive = activeSection === lien.id;
              return (
                <a
                  key={lien.id}
                  href={lien.href}
                  className={`nav-link-underline text-sm font-medium tracking-wide transition-colors duration-200 py-2 px-1 -mb-px whitespace-nowrap ${
                    navAnimated ? 'nav-link-anim' : 'opacity-0'
                  } ${
                    isActive
                      ? 'text-accent-500 active-underline'
                      : 'text-stone-600 hover:text-accent-500'
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {t(lien.nomKey)}
                </a>
              );
            })}
          </div>

          {/* Zone droite : sélecteur de langue (dropdown) + CTA + menu mobile */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 shrink-0">
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen((o) => !o)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-sm font-medium transition-colors min-w-[8rem] justify-between"
                aria-label={t(currentLang.labelKey)}
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
              >
                <span className="flex items-center gap-2">
                  <img
                    src={currentLang.flagSrc}
                    alt=""
                    className="w-6 h-6 rounded object-cover flex-shrink-0 border border-stone-200"
                    width={24}
                    height={24}
                    aria-hidden
                  />
                  <span>{t(currentLang.labelKey)}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-stone-500 transition-transform flex-shrink-0 ${langDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-1.5 py-1.5 min-w-[8rem] bg-white rounded-lg border border-stone-200 shadow-lg z-50"
                  role="listbox"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={currentLang.code === lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors first:rounded-t-md last:rounded-b-md ${
                        currentLang.code === lang.code
                          ? 'bg-accent-50 text-accent-600 font-medium'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <img
                        src={lang.flagSrc}
                        alt=""
                        className="w-6 h-6 rounded object-cover flex-shrink-0 border border-stone-200"
                        width={24}
                        height={24}
                        aria-hidden
                      />
                      <span>{t(lang.labelKey)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a
              href="https://drive.google.com/uc?export=download&id=1jZAE9zH5nbR7htcmBf4NX3ynnI1yki_A"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 lg:px-6 lg:py-3 bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors duration-200 rounded-lg shadow-sm hover:shadow-md"
            >
              <Download size={17} />
              {t('nav.downloadCv')}
            </a>
            <button
              className="md:hidden p-2.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              onClick={() => setMenuOuvert(!menuOuvert)}
              aria-label="Menu"
            >
              {menuOuvert ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOuvert && (
          <div className="md:hidden py-6 px-4 border-t border-stone-100 space-y-1">
            {liens.map((lien) => (
              <a
                key={lien.id}
                href={lien.href}
                onClick={() => setMenuOuvert(false)}
                className={`block py-3.5 px-2 text-sm font-medium rounded-md tracking-wide ${
                  activeSection === lien.id ? 'text-accent-500 bg-accent-50' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {t(lien.nomKey)}
              </a>
            ))}
            <a
              href="https://drive.google.com/uc?export=download&id=1jZAE9zH5nbR7htcmBf4NX3ynnI1yki_A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 py-3.5 px-2 text-sm font-medium text-accent-600 rounded-md hover:bg-accent-50"
              onClick={() => setMenuOuvert(false)}
            >
              <Download size={17} />
              {t('nav.downloadCv')}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
