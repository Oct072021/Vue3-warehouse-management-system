<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts" setup>
import i18n from '@/lang'
import { computed, nextTick, onBeforeUnmount, onMounted, markRaw, ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import * as echarts from 'echarts'

import { ChartVO } from '@/views/charts/types/data.d'
import { useMap } from '../hooks/useMap'

const { typeMap } = useMap()

const appStore = useAppStore()

const { t } = i18n.global

const props = withDefaults(
  defineProps<{
    className?: string
    id?: string
    width?: string
    height?: string
    type: 'turnover' | 'order'
    data: ChartVO
  }>(),
  {
    className: 'chart',
    id: 'chart',
    width: '200px',
    height: '200px',
  },
)

const chart = ref<echarts.ECharts | null>(null)

const language = computed(() => {
  return appStore.language
})

watch(
  [language, () => props.type, () => props.data],
  () => {
    initChart(props.data)
  },
  { deep: true },
)

const initChart = (data: ChartVO) => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
  chart.value = markRaw(echarts.init(document.getElementById(props.id)))
  const xData = (function () {
    const data = []
    for (let i = 1; i < 13; i++) {
      data.push(i + ' ' + t(`charts.month`))
    }
    return data
  })()
  chart.value.setOption({
    backgroundColor: '#344b58',
    title: {
      text: 'statistics',
      x: '20',
      top: '20',
      textStyle: {
        color: '#fff',
        fontSize: '22',
      },
      subtextStyle: {
        color: '#90979c',
        fontSize: '16',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        textStyle: {
          color: '#fff',
        },
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      borderWidth: 0,
      top: 150,
      bottom: 95,
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      x: '5%',
      top: '10%',
      textStyle: {
        color: '#90979c',
      },
      data: Object.keys(data),
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#90979c',
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#90979c',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    dataZoom: [
      {
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 30,
        start: 10,
        end: 80,
        handleIcon:
          'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: '#d3dee5',
        },
        textStyle: {
          color: '#fff',
        },
        borderColor: '#90979c',
      },
      {
        type: 'inside',
        show: true,
        height: 15,
        start: 1,
        end: 35,
      },
    ],
    series: Object.keys(data).map((key) => ({
      name: key,
      type: typeMap[props.type].type,
      stack: 'total',
      symbolSize: 10,
      symbol: 'circle',
      barMaxWidth: 45,
      barGap: '10%',
      label: {
        show: true,
        position: 'top',
        formatter(p: any) {
          return p.value > 0 ? p.value : ''
        },
      },
      // data: (data[key])[typeMap[props.type].key],
      data: data[key][typeMap[props.type].key],
    })),
  })
}

onMounted(() => {
  nextTick(() => {
    initChart(props.data)
  })
})

onBeforeUnmount(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
})
</script>
