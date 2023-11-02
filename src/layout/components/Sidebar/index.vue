<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="_variables.menuBg"
        :text-color="_variables.menuText"
        :unique-opened="false"
        :active-text-color="_variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

import variables from '@/styles/variables.module.scss'

import { usePermissionStore } from '@/store/permission'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'

const permissionStore = usePermissionStore()
const appStore = useAppStore()
const settingsStore = useSettingsStore()

const route = useRoute()

const permission_routes = computed(() => {
  return permissionStore.routes
})

const sidebar = computed(() => {
  return appStore.sidebar
})

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const showLogo = computed(() => {
  return settingsStore.sidebarLogo
})

const isCollapse = computed(() => {
  return !sidebar.value.opened
})

const _variables = computed(() => {
  return variables
})
</script>
