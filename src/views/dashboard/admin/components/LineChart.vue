<template>
	<div
		:class="className"
		:style="{ height: height, width: width }"
		id="charts"
	/>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import i18n from '@/lang/index'

import { useAppStore } from '@/store/app'

import { ChartData } from './data.d'

const appStore = useAppStore()

// @ts-ignore
const { t } = i18n.global

const props = withDefaults(
	defineProps<{
		className?: string
		width?: string
		height?: string
		autoResize?: boolean
		chartData: ChartData
	}>(),
	{
		className: 'chart',
		width: '100%',
		height: '350px',
		autoResize: true
	}
)

const chart = ref<echarts.ECharts | null>(null)
const nowDate = ref<Date>(new Date())
const monthArr = ref<string[]>([])

const language = computed(() => {
	return appStore.language
})

watch(
	() => props.chartData,
	val => {
		setOptions(val)
	},
	{ deep: true }
)

watch(language, () => {
	initChart()
})

onMounted(() => {
	nextTick(() => {
		initChart()
	})
})
onBeforeUnmount(() => {
	if (!chart.value) {
		return
	}
	chart.value.dispose()
	chart.value = null
})

const initChart = () => {
	chart.value = echarts.init(document.getElementById('charts'), 'macarons')
	getMonthArr()
	setOptions(props.chartData)
}

const getMonthArr = () => {
	const nowMonth = nowDate.value.getMonth() + 1
	const start = nowMonth > 3 && nowMonth < 9 ? nowMonth : nowMonth <= 3 ? 3 : 9

	monthArr.value = t(`dashboard.month`)
		.split(',')
		.slice(start - 3, start + 3)
}

const setOptions = ({ inbound, outbound }: ChartData) => {
	if (!chart.value) {
		chart.value = echarts.init(document.getElementById('charts'), 'macarons')
	}
	const i18nInbound = t(`dashboard.inbound`)
	const i18nOutbound = t(`dashboard.outbound`)

	chart.value.setOption({
		xAxis: {
			data: monthArr.value,
			boundaryGap: false,
			axisTick: {
				show: false
			}
		},
		grid: {
			left: 10,
			right: 10,
			bottom: 20,
			top: 30,
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			},
			padding: [5, 10]
		},
		yAxis: {
			axisTick: {
				show: false
			}
		},
		legend: {
			data: [i18nInbound, i18nOutbound]
		},
		series: [
			{
				name: i18nInbound,
				itemStyle: {
					color: '#FF005A',
					lineStyle: {
						color: '#FF005A',
						width: 2
					}
				},
				smooth: true,
				type: 'line',
				data: inbound,
				animationDuration: 2800,
				animationEasing: 'cubicInOut'
			},
			{
				name: i18nOutbound,
				smooth: true,
				type: 'line',
				itemStyle: {
					color: '#3888fa',
					lineStyle: {
						color: '#3888fa',
						width: 2
					},
					areaStyle: {
						color: '#f3f8ff'
					}
				},
				data: outbound,
				animationDuration: 2800,
				animationEasing: 'quadraticOut'
			}
		]
	})
}
</script>
