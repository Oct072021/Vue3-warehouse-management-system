<template>
  <el-dropdown
    trigger="click"
    @command="handleSetSize"
  >
    <div>
      <SvgIcon
        class-name="size-icon"
        icon-class="size"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed, nextTick, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { SizeOptions } from './data.d'

import { useAppStore } from '@/store/app'
import { useTagsViewStore } from '@/store/tagsView'

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const tagsViewStore = useTagsViewStore()

const sizeOptions = reactive<SizeOptions[]>([
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Small', value: 'small' },
  { label: 'Mini', value: 'mini' },
])

const size = computed(() => {
  return appStore.size
})
const handleSetSize = (size: string) => {
  // this.$ELEMENT.size=size
  appStore.setSize(size)
  refreshView()
  ElMessage({
    message: 'Switch Size Success',
    type: 'success',
  })
}
const refreshView = () => {
  // In order to make the cached page re-rendered
  tagsViewStore.delAllCachedViews()

  const { fullPath } = route

  nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath,
    })
  })
}
</script>
