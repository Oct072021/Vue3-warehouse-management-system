<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ t(`settings.title`) }}</h3>

      <div class="drawer-item">
        <span>{{ t(`settings.color`) }}</span>
        <!-- <theme-picker
          style="height: 26px; margin: 0 8px 0 0"
          @change="themeChange"
        /> -->
        theme-picker暂停开发
      </div>

      <div class="drawer-item">
        <span>{{ t(`settings.tagsView`) }}</span>
        <el-switch
          v-model="tagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t(`settings.fix`) }}</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t(`settings.logo`) }}</span>
        <el-switch
          v-model="sidebarLogo"
          class="drawer-switch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@/store/settings'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// import ThemePicker from '@/components/ThemePicker/index.vue'

const { t } = useI18n()

const settingsStore = useSettingsStore()

const fixedHeader = computed(() => {
  get: () => {
    return settingsStore.fixedHeader
  }
  set: (val: boolean) => {
    settingsStore.changeSetting({ key: 'fixedHeader', value: val })
  }
})
const tagsView = computed(() => {
  get: () => {
    return settingsStore.tagsView
  }
  set: (val: boolean) => {
    settingsStore.changeSetting({ key: 'tagsView', value: val })
  }
})
const sidebarLogo = computed(() => {
  get: () => {
    return settingsStore.sidebarLogo
  }
  set: (val: boolean) => {
    settingsStore.changeSetting({ key: 'sidebarLogo', value: val })
  }
})

const themeChange = (val: boolean) => {
  settingsStore.changeSetting({ key: 'theme', value: val })
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
