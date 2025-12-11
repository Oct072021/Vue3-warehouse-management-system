<template>
  <div
    :id="id"
    :class="className"
    :style="{ height, width, backgroundColor }"
  />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import i18n from '@/lang'
import { computed, nextTick, onBeforeUnmount, onMounted, markRaw, ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { useMap } from '@/views/order/inbound/hooks/useMap'

const { typeMap } = useMap()

const appStore = useAppStore()

const { t } = i18n.global

const props = withDefaults(
  defineProps<{
    className?: string
    id?: string
    width?: string
    height?: string
    backgroundColor?: string
    data: { [index: string]: number }
  }>(),
  {
    className: 'chart',
    id: 'chart',
    width: '600px',
    height: '400px',
    backgroundColor: '#fff',
  },
)

const chart = ref<echarts.ECharts | null>(null)

const language = computed(() => {
  return appStore.language
})

watch(
  [language, () => props.data],
  () => {
    initChart(props.data)
  },
  { deep: true },
)

const initChart = (data: { [index: string]: number }) => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
  chart.value = markRaw(echarts.init(document.getElementById(props.id)))
  chart.value.setOption({
    title: {
      text: t('dashboard.inboundType'),
      x: '10',
      top: '10',
      textStyle: {
        color: '#000',
        fontSize: '16',
      },
      subtextStyle: {
        color: '#000',
        fontSize: '16',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: data['0'], name: typeMap['0'] },
          { value: data['1'], name: typeMap['1'] },
        ],
      },
    ],
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
