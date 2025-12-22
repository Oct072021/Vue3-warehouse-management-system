<template>
  <div class="chart-container">
    <el-switch
      v-model="value"
      class="switch"
      active-color="#13ce66"
      inactive-color="#1890FF"
      :active-text="t(`charts.turnover`)"
      :inactive-text="t(`charts.orders`)"
      active-value="turnover"
      inactive-value="order"
    />
    <Chart height="100%" width="100%" :type="value" :data="data" />
  </div>
</template>

<script lang="ts" setup>
import Chart from '../components/Charts.vue'

import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { ChartVO } from '../types/data.d'
import { getOutboundTotal } from './service'

defineOptions({ name: 'outboundChart' })

const { t } = useI18n()

const value = ref<'turnover' | 'order'>('turnover')

const data = reactive<ChartVO>({
  'area-1': {
    total: [],
    orders: [],
  },
  'area-2': {
    total: [],
    orders: [],
  },
  'area-3': {
    total: [],
    orders: [],
  },
  'area-4': {
    total: [],
    orders: [],
  },
})
const getData = () => {
  Object.keys(data).forEach(async (key) => {
    const res = await getOutboundTotal(key)
    const { total, orders } = res.data
    data[key].total = total
    data[key].orders = orders
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
</style>
