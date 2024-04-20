<template>
	<div>
		<div class="title">
			<span style="padding: 0 30px">{{ t(`errorLog.errorLog`) }}</span>
			<el-button
				type="primary"
				icon="Delete"
				@click="clearAll"
				>{{ t(`errorLog.clear`) }}</el-button
			>
		</div>
		<el-table
			:data="errorLogs"
			border
			empty-text="No Error"
		>
			<el-table-column :label="t(`errorLog.message`)">
				<template #default="{ row }">
					<div>
						<span class="message-title">{{ t(`errorLog.msg`) }}:</span>
						<el-tag type="danger">{{ row.err.message }}</el-tag>
					</div>
					<br />
					<div>
						<span
							class="message-title"
							style="padding-right: 10px"
							>{{ t(`errorLog.info`) }}:</span
						>
						<el-tag type="warning">{{ row.info }}</el-tag>
					</div>
					<br />
					<div>
						<span
							class="message-title"
							style="padding-right: 16px"
							>{{ t(`errorLog.url`) }}:</span
						>
						<el-tag type="success">{{ row.url }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column :label="t(`errorLog.stack`)">
				<template #default="{ row }">{{ row.err.stack }}</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { useErrorLogStore } from '@/store/errorLog'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const errorLogStore = useErrorLogStore()

const errorLogs = computed(() => {
	return errorLogStore.logs
})
const clearAll = () => {
	errorLogStore.clearErrorLog()
}
</script>

<style scoped>
.title {
	display: flex;
	align-items: center;
  line-height: 50px;
}

.message-title {
	font-size: 16px;
	color: #333;
	font-weight: bold;
	padding-right: 8px;
}
</style>
