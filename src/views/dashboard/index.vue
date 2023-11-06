<template>
	<div class="dashboard-container">
		<component :is="comps[currentRole]" />
	</div>
</template>

<script lang="ts" setup>
import admin from './admin/index.vue'
import editor from './editor/index.vue'

import { useUserStore } from '@/store/user'

import { computed, onBeforeMount, ref } from 'vue'

const comps: { [index: string]: any } = { admin, editor }

const userStore = useUserStore()

const roles = computed(() => {
	return userStore.roles
})

const currentRole = ref<string>('admin')

onBeforeMount(() => {
	if (!roles.value.includes('admin')) {
		currentRole.value = 'editor'
	}
})
</script>
