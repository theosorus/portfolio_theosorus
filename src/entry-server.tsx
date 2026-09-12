import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import App from './App';
import global_en from './translations/en/global.json';
import global_fr from './translations/fr/global.json';

/**
 * Build-time entry point. Renders the page to static HTML so crawlers receive
 * the real content instead of an empty <div id="root">.
 *
 * It mirrors main.tsx but touches no browser API: no localStorage, so the
 * language is the same 'en' default main.tsx starts from. The client still
 * mounts with createRoot and replaces this markup, which is why there is no
 * hydration contract to honour here and why a visitor sees exactly what they
 * saw before.
 */
export function render(): string {
  i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
      en: { global: global_en },
      fr: { global: global_fr },
    },
  });

  return renderToStaticMarkup(
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>,
  );
}
