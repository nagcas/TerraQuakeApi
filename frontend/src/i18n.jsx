import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '@/translations/en/Translations.json' with { type: 'json' }
import it from '@/translations/it/Translations.json' with { type: 'json' }
import es from '@/translations/es/Translations.json' with { type: 'json' }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'it', 'es'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    resources: {
      en: { translation: en },
      it: { translation: it },
      es: { translation: es }
    }
  })

export default i18n
