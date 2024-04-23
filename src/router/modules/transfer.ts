import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

const transferRouter: RouteRecordRaw = {
	path: '/transfer',
	component: Layout,
	meta: {
		title: 'Transfer',
		icon: 'skill',
		roles: ['admin']
	},
	children: [
		{
			path: '',
			component: () => import('@/views/transfer/index.vue'),
			name: 'transfer',
			meta: { title: 'Transfer' }
		},
		{
			path: 'create_update',
			component: () => import('@/views/transfer/Create_Update/index.vue'),
			meta: { hidden: true }
		}
	]
}
export default transferRouter
