import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [t] = useTranslation('global');

  const shuffle = <T,>(array: T[]): T[] => {
    const out = [...array];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const portfolios = [
    { key: 'clement', url: 'https://clembarr.dev' },
    ...shuffle([
      { key: 'zao', url: 'https://zaofromage.github.io/portfolio/' },
      { key: 'alexandre', url: 'https://carcroks.github.io/' },
      { key: 'rodolphe', url: 'https://rodolphe.sh/' },
      { key: 'antoine', url: 'https://labian0.github.io/' },
      { key: 'elias', url: 'https://eliasgauthier.fr' },
      { key: 'mathieu', url: 'https://matjay.me/' },
    ]),
  ];

  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-10 sm:pb-12 mt-8 sm:mt-12 border-t border-white/[0.08]">
      <div
        className="flex flex-col gap-6 text-xs"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-fg-muted">
            Théo Castillo · {currentYear}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a
              href="mailto:theocastillo@yahoo.com"
              className="text-fg-dim hover:text-accent transition-colors"
            >
              email
            </a>
            <a
              href="https://github.com/theosorus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-dim hover:text-accent transition-colors"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/theo-castillo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-dim hover:text-accent transition-colors"
            >
              linkedin
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-fg-dim hover:text-accent transition-colors"
            >
              ↑ {t('footer.back_to_top')}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-fg-dim">
          <span>{t('footer.see_also')}:</span>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {portfolios.map(({ key, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-dim hover:text-accent transition-colors"
              >
                {t(`footer.portfolios.${key}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
