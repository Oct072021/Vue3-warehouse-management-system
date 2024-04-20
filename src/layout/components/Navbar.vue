<template>
	<div class="navbar">
		<Hamburger
			id="hamburger-container"
			:is-active="sidebar.opened"
			class="hamburger-container"
			@toggleClick="toggleSideBar"
		/>

		<Breadcrumb
			id="breadcrumb-container"
			class="breadcrumb-container"
		/>

		<div class="right-menu">
			<template v-if="device !== 'mobile'">
				<Search
					id="header-search"
					class="right-menu-item"
				/>

				<ErrorLog class="errLog-container right-menu-item hover-effect" />

				<Screenfull
					id="screenfull"
					class="right-menu-item hover-effect"
				/>

				<el-tooltip
					content="Global Size"
					effect="dark"
					placement="bottom"
				>
					<SizeSelect
						id="size-select"
						class="right-menu-item hover-effect"
					/>
				</el-tooltip>

				<el-tooltip
					content="Language Select"
					effect="dark"
					placement="bottom"
				>
					<LangSelect
						id="lang-select"
						class="right-menu-item hover-effect"
					/>
				</el-tooltip>
			</template>

			<el-dropdown
				class="avatar-container right-menu-item hover-effect"
				trigger="click"
			>
				<div class="avatar-wrapper">
					<img
						:src="avatar + '?imageView2/1/w/80/h/80'"
						class="user-avatar"
					/>
					<el-icon
						:size="12"
						style="margin-left: 10px"
						><CaretBottom
					/></el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<router-link to="/">
							<el-dropdown-item>Dashboard</el-dropdown-item>
						</router-link>
						<a
							target="_blank"
							href="https://github.com/Oct072021/warehouse-management-system/"
						>
							<el-dropdown-item>Github</el-dropdown-item>
						</a>
						<a
							target="_blank"
							href="https://panjiachen.github.io/vue-element-admin-site/#/"
						>
							<el-dropdown-item>Docs</el-dropdown-item>
						</a>
						<el-dropdown-item
							divided
							@click="logout"
						>
							<span style="display: block">Log Out</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import ErrorLog from '@/components/ErrorLog/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
import Search from '@/components/HeaderSearch/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'

import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

emits: ['click']

const userStore = useUserStore()
const appStore = useAppStore()

const router = useRouter()
const route = useRoute()

const device = computed(() => {
	return appStore.device
})

const avatar = computed(() => {
	return userStore.avatar
})

const sidebar = computed(() => {
	return appStore.sidebar
})
const toggleSideBar = () => {
	appStore.toggleSideBar()
}

const logout = async () => {
	await userStore.logout()
	router.push(`/login?redirect=${route.fullPath}`)
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.errLog-container {
		display: inline-block;
		vertical-align: top;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;

			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
