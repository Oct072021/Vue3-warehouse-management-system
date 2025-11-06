import { FormItem } from '@/components/DynamicForm/data.d'
import i18n from '@/lang'
import { Type } from '@/types/common.d'

const { t } = i18n.global

export const useMap = () => {
  // 调拨状态Map
  const statusMap: { [index: number]: { label: string; type: Type } } = {
    '0': { label: t('transfer.wait'), type: 'info' },
    '1': { label: t('transfer.success'), type: 'success' },
    '2': { label: t('transfer.fail'), type: 'danger' },
  }
  // dialog标题Map
  const titleMap: { [index: string]: string } = {
    detail: t('orders.detail'),
    audit: t('orders.audit'),
  }
  const area = [
    { key: 'area-1', label: t('area') + '-1' },
    { key: 'area-2', label: t('area') + '-2' },
    { key: 'area-3', label: t('area') + '-3' },
    { key: 'area-4', label: t('area') + '-4' },
  ]
  const header: FormItem[] = [
    {
      type: 'input',
      label: t('transfer.orderID') + ':',
      placeholder: t('placeholder.enter') + t('transfer.orderID'),
      key: 'orderID',
      style: {
        width: '200px',
      },
    },
    {
      type: 'date',
      label: t('transfer.date') + ':',
      placeholder: t('placeholder.select') + t('transfer.date'),
      key: 'timestamp',
      style: {
        width: '150px',
      },
    },
    {
      type: 'select',
      key: 'status',
      label: t('transfer.status') + ':',
      props: {
        clearable: true,
        style: { width: '150px' },
        options: [
          { label: t('transfer.wait'), value: 0 },
          { label: t('transfer.success'), value: 1 },
          { label: t('transfer.fail'), value: 2 },
        ],
        placeholder: t('placeholder.select') + t('transfer.status'),
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
      slots: t('button.add'),
      props: {
        type: 'success',
        icon: 'edit',
      },
      events: { click: 'create' },
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
    statusMap,
    titleMap,
    area,
    header,
  }
}
