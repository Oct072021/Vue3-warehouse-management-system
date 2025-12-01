<template>
  <!-- 组件二次封装示例 -->
  <div>
    <div>自定义内容</div>
    <component :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)" />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h, ref } from 'vue'

import { InputInstance, ElInput } from 'element-plus'
import { Props } from './data.d'

const props = defineProps<Props>()

const vm = getCurrentInstance()
const changeRef = (ins: InputInstance | null) => {
  if (vm) {
    vm.exposed = ins || {}
    vm.exposeProxy = ins || {}
  }
}
</script>

<style lang="scss" scoped></style>
