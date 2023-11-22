import { useUserStore } from '@/store/user'

import { Directive, DirectiveBinding } from 'vue'

const userStore = useUserStore()

function checkPermission(el: any, binding: DirectiveBinding) {
	const { value } = binding
	const roles = userStore && userStore.roles

	if (value && value instanceof Array) {
		if (value.length > 0) {
			const permissionRoles = value

			const hasPermission = roles.some(role => {
				return permissionRoles.includes(role)
			})

			if (!hasPermission) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		}
	} else {
		throw new Error(`need roles! Like v-permission="['admin','editor']"`)
	}
}

export const permission: Directive = {
	mounted(el, binding) {
		checkPermission(el, binding)
	},
	updated(el, binding) {
		checkPermission(el, binding)
	}
}
