<template>
	<div>
		<el-badge
			:is-dot="true"
			style="line-height: 25px; margin-top: -5px"
			@click="dialogErrVisible = true"
		>
			<el-button
				style="padding: 8px 10px"
				type="danger"
			>
				<SvgIcon icon-class="bug" />
			</el-button>
		</el-badge>

		<el-dialog
			v-model="dialogErrVisible"
			width="40%"
			append-to-body
			align-center
		>
			<template #header>
				<span style="padding-right: 10px">{{ t(`errorLog.errorReport`) }}</span>
			</template>

			<el-form
				:model="errorLog"
				label-position="left"
				label-width="110px"
				style="width: 400px; margin-left: 50px"
			>
				<el-form-item :label="t(`errorLog.msg`)">
					<el-input v-model="errorLog.err.message" />
				</el-form-item>
				<el-form-item :label="t(`errorLog.info`)">
					<el-input v-model="errorLog.info" />
				</el-form-item>
				<el-form-item :label="t(`errorLog.url`)">
					<el-input v-model="errorLog.url" />
				</el-form-item>
				<el-form-item :label="t(`errorLog.stack`)">
					<el-input v-model="errorLog.err.stack" />
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogErrVisible = false">{{ t(`button.cancel`) }}</el-button>
					<el-button
						type="primary"
						@click="submitERR"
						>{{ t(`button.submit`) }}</el-button
					>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { useErrorLogStore } from '@/store/errorLog'

import { ErrorLog } from './data.d'

import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

emit: ['click']

const errorLogStore = useErrorLogStore()

const { t } = useI18n()

const dialogErrVisible = ref<boolean>(false)
const errorLog = reactive<ErrorLog>({
	err: {
		message: '',
		stack: ''
	},
	info: '',
	url: ''
})
const submitERR = () => {
	// use Pinia's errorLog method
	errorLogStore.addErrorLog(errorLog)
	ElNotification({
		title: 'Success',
		message: 'Add Successfully',
		type: 'success',
		duration: 2000
	})
	dialogErrVisible.value = false
}
</script>

<style scoped>
.message-title {
	font-size: 16px;
	color: #333;
	font-weight: bold;
	padding-right: 8px;
}
</style>
