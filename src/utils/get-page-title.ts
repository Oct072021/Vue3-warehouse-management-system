import defaultSettings from '@/settings'
import i18n from '@/lang'

const { t, te } = i18n.global

const title = defaultSettings.title || 'Vue Element Admin'

// export default function getPageTitle(pageTitle) {
//   if (pageTitle) {
//     return `${pageTitle} - ${title}`
//   }
//   return `${title}`
// }

export default function getPageTitle(key: string) {
  const hasKey = te(`route.${key}`)
  if (hasKey) {
    const pageName = t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}
