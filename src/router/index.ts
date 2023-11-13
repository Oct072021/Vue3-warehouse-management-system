import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

import recordRouter from './modules/record'

export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: { hidden: true }
	},

	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index.vue'),
				name: 'Dashboard',
				meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
			}
		]
	},

	recordRouter
]

export const asyncRoutes: RouteRecordRaw[] = []

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

// export function resetRouter() {
//   const newRouter = createRouter({
//     history: createWebHashHistory(),
//     routes,
//   })
//   router.match = newRouter.matcher // reset router
// }

export default router
