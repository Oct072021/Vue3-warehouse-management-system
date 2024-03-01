import { defineStore } from 'pinia'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { Http } from '@/utils/request'

// import router, { resetRouter } from '@/router'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router'

import { UserState, UserInfo, LoginResponse, UserInfoResponse } from './data.d'

import { useTagsViewStore } from '../tagsView'
import { usePermissionStore } from '../permission'

export const useUserStore = defineStore('user', {
	state: (): UserState => ({
		token: getToken(),
		name: '',
		avatar: '',
		introduction: '',
		roles: []
	}),
	actions: {
		login(userInfo: UserInfo) {
			const { username, password } = userInfo
			return new Promise((resolve, reject) => {
				Http.postRequest<LoginResponse>('/vue-element-admin/user/login', {
					username: username.trim(),
					password: password
				})
					.then(response => {
						const { data, code } = response
						this.token = data.token
						setToken(data.token)
						resolve(code)
					})
					.catch((error: Error) => {
						reject(error)
					})
			})
		},

		// get user info
		getInfo(): Promise<UserInfoResponse> {
			return new Promise((resolve, reject) => {
				Http.getRequest<UserInfoResponse>('/vue-element-admin/user/info', { params: { token: this.token } })
					.then(response => {
						const { data } = response

						if (!data) {
							reject('Verification failed, please Login again.')
						}

						const { roles, name, avatar, introduction } = data

						// roles must be a non-empty array
						if (!roles || roles.length <= 0) {
							reject('getInfo: roles must be a non-null array!')
						}
						this.roles = roles
						this.name = name
						this.avatar = avatar
						this.introduction = introduction
						resolve(data)
					})
					.catch((error: Error) => {
						reject(error)
					})
			})
		},

		// user logout
		logout() {
			const tagViewStore = useTagsViewStore()

			return new Promise((resolve, reject) => {
				Http.postRequest('/vue-element-admin/user/logout')
					.then(() => {
						this.token = ''
						this.roles = []
						removeToken()
						// resetRouter()

						// reset visited views and cached views
						tagViewStore.delAllViews()

						resolve('logout success')
					})
					.catch((error: Error) => {
						reject(error)
					})
			})
		},

		// remove token
		resetToken() {
			return new Promise(resolve => {
				this.roles = []
				this.token = ''
				removeToken()
				resolve('remove token success')
			})
		},

		// dynamically modify permissions
		async changeRoles(role: string) {
			const tagViewStore = useTagsViewStore()
			const permissionStore = usePermissionStore()

			const token = role + '-token'

			// reset token
			this.token = token
			setToken(token)

			const { roles } = (await this.getInfo()) as UserInfoResponse

			// resetRouter()

			// generate accessible routes map based on roles
			const accessRoutes: RouteRecordRaw[] = await permissionStore.generateRoutes(roles)
			// dynamically add accessible routes
			accessRoutes.forEach(route => {
				router.addRoute(route)
			})

			// reset visited views and cached views
			tagViewStore.delAllViews()
			// dispatch('tagsView/delAllViews', null, { root: true })
		}
	}
})
