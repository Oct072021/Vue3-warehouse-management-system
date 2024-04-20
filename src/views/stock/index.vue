<template>
	<div class="app-container">
		<HeaderFilter
			:config-data="header"
			@buttonClick="buttonClick"
		/>

		<MPage
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="getList"
		>
			<template #table>
				<el-table
					v-loading="listLoading"
					:data="list"
					border
					fit
					highlight-current-row
					style="width: 100%"
					@sort-change="sortChange"
				>
					<el-table-column
						label="#"
						prop="id"
						sortable="custom"
						align="center"
						width="80"
						:class-name="getSortClass('id')"
					/>

					<el-table-column
						:label="t(`stock.orderID`)"
						prop="orderID"
						width="200px"
						align="center"
					/>

					<el-table-column
						:label="t(`stock.title`)"
						min-width="200px"
					>
						<template #default="{ row }">
							<span
								class="link-type"
								@click="handleUpdate(row)"
								>{{ row.title }}</span
							>
							<el-tag>{{ row.area }}</el-tag>
						</template>
					</el-table-column>

					<el-table-column
						:label="t(`stock.specs`)"
						width="120px"
						align="center"
					>
						<template #default="{ row }"> {{ row.specs }}mm </template>
					</el-table-column>
					<el-table-column
						:label="t(`stock.quantity`)"
						width="110px"
						align="center"
						prop="quantity"
					/>

					<el-table-column
						:label="t(`stock.mass`)"
						width="120px"
						align="center"
					>
						<template #default="{ row }"> {{ row.mass }}kg </template>
					</el-table-column>

					<el-table-column
						:label="t(`stock.actions`)"
						align="center"
						width="230"
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
								@click="handleDelete(row.id)"
								>{{ t(`button.delete`) }}</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</MPage>

		<el-dialog
			:title="t(`button.edit`)"
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
					:label="t(`stock.warehouse`)"
					prop="area"
				>
					<el-select
						v-model="temp.area"
						class="filter-item"
						placeholder="Please select"
					>
						<el-option
							v-for="item in calendarTypeOptions"
							:key="item.key"
							:label="item.display_name"
							:value="item.key"
						/>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="t(`stock.orderID`)"
					prop="orderID"
					>{{ temp.orderID }}</el-form-item
				>
				<el-form-item
					:label="t(`stock.title`)"
					prop="title"
				>
					<el-input v-model="temp.title" />
				</el-form-item>
				<el-form-item
					:label="t(`stock.specs`)"
					prop="specs"
				>
					<el-input v-model="temp.specs">
						<template #append>mm</template>
					</el-input>
				</el-form-item>
				<el-form-item
					:label="t(`stock.quantity`)"
					prop="quantity"
				>
					<el-input v-model="temp.quantity" />
				</el-form-item>
				<el-form-item
					:label="t(`stock.mass`)"
					prop="mass"
				>
					<el-input v-model="temp.mass">
						<template #append>kg</template>
					</el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogFormVisible = false">{{ t(`button.cancel`) }}</el-button>
					<el-button
						type="primary"
						@click="updateData(dataForm)"
						>{{ t(`button.confirm`) }}</el-button
					>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { updateStockInfo, removeStock, getStockData } from './service'
import { Options, SearchList, StockData } from './data.d'

import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'

import MPage from '@/components/mPage/index.vue' // page components
import HeaderFilter from '@/components/HeaderFilter/index.vue'

import { useI18n } from 'vue-i18n'
import i18n from '@/lang'
import { nextTick, reactive, ref, watch } from 'vue'
import { ElNotification, FormInstance } from 'element-plus'

import { useMap } from './mixin'

const { t } = useI18n()

const { header, area } = useMap()

// form rules
const rules = reactive({
	area: [{ required: true, message: 'area is required', trigger: 'change' }],
	orderID: [{ required: true, message: 'orderID is required', trigger: 'blur' }],
	title: [{ required: true, message: 'title is required', trigger: 'blur' }],
	specs: [{ required: true, message: 'specs is required', trigger: 'blur' }],
	quantity: [{ required: true, message: 'quantity is required', trigger: 'blur' }],
	mass: [{ required: true, message: 'mass is required', trigger: 'blur' }]
})
// warehouse info
const calendarTypeOptions = ref<Options[]>([
	{ key: 'area-1', display_name: 'area-1' },
	{ key: 'area-2', display_name: 'area-2' },
	{ key: 'area-3', display_name: 'area-3' },
	{ key: 'area-4', display_name: 'area-4' }
])

// header event
const buttonClick = (data: SearchList, e: string) => {
	if (e === 'search') {
		Object.assign(listQuery, { ...listQuery, ...data })
		handleFilter()
	} else if (e === 'export') {
		handleDownload()
	}
}

// search
const listQuery = reactive<SearchList>({
	page: 1,
	limit: 20,
	title: undefined,
	area: undefined,
	sort: '+id'
})
watch(
	listQuery,
	() => {
		handleFilter()
	},
	{ deep: true }
)
const handleFilter = () => {
	listQuery.page = 1
	getList()
}

// get data
const list = ref<StockData[] | null>(null)
const total = ref<number>(0)
const listLoading = ref<boolean>(false)
const getList = async () => {
	listLoading.value = true
	const res = await getStockData(listQuery)
	list.value = res.data.items
	total.value = res.data.total

	// Just to simulate the time of the request
	setTimeout(() => {
		listLoading.value = false
	}, 1 * 1000)
}

// sort
const sortChange = ({ prop, order }: any) => {
	// const { prop, order } = data
	if (prop === 'id') {
		sortByID(order)
	}
}
const sortByID = (order: string) => {
	if (order === 'ascending') {
		listQuery.sort = '+id'
	} else {
		listQuery.sort = '-id'
	}
	handleFilter()
}
const getSortClass = function (key: string) {
	const sort = listQuery.sort
	return sort === `+${key}` ? 'ascending' : 'descending'
}

// update
const temp = reactive<StockData>({
	id: undefined,
	orderID: '',
	specs: undefined,
	quantity: undefined,
	title: '',
	area: '',
	mass: undefined
})
const resetTemp = () => {
	Object.assign(temp, {
		id: undefined,
		orderID: '',
		specs: undefined,
		quantity: undefined,
		title: '',
		area: '',
		mass: undefined
	})
}
const dataForm = ref()
const dialogFormVisible = ref<boolean>(false)
const handleUpdate = (row: StockData) => {
	resetTemp()
	dialogFormVisible.value = true
	Object.assign(temp, row)
	nextTick(() => {
		dataForm.value.clearValidate()
	})
}
const updateData = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async valid => {
		if (valid) {
			const tempData = Object.assign({}, temp)
			const res = await updateStockInfo(tempData)
			if (res.code === 20000) {
				dialogFormVisible.value = false
				ElNotification({
					title: 'Success',
					// @ts-ignore
					message: i18n.global.t(`tips.updateMsg_success`),
					type: 'success',
					duration: 2000
				})
				getList()
			}
		}
	})
}

// delete
const handleDelete = async (id: number) => {
	const res = await removeStock(id)
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

// export
const downloadLoading = ref<boolean>(false)
const handleDownload = throttle(function () {
	downloadLoading.value = true
	import('@/vendor/Export2Excel').then(excel => {
		const tHeader = ['orderID', 'title', 'specs', 'quantity', 'mass']
		const filterVal = ['orderID', 'title', 'specs', 'quantity', 'mass']
		const data = formatJson(filterVal)
		excel.export_json_to_excel({
			header: tHeader,
			data,
			filename: 'stock'
		})
		downloadLoading.value = false
	})
}, 5 * 1000)
const formatJson = (filterVal: string[]) => {
	if (!list.value) return
	return list.value.map(v =>
		filterVal.map(j => {
			if (j === 'timestamp') {
				return parseTime(v[j])
			} else {
				return v[j]
			}
		})
	)
}

// create --init view
getList()
</script>
