<template>
	<div class="createPost-container">
		<div class="title">
			<span>
				{{ route.query.id ? t(`transfer.update`) : t(`transfer.create`) }}
			</span>
		</div>
		<el-form
			ref="orderFormRef"
			:model="order"
			:rules="rules"
			class="form-container"
		>
			<div class="createPost-main-container">
				<el-row>
					<el-col :span="24">
						<div class="postInfo-container">
							<el-row>
								<el-col :span="8">
									<el-form-item
										:label="t('transfer.orderID') + ' :'"
										class="postInfo-container-item"
										prop="orderID"
									>
										<el-input
											v-model="order.orderID"
											:placeholder="t(`AutoGeneration`)"
										/>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item
										:label="t('transfer.origin') + ' :'"
										class="postInfo-container-item"
										prop="origin"
									>
										<el-tag v-if="route.query.id">{{ order.origin }}</el-tag>
										<el-select
											v-else
											v-model="order.origin"
											placeholder=""
										>
											<el-option
												v-for="opt in area"
												:key="opt.key"
												:label="opt.label"
												:value="opt.key"
											/>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item
										:label="t('transfer.new') + ' :'"
										class="postInfo-container-item"
										prop="new"
									>
										<el-select
											v-model="order.new"
											placeholder=""
										>
											<el-option
												v-for="opt in area"
												:key="opt.key"
												:label="opt.label"
												:value="opt.key"
											/>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="8">
									<el-form-item
										:label="t('transfer.documenter') + ' :'"
										class="postInfo-container-item"
										prop="documenter"
									>
										<el-input v-model="order.documenter" />
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item
										:label="t('transfer.batch') + ' :'"
										class="postInfo-container-item"
										prop="batch"
									>
										<el-input v-model="order.batch" />
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item
										:label="t('transfer.correlationID') + ' :'"
										class="postInfo-container-item"
										prop="correlationID"
									>
										<el-input v-model="order.correlationID" />
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="20">
									<el-form-item
										:label="t(`transfer.remark`) + ':'"
										class="postInfo-container-remark"
										prop="remark"
									>
										<el-input
											v-model="order.remark"
											:rows="4"
											type="textarea"
										/>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="title">
				<span>{{ t(`transfer.productionInfo`) }}</span>
				<el-button
					type="success"
					@click="createProduction"
				>
					{{ t(`button.createProduction`) }}
				</el-button>
			</div>

			<el-form-item prop="production">
				<el-table
					:data="order.production"
					border
					fit
					header-cell-class-name="table_header"
					class="production"
				>
					<el-table-column
						min-width="100px"
						:label="t(`transfer.productionID`)"
						align="center"
					>
						<template #default="{ row, $index }">
							<el-select
								v-model="row.productionID"
								placeholder=""
								filterable
								remote
								@change="autoCreate(row.productionID, $index)"
							>
								<el-option
									v-for="item in Object.keys(productionIDList)"
									:key="item"
									:label="item"
									:value="item"
								/>
							</el-select>
						</template>
					</el-table-column>

					<el-table-column
						min-width="100px"
						:label="t(`transfer.productionName`)"
						align="center"
						prop="productionName"
					/>

					<el-table-column
						min-width="80px"
						:label="t(`transfer.quantity`)"
						align="center"
						prop="quantity"
					/>

					<el-table-column
						min-width="80px"
						:label="t(`transfer.unit`)"
						align="center"
						prop="unit"
					/>

					<el-table-column
						:label="t(`transfer.actions`)"
						align="center"
						min-width="50"
						class-name="small-padding fixed-width"
					>
						<template #default="{ row, $index }">
							<el-button
								type="danger"
								size="small"
								@click="delProduction($index)"
								>{{ t(`button.delete`) }}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>

			<div class="submit_order_button">
				<el-button
					type="primary"
					size="large"
					@click="submitForm(orderFormRef)"
				>
					{{ t('button.submit') }}
				</el-button>
				<el-button
					size="large"
					@click="router.go(-1)"
				>
					{{ t('button.cancel') }}
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import i18n from '@/lang'
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElNotification, FormInstance, FormRules } from 'element-plus'

import { useMap } from '../mixin'

import { Detail, ProductionInfo, TransferData } from '../data.d'

import { createTransferOrder, getDetail, getStockID, updateTransferOrder } from '../service'
import { validArea } from '@/utils/validate'

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const { area } = useMap()

// form rules
const generateMsg = (str: string, rule: string) => {
	return t(`transfer.${str}`) + ' ' + t(`${rule}`)
}
const validateNewArea = (rule: FormRules, value: string, callback: Function) => {
	if (validArea(value, order.origin)) {
		callback(new Error('新库区不能与原库区相同！！'))
	} else {
		callback()
	}
}
const validateOriginArea = (rule: FormRules, value: string, callback: Function) => {
	if (validArea(value, order.new)) {
		callback(new Error('原库区不能新库区与相同！！'))
	} else {
		callback()
	}
}
const rules = reactive({
	origin: [
		{ required: true, message: generateMsg('origin', 'require'), trigger: 'blur' },
		{ required: true, validator: validateOriginArea, trigger: 'change' }
	],
	new: [
		{ required: true, message: generateMsg('new', 'require'), trigger: 'blur' },
		{ required: true, validator: validateNewArea, trigger: 'change' }
	],
	correlationID: [{ required: true, message: generateMsg('correlationID', 'require'), trigger: 'blur' }],
	batch: [{ required: true, message: generateMsg('batch', 'require'), trigger: 'blur' }],
	documenter: [{ required: true, message: generateMsg('documenter', 'require'), trigger: 'blur' }]
})

const orderFormRef = ref()
const order = reactive<Detail & TransferData>({
	id: -1,
	orderID: '',
	correlationID: '',
	timestamp: '',
	batch: '',
	origin: '',
	new: '',
	documenter: '',
	status: -1,
	auditor: '',
	remark: '无',
	reason: '',
	production: []
})
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async valid => {
		if (valid) {
			// 存在id则为 '更新订单信息' 业务，不存在则为 '创建订单' 业务
			const res = route.query.id ? await updateTransferOrder(order) : await createTransferOrder(order)

			if (res.code === 20000) {
				ElNotification({
					title: 'Success',
					message: i18n.global.t(`tips.submit`) + i18n.global.t(`tips.success`),
					type: 'success',
					duration: 2000
				})
				// refresh the view
				router.go(-1)
			}
		} else {
			console.log('error submit!!')
			return false
		}
	})
}

const createProduction = () => {
	if (order.origin.length === 0) {
		ElMessage({
			message: '请先选择原库区！',
			type: 'warning'
		})
		return
	}
	if (order.production.length >= 5) return
	order.production.push({
		productionID: '',
		productionName: '',
		quantity: 0,
		unit: ''
	})
}
const delProduction = (index: number, reset?: boolean) => {
	if (reset) {
		order.production.splice(0)
	}
	order.production.splice(index, 1)
}

const productionIDList = reactive<ProductionInfo>({})
const getProductionIDList = async (area: string) => {
	const { code, data } = await getStockID(area)
	if (code === 20000) {
		Object.assign(productionIDList, data)
	}
}
watch(
	() => order.origin,
	val => {
		delProduction(0, true)
		createProduction()
		getProductionIDList(val)
	}
)
const autoCreate = (id: string, index: number) => {
	Object.assign(order.production[index], productionIDList[id])
}

const getData = async () => {
	const res = await getDetail(+route.query.id!)
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

			.postInfo-container-remark {
				margin-top: 10px;
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

.specs {
	display: flex;
	align-items: center;
}

// 清除el-select边框
:deep() .production .el-select__wrapper {
	border: none !important;
	box-shadow: none !important;
}
// 清除el-table-column鼠标移入变色效果
:deep() .el-table--enable-row-hover .el-table__body tr:hover > td {
	background-color: transparent !important;
}
</style>
