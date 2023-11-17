<template>
	<div class="chart-container">
		<el-switch
			v-model="value"
			class="switch"
			active-color="#13ce66"
			inactive-color="#1890FF"
			:active-text="t(`charts.turnover`)"
			:inactive-text="t(`charts.orders`)"
		/>
		<Chart
			height="100%"
			width="100%"
			:type="value"
			:data="data"
		/>
	</div>
</template>

<script lang="ts" setup>
import Chart from '@/components/Charts/index.vue'

import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { AllData } from '../types/data.d'
import { inboundTotal } from './api'

const { t } = useI18n()

const value = ref<boolean>(true)

const warehouse = ref<string[]>(['GZ', 'SZ', 'BJ', 'SH'])
const data = reactive<AllData>({
	GZ: {
		total: [],
		orders: []
	},
	SZ: {
		total: [],
		orders: []
	},
	BJ: {
		total: [],
		orders: []
	},
	SH: {
		total: [],
		orders: []
	}
})
const getData = () => {
	warehouse.value.forEach(async item => {
		const res = await inboundTotal(item)
		// data[item] = res.data
		const { total, orders } = res.data
		data[item].total = total
		data[item].orders = orders
	})
}
getData()
</script>

<style lang="scss" scoped>
.chart-container {
	position: relative;
	width: 100%;
	height: calc(100vh - 84px);

	.switch {
		position: absolute;
		right: 40px;
		top: 50px;
		z-index: 999;
	}
}

.switch-enter-active {
	transition: all 0.3s ease-out;
}

.switch-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.switch-enter-from,
.switch-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
