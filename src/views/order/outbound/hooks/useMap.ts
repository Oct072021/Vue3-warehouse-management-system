import i18n from '@/lang'
import { Type } from '@/types/common.d'

const { t } = i18n.global

export const useMap = () => {
  // 单据类型Map
  const typeMap: { [index: number]: string } = {
    '0': t('orders.purchase'),
    '1': t('orders.sell'),
  }
  // 订单状态Map
  const statusMap: { [index: number]: { label: string; type: Type } } = {
    0: { label: t('orders.wait'), type: 'info' },
    1: { label: t('orders.success'), type: 'success' },
    2: { label: t('orders.fail'), type: 'danger' },
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
      placeholder: t('orders.orderID'),
      name: 'orderID',
      styles: {
        width: '200px',
      },
      event: 'search',
    },
    {
      type: 'select',
      placeholder: t('orders.type'),
      name: 'type',
      styles: {
        width: '150px',
      },
      options: [
        { label: t('orders.purchase'), key: 0 },
        { label: t('orders.sell'), key: 1 },
      ],
    },
    {
      type: 'select',
      placeholder: t('orders.status'),
      name: 'status',
      styles: {
        width: '150px',
      },
      options: [
        { label: t('orders.wait'), key: 0 },
        { label: t('orders.success'), key: 1 },
        { label: t('orders.fail'), key: 2 },
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
    typeMap,
    statusMap,
    titleMap,
    area,
    header,
  }
}
