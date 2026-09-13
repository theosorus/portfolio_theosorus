import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import App from './App';
import MentionsLegales from './components/MentionsLegales';
import global_en from './translations/en/global.json';
import global_fr from './translations/fr/global.json';

/**
 * Build-time entry point. Renders each page to static HTML so crawlers
 * receive the real content instead of an empty <div id="root">.
 *
 * Mirrors main.tsx / main-legal.tsx but touches no browser API: no
 * localStorage, so each render function sets its own language explicitly
 * instead of relying on a stored preference. The client still mounts with
 * createRoot and replaces this markup, which is why there is no hydration
 * contract to honour here and why a visitor sees exactly what they saw
 * before.
 */
let initialized = false;
function ensureI18n(): void {
  if (initialized) return;
  i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
      en: { global: global_en },
      fr: { global: global_fr },
    },
  });
  initialized = true;
}

export function renderHome(): string {
  ensureI18n();
  i18next.changeLanguage('en');
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>,
  );
}

export function renderLegal(): string {
  ensureI18n();
  i18next.changeLanguage('en');
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18next}>
      <MentionsLegales />
    </I18nextProvider>,
  );
}

export function renderHomeFr(): string {
  ensureI18n();
  i18next.changeLanguage('fr');
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>,
  );
}

export function renderLegalFr(): string {
  ensureI18n();
  i18next.changeLanguage('fr');
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18next}>
      <MentionsLegales />
    </I18nextProvider>,
  );
}
