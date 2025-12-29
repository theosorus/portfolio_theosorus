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
  report?: string;
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

      {/***** Career Cards *****/}
      <div className="w-full max-w-4xl space-y-4">
        {careerData.map((item: CareerItem, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Layout responsive : colonne sur mobile, ligne sur desktop */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              {/***** Logo *****/}
              <div className="flex justify-center sm:justify-start flex-shrink-0">
                <img
                  src={item.image}
                  alt={getLocalizedField(item, 'title', lang) || ''}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/***** Content *****/}
              <div className="flex-1 min-w-0">
                {/***** Title *****/}
                <h2 className="text-lg md:text-xl font-semibold text-black mb-1 text-center sm:text-left">
                  {getLocalizedField(item, 'title', lang)}
                </h2>
                {/***** Location *****/}
                <p className="text-sm md:text-base text-gray-700 mb-2 text-center sm:text-left">
                  {getLocalizedField(item, 'location', lang)}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2 text-center sm:text-left">
                  {getLocalizedField(item, 'description', lang)}
                </p>
                
                {/***** Tags *****/}
                <div className="flex flex-wrap gap-1.5 mb-2 justify-center sm:justify-start">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block px-2 py-0.5 rounded text-xs bg-blue-600 text-font-color"
                    >
                      {t(`career.tags.${tag}`)}
                    </span>
                  ))}
                </div>

                {/***** Date and Report *****/}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs md:text-sm text-gray-500 gap-2">
                  <span className="text-center sm:text-left">
                    {formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : t('career.present')}
                  </span>
                  {item.report && (
                    <a
                      href={item.report}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium rounded-md transition-colors duration-200 self-center sm:self-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('career.download_report')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;