<template>
  <div
    ref="rootRef"
    class="waterfall-container"
  >
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, watch, nextTick } from 'vue'
import { Config } from './data'
import { debounce } from '@/utils'

const props = withDefaults(
  defineProps<{
    imgList: string[]
    minGap?: number
    width?: number
  }>(),
  {
    minGap: 10,
    width: 220,
  },
)

const rootRef = ref()

// 使用定位的方式，创建瀑布流
const createWaterFall = () => {
  const el = rootRef.value as HTMLElement
  console.log(el)

  const { minGap, width } = props

  const frag = createImgElement(props.imgList, { minGap, width })

  el.appendChild(frag)
}
// 创建图片的HTML元素
const createImgElement = (imgList: string[], options: Config) => {
  const imgs: HTMLElement[] = []
  const frag = document.createDocumentFragment()
  imgList.forEach((url: string) => {
    const img: HTMLImageElement = document.createElement('img')
    img.src = url
    img.style.width = options.width + 'px'
    img.style.position = 'absolute'
    img.style.transition = '0.5s'
    imgs.push(img)
    img.onload = debounce(
      function () {
        setImgPoisition(options, imgs)
      },
      1 * 1000,
      false,
    )

    frag.append(img)
  })
  window.onresize = debounce(
    function () {
      setImgPoisition(options, imgs)
    },
    0.3 * 1000,
    false,
  )

  return frag
}
// 设置图片元素的坐标
const setImgPoisition = (options: Config, imgs: HTMLElement[]): any => {
  const { number, gap } = getHorizontalInfo(options)

  const arr = new Array(number).fill(0)

  imgs.forEach((ele) => {
    const min = Math.min(...arr)
    ele.style.top = min + 'px'

    const i = arr.indexOf(min)
    arr[i] += ele.clientHeight + options.minGap
    // 横坐标
    ele.style.left = i * (options.width + gap) + 'px'
  })

  // return eles
}
// 获取水平方向的信息
const getHorizontalInfo = ({ width, minGap }: Config) => {
  const el = rootRef.value as HTMLElement
  const containerWidth = el.clientWidth // 容器宽度
  const number = Math.floor((containerWidth + minGap) / (width + minGap)) // 一行可以存放的图片数量
  const gap = (containerWidth - width * number) / (number - 1) // 实际间隔
  return { containerWidth, gap, number }
}

onMounted(() => {
  createWaterFall()
})
onUpdated(() => {
  createWaterFall()
})
</script>

<style lang="scss" scoped>
.waterfall-container {
  position: relative;
}
</style>
