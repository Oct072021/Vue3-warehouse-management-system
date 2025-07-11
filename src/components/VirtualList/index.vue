<template>
  <div
    ref="listRef"
    :style="{ height }"
    class="infinite-list-container"
    @scroll="scrollEvent"
  >
    <div
      ref="phantomRef"
      class="infinite-list-phantom"
    />
    <div
      ref="contentRef"
      class="infinite-list"
    >
      <div
        class="infinite-list-item"
        ref="items"
        :id="item._index"
        :key="item._index"
        v-for="item in visibleData"
      >
        <slot
          ref="slot"
          :item="item.item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    listData?: any[]
    estimatedItemSize: number
    bufferScale?: number
    height?: string
  }>(),
  {
    listData: () => [],
    bufferScale: 1,
    height: '80vh',
  }
)

const listRef = ref()
const phantomRef = ref()
const contentRef = ref()
const items = ref([])

const screenHeight = ref(0)
const start = ref<number>(0)
const end = ref<number>(0)

const positions = ref<any[]>([])

const _listData = computed(() => {
  return props.listData.map((item, index) => ({
    _index: `_${index}`,
    item,
  }))
})

const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / props.estimatedItemSize)
})

const aboveCount = computed(() => {
  return Math.min(start.value, props.bufferScale * visibleCount.value)
})

const belowCount = computed(() => {
  return Math.min(props.listData.length - end.value, props.bufferScale * visibleCount.value)
})

const visibleData = computed(() => {
  let startIdx = start.value - aboveCount.value
  let endIdx = end.value + belowCount.value
  return _listData.value.slice(startIdx, endIdx)
})

const initPositions = () => {
  positions.value = props.listData.map((d, index) => ({
    index,
    height: props.estimatedItemSize,
    top: index * props.estimatedItemSize,
    bottom: (index + 1) * props.estimatedItemSize,
  }))
}

const getStartIndex = (scrollTop = 0) => {
  return binarySearch(positions.value, scrollTop)
}

const binarySearch = (list: any[], value: number) => {
  let start = 0
  let end = list.length - 1
  let tempIndex = null

  while (start <= end) {
    let midIndex = Math.floor((start + end) / 2)
    let midValue = list[midIndex].bottom
    if (midValue === value) {
      return midIndex + 1
    } else if (midValue < value) {
      start = midIndex + 1
    } else if (midValue > value) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex
      }
      end = midIndex - 1
    }
  }
  return tempIndex
}

const updateItemsSize = () => {
  let nodes = items.value as HTMLElement[]
  nodes.forEach((node) => {
    let rect = node.getBoundingClientRect()
    let height = rect.height
    let index = +node.id.slice(1)
    let oldHeight = positions.value[index].height
    let dValue = oldHeight - height
    if (dValue) {
      positions.value[index].bottom = positions.value[index].bottom - dValue
      positions.value[index].height = height
      for (let k = index + 1; k < positions.value.length; k++) {
        positions.value[k].top = positions.value[k - 1].bottom
        positions.value[k].bottom = positions.value[k].bottom - dValue
      }
    }
  })
}

const setStartOffset = () => {
  let startOffset
  if (start.value >= 1) {
    let size =
      positions.value[start.value].top -
      (positions.value[start.value - aboveCount.value] ? positions.value[start.value - aboveCount.value].top : 0)
    startOffset = positions.value[start.value - 1].bottom - size
  } else {
    startOffset = 0
  }
  contentRef.value.style.transform = `translate3d(0,${startOffset}px,0)`
}

const scrollEvent = () => {
  let scrollTop = listRef.value.scrollTop
  start.value = getStartIndex(scrollTop)!
  end.value = start.value + visibleCount.value
  setStartOffset()
}

onMounted(() => {
  screenHeight.value = listRef.value.clientHeight
  start.value = 0
  end.value = start.value + visibleCount.value
  initPositions()
})

onUpdated(() => {
  nextTick(() => {
    if (!items.value || !items.value.length) {
      return
    }
    updateItemsSize()
    let height = positions.value[positions.value.length - 1].bottom
    phantomRef.value.style.height = height + 'px'
    setStartOffset()
  })
})

watch(() => props.listData, initPositions)
</script>

<style lang="scss" scoped>
.infinite-list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    .infinite-list-item {
      padding: 5px;
      color: #555;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      /* height:200px; */
    }
  }
}
</style>
