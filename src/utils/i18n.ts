import i18n from '@/lang/index'

// @ts-ignore
const { t, te } = i18n.global

// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title: string) {
  const hasKey = te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = t('route.' + title)

    return translatedTitle
  }
  return title
}
