import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import global_en from './translations/en/global.json'
import global_fr from './translations/fr/global.json'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

const savedLanguage = localStorage.getItem('language')

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    fr: {
      global: global_fr,
    },
  },
})

if (savedLanguage) {
  i18next.changeLanguage(savedLanguage)
}

i18next.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
    
  </StrictMode>,
)
