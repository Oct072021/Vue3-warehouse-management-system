<template>
  <!-- 组件二次封装示例 -->
  <div>
    <div>自定义内容</div>
    <component :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)" />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h, ComponentPublicInstance } from 'vue'

import type { InputInstance } from 'element-plus'
import { ElInput } from 'element-plus'
import type { Props } from './data.d'

const props = defineProps<Props>()

const vm = getCurrentInstance()
const changeRef = (ins: ComponentPublicInstance | Element | null) => {
  if (vm && ins) {
    vm.exposed = ins as InputInstance
    vm.exposeProxy = ins as InputInstance
  }
}
</script>

<style lang="scss" scoped></style>
