import i18n from '@/lang'
import { computed } from 'vue'

const { t } = i18n.global

export const useMap = () => {
	const type = computed(() => {
		return {
			'0': t('orders.normal'),
			'1': t('orders.return')
		}
	})
	const status = computed(() => {
		return {
			'0': [t('orders.wait'), 'info'],
			'1': [t('orders.success'), 'success'],
			'2': [t('orders.fail'), 'danger']
		}
	})
	const title = computed(() => {
		return {
			detail: t('orders.detail'),
			audit: t('orders.audit')
		}
	})
	const area = computed(() => {
		return [
			{ key: 'area-1', label: t('area') + '-1' },
			{ key: 'area-2', label: t('area') + '-2' },
			{ key: 'area-3', label: t('area') + '-3' },
			{ key: 'area-4', label: t('area') + '-4' }
		]
	})
	const header = computed(() => {
		return [
			{
				type: 'input',
				placeholder: t('orders.orderID'),
				name: 'orderID',
				styles: {
					width: '200px'
				},
				event: 'search'
			},
			{
				type: 'select',
				placeholder: t('orders.type'),
				name: 'type',
				styles: {
					width: '150px'
				},
				options: [
					{ label: t('orders.normal'), key: 0 },
					{ label: t('orders.return'), key: 1 }
				]
			},
			{
				type: 'select',
				placeholder: t('orders.status'),
				name: 'status',
				styles: {
					width: '150px'
				},
				options: [
					{ label: t('orders.wait'), key: 0 },
					{ label: t('orders.success'), key: 1 },
					{ label: t('orders.fail'), key: 2 }
				]
			},
			{
				type: 'button',
				name: t('button.search'),
				buttonType: 'primary',
				icon: 'search',
				styles: {
					margin: '0 10px 0 0'
				},
				event: 'search'
			},
			{
				type: 'button',
				name: t('button.add'),
				buttonType: 'primary',
				icon: 'edit',
				styles: {
					margin: '0 10px 0 0'
				},
				event: 'add'
			},
			{
				type: 'button',
				name: t('button.export'),
				buttonType: 'primary',
				icon: 'download',
				styles: {
					margin: '0 10px 0 0'
				},
				event: 'export'
			}
		]
	})

	return {
		type,
		status,
		title,
		area,
		header
	}
}
