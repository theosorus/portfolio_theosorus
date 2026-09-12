import { useTranslation } from 'react-i18next';
import Footer from './Footer';

const MentionsLegales = () => {
  const [t, i18n] = useTranslation('global');
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const sections: Array<{ heading: string; body: string; note?: string }> = [
    {
      heading: t('legal_notice.editor_heading'),
      body: t('legal_notice.editor_body'),
      note: t('legal_notice.editor_note'),
    },
    {
      heading: t('legal_notice.director_heading'),
      body: t('legal_notice.director_body'),
    },
    {
      heading: t('legal_notice.hosting_heading'),
      body: t('legal_notice.hosting_body'),
    },
    {
      heading: t('legal_notice.domain_heading'),
      body: t('legal_notice.domain_body'),
    },
    {
      heading: t('legal_notice.ip_heading'),
      body: t('legal_notice.ip_body'),
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-14 flex items-center justify-between px-4 sm:px-6 z-50 bg-bg/85 backdrop-blur-md border-b border-white/[0.08]">
        <a
          href="/"
          className="text-sm sm:text-base md:text-lg text-fg hover:text-accent transition-colors truncate min-w-0"
          style={{ fontFamily: 'var(--font-domine)' }}
        >
          Théo Castillo
        </a>

        <div
          className="flex items-center gap-3 text-xs"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a href="/" className="text-fg-muted hover:text-accent transition-colors">
            {t('legal_notice.back_link')}
          </a>
          <span className="text-fg-dim">|</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => i18n.changeLanguage('fr')}
              className={`px-1.5 py-0.5 transition-colors ${
                currentLang === 'fr' ? 'text-accent' : 'text-fg-dim hover:text-fg-muted'
              }`}
              aria-label="Français"
            >
              fr
            </button>
            <span className="text-fg-dim">/</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-1.5 py-0.5 transition-colors ${
                currentLang === 'en' ? 'text-accent' : 'text-fg-dim hover:text-fg-muted'
              }`}
              aria-label="English"
            >
              en
            </button>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center pt-14 bg-bg min-h-screen">
        <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1
            className="text-3xl sm:text-4xl mb-10"
            style={{ fontFamily: 'var(--font-domine)' }}
          >
            {t('legal_notice.title')}
          </h1>

          <div className="flex flex-col gap-8 text-sm sm:text-base text-fg-muted leading-relaxed">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-fg text-base sm:text-lg mb-2" style={{ fontFamily: 'var(--font-domine)' }}>
                  {s.heading}
                </h2>
                <p>{s.body}</p>
                {s.note && <p className="text-fg-dim text-xs sm:text-sm mt-2">{s.note}</p>}
              </div>
            ))}

            <div>
              <h2 className="text-fg text-base sm:text-lg mb-2" style={{ fontFamily: 'var(--font-domine)' }}>
                {t('legal_notice.processors_heading')}
              </h2>
              <p>{t('legal_notice.processors_intro')}</p>
              <ul className="list-disc list-inside mt-2 flex flex-col gap-1.5">
                <li>{t('legal_notice.processor_gtm')}</li>
                <li>{t('legal_notice.processor_vercel')}</li>
                <li>{t('legal_notice.processor_cloudflare')}</li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default MentionsLegales;
