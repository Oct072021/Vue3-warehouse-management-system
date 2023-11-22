<template>
	<div>
		<div style="margin-bottom: 15px">{{ t(`permission.roles`) }}: {{ roles }}</div>
		{{ t(`permission.switchRoles`) }}
		<el-radio-group v-model="switchRoles">
			<el-radio-button label="admin" />
			<el-radio-button label="dataOperator" />
			<el-radio-button label="accountant" />
		</el-radio-group>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{
	(e: 'change'): void
}>()

const userStore = useUserStore()

const roles = computed(() => {
	return userStore.roles
})
const switchRoles = computed({
	get() {
		return roles.value[0]
	},
	set(val: string) {
		userStore.changeRoles(val).then(() => {
			emit('change')
		})
	}
})
</script>
