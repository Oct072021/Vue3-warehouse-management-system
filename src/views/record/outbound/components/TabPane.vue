<template>
	<div>
		<m-Page
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
						v-loading="loading"
						align="center"
						label="#"
						width="50"
						element-loading-text="请给我点时间！"
						prop="id"
					/>

					<el-table-column
						width="180px"
						:label="t(`records.itemID`)"
						prop="itemID"
					/>

					<el-table-column
						min-width="160px"
						:label="t(`records.title`)"
					>
						<template #default="{ row }">
							<span>{{ row.title }}</span>
							<el-tag>{{ row.type }}</el-tag>
						</template>
					</el-table-column>

					<el-table-column
						width="120px"
						align="center"
						:label="t(`records.date`)"
					>
						<template #default="{ row }">
							<span>{{ parseTime(row.timestamp, '{y}-{m}-{d}') }}</span>
						</template>
					</el-table-column>

					<el-table-column
						width="90"
						align="center"
						:label="t(`records.client`)"
						prop="client"
					/>

					<el-table-column
						align="center"
						:label="t(`records.specs`)"
						width="95"
					>
						<template #default="{ row }"> {{ row.specs }}mm </template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`records.quantity`)"
						prop="quantity"
						width="80"
					/>

					<el-table-column
						class-name="status-col"
						:label="t(`records.price`)"
						prop="price"
						width="80"
					/>

					<el-table-column
						class-name="status-col"
						:label="t(`records.total`)"
						width="90"
					>
						<template #default="{ row }">{{ (row.price * row.quantity).toFixed(2) }}</template>
					</el-table-column>

					<el-table-column
						class-name="status-col"
						:label="t(`records.mass`)"
						width="90"
					>
						<template #default="{ row }"> {{ row.mass }}kg </template>
					</el-table-column>

					<el-table-column
						:label="t(`records.actions`)"
						align="center"
						width="170"
						class-name="small-padding fixed-width"
					>
						<template #default="{ row }">
							<el-button
								type="primary"
								size="small"
								@click="handleUpdate(row)"
								>{{ t(`button.edit`) }}</el-button
							>
							<el-button
								v-if="row.status != 'deleted'"
								size="small"
								type="danger"
								@click="handleRemove(row.id)"
								>{{ t(`button.delete`) }}</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</m-Page>
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

const { t } = useI18n()

const aliveStore = useAliveStore()

const props = withDefaults(
	defineProps<{
		type?: string
		searchList?: SearchData
	}>(),
	{
		type: 'GZ',
		searchList: () => {
			return {
				sort: '+id',
				title: undefined,
				itemID: undefined
			}
		}
	}
)
const emit = defineEmits<{
	(e: 'create', value: OutboundData[]): void
	(e: 'handleUpdate', value: OutboundData): void
}>()

watch(
	() => props.searchList,
	() => {
		resetAlive_search()
	},
	{ deep: true }
)

// init view
const list = ref<OutboundData[] | null>(null)
let listQuery = reactive<SearchData>({
	page: 1,
	limit: 10,
	sort: '+id',
	title: undefined,
	itemID: undefined,
	type: props.type
})
const loading = ref<boolean>(false)
const total = ref<number>(0)
const getList = async (pagination?: Pagination) => {
	if (pagination) listQuery = { ...listQuery, ...pagination }
	listQuery = { ...listQuery, ...props.searchList }

	loading.value = true

	const res = await getOutboundOrders(listQuery)

	list.value = res.data.items
	loading.value = false
	total.value = res.data.total
	emit('create', res.data.allItems) // return all data
}
getList()

// edit/delete order
const handleUpdate = (row: OutboundData) => {
	emit('handleUpdate', row)
}
const handleRemove = async (id: number) => {
	const res = await removeOutboundOrder(id)
	if (res.code === 20000) {
		ElNotification({
			title: 'Success',
			// @ts-ignore
			message: i18n.global.t(`tips.deleteMsg_success`),
			type: 'success',
			duration: 2000
		})
		getList()
	}
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
