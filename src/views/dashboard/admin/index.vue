<template>
	<div class="dashboard-editor-container">
		<GithubCorner class="github-corner" />

		<PanelGroup
			:profit="profit"
			:orders="orders"
			@handleSetLineChartData="handleSetLineChartData"
		/>

		<el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
			<LineChart :chart-data="lineChartData[nowType]" />
		</el-row>

		<el-row :gutter="8">
			<el-col
				:xs="{ span: 24 }"
				:sm="{ span: 24 }"
				:md="{ span: 24 }"
				:lg="{ span: 12 }"
				:xl="{ span: 12 }"
				style="padding-right: 8px; margin-bottom: 30px"
			>
				<TransactionTable />
			</el-col>

			<el-col
				:xs="{ span: 24 }"
				:sm="{ span: 12 }"
				:md="{ span: 12 }"
				:lg="{ span: 6 }"
				:xl="{ span: 6 }"
				style="margin-bottom: 30px"
			>
				<TodoList />
			</el-col>

			<el-col
				:xs="{ span: 24 }"
				:sm="{ span: 12 }"
				:md="{ span: 12 }"
				:lg="{ span: 6 }"
				:xl="{ span: 6 }"
				style="margin-bottom: 30px"
			>
				<BoxCard />
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import GithubCorner from '@/components/GithubCorner/index.vue'
import PanelGroup from './components/PanelGroup.vue'
import LineChart from './components/LineChart.vue'
import TransactionTable from './components/TransactionTable.vue'
import TodoList from './components/TodoList/index.vue'
import BoxCard from './components/BoxCard.vue'

import { outboundTotal } from '@/views/record/outbound/api'
import { inboundTotal } from '@/views/record/inbound/api'

import { LineChartData } from './data.d'

import { onBeforeMount, reactive, ref } from 'vue'

const lineChartData = reactive<LineChartData>({
	profit: {
		inbound: [],
		outbound: [],
	},
	orders: {
		inbound: [],
		outbound: [],
	},
})
const nowType = ref<string>('profit')
const profit = ref<number>()
const orders = ref<number>()
const nowDate = ref<Date>(new Date())

onBeforeMount(() => {
	getData()
})
const handleSetLineChartData = (type: string) => {
	nowType.value = type
}
const getInboundData = async () => {
	const res = await inboundTotal()
	const { orders, total } = res.data
	// Get PanelGroup Data
	profit.value! -= eval(total.join('+'))
	orders.value += eval(orders.join('+'))
	// Get Chart Data
	const nowMonth = nowDate.value.getMonth() + 1
	const base = nowMonth > 3 && nowMonth < 9 ? nowMonth : nowMonth <= 3 ? 3 : 9
	lineChartData.profit.inbound = total.slice(base - 3, base + 3)
	lineChartData.orders.inbound = orders.slice(base - 3, base + 3)
}
const getOutboundData = async () => {
	const res = await outboundTotal()
	const { orders, total } = res.data
	// Get PanelGroup Data
	profit.value = eval(total.join('+'))
	orders.value = eval(orders.join('+'))
	// Get Chart Data
	const nowMonth = nowDate.value.getMonth() + 1
	const base = nowMonth > 3 && nowMonth < 9 ? nowMonth : nowMonth <= 3 ? 3 : 9
	lineChartData.profit.outbound = total.slice(base - 3, base + 3)
	lineChartData.orders.outbound = orders.slice(base - 3, base + 3)
}
const getData = () => {
	// Control the execution order of async tasks
	getOutboundData().then(() => {
		getInboundData()
	})
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
	position: relative;

	.github-corner {
		position: absolute;
		top: 0px;
		border: 0;
		right: 0;
	}

	.chart-wrapper {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
	}
}

@media (max-width: 1024px) {
	.chart-wrapper {
		padding: 8px;
	}
}
</style>
