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
				v-for="item in area"
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
						@toDetail="toDetail"
						@handleAudit="handleAudit"
					/>
				</keep-alive>
			</el-tab-pane>
		</el-tabs>

		<el-dialog
			:title="title[dialogStatus]"
			v-model="dialogFormVisible"
			align-center
			width="900px"
		>
			<el-form
				ref="dataForm"
				:model="temp"
				label-position="left"
			>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item
							:label="t(`orders.orderID`) + ':'"
							prop="orderID"
						>
							{{ temp.orderID }}
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item
							:label="t(`orders.type`) + ':'"
							prop="type"
						>
							{{ type[temp.type!] }}
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item
							:label="t(`orders.status`) + ':'"
							prop="status"
						>
							<el-tag :type="status[temp.status][1]">
								{{ status[temp.status][0] }}
							</el-tag>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item
							:label="t(`orders.supplier`) + ':'"
							prop="supplier"
						>
							{{ temp.supplier }}
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item
							:label="t(`orders.contact`) + ':'"
							prop="contact"
						>
							{{ temp.contact }}
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item
							:label="t(`orders.number`) + ':'"
							prop="number"
						>
							{{ temp.number }}
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item
							:label="t(`orders.documenter`) + ':'"
							prop="documenter"
						>
							{{ temp.documenter }}
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item
							:label="t(`orders.date`) + ':'"
							prop="timestamp"
						>
							{{ temp.timestamp }}
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item
							:label="t(`orders.remark`) + ':'"
							prop="remark"
						>
							{{ temp.remark }}
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="20">
						<el-form-item
							:label="t(`orders.reason`) + ':'"
							prop="reason"
						>
							<el-input
								v-if="dialogStatus === 'audit'"
								v-model="temp.reason"
								:rows="3"
								type="textarea"
							/>
							<span v-else>{{ temp.reason }}</span>
						</el-form-item>
					</el-col>
				</el-row>

				<el-table
					:data="temp.production"
					border
					fit
					highlight-current-row
					header-cell-class-name="table_header"
					style="width: 100%"
				>
					<el-table-column
						min-width="100px"
						:label="t(`orders.productionID`)"
						align="center"
						prop="productionID"
					/>

					<el-table-column
						min-width="100px"
						:label="t(`orders.productionName`)"
						align="center"
						prop="productionName"
					/>

					<el-table-column
						align="center"
						:label="t(`orders.specs`)"
						min-width="95"
					>
						<template #default="{ row }"> {{ `${row.specs1} × ${row.specs2}` }} </template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.price`)"
						prop="price"
						min-width="80"
					/>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.quantity`)"
						min-width="80"
					>
						<template #default="{ row }">
							{{ row.quantity + ' /件' }}
						</template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.total`)"
						prop="supplier"
						min-width="90"
					>
						<template #default="{ row }">
							{{ (row.price * row.quantity).toFixed(2) }}
						</template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.area`)"
						min-width="105"
					>
						{{ temp.area }}
					</el-table-column>
				</el-table>
			</el-form>

			<template #footer>
				<div class="dialog-footer">
					<template v-if="dialogStatus === 'audit'">
						<el-button
							type="success"
							@click="audit(temp, 1)"
							>{{ t(`button.pass`) }}</el-button
						>
						<el-button
							type="danger"
							@click="audit(temp, 2)"
							>{{ t(`button.noPass`) }}</el-button
						>
					</template>
					<el-button @click="dialogFormVisible = false">{{ t(`button.cancel`) }}</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { auditOrder, createInboundOrder, getDetail, updateInboundOrder } from './service'

import TabPane from './components/TabPane.vue'
import HeaderFilter from '@/components/HeaderFilter/index.vue'

import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'

import { CreateAndUpdate, InboundData, InboundDetail, SearchData } from './data.d'
import { Search } from '../types/data'

import { useAliveStore } from '@/store/alive'

import { computed, nextTick, reactive, ref, watch, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, FormInstance } from 'element-plus'

import { config } from './config'
import { useMap } from './mixin'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

// keep-alive Arr
const aliveStore = useAliveStore()
const aliveComp = computed(() => {
	return aliveStore.aliveComp
})

// variable mapping
const { type, status, title, area } = useMap()

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
	type: undefined,
	orderID: undefined,
	status: undefined
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
		const tHeader = ['orderID', 'title', 'data', 'specs', 'quantity', 'price', 'mass']
		const filterVal = ['orderID', 'title', 'timestamp', 'specs', 'quantity', 'price', 'mass']
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
const temp = reactive<InboundDetail>({
	id: -1,
	orderID: '',
	status: -1,
	area: '',
	type: -1,
	timestamp: '',
	supplier: '',
	documenter: '',
	number: undefined,
	remark: '',
	contact: '',
	reason: '',
	production: [],
	auditor: ''
})
const handleCreate = () => {
	router.push({ path: '/order/create_update' })
}
const handleUpdate = (id: number) => {
	router.push({ path: '/order/create_update', query: { id } })
}
// const update = (formEl: FormInstance | undefined) => {
// 	if (!formEl) return
// 	formEl.validate(async valid => {
// 		if (valid) {
// 			const res = await updateInboundOrder(temp)

// 			if (res.code === 20000) {
// 				dialogFormVisible.value = false
// 				ElNotification({
// 					title: 'Success',
// 					// @ts-ignore
// 					message: i18n.global.t(`tips.updateMsg_success`),
// 					type: 'success',
// 					duration: 2000
// 				})
// 				// refresh the view
// 				handleFilter()
// 			}
// 		}
// 	})
// }

// order detail
const toDetail = async (id: number) => {
	const res = await getDetail(id)
	Object.assign(temp, res.data)
	dialogStatus.value = 'detail'
	dialogFormVisible.value = true
	nextTick(() => {
		dataForm.value.clearValidate()
	})
}

// audit
const handleAudit = async (id: number) => {
	const res = await getDetail(id)
	Object.assign(temp, res.data)
	dialogStatus.value = 'audit'
	dialogFormVisible.value = true
	nextTick(() => {
		dataForm.value.clearValidate()
	})
}
const audit = async (detail: InboundDetail, status: number) => {
	const res = await auditOrder({ detail, status })
	if (res.code === 20000) {
		dialogFormVisible.value = false
		ElNotification({
			title: 'Success',
			message: i18n.global.t(`tips.audit_success`),
			type: 'success',
			duration: 2000
		})
		// refresh the view
		handleFilter()
	}
}
</script>

<style lang="scss" scoped>
.tab-container {
	margin: 30px;
}
</style>
