import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

const stockRouter: RouteRecordRaw = {
	path: '/stock',
	component: Layout,
	meta: {
		title: 'Stock',
		icon: 'table',
		roles: ['admin', 'dataOperator']
	},
	children: [
		{
			path: '',
			component: () => import('@/views/stock/index.vue'),
			name: 'stock',
			meta: { title: 'Stock' }
		}
	]
}
export default stockRouter
