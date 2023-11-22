<template>
	<div class="app-container">
		<el-button
			type="primary"
			@click="handleAddRole"
			>{{ t(`permission.newRole`) }}</el-button
		>

		<el-table
			:data="rolesList"
			style="width: 100%; margin-top: 30px"
			border
		>
			<el-table-column
				align="center"
				:label="t(`permission.key`)"
				width="220"
			>
				<template #default="{ row }">{{ row.key }}</template>
			</el-table-column>
			<el-table-column
				align="center"
				:label="t(`permission.name`)"
				width="220"
			>
				<template #default="{ row }">{{ row.name }}</template>
			</el-table-column>
			<el-table-column
				align="header-center"
				:label="t(`permission.description`)"
			>
				<template #default="{ row }">{{ row.description }}</template>
			</el-table-column>
			<el-table-column
				align="center"
				:label="t(`permission.operations`)"
			>
				<template #default="{ row }">
					<el-button
						type="primary"
						size="small"
						@click="handleEdit(row)"
						>{{ t(`button.edit`) }}</el-button
					>
					<el-button
						type="danger"
						size="small"
						@click="handleDelete(row)"
						>{{ t(`button.delete`) }}</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog
			v-model="dialogVisible"
			:title="dialogType === 'edit' ? t(`permission.editRole`) : t(`permission.newRole`)"
		>
			<el-form
				:model="role"
				label-width="80px"
				label-position="left"
			>
				<el-form-item :label="t(`permission.name`)">
					<el-input
						v-model="role.name"
						placeholder="Role Name"
					/>
				</el-form-item>
				<el-form-item :label="t(`permission.desc`)">
					<el-input
						v-model="role.description"
						:autosize="{ minRows: 2, maxRows: 4 }"
						type="textarea"
						placeholder="Role Description"
					/>
				</el-form-item>
				<el-form-item :label="t(`permission.menus`)">
					<el-tree
						ref="tree"
						:check-strictly="checkStrictly"
						:data="routesData"
						:props="defaultProps"
						show-checkbox
						node-key="path"
						class="permission-tree"
					/>
				</el-form-item>
			</el-form>
			<div style="text-align: right">
				<el-button
					type="danger"
					@click="dialogVisible = false"
					>{{ t(`button.cancel`) }}</el-button
				>
				<el-button
					type="primary"
					@click="confirmRole"
					>{{ t(`button.submit`) }}</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import path from 'path-browserify'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import i18n from '@/lang'
import { computed, reactive, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { RolesData } from './data.d'

const role = reactive({
	key: '',
	name: '',
	description: '',
	routes: []
})
const routes = ref<RouteRecordRaw[]>([])
const rolesList = ref<RolesData[]>([])
const dialogVisible = ref<boolean>(false)
const dialogType = ref<string>('new')
const checkStrictly = ref<boolean>(false)
const defaultProps = reactive({
	children: 'children',
	label: 'title'
})
const serviceRoutes=ref<RouteRecordRaw[]>([])

const routesData = computed(() => {
	return routes.value
})

const getRoutes = async () => {
	const res = await getRoutes()
	serviceRoutes.value = res.data
	this.routes = this.generateRoutes(res.data)
	console.log('route', this.routes)
}

const getRoles = async () => {
	const res = await getRoles()
	this.rolesList = res.data
}

// Reshape the routes structure so that it looks the same as the sidebar
const generateRoutes = (routes, basePath = '/') => {
	const res = []

	for (let route of routes) {
		// skip some route
		if (route.hidden) {
			continue
		}

		const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

		if (route.children && onlyOneShowingChild && !route.alwaysShow) {
			route = onlyOneShowingChild
		}

		const data = {
			path: path.resolve(basePath, route.path),
			title: route.meta && route.meta.title
		}

		// recursive child routes
		if (route.children) {
			data.children = this.generateRoutes(route.children, data.path)
		}
		res.push(data)
	}
	return res
}

const generateArr = routes => {
	let data = []
	routes.forEach(route => {
		data.push(route)
		if (route.children) {
			const temp = this.generateArr(route.children)
			if (temp.length > 0) {
				data = [...data, ...temp]
			}
		}
	})
	return data
}

const handleAddRole = () => {
	this.role = Object.assign({}, defaultRole)
	if (this.$refs.tree) {
		this.$refs.tree.setCheckedNodes([])
	}
	this.dialogType = 'new'
	this.dialogVisible = true
}

const handleEdit = scope => {
	this.dialogType = 'edit'
	this.dialogVisible = true
	this.checkStrictly = true
	this.role = deepClone(scope.row)
	this.$nextTick(() => {
		const routes = this.generateRoutes(this.role.routes)
		console.log('route', routes)
		this.$refs.tree.setCheckedNodes(this.generateArr(routes))
		// set checked state of a node not affects its father and child nodes
		this.checkStrictly = false
	})
}

const handleDelete = ({ $index, row }) => {
	this.$confirm(i18n.t(`tips.cancelTip`), i18n.t(`tips.warning`), {
		confirmButtonText: i18n.t(`button.confirm`),
		cancelButtonText: i18n.t(`button.cancel`),
		type: 'warning'
	})
		.then(async () => {
			await deleteRole(row.key)
			this.rolesList.splice($index, 1)
			this.$message({
				type: 'success',
				message: i18n.t(`tips.deleteMsg_successd`)
			})
		})
		.catch(err => {
			console.error(err)
		})
}

const generateTree = (routes, basePath = '/', checkedKeys) => {
	const res = []

	for (const route of routes) {
		const routePath = path.resolve(basePath, route.path)

		// recursive child routes
		if (route.children) {
			route.children = this.generateTree(route.children, routePath, checkedKeys)
		}

		if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
			res.push(route)
		}
	}
	return res
}

const confirmRole = async () => {
	const isEdit = this.dialogType === 'edit'

	const checkedKeys = this.$refs.tree.getCheckedKeys()
	this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

	if (isEdit) {
		// Edit Role
		const { code } = await updateRole(this.role.key, this.role)
		if (code === 20000) {
			this.$notify({
				title: 'Success',
				dangerouslyUseHTMLString: true,
				message: i18n.t(`tips.updateMsg_successd`),
				type: 'success'
			})
		}
	} else {
		// New Role
		const { code, data } = await addRole(this.role)
		if (code === 20000) {
			this.$notify({
				title: 'Success',
				dangerouslyUseHTMLString: true,
				message: `
            <div>Role Key: ${data.key}</div>
            <div>Role Name: ${data.name}</div>
            <div>Description: ${data.description}</div>
          `,
				type: 'success'
			})
		}
	}
	this.dialogVisible = false
	this.getRoles()
}

// reference: src/view/layout/components/Sidebar/SidebarItem.vue
const onlyOneShowingChild = (children = [], parent) => {
	let onlyOneChild = null
	const showingChildren = children.filter(item => !item.hidden)

	// When there is only one child route, the child route is displayed by default
	if (showingChildren.length === 1) {
		onlyOneChild = showingChildren[0]
		onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
		return onlyOneChild
	}

	// Show parent if there are no child route to display
	if (showingChildren.length === 0) {
		onlyOneChild = { ...parent, path: '', noShowingChildren: true }
		return onlyOneChild
	}

	return false
}

// create --init view
getRoutes()
getRoles()
</script>

<style lang="scss" scoped>
.app-container {
	.roles-table {
		margin-top: 30px;
	}

	.permission-tree {
		margin-bottom: 30px;
	}
}
</style>
