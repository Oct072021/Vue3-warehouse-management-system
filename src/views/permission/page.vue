<template>
	<div class="app-container">
		<SwitchRoles @change="handleRolesChange" />
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import SwitchRoles from './components/SwitchRoles.vue'

const router = useRouter()

const handleRolesChange = () => {
	router.push({ path: '/permission/index?' + +new Date() })
}
</script>
