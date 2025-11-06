import { FormItem } from '@/components/DynamicForm/data.d'
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
  const header: FormItem[] = [
    {
      type: 'input',
      placeholder: t('placeholder.enter') + t('orders.orderID'),
      key: 'orderID',
      label: t('orders.orderID') + ':',
      style: {
        width: '200px',
      },
    },
    {
      type: 'select',
      key: 'type',
      label: t('orders.type') + ':',
      props: {
        placeholder: t('placeholder.select') + t('orders.type'),
        style: {
          width: '200px',
        },
        clearable: true,
        options: [
          { label: t('orders.normal'), value: 0 },
          { label: t('orders.return'), value: 1 },
        ],
      },
    },
    {
      type: 'select',
      key: 'status',
      label: t('orders.status') + ':',
      props: {
        placeholder: t('placeholder.select') + t('orders.status'),
        style: {
          width: '200px',
        },
        clearable: true,
        options: [
          { label: t('orders.wait'), value: 0 },
          { label: t('orders.success'), value: 1 },
          { label: t('orders.fail'), value: 2 },
        ],
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
    typeMap,
    statusMap,
    titleMap,
    area,
    header,
  }
}
