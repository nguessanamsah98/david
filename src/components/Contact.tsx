import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from './AnimateOnScroll';
import GeometricMotifs from './GeometricMotifs';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:nguessanamsah98@gmail.com?subject=${encodeURIComponent(formData.sujet)}&body=${encodeURIComponent(`Nom: ${formData.nom}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const contactItems = [
    { Icon: Mail, labelKey: 'contact.labels.email', value: 'nguessanamsah98@gmail.com', href: 'mailto:nguessanamsah98@gmail.com' },
    { Icon: Phone, labelKey: 'contact.labels.phone', value: '+225 07 11 46 14 80', href: 'tel:+2250711461480' },
    { Icon: Linkedin, labelKey: 'contact.labels.linkedin', value: "amsah david-alexandre n'guessan", href: 'https://www.linkedin.com/in/amsah-david-alexandre-n%E2%80%99guessan-52a6541a3/' },
    { Icon: MapPin, labelKey: 'contact.labels.location', value: t('contact.locationValue'), href: null as string | null },
  ];

  return (
    <section id="contact" className="relative py-10 sm:py-14 md:py-20 lg:py-24 border-t border-stone-100 overflow-hidden">
      <GeometricMotifs mode="absolute" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-down">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-stone-800">{t('contact.title')} </span>
              <span className="text-accent-500">{t('contact.titleHighlight')}</span>
            </h2>
            <p className="text-stone-700 text-xs sm:text-sm mb-6 sm:mb-10 max-w-xl">
              {t('contact.subtitle')}
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div className="space-y-3 sm:space-y-4">
              <AnimateOnScroll variant="fade-up">
                <h3 className="text-lg sm:text-xl font-bold text-stone-800 mb-2 sm:mb-4">
                  {t('contact.infoTitle')} <span className="text-accent-500">{t('contact.infoTitleHighlight')}</span>
                </h3>
              </AnimateOnScroll>

              {contactItems.map((item, i) => {
                const content = (
                  <>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0">
                      <item.Icon className="text-white" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-wider">{t(item.labelKey)}</p>
                      <p className="text-stone-800 font-semibold text-sm sm:text-base truncate">{item.value}</p>
                    </div>
                  </>
                );
                    return (
                  <AnimateOnScroll key={item.labelKey} variant="slide-right" delay={i as 0 | 1 | 2}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.Icon === Linkedin ? '_blank' : undefined}
                        rel={item.Icon === Linkedin ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md hover-lift transition-all duration-300 group"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-stone-200 bg-white">
                        {content}
                      </div>
                    )}
                  </AnimateOnScroll>
                );
              })}

              <AnimateOnScroll variant="fade-up" delay={2}>
                <div className="p-3 sm:p-4 md:p-5 rounded-lg bg-accent-500 text-white border border-accent-500">
                  <p className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">{t('contact.availability')}</p>
                  <p className="text-white/95 text-xs sm:text-sm">
                    {t('contact.availabilityText')}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll variant="flip">
              <div className="p-4 sm:p-5 md:p-6 rounded-lg border border-stone-200 bg-white shadow-sm hover-glow transition-shadow">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div>
                    <label htmlFor="nom" className="block text-stone-800 font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      id="nom"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm sm:text-base focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 focus:outline-none transition-all duration-300"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-stone-800 font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm sm:text-base focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 focus:outline-none transition-all duration-300"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="sujet" className="block text-stone-800 font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">{t('contact.form.subject')}</label>
                    <input
                      type="text"
                      id="sujet"
                      required
                      value={formData.sujet}
                      onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm sm:text-base focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 focus:outline-none transition-all duration-300"
                      placeholder={t('contact.form.subjectPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-stone-800 font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">{t('contact.form.message')}</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm sm:text-base focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 focus:outline-none transition-all duration-300 resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-accent-500 text-white font-semibold text-xs sm:text-sm hover:bg-accent-600 hover-lift btn-pulse transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-500/25"
                  >
                    <Send size={18} />
                    {t('contact.form.submit')}
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
