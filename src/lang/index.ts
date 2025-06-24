import { createI18n, I18nOptions } from 'vue-i18n'
import Cookies from 'js-cookie'
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import enLocale from './en'
import zhLocale from './zh'

const messages: I18nOptions['messages'] = {
  en: {
    ...enLocale,
    ...en,
  },
  zh: {
    ...zhLocale,
    ...zhCn,
  },
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language') || 'zh'
  if (chooseLanguage) return chooseLanguage
  console.log('chooseLanguage', chooseLanguage)

  // if has not choose language
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages as I18nOptions)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}
const i18n = createI18n({
  legacy: false,
  locale: getLanguage() || 'zh',
  globalInjection: true,
  messages,
})

export default i18n
