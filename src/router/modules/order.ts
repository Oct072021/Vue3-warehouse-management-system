/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const recordRouter: RouteRecordRaw = {
	path: '/order',
	component: Layout,
	meta: {
		title: 'Order',
		icon: 'tab',
		roles: ['admin', 'dataOperator']
	},
	children: [
		{
			path: 'inbound',
			component: () => import('@/views/order/inbound/index.vue'),
			name: 'inbound',
			meta: { title: 'Inbound' }
		},
		{
			path: 'inbound/create_update',
			component: () => import('@/views/order/inbound/Create_Update/index.vue'),
			meta: { hidden: true }
		},
		{
			path: 'outbound',
			component: () => import('@/views/order/outbound/index.vue'),
			name: 'outbound',
			meta: { title: 'Outbound' }
		},
		{
			path: 'outbound/create_update',
			component: () => import('@/views/order/outbound/Create_Update/index.vue'),
			meta: { hidden: true }
		}
	]
}

export default recordRouter
