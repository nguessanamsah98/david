import { useState, useEffect, useRef, useCallback } from 'react';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Apropos from './components/Apropos';
import Experiences from './components/Experiences';
import Projets from './components/Projets';
import Competences from './components/Competences';
import Formation from './components/Formation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BoutonWhatsApp from './components/BoutonWhatsApp';

const SECTION_IDS = ['accueil', 'experiences', 'projets', 'competences', 'formation', 'contact'];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('accueil');
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      sectionsRef.current[id] = el;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="min-h-screen bg-white text-stone-800 bg-mesh-static relative">
        <Header scrollY={scrollY} activeSection={activeSection} isVisible={!showSplash} />
        <div className="overflow-x-hidden relative">
          <div className="absolute inset-0 bg-pattern-dots opacity-[0.06] pointer-events-none" aria-hidden />
          <Hero scrollY={scrollY} />
          <Apropos />
          <Experiences />
          <Projets />
          <Competences />
          <Formation />
          <Contact />
          <Footer />
          <BoutonWhatsApp />
        </div>
      </div>
    </>
  );
}

export default App;
