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
  const header = [
    {
      type: 'input',
      placeholder: t('transfer.orderID'),
      name: 'orderID',
      styles: {
        width: '200px',
      },
      event: 'search',
    },
    {
      type: 'date',
      placeholder: t('transfer.date'),
      name: 'timestamp',
      styles: {
        width: '150px',
      },
    },
    {
      type: 'select',
      placeholder: t('transfer.status'),
      name: 'status',
      styles: {
        width: '150px',
      },
      options: [
        { label: t('transfer.wait'), key: 0 },
        { label: t('transfer.success'), key: 1 },
        { label: t('transfer.fail'), key: 2 },
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
      name: t('button.add'),
      buttonType: 'primary',
      icon: 'edit',
      styles: {
        margin: '0 10px 0 0',
      },
      event: 'add',
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
    statusMap,
    titleMap,
    area,
    header,
  }
}
