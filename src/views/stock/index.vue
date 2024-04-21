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
						:label="t(`stock.productionID`)"
						prop="productionID"
						min-width="200px"
						align="center"
					/>

					<el-table-column
						:label="t(`stock.title`)"
						min-width="200px"
					>
						<template #default="{ row }">
							<span class="link-type">{{ row.title }}</span>
						</template>
					</el-table-column>

					<el-table-column
						:label="t(`stock.specs`)"
						min-width="80px"
						align="center"
					>
						<template #default="{ row }"> {{ row.specs }}mm </template>
					</el-table-column>
					<el-table-column
						:label="t(`stock.quantity`)"
						min-width="80px"
						align="center"
						prop="quantity"
					/>

					<el-table-column
						:label="t(`stock.unit`)"
						min-width="80px"
						align="center"
						prop="unit"
					/>

					<el-table-column
						align="center"
						:label="t(`area`)"
						min-width="70px"
					>
						<template #default="{ row }">
							<el-tag>{{ row.area }}</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</MPage>
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
watch(listQuery, () => handleFilter(), { deep: true })
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

// export
const downloadLoading = ref<boolean>(false)
const handleDownload = throttle(function () {
	downloadLoading.value = true
	import('@/vendor/Export2Excel').then(excel => {
		const tHeader = ['productionID', 'title', 'specs', 'quantity', 'unit']
		const filterVal = ['productionID', 'title', 'specs', 'quantity', 'unit']
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
