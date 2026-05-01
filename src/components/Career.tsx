import { useTranslation } from 'react-i18next';
import careerData from '../data/career.json';

interface CareerItem {
  start_date: string;
  end_date: string;
  title: string;
  description?: string;
  title_en?: string;
  title_fr?: string;
  description_en?: string;
  description_fr?: string;
  bullets_en?: string[];
  bullets_fr?: string[];
  tags: string[];
  image: string;
  location: string;
  location_en?: string;
  location_fr?: string;
  report?: string;
}

const Career = () => {
  const { t, i18n } = useTranslation('global');
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const getLocalizedField = (item: CareerItem, field: string): string => {
    const localizedKey = `${field}_${lang}` as keyof CareerItem;
    const value =
      item[localizedKey] !== undefined ? item[localizedKey] : item[field as keyof CareerItem];
    return typeof value === 'string' ? value : '';
  };

  const formatDate = (dateString: string): string => {
    const val = (dateString || '').trim();
    if (!val) return t('career.present');
    const lower = val.toLowerCase();
    if (['present', 'présent', 'current', 'now'].includes(lower)) return t('career.present');
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      try {
        return new Intl.DateTimeFormat(i18n.language || 'en', {
          month: 'short',
          year: 'numeric',
        })
          .format(d)
          .replace('.', '');
      } catch {
        return val;
      }
    }
    return val;
  };

  const isOngoing = (endDate: string): boolean => {
    const v = (endDate || '').toLowerCase();
    if (['present', 'présent', 'current', 'now', ''].includes(v)) return true;
    const d = new Date(endDate);
    return !isNaN(d.getTime()) && d.getTime() > Date.now();
  };

  return (
    <section
      id="career"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24"
    >
      <h2
        className="text-2xl md:text-3xl mb-8"
        style={{ fontFamily: 'var(--font-domine)' }}
      >
        {t('career.title')}
      </h2>
      <div className="border-t border-white/[0.10] mb-8" />

      <div className="flex flex-col gap-4">
        {careerData.map((item: CareerItem, index: number) => {
          const bullets = lang === 'fr' ? item.bullets_fr : item.bullets_en;
          const title = getLocalizedField(item, 'title');
          const location = getLocalizedField(item, 'location');
          const dateRange = `${formatDate(item.start_date)} — ${
            item.end_date ? formatDate(item.end_date) : t('career.present')
          }`;
          const ongoing = isOngoing(item.end_date);

          return (
            <article
              key={index}
              className="relative bg-white border border-white/20 rounded-lg p-4 sm:p-5 md:p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt=""
                      className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg text-gray-900 leading-snug font-medium">{title}</h3>
                    <p className="text-sm text-gray-500">{location}</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400 flex-shrink-0 whitespace-nowrap pl-11 sm:pl-0"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {ongoing && (
                    <span className="relative flex h-1.5 w-1.5" aria-hidden>
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                  )}
                  <span>{dateRange}</span>
                </div>
              </div>

              {bullets && bullets.length > 0 && (
                <ul className="text-sm text-gray-600 leading-relaxed space-y-1.5 mb-3 list-none">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gray-900 flex-shrink-0 font-bold">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {!bullets && getLocalizedField(item, 'description') && (
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {getLocalizedField(item, 'description')}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] tracking-wide text-gray-600 bg-gray-100 px-2 py-[3px] rounded"
                    style={{ fontFamily: 'var(--font-domine)' }}
                  >
                    {t(`career.tags.${tag}`)}
                  </span>
                ))}
                {item.report && (
                  <a
                    href={item.report}
                    download
                    className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded transition-colors"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {t('career.download_report')} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Career;
