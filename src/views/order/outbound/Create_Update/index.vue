<template>
  <div class="createPost-container">
    <div class="title">
      <span>
        {{ route.query.id ? t(`orders.update`) : t(`orders.create`) }}
      </span>
    </div>
    <el-form ref="orderFormRef" :model="order" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="t('orders.orderID') + ' :'" class="postInfo-container-item" prop="orderID">
                    <el-input v-model="order.orderID" :placeholder="t(`AutoGeneration`)" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="t('orders.type') + ' :'" class="postInfo-container-item" prop="type">
                    <el-select v-model="order.type" placeholder="">
                      <el-option
                        v-for="opt in obj2Option(typeMap)"
                        :key="opt.key"
                        :label="opt.label"
                        :value="opt.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="t('area') + ' :'" class="postInfo-container-item" prop="area">
                    <el-select v-model="order.area" placeholder="">
                      <el-option v-for="opt in area" :key="opt.key" :label="opt.label" :value="opt.key" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="t('orders.client') + ' :'" class="postInfo-container-item" prop="client">
                    <el-input v-model="order.client" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="t('orders.contact') + ' :'" class="postInfo-container-item" prop="contact">
                    <el-input v-model="order.contact" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="t('orders.number') + ' :'" class="postInfo-container-item" prop="phone">
                    <el-input v-model="order.phone" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="t('orders.title') + ' :'" class="postInfo-container-item" prop="title">
                    <el-input v-model="order.title" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    :label="t('orders.documenter') + ' :'"
                    class="postInfo-container-item"
                    prop="documenter"
                  >
                    <el-input v-model="order.documenter" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item :label="t(`orders.remark`) + ':'" prop="remark"  class="postInfo-container-item">
                    <el-input v-model="order.remark" :rows="4" type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="title">
        <span>{{ t(`orders.inboundProduction`) }}</span>
        <el-button type="success" @click="createProduction()">{{ t(`button.createProduction`) }}</el-button>
      </div>

      <el-form-item prop="production">
        <el-table :data="order.production" border fit header-cell-class-name="table_header" class="production">
          <el-table-column min-width="100px" :label="t(`orders.productionID`)" align="center">
            <template #default="{ row }">
              <el-input v-model="row.productionID" />
            </template>
          </el-table-column>

          <el-table-column min-width="100px" :label="t(`orders.productionName`)" align="center">
            <template #default="{ row }">
              <el-input v-model="row.productionName" />
            </template>
          </el-table-column>

          <el-table-column min-width="150px" :label="t(`orders.specs`)" align="center">
            <template #default="{ row }">
              <div class="specs">
                <el-input v-model="row.specs1" /> ×
                <el-input v-model="row.specs2" />
              </div>
            </template>
          </el-table-column>

          <el-table-column min-width="80px" :label="t(`orders.price`)" align="center">
            <template #default="{ row }">
              <el-input v-model="row.price" />
            </template>
          </el-table-column>

          <el-table-column min-width="80px" :label="t(`orders.quantity`)" align="center">
            <template #default="{ row }">
              <el-input v-model="row.quantity" />
            </template>
          </el-table-column>

          <el-table-column min-width="90px" :label="t(`orders.total`)" align="center">
            <template #default="{ row }">
              {{ (row.price * row.quantity).toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column
            :label="t(`orders.actions`)"
            align="center"
            min-width="50"
            class-name="small-padding fixed-width"
          >
            <template #default="{ row, $index }">
              <el-button type="danger" size="small" @click="delProduction($index)">{{ t(`button.delete`) }} </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="submit_order_button">
        <el-button type="primary" size="large" @click="submitForm(orderFormRef)">{{ t('button.submit') }}</el-button>
        <el-button size="large" @click="router.go(-1)">{{ t('button.cancel') }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import i18n from '@/lang'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElNotification, FormInstance } from 'element-plus'

import { useMap } from '../hooks/useMap'

import { obj2Option } from '@/utils/array'

import { UpdateDTO } from '../data.d'

import { createOrder, detailOrder, updateOrder } from '../service'

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const { area, typeMap } = useMap()

// form rules
const generateMsg = (str: string, rule: string) => {
  return i18n.global.t(`orders.${str}`) + ' ' + i18n.global.t(`${rule}`)
}
const rules = reactive({
  area: [{ required: true, message: generateMsg('area', 'require'), trigger: 'change' }],
  type: [{ required: true, message: generateMsg('type', 'require'), trigger: 'blur' }],
  client: [{ required: true, message: generateMsg('client', 'require'), trigger: 'blur' }],
  contact: [{ required: true, message: generateMsg('contact', 'require'), trigger: 'blur' }],
  number: [{ required: true, message: generateMsg('number', 'require'), trigger: 'blur' }],
  documenter: [{ required: true, message: generateMsg('documenter', 'require'), trigger: 'blur' }],
})

const orderFormRef = ref()
const order = reactive<UpdateDTO>({
  id: 0,
  orderID: '',
  type: 0,
  area: 'area-1',
  client: '',
  contact: '',
  phone: '',
  title: '',
  documenter: '',
  remark: '',
  timestamp: '',
  production: [
    {
      productionID: '',
      productionName: '',
      quantity: 0,
      price: 0,
      specs1: '',
      specs2: '',
    },
  ],
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    // 存在id则为 '更新订单信息' 业务，不存在则为 '创建订单' 业务
    const res = route.query.id ? await updateOrder(order) : await createOrder(order)

    if (res.code === 20000) {
      ElNotification({
        title: 'Success',
        message: i18n.global.t(`tips.submit`) + i18n.global.t(`tips.success`),
        type: 'success',
        duration: 2000,
      })
      // refresh the view
      router.go(-1)
    }
  })
}

const createProduction = () => {
  if (order.production.length >= 5) return
  order.production.push({
    productionID: '',
    productionName: '',
    quantity: 0,
    price: 0,
    specs1: '',
    specs2: '',
  })
}
const delProduction = (index: number) => {
  order.production.splice(index, 1)
}

const getData = async () => {
  const res = await detailOrder(+route.query.id!)
  if (res.code === 20000) {
    Object.assign(order, res.data)
  }
}
// 存在id则为 '更新订单信息' 业务，需要获取数据
if (route.query.id) {
  getData()
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 0 45px 0 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        // float: left;
        width: 55%;
        display: block;
        margin-bottom: 5px;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea :deep() {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.title {
  font-weight: 600;
  margin: 20px;
  display: flex;
  justify-content: space-between;

  span {
    padding: 5px 0;
    border-bottom: 2px solid rgb(88, 88, 181);
  }
}
.production {
  width: 100%;
  margin: 0 20px;
}
// 清除el-input边框
:deep() .production .el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
}
// 清除el-table-column鼠标移入变色效果
:deep() .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}

.specs {
  display: flex;
  align-items: center;
}
</style>
