<template>
  <div
    ref="rootRef"
    class="waterfall-container"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, nextTick, onUnmounted } from 'vue'
import { debounce, waitForImage } from '@/utils'

const props = withDefaults(
  defineProps<{
    minGap?: number
    width?: number
    timeout?: number
    fill?: boolean
  }>(),
  {
    minGap: 10,
    width: 220,
    timeout: 0,
    fill: false,
  },
)

const rootRef = ref<HTMLElement>()

const debouncedLayout = debounce(layout, 0.5 * 1000)
const observer = new ResizeObserver(() => {
  debouncedLayout()
})

// 重新布局
async function layout() {
  if (!rootRef.value) return
  const children = rootRef.value.children as HTMLCollection
  if (children.length === 0) return

  // 1. 设置宽度
  await setItemWidth()
  // 2. 等待图片加载和DOM更新
  const promises = Array.from(children).map((el) => waitForImage(el as HTMLElement, props.timeout))
  await Promise.all(promises)
  await nextTick()
  // 3. 更新位置
  updatePosition()
}

const handleResize = debounce(
  async function () {
    await layout()
  },
  300,
  false,
)

// 初始化元素
const initElement = () => {
  window.addEventListener('resize', handleResize)
}

const observeChildren = () => {
  if (!rootRef.value) return
  const children = rootRef.value.children as HTMLCollection
  for (let i = 0; i < children.length; i++) {
    observer.observe(children[i] as HTMLElement)
  }
}

// 设置元素宽度
const setItemWidth = async () => {
  if (!rootRef.value) return
  const { itemWidth } = getHorizontalInfo()
  const children = rootRef.value.children as HTMLCollection
  for (let i = 0; i < children.length; i++) {
    const ele = children[i] as HTMLElement
    ele.style.width = itemWidth + 'px'
    ele.style.position = 'absolute'
    ele.style.transition = 'all 0.3s'
  }
}

// 设置元素的坐标
const updatePosition = () => {
  if (!rootRef.value) return
  const { number, gap, itemWidth } = getHorizontalInfo()

  const arr = new Array(number).fill(0)

  const children = rootRef.value.children as HTMLCollection
  for (let i = 0; i < children.length; i++) {
    const ele = children[i] as HTMLElement

    const min = Math.min(...arr)
    ele.style.top = min + 'px'

    const index = arr.indexOf(min)
    arr[index] += ele.clientHeight + props.minGap
    // 横坐标
    ele.style.left = index * (itemWidth + gap) + 'px'
  }
  // 设置容器高度
  const el = rootRef.value as HTMLElement
  el.style.height = Math.max(...arr) + 'px'
}
// 获取水平方向的信息
const getHorizontalInfo = () => {
  const el = rootRef.value as HTMLElement
  if (!el) return { containerWidth: 0, gap: 0, number: 0, itemWidth: 0 }
  const containerWidth = el.clientWidth // 容器宽度
  const number = Math.floor((containerWidth + props.minGap) / (props.width + props.minGap)) // 一行可以存放的图片数量

  if (props.fill) {
    // fill为true，动态计算宽度，gap固定
    const gap = props.minGap
    const itemWidth = (containerWidth - (number - 1) * gap) / number
    return { containerWidth, gap, number, itemWidth }
  } else {
    // fill为false，宽度固定，gap动态计算
    const itemWidth = props.width
    const gap = (containerWidth - itemWidth * number) / (number - 1) // 实际间隔
    return { containerWidth, gap, number, itemWidth }
  }
}

onMounted(() => {
  initElement()
  layout()
  observeChildren()
})
onUpdated(() => {
  layout()
  observeChildren()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  observer.disconnect()
})
</script>

<style lang="scss" scoped>
.waterfall-container {
  position: relative;
}
</style>
