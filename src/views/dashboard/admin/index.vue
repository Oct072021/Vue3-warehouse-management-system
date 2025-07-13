<template>
  <div class="dashboard-editor-container">
    <GithubCorner class="github-corner" />

    <PanelGroup
      :profit="profit"
      :orders="allOrders"
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
        <CircleChart :data="inboundType" />
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
import CircleChart from './components/CircleChart.vue'
import TodoList from './components/TodoList/index.vue'
import BoxCard from './components/BoxCard.vue'

import { getOutboundTotal } from '@/views/charts/outbound/service'
import { getInboundTotal } from '@/views/charts/inbound/service'

import { LineChartData } from './data.d'

import { reactive, ref } from 'vue'

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
const allOrders = ref<number>()
const nowDate = ref<Date>(new Date())
const inboundType = reactive<{ [index: string]: number }>({})

const handleSetLineChartData = (type: string) => {
  nowType.value = type
}
const getInboundData = async () => {
  const res = await getInboundTotal()

  const { orders, total, type } = res.data
  // Get PanelGroup Data
  profit.value! -= eval(total.join('+'))
  allOrders.value += eval(orders.join('+'))
  // Get LineChart Data
  const nowMonth = nowDate.value.getMonth() + 1
  const base = nowMonth > 3 && nowMonth < 9 ? nowMonth : nowMonth <= 3 ? 3 : 9
  lineChartData.profit.inbound = total.slice(base - 3, base + 3)
  lineChartData.orders.inbound = orders.slice(base - 3, base + 3)

  // Get CircleChart Data
  Object.assign(inboundType, type)
}
const getOutboundData = async () => {
  const res = await getOutboundTotal()

  const { orders, total } = res.data
  // Get PanelGroup Data
  profit.value = eval(total.join('+'))
  allOrders.value = eval(orders.join('+'))
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

// created --init data
getData()
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
