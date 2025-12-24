<template>
  <div class="tab-container">
    <DynamicForm
      :form-items="header"
      v-model="searchQuery"
      inline
      @search="getData"
      @create="handleCreate"
      @export="handleDownload"
    />

    <el-tabs v-model="searchQuery.area" style="margin-top: 15px" type="border-card" @tab-change="handleTabChange">
      <el-tab-pane v-for="item in area" :key="item.key" :label="item.label" :name="item.key">
        <MyPagination
          :total="total"
          v-model:page="searchQuery.page"
          v-model:limit="searchQuery.limit"
          @pagination="getData"
        >
          <template #table>
            <el-table :data="tableData" border fit highlight-current-row style="width: 100%" draggable>
              <el-table-column min-width="130px" :label="t(`orders.orderID`)" prop="orderID" align="center" />

              <el-table-column min-width="130px" :label="t(`orders.title`)" align="center" prop="title" />

              <el-table-column min-width="120px" align="center" :label="t(`orders.date`)">
                <template #default="{ row }">
                  <span>{{ parseTime(row.timestamp, '{y}-{m}-{d}') }}</span>
                </template>
              </el-table-column>

              <el-table-column class-name="status-col" :label="t(`orders.type`)" min-width="120">
                <template #default="{ row }">
                  {{ typeMap[(row as ListVO).type] }}
                </template>
              </el-table-column>

              <el-table-column class-name="status-col" :label="t(`orders.client`)" prop="client" min-width="110" />

              <el-table-column
                class-name="status-col"
                :label="t(`orders.documenter`)"
                prop="documenter"
                min-width="120"
              />

              <el-table-column class-name="status-col" :label="t(`orders.status`)" min-width="120">
                <template #default="{ row }">
                  <el-tag :type="statusMap[(row as ListVO).status].type">
                    {{ statusMap[(row as ListVO).status].label }}
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column class-name="status-col" :label="t(`orders.auditor`)" min-width="110" prop="auditor" />

              <el-table-column
                :label="t(`orders.actions`)"
                align="center"
                min-width="270"
                class-name="small-padding fixed-width"
              >
                <template #default="{ row }">
                  <el-button type="info" size="small" @click="toDetail(row.id)">{{ t(`button.detail`) }}</el-button>
                  <el-button type="primary" size="small" @click="handleUpdate(row.id)">{{
                    t(`button.edit`)
                  }}</el-button>
                  <el-button v-if="row.status === 0" size="small" type="warning" @click="handleAudit(row.id)">
                    {{ t(`button.audit`) }}
                  </el-button>
                  <el-button size="small" type="danger" @click="handleRemove(row.id)">
                    {{ t(`button.delete`) }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </MyPagination>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="titleMap[dialogStatus]" v-model="dialogFormVisible" align-center width="900px">
      <el-form ref="dataForm" :model="temp" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="t(`orders.orderID`) + ':'" prop="orderID">
              {{ temp.orderID }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="t(`orders.type`) + ':'" prop="type">
              {{ typeMap[temp.type!] }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="t(`orders.status`) + ':'" prop="status">
              <el-tag :type="statusMap[temp.status].type">
                {{ statusMap[temp.status].label }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="t(`orders.client`) + ':'" prop="client">
              {{ temp.client }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="t(`orders.contact`) + ':'" prop="contact">
              {{ temp.contact }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="t(`orders.number`) + ':'" prop="phone">
              {{ temp.phone }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="t(`orders.documenter`) + ':'" prop="documenter">
              {{ temp.documenter }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="t(`orders.date`) + ':'" prop="timestamp">
              {{ temp.timestamp }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="t(`orders.remark`) + ':'" prop="remark">
              {{ temp.remark }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item :label="t(`orders.reason`) + ':'" prop="reason">
              <el-input v-if="dialogStatus === 'audit'" v-model="temp.reason" :rows="3" type="textarea" />
              <span v-else>{{ temp.reason }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table
          :data="temp.production"
          border
          fit
          highlight-current-row
          header-cell-class-name="table_header"
          style="width: 100%"
        >
          <el-table-column min-width="100px" :label="t(`orders.productionID`)" align="center" prop="productionID" />

          <el-table-column min-width="100px" :label="t(`orders.productionName`)" align="center" prop="productionName" />

          <el-table-column align="center" :label="t(`orders.specs`)" min-width="95">
            <template #default="{ row }"> {{ `${row.specs1} × ${row.specs2}` }} </template>
          </el-table-column>

          <el-table-column class-name="status-col" :label="t(`orders.price`)" prop="price" min-width="80" />

          <el-table-column class-name="status-col" :label="t(`orders.quantity`)" min-width="80">
            <template #default="{ row }">
              {{ row.quantity + ' /件' }}
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" :label="t(`orders.total`)" min-width="90">
            <template #default="{ row }">
              {{ (row.price * row.quantity).toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" :label="t(`area`)" min-width="105">
            {{ temp.area }}
          </el-table-column>
        </el-table>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <template v-if="dialogStatus === 'audit'">
            <el-button type="success" @click="audit(temp, 1)">{{ t(`button.pass`) }}</el-button>
            <el-button type="danger" @click="audit(temp, 2)">{{ t(`button.noPass`) }}</el-button>
          </template>
          <el-button @click="dialogFormVisible = false">{{ t(`button.cancel`) }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { allData, auditOrder, detailOrder, getList, removeOrder } from './service'

import DynamicForm from '@/components/DynamicForm/index.vue'
import MyPagination from '@/components/MyPagination/index.vue'

import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'

import { ListVO, SearchDTO } from './data.d'

import { nextTick, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { useMap } from './hooks/useMap'

defineOptions({ name: 'outbound' })

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

// variable mapping
const { typeMap, statusMap, titleMap, area, header } = useMap()

// tab change
const handleTabChange = () => {
  searchQuery.page = 1
  getData()
}

// header
const searchQuery = reactive<SearchDTO>({
  type: undefined,
  orderID: undefined,
  status: undefined,
  area: 'area-1',
  page: 1,
  limit: 20,
})

const loading = ref<boolean>(false)

const tableData = ref<ListVO[]>([])
const total = ref<number>(0)
const getData = async () => {
  try {
    loading.value = true

    const res = await getList(searchQuery)
    tableData.value = res.data.items
    total.value = res.data.total

    // set query params
    router.replace({
      query: {
        ...route.query,
        ...searchQuery,
      },
    })
  } catch (error) {
    tableData.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}
getData()

// export data
const downloadLoading = ref<boolean>(false)
const handleDownload = throttle(async function () {
  downloadLoading.value = true

  const res = await allData(searchQuery)

  import('@/vendor/Export2Excel').then((excel) => {
    const tHeader = ['orderID', 'title', 'data', 'type', 'supplier', 'documenter', 'status', 'auditor']
    const filterVal = ['orderID', 'title', 'timestamp', 'type', 'supplier', 'documenter', 'status', 'auditor']
    const data = formatJson(filterVal, res.data)
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: `outbound-list-${searchQuery.area}`,
    })
    downloadLoading.value = false
  })
}, 5 * 1000)
const formatJson = (filterVal: string[], data: ListVO[]) => {
  return data.map((v) =>
    filterVal.map((j) => {
      switch (j) {
        case 'timestamp':
          return parseTime(v[j], '{y}-{m}-{d}')
        case 'type':
          return typeMap[v[j]]
        case 'status':
          return statusMap[v[j]].label
        default:
          return v[j as keyof ListVO]
      }
    }),
  )
}

// detail && audit
const dataForm = ref()
const dialogStatus = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const temp = reactive<ListVO>({} as ListVO)
// order detail
const toDetail = async (id: number) => {
  const res = await detailOrder(id)
  Object.assign(temp, res.data)
  dialogStatus.value = 'detail'
  dialogFormVisible.value = true
  nextTick(() => {
    dataForm.value.clearValidate()
  })
}

const handleCreate = () => {
  router.push({ path: '/order/outbound/create_update' })
}
const handleUpdate = (id: number) => {
  router.push({ path: '/order/outbound/create_update', query: { id } })
}

// audit
const handleAudit = async (id: number) => {
  const res = await detailOrder(id)
  Object.assign(temp, res.data)
  dialogStatus.value = 'audit'
  dialogFormVisible.value = true
  nextTick(() => {
    dataForm.value.clearValidate()
  })
}
const audit = async (detail: ListVO, status: number) => {
  const res = await auditOrder({ detail, status })
  if (res.code === 20000) {
    dialogFormVisible.value = false
    getData()
  }
}

// remove
const handleRemove = async (id: ListVO['id']) => {
  const res = await removeOrder(id)
  if (res.code === 20000) {
    getData()
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
