<template>
  <div
    ref="rootRef"
    class="waterfall-container"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { debounce, waitForImage } from '@/utils'

const props = withDefaults(
  defineProps<{
    minGap?: number
    width?: number
    timeout?: number
  }>(),
  {
    minGap: 10,
    width: 220,
    timeout: 0,
  },
)

const rootRef = ref()

// 初始化元素
const initElement = async () => {
  const children = rootRef.value?.children as HTMLCollection

  for (let i = 0; i < children.length; i++) {
    const el = children[i] as HTMLElement

    el.style.width = props.width + 'px'
    el.style.position = 'absolute'
    el.style.transition = '0.5s'

    setPoisition()
    window.onresize = debounce(
      function () {
        setPoisition()
      },
      0.3 * 1000,
      false,
    )

    // 如果元素是img相关的元素, 则需要监听onload事件
    const img = await waitForImage(el, props.timeout)
    if (img) {
      img.onload = debounce(
        function () {
          setPoisition()
        },
        1 * 1000,
        false,
      )
    }
  }
}
// 设置元素的坐标
const setPoisition = () => {
  const { number, gap } = getHorizontalInfo()

  const arr = new Array(number).fill(0)

  const children = rootRef.value?.children as HTMLCollection
  for (let i = 0; i < children.length; i++) {
    const ele = children[i] as HTMLElement

    const min = Math.min(...arr)
    ele.style.top = min + 'px'

    const index = arr.indexOf(min)
    arr[index] += ele.clientHeight + props.minGap
    // 横坐标
    ele.style.left = index * (props.width + gap) + 'px'
  }
  // 设置容器高度
  const el = rootRef.value as HTMLElement
  el.style.height = Math.max(...arr) + 'px'
}
// 获取水平方向的信息
const getHorizontalInfo = () => {
  const el = rootRef.value as HTMLElement
  const containerWidth = el.clientWidth // 容器宽度
  const number = Math.floor((containerWidth + props.minGap) / (props.width + props.minGap)) // 一行可以存放的图片数量
  const gap = (containerWidth - props.width * number) / (number - 1) // 实际间隔
  return { containerWidth, gap, number }
}

onMounted(() => {
  initElement()
})
onUpdated(() => {
  initElement()
})
</script>

<style lang="scss" scoped>
.waterfall-container {
  position: relative;
}
</style>
