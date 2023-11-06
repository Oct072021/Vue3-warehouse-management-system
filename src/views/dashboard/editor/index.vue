<template>
	<div class="dashboard-editor-container">
		<div class="clearfix">
			<PanThumb
				:image="avatar"
				style="float: left"
			>
				Your roles:
				<span
					v-for="item in roles"
					:key="item"
					class="pan-info-roles"
					>{{ item }}</span
				>
			</PanThumb>
			<GithubCorner style="position: absolute; top: 0px; border: 0; right: 0" />
			<div class="info-container">
				<span class="display_name">{{ name }}</span>
				<span style="font-size: 20px; padding-top: 20px; display: inline-block">{{ name }}'s Dashboard</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import PanThumb from '@/components/PanThumb/index.vue'
import GithubCorner from '@/components/GithubCorner/index.vue'

import { useUserStore } from '@/store/user'

import { computed } from 'vue'

const userStore = useUserStore()

const name = computed(() => {
	return userStore.name
})

const avatar = computed(() => {
	return userStore.avatar
})

const roles = computed(() => {
	return userStore.roles
})
</script>

<style lang="scss" scoped>
.emptyGif {
	display: block;
	width: 45%;
	margin: 0 auto;
}

.dashboard-editor-container {
	background-color: #e3e3e3;
	min-height: 100vh;
	padding: 50px 60px 0px;

	.pan-info-roles {
		font-size: 12px;
		font-weight: 700;
		color: #333;
		display: block;
	}

	.info-container {
		position: relative;
		margin-left: 190px;
		height: 150px;
		line-height: 200px;

		.display_name {
			font-size: 48px;
			line-height: 48px;
			color: #212121;
			position: absolute;
			top: 25px;
		}
	}
}
</style>
