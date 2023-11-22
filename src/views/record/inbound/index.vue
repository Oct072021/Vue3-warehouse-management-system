<template>
	<div class="tab-container">
		<el-tag>mounted times : {{ createdTimes }}</el-tag>
		<el-alert
			:closable="false"
			style="width: 200px; display: inline-block; vertical-align: middle; margin-left: 30px"
			title="Tab with keep-alive"
			type="success"
		/>

		<HeaderFilter
			:config-data="config"
			@buttonClick="buttonClick"
		/>

		<el-tabs
			v-model="activeName"
			style="margin-top: 15px"
			type="border-card"
		>
			<el-tab-pane
				v-for="item in tabMapOptions"
				:key="item.key"
				:label="item.label"
				:name="item.key"
			>
				<keep-alive :include="aliveComp">
					<TabPane
						v-if="activeName == item.key"
						ref="TabPaneRef"
						:key="item.key"
						:area="item.key"
						:searchList="list"
						@create="showCreatedTimes"
						@handleUpdate="handleUpdate"
					/>
				</keep-alive>
			</el-tab-pane>
		</el-tabs>

		<el-dialog
			:title="textMap[dialogStatus]"
			v-model="dialogFormVisible"
			align-center
		>
			<el-form
				ref="dataForm"
				:rules="rules"
				:model="temp"
				label-position="left"
				label-width="110px"
				style="width: 400px; margin-left: 50px"
			>
				<el-form-item
					:label="t(`records.warehouse`)"
					prop="area"
				>
					<el-select
						v-model="temp.area"
						class="filter-item"
						placeholder="Please select"
						style="width: 300px"
					>
						<el-option
							v-for="item in tabMapOptions"
							:key="item.key"
							:label="item.label"
							:value="item.key"
						/>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="t(`records.itemID`)"
					prop="itemID"
				>
					<el-input v-model="temp.itemID" />
				</el-form-item>
				<el-form-item
					:label="t(`records.title`)"
					prop="title"
				>
					<el-input v-model="temp.title" />
				</el-form-item>
				<el-form-item
					:label="t(`records.specs`)"
					prop="specs"
				>
					<el-input v-model="temp.specs">
						<template #append>mm</template>
					</el-input>
				</el-form-item>
				<el-form-item
					:label="t(`records.quantity`)"
					prop="quantity"
				>
					<el-input v-model="temp.quantity" />
				</el-form-item>
				<el-form-item
					:label="t(`records.price`)"
					prop="price"
				>
					<el-input v-model="temp.price" />
				</el-form-item>
				<el-form-item
					:label="t(`records.mass`)"
					prop="mass"
				>
					<el-input v-model="temp.mass">
						<template #append>kg</template>
					</el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button
						type="success"
						style="float: left"
						>{{ t(`button.scan`) }}</el-button
					>
					<el-button @click="dialogFormVisible = false">{{ t(`button.cancel`) }}</el-button>
					<el-button
						type="primary"
						@click="dialogStatus === 'create' ? create(dataForm) : update(dataForm)"
						>{{ t(`button.confirm`) }}</el-button
					>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { createInboundOrder, updateInboundOrder } from './service'

import TabPane from './components/TabPane.vue'
import HeaderFilter from '@/components/HeaderFilter/index.vue'

import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'

import { config } from './config'

import { InboundData, SearchData } from './data.d'
import { Search } from '../types/data'

import { useAliveStore } from '@/store/alive'

import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, FormInstance } from 'element-plus'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

// keep-alive Arr
const aliveStore = useAliveStore()
const aliveComp = computed(() => {
	return aliveStore.aliveComp
})

// form rules
const rules = reactive({
	area: [{ required: true, message: 'area is required', trigger: 'change' }],
	itemID: [{ required: true, message: 'itemID is required', trigger: 'blur' }],
	title: [{ required: true, message: 'title is required', trigger: 'blur' }],
	specs: [{ required: true, message: 'specs is required', trigger: 'blur' }],
	quantity: [{ required: true, message: 'quantity is required', trigger: 'blur' }],
	price: [{ required: true, message: 'price is required', trigger: 'blur' }],
	mass: [{ required: true, message: 'mass is required', trigger: 'blur' }]
})
// warehouse info
const tabMapOptions = ref<{ [index: string]: string }[]>([
	{ key: 'area-1', label: 'area-1' },
	{ key: 'area-2', label: 'area-2' },
	{ key: 'area-3', label: 'area-3' },
	{ key: 'area-4', label: 'area-4' }
])

// init view
const activeName = ref<string>('area-1')
watch(activeName, (val: string) => {
	router.push(`${route.path}?tab=${val}`)
})
const tab = route.query.tab
if (tab) {
	activeName.value = tab as string
}

// header event
const list = reactive<Search>({
	title: undefined,
	itemID: undefined,
	sort: '+id'
})
const buttonClick = (data: SearchData, e: string) => {
	switch (e) {
		case 'search':
			Object.assign(list, { ...list, ...data })
			break
		case 'add':
			handleCreate()
			break
		case 'export':
			handleDownload()
			break
	}
}

// mount times
const createdTimes = ref<number>(0)
const showCreatedTimes = (data: InboundData[]) => {
	createdTimes.value++
	allData.value = data
}

// export data
const allData = ref<InboundData[] | null>(null)
const downloadLoading = ref<boolean>(false)
const handleDownload = throttle(function () {
	downloadLoading.value = true
	import('@/vendor/Export2Excel').then(excel => {
		const tHeader = ['itemID', 'title', 'data', 'specs', 'quantity', 'price', 'mass']
		const filterVal = ['itemID', 'title', 'timestamp', 'specs', 'quantity', 'price', 'mass']
		const data = formatJson(filterVal)
		excel.export_json_to_excel({
			header: tHeader,
			data,
			filename: `inbound-list-${activeName.value}`
		})
		downloadLoading.value = false
	})
}, 5 * 1000)
const formatJson = (filterVal: string[]) => {
	return allData.value!.map(v =>
		filterVal.map(j => {
			if (j === 'timestamp') {
				return parseTime(v[j])
			} else {
				return v[j]
			}
		})
	)
}

// refresh view
const TabPaneRef = ref()
const handleFilter = () => {
	TabPaneRef.value[0].resetAlive_search()
}

// create && update
const dataForm = ref()
const dialogStatus = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const textMap = reactive<{ [index: string]: string }>({
	update: 'Edit',
	create: 'Create'
})
const temp = reactive<InboundData>({
	id: undefined,
	itemID: '',
	specs: '',
	quantity: undefined,
	price: undefined,
	title: '',
	area: '',
	mass: undefined,
	timestamp: ''
})
const resetTemp = () => {
	Object.assign(temp, {
		id: undefined,
		itemID: '',
		specs: '',
		timestamp: new Date(),
		title: '',
		quantity: undefined,
		price: undefined,
		area: '',
		mass: undefined
	})
}
const handleCreate = () => {
	resetTemp()
	dialogStatus.value = 'create'
	dialogFormVisible.value = true
	nextTick(() => {
		dataForm.value.clearValidate()
	})
}
const create = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async valid => {
		if (valid) {
			const res = await createInboundOrder(temp)

			if (res.code === 20000) {
				dialogFormVisible.value = false
				ElNotification({
					title: 'Success',
					// @ts-ignore
					message: i18n.global.t(`tips.createMsg_success`),
					type: 'success',
					duration: 2000
				})
				// refresh the view
				handleFilter()
			}
		}
	})
}
const handleUpdate = (row: InboundData) => {
	Object.assign(temp, row) // copy obj
	dialogStatus.value = 'update'
	dialogFormVisible.value = true
	nextTick(() => {
		dataForm.value.clearValidate()
	})
}
const update = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async valid => {
		if (valid) {
			const res = await updateInboundOrder(temp)

			if (res.code === 20000) {
				dialogFormVisible.value = false
				ElNotification({
					title: 'Success',
					// @ts-ignore
					message: i18n.global.t(`tips.updateMsg_success`),
					type: 'success',
					duration: 2000
				})
				// refresh the view
				handleFilter()
			}
		}
	})
}
</script>

<style scoped>
.tab-container {
	margin: 30px;
}
</style>
