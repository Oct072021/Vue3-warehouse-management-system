import { defineStore } from 'pinia'

import { asyncRoutes, constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

import { PermissionState } from './data.d'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
	if (route.meta && route.meta.roles) {
		return roles.some((role: string) => (route.meta!.roles as string[]).includes(role))
	} else {
		return true
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
	const res: RouteRecordRaw[] = []

	routes.forEach((route: RouteRecordRaw) => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				// recursion
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})

	return res
}

export const usePermissionStore = defineStore('permission', {
	state: (): PermissionState => ({
		routes: [],
		addRoutes: []
	}),
	actions: {
		generateRoutes(roles: string[]) {
			return new Promise<RouteRecordRaw[]>(resolve => {
				let accessedRoutes: RouteRecordRaw[]
				if (roles.includes('admin')) {
					accessedRoutes = asyncRoutes || []
				} else {
					accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
				}
				this.addRoutes = accessedRoutes
				this.routes = constantRoutes.concat(accessedRoutes)
				resolve(accessedRoutes)
			})
		}
	}
})
