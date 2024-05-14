import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { selectorLanguage } from 'store/Login/loginSelector';
import locales from '../locales'

const resources = locales
const i18n = i18next;

export function initTranslation(languageName = "pl_PL"): void {
  const language = languageName.split('_')[0]
  i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: language,
      interpolation: {
        escapeValue: false
      }
    })
}

export default i18n;