import { useTranslation } from 'react-i18next';
import careerData from '../data/career.json';

interface CareerItem {
  start_date: string;
  end_date: string;
  title: string;
  description: string;
  title_en?: string;
  title_fr?: string;
  description_en?: string;
  description_fr?: string;
  tags: string[];
  image: string;
  location: string;
  location_en?: string;
  location_fr?: string;
}

export const Career = () => {
  const { t, i18n } = useTranslation('global');
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const getLocalizedField = (item: CareerItem, field: string, lang: string): string => {
    const localizedField = `${field}_${lang}` as keyof CareerItem;
    const value = item[localizedField] !== undefined ? item[localizedField] : item[field as keyof CareerItem];
    return typeof value === 'string' ? value : '';
  };

  const formatDate = (dateString: string) => {
    const val = (dateString || '').trim();
    if (!val) return t('career.present');
    const lower = val.toLowerCase();
    if (['present', 'présent', 'current', 'now'].includes(lower)) return t('career.present');
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      try {
        return new Intl.DateTimeFormat(i18n.language || 'en', { month: 'long', year: 'numeric' }).format(d);
      } catch {
        return val;
      }
    }
    return val;
  };

  return (
    <div id="career" className="w-full flex flex-col items-center py-5 px-4 min-h-screen transform scale-95">
      {/***** Title *****/}
      <div className="w-full max-w-4xl mb-9">
        <h1 className="text-3xl md:text-4xl font-bold text-font-color text-center mb-2">
          {t('career.title')}
        </h1>
      </div>

      {/***** Career Cards with Simple Timeline *****/}
      <div className="w-full max-w-5xl relative">
        {/* Simple timeline line on right */}
        <div className="absolute right-8 top-8 bottom-8 w-0.5 bg-purple-500 hidden lg:block"></div>
        
        <div className="space-y-6">
          {careerData.map((item: CareerItem, index: number) => (
            <div key={index} className="relative flex items-center gap-6">
              {/* Career Card */}
              <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Logo */}
                  <div className="flex justify-center sm:justify-start flex-shrink-0">
                    <img
                      src={item.image}
                      alt={getLocalizedField(item, 'title', lang) || ''}
                      className="w-12 h-12 object-contain rounded-lg p-1 bg-white/10 border border-white/20"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-font-color mb-1 text-center sm:text-left">
                      {getLocalizedField(item, 'title', lang)}
                    </h2>
                    <p className="text-sm text-font-color/80 mb-2 text-center sm:text-left">
                      {getLocalizedField(item, 'location', lang)}
                    </p>
                    <p className="text-xs text-font-color/70 mb-3 text-center sm:text-left">
                      {getLocalizedField(item, 'description', lang)}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3 justify-center sm:justify-start">
                      {item.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="inline-block px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {t(`career.tags.${tag}`)}
                        </span>
                      ))}
                    </div>
                    
                    {/* Date */}
                    <div className="text-xs text-font-color/60 text-center sm:text-left">
                      {formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : t('career.present')}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Simple timeline dot */}
              <div className="hidden lg:flex flex-col items-center justify-center w-16 flex-shrink-0">
                <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;