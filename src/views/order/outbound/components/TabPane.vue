<template>
	<div>
		<MPage
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="getList"
		>
			<template #table>
				<el-table
					:data="list"
					border
					fit
					highlight-current-row
					style="width: 100%"
					draggable
				>
					<el-table-column
						min-width="130px"
						:label="t(`orders.orderID`)"
						prop="orderID"
						align="center"
					/>

					<el-table-column
						min-width="130px"
						:label="t(`orders.title`)"
						align="center"
						prop="title"
					/>

					<el-table-column
						min-width="120px"
						align="center"
						:label="t(`orders.date`)"
					>
						<template #default="scope">
							<span>{{ parseTime(scope.row.timestamp, '{y}-{m}-{d}') }}</span>
						</template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.type`)"
						min-width="120"
					>
						<template #default="{ row }">
							{{ type[row.type] }}
						</template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.client`)"
						prop="client"
						min-width="110"
					/>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.documenter`)"
						prop="documenter"
						min-width="120"
					/>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.status`)"
						min-width="120"
					>
						<template #default="{ row }">
							<el-tag :type="status[row.status][1]">
								{{ status[row.status][0] }}
							</el-tag>
						</template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`orders.auditor`)"
						min-width="110"
						prop="auditor"
					/>

					<el-table-column
						:label="t(`orders.actions`)"
						align="center"
						min-width="270"
						class-name="small-padding fixed-width"
					>
						<template #default="{ row }">
							<el-button
								type="info"
								size="small"
								@click="toDetail(row.id)"
								>{{ t(`button.detail`) }}</el-button
							>
							<el-button
								type="primary"
								size="small"
								@click="handleUpdate(row.id)"
								>{{ t(`button.edit`) }}</el-button
							>
							<el-button
								v-if="row.status === 0"
								size="small"
								type="warning"
								@click="handleAudit(row.id)"
								>{{ t(`button.audit`) }}</el-button
							>
							<el-button
								size="small"
								type="danger"
								@click="handleRemove(row.id)"
								>{{ t(`button.delete`) }}</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</MPage>
	</div>
</template>

<script lang="ts" setup>
import { getOutboundOrders, removeOutboundOrder } from '../service'
import { SearchData, OutboundData } from '../data.d'
import { Pagination } from '@/types/pagination'

import MPage from '@/components/mPage/index.vue'

import i18n from '@/lang'

import { useAliveStore } from '@/store/alive'

import { ElNotification } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { parseTime } from '@/utils'
import { useMap } from '../mixin'

const { t } = useI18n()

const aliveStore = useAliveStore()

const props = withDefaults(
	defineProps<{
		area?: string
		searchList?: SearchData
	}>(),
	{
		area: 'area-1',
		searchList: () => {
			return {
				status: undefined,
				type: undefined,
				orderID: undefined
			}
		}
	}
)
const emit = defineEmits<{
	(e: 'create'): void
	(e: 'handleUpdate', value: number): void
	(e: 'toDetail', value: number): void
	(e: 'handleAudit', value: number): void
}>()

watch(
	() => props.searchList,
	() => {
		Object.assign(listQuery, props.searchList)
		resetAlive_search()
	},
	{ deep: true }
)

// variable mapping
const { type, status } = useMap()

// init view
const list = ref<OutboundData[] | null>(null)
const listQuery = reactive<SearchData>({
	page: 1,
	limit: 10,
	type: undefined,
	status: undefined,
	orderID: undefined,
	area: props.area
})
const loading = ref<boolean>(false)
const total = ref<number>(0)
const getList = async (pagination?: Pagination) => {
	if (pagination) Object.assign(listQuery, pagination)

	loading.value = true

	const res = await getOutboundOrders(listQuery)

	list.value = res.data.items
	loading.value = false
	total.value = res.data.total
	emit('create')
}
getList()

// edit\delete order
const handleUpdate = (id: number) => {
	emit('handleUpdate', id)
}
const handleRemove = async (id: number) => {
	const res = await removeOutboundOrder(id)
	if (res.code === 20000) {
		ElNotification({
			title: 'Success',
			message: i18n.global.t(`tips.deleteMsg_success`),
			type: 'success',
			duration: 2000
		})
		getList()
	}
}

const toDetail = (id: number) => {
	emit('toDetail', id)
}

const handleAudit = (id: number) => {
	emit('handleAudit', id)
}

// reset keep-alive
const resetAlive_search = () => {
	// To clear keep-alive cache,ensure the operation of the search function
	aliveStore.removeAlive() // remove keep-alive cache
	getList()
	// reset keep-alive cache
	setTimeout(() => {
		aliveStore.setAlive()
	}, 0)
}

defineExpose({
	resetAlive_search
})
</script>
<style lang="scss" scoped></style>
