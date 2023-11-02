<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isFullscreen = ref<boolean>(false)

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning',
    })
    return false
  }
  screenfull.toggle()
}
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}
const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
}

onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  destroy()
})
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
