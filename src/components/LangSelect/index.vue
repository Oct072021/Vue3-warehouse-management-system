<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <SvgIcon
        class-name="international-icon"
        icon-class="language"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :disabled="language === 'zh'"
          command="zh"
        >
          中文
        </el-dropdown-item>
        <el-dropdown-item
          :disabled="language === 'en'"
          command="en"
        >
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { ElMessage } from 'element-plus'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()

const { locale } = useI18n()
const language = computed(() => {
  return appStore.language
})
const handleSetLanguage = (lang: string) => {
  locale.value = lang
  appStore.setLanguage(lang)
  ElMessage({
    message: 'Switch Language Success',
    type: 'success',
  })
}
</script>
