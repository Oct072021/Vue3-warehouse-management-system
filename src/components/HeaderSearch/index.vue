<template>
	<div
		:class="{ show: show }"
		class="header-search"
	>
		<SvgIcon
			class-name="search-icon"
			icon-class="search"
			@click.stop="click"
		/>
		<el-select
			ref="headerSearchSelectRef"
			v-model="search"
			:remote-method="querySearch"
			filterable
			default-first-option
			remote
			placeholder="Search"
			class="header-search-select"
			@change="change"
		>
			<el-option
				v-for="option in options"
				:key="option.item.path"
				:value="option"
				:label="option.item.title.join(' > ')"
			/>
		</el-select>
	</div>
</template>

<script lang="ts" setup>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path-browserify'

import { usePermissionStore } from '@/store/permission'

import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouteRecordRaw, useRouter } from 'vue-router'

import { RouteOption } from './data.d'

const { t } = useI18n()

const router = useRouter()

const permissionStore = usePermissionStore()

// search box  -- show and close
const show = ref<boolean>(false)
watch(show, value => {
	if (value) {
		document.body.addEventListener('click', close)
	} else {
		document.body.removeEventListener('click', close)
	}
})
const close = () => {
	headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
	options.value = []
	show.value = false
}
const headerSearchSelectRef = ref()
const click = () => {
	show.value = !show.value
	if (show.value) {
		headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
	}
}

// search method
const search = ref<string>('')
const options = ref<Fuse.FuseResult<RouteOption>[]>()
const querySearch = (query: string) => {
	if (query !== '') {
		options.value = fuse.value!.search(query)
	} else {
		options.value = []
	}
}
const change = (val: RouteRecordRaw) => {
	router.push(val.path)
	search.value = ''
	options.value = []
	nextTick(() => {
		show.value = false
	})
}

// search pool and fuzzy search
const routes = computed(() => {
	return permissionStore.routes
})
watch(routes, () => {
	searchPool.value = generateRoutes(routes.value)
})

const searchPool = ref<RouteOption[]>()
onMounted(() => {
	searchPool.value = generateRoutes(routes.value)
})
const fuse = ref<Fuse<RouteOption> | undefined>(undefined)
watch(searchPool, list => {
	initFuse(list!)
})
const initFuse = (list: RouteOption[]) => {
	fuse.value = new Fuse(list, {
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: [
			{
				name: 'title',
				weight: 0.7
			},
			{
				name: 'path',
				weight: 0.3
			}
		]
	})
}
// Filter out the routes that can be displayed in the sidebar
// And generate the internationalized title
const generateRoutes = (routes: RouteRecordRaw[], basePath = '/', prefixTitle: string[] = []) => {
	let res: RouteOption[] = []

	for (const route of routes) {
		// skip hidden router
		if (route.meta && route.meta.hidden) {
			continue
		}

		const data: RouteOption = {
			path: path.resolve(basePath, route.path),
			title: [...prefixTitle]
		}

		if (route.meta && route.meta.title) {
			// generate internationalized title
			const i18nTitle = t(`route.${route.meta.title}`)
			data.title = [...data.title, i18nTitle]

			if (route.redirect !== 'noRedirect') {
				// only push the routes with title
				// special case: need to exclude parent router without redirect
				res.push(data)
			}
		}

		// recursive child routes
		if (route.children) {
			const tempRoutes = generateRoutes(route.children, data.path, data.title)
			if (tempRoutes.length >= 1) {
				res = [...res, ...tempRoutes]
			}
		}
	}
	return res
}
</script>

<style lang="scss" scoped>
.header-search {
	// font-size: 0 !important;

	.search-icon {
		cursor: pointer;
		font-size: 18px;
		vertical-align: middle;
	}

	.header-search-select {
		font-size: 18px;
		transition: width 0.2s;
		width: 0;
		overflow: hidden;
		background: transparent;
		border-radius: 0;
		display: inline-block;
		vertical-align: middle;

		:deep(.el-input__inner) {
			border-radius: 0;
			border: 0;
			padding-left: 0;
			padding-right: 0;
			box-shadow: none !important;
			border-bottom: 1px solid #d9d9d9;
			vertical-align: middle;
		}
	}

	&.show {
		.header-search-select {
			width: 210px;
			margin-left: 10px;
		}
	}
}
</style>
