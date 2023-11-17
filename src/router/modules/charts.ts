/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const chartsRouter: RouteRecordRaw = {
	path: '/charts',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Charts',
	meta: {
		title: 'Charts',
		icon: 'chart',
		roles: ['admin']
	},
	children: [
		{
			path: 'inbound-chart',
			component: () => import('@/views/charts/inbound/index.vue'),
			name: 'inboundChart',
			meta: { title: 'InboundChart', noCache: true }
		},
		{
			path: 'outbound-chart',
			component: () => import('@/views/charts/outbound/index.vue'),
			name: 'outboundChart',
			meta: { title: 'OutboundChart', noCache: true }
		}
	]
}

export default chartsRouter
