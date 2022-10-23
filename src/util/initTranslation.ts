import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import locales from '../locales'

const resources = locales
const i18n = i18next;

export function initTranslation(): void {
  i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: 'pl',
      fallbackLng: 'pl',
      interpolation: {
        escapeValue: false
      }
    })
}

export default i18n;