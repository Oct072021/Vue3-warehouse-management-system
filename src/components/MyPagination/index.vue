<template>
  <div>
    <slot name="table" />
    <div :class="{ hidden: props.hidden }" class="pagination-container">
      <el-pagination
        :background="props.background"
        v-model:current-page="page"
        v-model:page-size="limit"
        :layout="props.layout"
        :page-sizes="props.pageSizes"
        :total="props.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { scrollTo } from '@/utils/scroll-to'
import { Props } from './data.d'

const props = withDefaults(defineProps<Props>(), {
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: () => [10, 20, 30, 50],
  background: true,
  autoScroll: true,
  hidden: false,
})
const emit = defineEmits<{
  (e: 'pagination'): void
}>()

const page = defineModel<number>('page')
const limit = defineModel<number>('limit')

const handleSizeChange = (val: number) => {
  emit('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
const handleCurrentChange = (val: number) => {
  emit('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  .hidden {
    display: none;
  }
}
</style>
