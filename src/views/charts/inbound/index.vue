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
import { getInboundTotal } from './service'

defineOptions({ name: 'inboundChart' })

const { t } = useI18n()

const value = ref<boolean>(true)

const warehouse = ref<string[]>(['area-1', 'area-2', 'area-3', 'area-4'])
const data = reactive<AllData>({
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
  warehouse.value.forEach(async (item) => {
    const res = await getInboundTotal(item)
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
