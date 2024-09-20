<template>
  <div class="flex center rc gap">
    <!-- back to head -->
    <el-button
      size="small"
      :icon="DArrowLeft"
      link
      @click="page = 1"
      :disabled="page === 1"
    />
    <!-- prev -->
    <el-button
      size="small"
      :icon="ArrowLeft"
      link
      @click="page--"
      :disabled="page === 1"
    />
    <!-- now page -->
    <el-input
      size="small"
      :max="props.total"
      :min="1"
      v-model="page"
      style="width: 45px"
    />
    <span>/</span>
    <span>{{ totalPage }}</span>
    <!-- next -->
    <el-button
      size="small"
      :icon="ArrowRight"
      link
      @click="page++"
      :disabled="page === totalPage"
    />
    <!-- to last -->
    <el-button
      size="small"
      :icon="DArrowRight"
      link
      @click="page = totalPage"
      :disabled="page === totalPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { DArrowLeft, DArrowRight, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    total?: number
    pageSize?: number
  }>(),
  {
    total: 0,
    pageSize: 10,
  }
)

const emit = defineEmits(['current-change'])

const page = ref<number>(1) // 当前页数
const totalPage = computed(() => Math.ceil(props.total / props.pageSize)) // 总页数
watch(page, (val) => {
  emit('current-change', val)
})
// 当 总页数<当前页数 时，翻页到最大页数
watch(totalPage, (val) => {
  if (val < page.value) page.value = val
})
</script>

<style lang="scss" scoped>
:deep() {
  .el-button {
    padding: 0;
    margin: 0;
  }
  .el-input__inner {
    text-align: center;
  }
}
</style>
