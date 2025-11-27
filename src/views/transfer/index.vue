<template>
  <div class="app-container">
    <DynamicForm
      :form-items="header"
      v-model="listQuery"
      inline
      @search="getList"
      @create="handleCreate"
      @export="handleDownload"
    />

    <MPage
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    >
      <template #table>
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            :label="t(`transfer.orderID`)"
            prop="orderID"
            min-width="160px"
            align="center"
          />

          <el-table-column
            :label="t(`transfer.date`)"
            min-width="160px"
            align="center"
          >
            <template #default="{ row }">{{ parseTime(row.timestamp, '{y}-{m}-{d}') }}</template>
          </el-table-column>

          <el-table-column
            :label="t(`transfer.batch`)"
            min-width="160px"
            prop="batch"
            align="center"
          />

          <el-table-column
            :label="t(`transfer.origin`)"
            min-width="100px"
            align="center"
            prop="origin"
          />

          <el-table-column
            :label="t(`transfer.new`)"
            min-width="100px"
            align="center"
            prop="new"
          />

          <el-table-column
            :label="t(`transfer.status`)"
            min-width="120px"
            align="center"
            prop="status"
          >
            <template #default="{ row }">
              <el-tag :type="statusMap[row.status].type">
                {{ statusMap[row.status].label }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            :label="t(`transfer.auditor`)"
            min-width="90px"
            prop="auditor"
          />

          <el-table-column
            :label="t(`transfer.actions`)"
            align="center"
            min-width="270px"
            class-name="small-padding fixed-width"
          >
            <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click="toDetail(row.id)"
                >{{ t(`button.detail`) }}</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="handleUpdate(row.id)"
                >{{ t(`button.edit`) }}</el-button
              >
              <el-button
                v-if="row.status === 0"
                size="small"
                type="warning"
                @click="handleAudit(row.id)"
                >{{ t(`button.audit`) }}</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleRemove(row.id)"
                >{{ t(`button.delete`) }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </MPage>

    <el-dialog
      :title="titleMap[dialogStatus]"
      v-model="dialogFormVisible"
      align-center
      width="900px"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              :label="t(`transfer.orderID`) + ':'"
              prop="orderID"
            >
              {{ temp.orderID }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              :label="t(`transfer.documenter`) + ':'"
              prop="documenter"
            >
              {{ temp.documenter }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              :label="t(`transfer.status`) + ':'"
              prop="status"
            >
              <el-tag :type="statusMap[temp.status].type">
                {{ statusMap[temp.status].label }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              :label="t(`transfer.correlationID`) + ':'"
              prop="correlationID"
            >
              {{ temp.correlationID }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              :label="t(`transfer.date`) + ':'"
              prop="timestamp"
            >
              {{ temp.timestamp }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              :label="t(`transfer.remark`) + ':'"
              prop="remark"
            >
              {{ temp.remark }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item
              :label="t(`transfer.reason`) + ':'"
              prop="reason"
            >
              <el-input
                v-if="dialogStatus === 'audit'"
                v-model="temp.reason"
                :rows="3"
                type="textarea"
              />
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
          <el-table-column
            min-width="100px"
            :label="t(`transfer.productionID`)"
            align="center"
            prop="productionID"
          />

          <el-table-column
            min-width="100px"
            :label="t(`transfer.productionName`)"
            align="center"
            prop="productionName"
          />

          <el-table-column
            align="center"
            :label="t(`transfer.quantity`)"
            prop="quantity"
            min-width="95"
          />

          <el-table-column
            class-name="status-col"
            :label="t(`transfer.unit`)"
            prop="unit"
            min-width="80"
          />
        </el-table>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <template v-if="dialogStatus === 'audit'">
            <el-button
              type="success"
              @click="audit(1)"
            >
              {{ t(`button.pass`) }}
            </el-button>
            <el-button
              type="danger"
              @click="audit(2)"
            >
              {{ t(`button.noPass`) }}
            </el-button>
          </template>
          <el-button @click="dialogFormVisible = false">{{ t(`button.cancel`) }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getTransferOrders, getAllData, getDetail, auditOrder, removeTransferOrder } from './service'
import { Detail, Export, SearchData, TransferData } from './data.d'

import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'

import MPage from '@/components/mPage/index.vue' // page components
import DynamicForm from '@/components/DynamicForm/index.vue'

import { useI18n } from 'vue-i18n'
import { nextTick, reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

import { useMap } from './hooks/useMap'

defineOptions({ name: 'transfer' })

const { t } = useI18n()

const router = useRouter()

const { header, statusMap, titleMap } = useMap()

// search
const listQuery = reactive<SearchData>({
  page: 1,
  limit: 20,
  orderID: undefined,
  timestamp: undefined,
  status: undefined,
})
// get data
const list = ref<TransferData[]>([])
const total = ref<number>(0)
const listLoading = ref<boolean>(false)
const getList = async () => {
  listLoading.value = true

  const res = await getTransferOrders(listQuery)
  list.value = res.data.items
  total.value = res.data.total

  listLoading.value = false
}

// detail
const toDetail = async (id: number) => {
  const res = await getDetail(id)
  Object.assign(temp, res.data)
  dialogStatus.value = 'detail'
  dialogFormVisible.value = true
  nextTick(() => {
    dataForm.value.clearValidate()
  })
}

// audit
const handleAudit = async (id: number) => {
  const res = await getDetail(id)
  Object.assign(temp, res.data)
  dialogStatus.value = 'audit'
  dialogFormVisible.value = true
  nextTick(() => {
    dataForm.value.clearValidate()
  })
}
const audit = async (status: number) => {
  const { id, reason } = temp
  const res = await auditOrder({ id, reason, status })
  if (res.code === 20000) {
    dialogFormVisible.value = false
    ElNotification({
      title: 'Success',
      message: t(`tips.audit`) + t(`tips.success`),
      type: 'success',
      duration: 2000,
    })

    getList()
  }
}

// remove
const handleRemove = async (id: number) => {
  const res = await removeTransferOrder(id)
  if (res.code === 20000) {
    ElNotification({
      title: 'Success',
      message: t(`tips.delete`) + t(`tips.success`),
      type: 'success',
      duration: 2000,
    })
    getList()
  }
}

// export
const downloadLoading = ref<boolean>(false)
const handleDownload = throttle(function () {
  downloadLoading.value = true

  import('@/vendor/Export2Excel').then(async (excel) => {
    const tHeader = [
      'orderID',
      'correlationID',
      'date',
      'batch',
      'origin',
      'new',
      'status',
      'auditor',
      'documenter',
      'remark',
    ]
    const filterVal = [
      'orderID',
      'correlationID',
      'timestamp',
      'batch',
      'origin',
      'new',
      'status',
      'auditor',
      'documenter',
      'remark',
    ]
    const { data } = await getAllData()
    const exportData = formatJson(data, filterVal)

    excel.export_json_to_excel({
      header: tHeader,
      data: exportData,
      filename: 'transfer',
    })
    downloadLoading.value = false
  })
}, 5 * 1000)
const formatJson = (data: Export[], filterVal: string[]) => {
  if (!data) return
  return data.map((v) =>
    filterVal.map((j) => {
      switch (j) {
        case 'timestamp':
          return parseTime(v[j], '{y}-{m}-{d}')
        case 'status':
          return statusMap[v[j]].label
        default:
          return v[j as keyof TransferData]
      }
    }),
  )
}

// create && update
const dataForm = ref()
const dialogStatus = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const temp = reactive<Detail>({
  id: -1,
  orderID: '',
  correlationID: '',
  timestamp: '',
  documenter: '',
  status: -1,
  remark: '无',
  reason: '',
  production: [],
})
const handleCreate = () => {
  router.push({ path: '/transfer/create_update' })
}
const handleUpdate = (id: number) => {
  router.push({ path: '/transfer/create_update', query: { id } })
}

// create --init view
getList()
</script>
