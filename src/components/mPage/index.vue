<template>
	<div>
		<slot name="table" />
		<div
			:class="{ hidden: hidden }"
			class="pagination-container"
		>
			<el-pagination
				:background="background"
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:layout="layout"
				:page-sizes="pageSizes"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Pagination } from '@/types/pagination.d'
import { scrollTo } from '@/utils/scroll-to'
import { computed, ref } from 'vue'

const props = withDefaults(
	defineProps<{
		total: number
		page?: number
		limit?: number
		layout?: string
		pageSizes?: number[]
		background?: boolean
		autoScroll?: boolean
		hidden?: boolean
	}>(),
	{
		page: 1,
		limit: 20,
		layout: 'total, sizes, prev, pager, next, jumper',
		pageSizes: () => [10, 20, 30, 50],
		background: true,
		autoScroll: true,
		hidden: false
	}
)
const emit = defineEmits<{
	(e: 'update:current-page', val: number): void
	(e: 'update:page-size', val: number): void
	(e: 'update:limit', val: number): void
	(e: 'pagination', val: Pagination): void
}>()

const currentPage = ref<number>(props.page)
const pageSize = ref<number>(props.limit)

const handleSizeChange = (val: number) => {
	emit('pagination', { page: currentPage.value, limit: val })
	if (props.autoScroll) {
		scrollTo(0, 800)
	}
}
const handleCurrentChange = (val: number) => {
	emit('pagination', { page: val, limit: pageSize.value })
	if (props.autoScroll) {
		scrollTo(0, 800)
	}
}
</script>

<style scoped>
.pagination-container {
	background: #fff;
	padding: 32px 16px;
}
.pagination-container.hidden {
	display: none;
}
</style>
