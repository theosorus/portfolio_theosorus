
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [t] = useTranslation('global');
    

  return (
    <footer className="w-full bg-darker-blue border-gray-200 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          
          {/* Informations personnelles */}
          <div className="space-y-2">
            <p className="font-medium text-font-color">{t('footer.name')}</p>
            <p className="text-sm text-gray-600">{t('footer.role')}</p>
            <a 
              href={`mailto:${t('footer.email')}`} 
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t('footer.email')}
            </a>
          </div>

          {/* Section See Also */}
          <div className="text-center space-y-2 w-1/4 flex-shrink-0">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider">{t('footer.see_also')}</h3>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
              {[
                { key: 'zao', url: 'https://zaofromage.github.io/portfolio/' },
                { key: 'clement', url: null },
                { key: 'alexandre', url: 'https://carcroks.github.io/' },
                { key: 'rodolphe', url: 'https://rodolphe.sh/' },
                { key: 'antoine', url: 'https://labian0.github.io/' },
                { key: 'elias', url: null },
                { key: 'mathieu', url: 'https://matjay.me/' }
              ].map(({ key, url }) => 
                url ? (
                  <a 
                    key={key}
                    href={url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-purple-400 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {t(`footer.portfolios.${key}`)}
                  </a>
                ) : (
                  <span key={key} className="text-gray-500 cursor-not-allowed whitespace-nowrap flex-shrink-0">
                    {t(`footer.portfolios.${key}`)}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Mentions légales courtes */}
          <div className="text-sm text-gray-500 text-center md:text-right space-y-1">
            <p>{t('footer.rights', { year: currentYear, name: t('footer.name') })}</p>
            <p>{t('footer.note')}</p>
          </div>
        </div>

        {/* Ligne de séparation et liens */}
        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-400">
              {t('footer.built_with')}
            </p>
            
            <div className="flex space-x-4 text-xs">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {t('footer.back_to_top')}
              </button>
              <a 
                href={`mailto:${t('footer.email')}`} 
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                {t('footer.contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;