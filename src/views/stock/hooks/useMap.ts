import { FormItem } from '@/components/DynamicForm/data.d'
import i18n from '@/lang'

const { t } = i18n.global

export const useMap = () => {
  const area = [
    { value: 'area-1', label: t('area') + '-1' },
    { value: 'area-2', label: t('area') + '-2' },
    { value: 'area-3', label: t('area') + '-3' },
    { value: 'area-4', label: t('area') + '-4' },
  ]

  const header: FormItem[] = [
    {
      type: 'input',
      placeholder: t('placeholder.enter') + t('stock.productionName'),
      label: t('stock.productionName') + ':',
      key: 'title',
      style: { width: '200px' },
    },
    {
      type: 'select',
      key: 'area',
      label: t('area') + ':',
      props: {
        clearable: true,
        options: area,
        style: { width: '150px' },
        placeholder: t('placeholder.select') + t('area'),
      },
    },
    {
      type: 'select',
      key: 'sort',
      label: t('stock.sort') + ':',
      props: {
        style: { width: '150px' },
        options: [
          { label: t('ascending'), value: '+id' },
          { label: t('descending'), value: '-id' },
        ],
        placeholder: t('placeholder.select') + t('stock.sort'),
        clearable: true,
      },
    },
    {
      type: 'button',
      slots: t('button.search'),
      props: {
        type: 'primary',
        icon: 'search',
      },
      events: { click: 'search' },
    },
    {
      type: 'button',
      slots: {
        default: t('button.export'),
      },
      props: {
        type: 'default',
        icon: 'download',
      },
      events: { click: 'export' },
    },
  ]

  return {
    area,
    header,
  }
}
