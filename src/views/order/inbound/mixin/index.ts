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
			{ key: 'area-1', label: t('orders.area') + '-1' },
			{ key: 'area-2', label: t('orders.area') + '-2' },
			{ key: 'area-3', label: t('orders.area') + '-3' },
			{ key: 'area-4', label: t('orders.area') + '-4' }
		]
	})

	return {
		type,
		status,
		title,
		area
	}
}
