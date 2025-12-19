<template>
  <div class="app-container">
    <DynamicForm :form-items="header" v-model="searchQuery" inline @search="handleSearch" @export="handleDownload" />

    <MyPagination
      :total="total"
      v-model:page="searchQuery.page"
      v-model:limit="searchQuery.limit"
      @pagination="getData"
    >
      <template #table>
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          fit
          highlight-current-row
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column
            label="#"
            prop="id"
            sortable="custom"
            align="center"
            width="80"
            :class-name="getSortClass('id')"
          />

          <el-table-column :label="t(`stock.productionID`)" prop="productionID" min-width="200px" align="center" />

          <el-table-column :label="t(`stock.productionName`)" min-width="200px">
            <template #default="{ row }">
              <span class="link-type">{{ row.productionName }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="t(`stock.specs`)" min-width="80px" align="center">
            <template #default="{ row }"> {{ row.specs }}mm </template>
          </el-table-column>

          <el-table-column :label="t(`stock.quantity`)" min-width="80px" align="center" prop="quantity" />

          <el-table-column :label="t(`stock.unit`)" min-width="80px" align="center" prop="unit" />

          <el-table-column align="center" :label="t(`area`)" min-width="70px">
            <template #default="{ row }">
              <el-tag>{{ row.area }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </MyPagination>
  </div>
</template>

<script lang="ts" setup>
import { getList } from './service'

import { SearchDTO, ListVO } from './data.d'
import type { Sort } from 'element-plus'

import MyPagination from '@/components/MyPagination/index.vue'
import DynamicForm from '@/components/DynamicForm/index.vue'

import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'

import { useMap } from './hooks/useMap'
import { throttle } from '@/utils/common'

defineOptions({ name: 'stock' })

const { t } = useI18n()

const { header } = useMap()

// search
const searchQuery = reactive<SearchDTO>({
  page: 1,
  limit: 20,
  productionName: '',
  area: '',
  sort: '+id',
})
const handleSearch = () => {
  searchQuery.page = 1
  getData()
}

// get data
const tableData = ref<ListVO[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(false)
const getData = async () => {
  loading.value = true
  getList(searchQuery)
    .then((res) => {
      tableData.value = res.data.items
      total.value = res.data.total
    })
    .finally(() => {
      loading.value = false
    })
}
getData()

// sort
const sortChange = ({ prop, order }: Sort) => {
  if (prop === 'id') sortByID(order)
}
const sortByID = (order: Sort['order']) => {
  searchQuery.sort = order === 'ascending' ? '+id' : '-id'
  handleSearch()
}
const getSortClass = (key: string) => {
  const sort = searchQuery.sort
  return sort === `+${key}` ? 'ascending' : 'descending'
}

// export
const downloadLoading = ref<boolean>(false)
const handleDownload = throttle(function () {
  downloadLoading.value = true
  import('@/vendor/Export2Excel').then((excel) => {
    const tHeader = ['productionID', 'productionName', 'specs', 'quantity', 'unit']
    const filterVal = ['productionID', 'productionName', 'specs', 'quantity', 'unit']
    const data = formatJson(filterVal)
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: 'stock',
    })
    downloadLoading.value = false
  })
}, 5 * 1000)
const formatJson = (filterVal: string[]) => {
  return tableData.value.map((v) =>
    filterVal.map((j) => {
      return v[j as keyof ListVO]
    }),
  )
}
</script>
