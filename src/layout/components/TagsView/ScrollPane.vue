<template>
  <el-scrollbar
    ref="scrollContainerRef"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'

const tagAndTagSpacing = 4 // tagAndTagSpacing

emit: ['wheel.prevent']

const emit = defineEmits<{
  (e: 'scroll'): void
}>()

const scrollContainerRef = ref()
const left = ref<number>(0)
const scrollWrapper=computed(() => {
  return scrollContainerRef.value.wrapRef
})
onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})

// X move also be scrolled
const handleScroll = (e: WheelEvent) => {
  const eventDelta = e.deltaX || -e.deltaY * 40
  scrollContainerRef.value.setScrollLeft(scrollWrapper.value.scrollLeft + eventDelta / 4)
}
const emitScroll = () => {
  emit('scroll')
}
const moveToTarget = (currentTag: HTMLElement) => {
  const containerWidth = scrollContainerRef.value.$el.offsetWidth
  const tagList = inject('tagRef') as HTMLElement[]

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    scrollWrapper.value.scrollLeft = 0
  } else if (lastTag === currentTag) {
    scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth - containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = (nextTag as any).$el.offsetLeft + (nextTag as any).$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = (prevTag as any).$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > scrollWrapper.value.scrollLeft + containerWidth) {
      scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth
    } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
      scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
