<template>
	<el-table
		:data="list"
		style="width: 100%; padding-top: 15px"
	>
		<el-table-column
			:label="t(`dashboard.itemID`)"
			min-width="200"
		>
			<template #default="scope">{{ scope.row.itemID }}</template>
		</el-table-column>
		<el-table-column
			:label="t(`dashboard.total`)"
			width="195"
			align="center"
		>
			<template #default="scope">¥{{ (scope.row.price * scope.row.quantity).toFixed(1) }}</template>
		</el-table-column>
		<el-table-column
			:label="t(`dashboard.from`)"
			width="100"
			align="center"
		>
			<template #default="scope">
				<el-tag>{{ scope.row.type }}</el-tag>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { fetchList } from '@/views/record/inbound/api'
import { InboundData } from '@/views/record/inbound/data.d'

import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const list = ref<InboundData[] | null>(null)

onBeforeMount(() => {
	fetchData()
})

const fetchData = () => {
	fetchList().then(response => {
    console.log(response.data.items);
    
		list.value = response.data.items.slice(3, 11)
	})
}
</script>
