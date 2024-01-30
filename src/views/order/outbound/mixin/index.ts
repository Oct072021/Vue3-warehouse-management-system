import i18n from '@/lang'
import { computed } from 'vue'

export const useMap = () => {
	const type = computed(() => {
		return {
			'0': i18n.global.t('orders.purchase'),
			'1': i18n.global.t('orders.sell')
		}
	})
	const status = computed(() => {
		return {
			'0': [i18n.global.t('orders.wait'), 'info'],
			'1': [i18n.global.t('orders.success'), 'success'],
			'2': [i18n.global.t('orders.fail'), 'danger']
		}
	})
	const title = computed(() => {
		return {
			detail: i18n.global.t('orders.detail'),
			audit: i18n.global.t('orders.audit')
		}
	})
	const area = computed(() => {
		return [
			{ key: 'area-1', label: i18n.global.t('orders.area') + '-1' },
			{ key: 'area-2', label: i18n.global.t('orders.area') + '-2' },
			{ key: 'area-3', label: i18n.global.t('orders.area') + '-3' },
			{ key: 'area-4', label: i18n.global.t('orders.area') + '-4' }
		]
	})

	return {
		type,
		status,
		title,
		area
	}
}
