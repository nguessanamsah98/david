import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
const defaultLng = (savedLang === 'en' || savedLang === 'fr') ? savedLang : 'fr';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
