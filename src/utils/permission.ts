import { useUserStore } from '@/store/user'

const userStore = useUserStore()
/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value: string[]) {
	if (value && value instanceof Array && value.length > 0) {
		const roles = userStore.roles
		const permissionRoles = value

		const hasPermission = roles.some(role => {
			return permissionRoles.includes(role)
		})
		return hasPermission
	} else {
		console.error(`need roles! Like v-permission="['admin','editor']"`)
		return false
	}
}
