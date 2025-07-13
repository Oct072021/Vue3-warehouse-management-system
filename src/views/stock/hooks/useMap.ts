import i18n from '@/lang'

const { t } = i18n.global

export const useMap = () => {
  const area = [
    { key: 'area-1', label: t('area') + '-1' },
    { key: 'area-2', label: t('area') + '-2' },
    { key: 'area-3', label: t('area') + '-3' },
    { key: 'area-4', label: t('area') + '-4' },
  ]

  const header = [
    {
      type: 'input',
      placeholder: t('stock.title'),
      name: 'title',
      styles: {
        width: '200px',
      },
      event: 'search',
    },
    {
      type: 'select',
      placeholder: t('area'),
      name: 'area',
      styles: {
        width: '150px',
      },
      options: area,
    },
    {
      type: 'select',
      placeholder: t('stock.sort'),
      name: 'sort',
      styles: {
        width: '150px',
      },
      options: [
        { label: t('ascending'), key: '+id' },
        { label: t('descending'), key: '-id' },
      ],
    },
    {
      type: 'button',
      name: t('button.search'),
      buttonType: 'primary',
      icon: 'search',
      styles: {
        margin: '0 10px 0 0',
      },
      event: 'search',
    },
    {
      type: 'button',
      name: t('button.export'),
      buttonType: 'primary',
      icon: 'download',
      styles: {
        margin: '0 10px 0 0',
      },
      event: 'export',
    },
  ]

  return {
    area,
    header,
  }
}
