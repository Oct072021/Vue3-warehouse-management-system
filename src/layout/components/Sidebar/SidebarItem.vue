<template>
	<template v-if="!item.meta || !item.meta.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
				(!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
				(!item.meta || !item.meta.alwaysShow)
			"
		>
			<AppLink
				v-if="onlyOneChild.meta"
				:to="resolvePath(onlyOneChild.path)"
			>
				<el-menu-item
					:index="resolvePath(onlyOneChild.path)"
					:class="{ 'submenu-title-noDropdown': !isNest }"
				>
					<Item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
					<template #title>
						<span>{{ generateTitle(onlyOneChild.meta.title) }}</span>
					</template>
				</el-menu-item>
			</AppLink>
		</template>

		<el-sub-menu
			v-else
			ref="subMenu"
			:index="resolvePath(item.path)"
			teleported
		>
			<template #title>
				<Item
					v-if="item.meta"
					:icon="item.meta && (item.meta.icon as string)"
				/>
				<span>{{ item.meta && generateTitle(item.meta.title as string) }}</span>
			</template>
			<SidebarItem
				v-for="child in item.children"
				:key="child.path"
				:is-nest="true"
				:item="child"
				:base-path="resolvePath(child.path)"
				class="nest-menu"
			/>
		</el-sub-menu>
	</template>
</template>

<script lang="ts" setup>
import path from 'path-browserify'

import { isExternal } from '@/utils/validate'
import { generateTitle } from '@/utils/i18n'

import Item from './Item.vue'
import AppLink from './Link.vue'

import { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'

const props = withDefaults(
	defineProps<{
		item: RouteRecordRaw
		isNest?: boolean
		basePath?: string
		class?: string
	}>(),
	{
		isNest: false,
		basePath: '',
		class: ''
	}
)

const onlyOneChild = ref<any>(null)

const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
	const showingChildren = children.filter(item => {
		if (item.meta && item.meta.hidden) {
			return false
		} else {
			// Temp set(will be used if only has one showing child)
			onlyOneChild.value = item
			return true
		}
	})

	// When there is only one child router, the child router is displayed by default
	if (showingChildren.length === 1) {
		return true
	}

	// Show parent if there are no child router to display
	if (showingChildren.length === 0) {
		onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
		return true
	}

	return false
}

const resolvePath = (routePath: string) => {
	if (isExternal(routePath)) {
		return routePath
	}
	if (isExternal(props.basePath)) {
		return props.basePath
	}
	return path.resolve(props.basePath, routePath)
}
</script>
