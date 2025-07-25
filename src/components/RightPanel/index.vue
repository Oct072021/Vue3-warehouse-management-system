<template>
  <div
    ref="rightPanelRef"
    :class="{ show: show }"
    class="rightPanel-container"
  >
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': theme }"
        @click="show = !show"
      >
        <el-icon>
          <component :is="show ? 'close' : 'setting'" />
        </el-icon>
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@/store/settings'

import { addClass, removeClass } from '@/utils'

import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const settingsStore = useSettingsStore()

const props = withDefaults(
  defineProps<{
    clickNotClose?: boolean
    buttonTop?: number
  }>(),
  {
    clickNotClose: false,
    buttonTop: 250,
  },
)

const theme = computed(() => {
  return settingsStore.theme
})

const show = ref<boolean>(false)
watch(show, (value) => {
  if (value && !props.clickNotClose) {
    addEventClick()
  }
  if (value) {
    addClass(document.body, 'showRightPanel')
  } else {
    removeClass(document.body, 'showRightPanel')
  }
})

const rightPanelRef = ref()
const addEventClick = () => {
  window.addEventListener('click', closeSidebar)
}
const closeSidebar = (evt: MouseEvent) => {
  const parent = (evt.target! as HTMLElement).closest('.rightPanel')
  if (!parent) {
    show.value = false
    window.removeEventListener('click', closeSidebar)
  }
}
const insertToBody = () => {
  const body = document.querySelector('body')
  body!.insertBefore(rightPanelRef.value, body!.firstChild)
}

onMounted(() => {
  insertToBody()
})

onUnmounted(() => {
  rightPanelRef.value.remove()
})
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 24px;
  }
}
</style>
