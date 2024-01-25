<template>
	<el-table
		:data="list"
		style="width: 100%; padding-top: 15px"
	>
		<el-table-column
			:label="t(`dashboard.orderID`)"
			min-width="200"
		>
			<template #default="{ row }">{{ row.orderID }}</template>
		</el-table-column>
		<el-table-column
			:label="t(`dashboard.total`)"
			width="195"
			align="center"
		>
			<template #default="{ row }">¥{{ (row.price * row.quantity).toFixed(1) }}</template>
		</el-table-column>
		<el-table-column
			:label="t(`dashboard.area`)"
			width="100"
			align="center"
		>
			<template #default="{ row }">
				<el-tag>{{ row.area }}</el-tag>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { fetchList } from '@/views/order/inbound/api'
import { InboundData } from '@/views/order/inbound/data.d'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const list = ref<InboundData[] | null>(null)

const fetchData = () => {
	fetchList().then(response => {
		list.value = response.data.items.slice(3, 11)
	})
}

// created --init data
fetchData()
</script>
