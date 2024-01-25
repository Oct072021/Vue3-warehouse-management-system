import i18n from '@/lang'
import { computed } from 'vue'

export const useMap = () => {
	const type = computed(() => {
		return {
			'0': i18n.global.t('orders.normal'),
			'1': i18n.global.t('orders.return')
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

	return {
		type,
		status,
		title
	}
}
