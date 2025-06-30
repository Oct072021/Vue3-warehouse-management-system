import { Directive, DirectiveBinding, VNode } from 'vue'
import { Config } from './data'
import { debounce } from '@/utils'

const defaultOptions = {
  minGap: 10,
  width: 220,
}
// 使用定位的方式，创建瀑布流
const createWaterFall = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
  const { value: imgList } = binding
  const { minGap, width } = vnode.props as Config

  const options = Object.assign({}, defaultOptions, { minGap, width })

  // 子元素采用绝对定位，因此父元素必须是定位元素
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }
  const frag = createImgElement(el, imgList, options)

  el.appendChild(frag)
}
// 创建图片的HTML元素
const createImgElement = (el: HTMLElement, imgList: string[], options: Config) => {
  const imgs: HTMLElement[] = []
  const frag = document.createDocumentFragment()
  imgList.forEach((url: string) => {
    const img: HTMLImageElement = document.createElement('img')
    img.src = url
    img.style.width = options.width + 'px'
    img.style.position = 'absolute'
    img.style.transition = '0.5s'
    imgs.push(img)
    img.onload = () => {
      debounce(
        function () {
          setImgPoisition(el, imgList, options, imgs)
        },
        1000,
        false
      )()
    }
    frag.append(img)
  })
  window.onresize = () => {
    debounce(
      function () {
        setImgPoisition(el, imgList, options, imgs)
      },
      0.3 * 1000,
      false
    )()
  }

  return frag
}
// 设置图片元素的坐标
const setImgPoisition = (el: HTMLElement, imgList: string[], options: Config, imgs: HTMLElement[]): any => {
  console.log(1)

  const { number, gap, containerWidth } = getHorizontalInfo(el, options)

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
const getHorizontalInfo = (el: HTMLElement, { width, minGap }: Config) => {
  const containerWidth = el.clientWidth // 容器宽度
  const number = Math.floor((containerWidth + minGap) / (width + minGap)) // 一行可以存放的图片数量
  const gap = (containerWidth - width * number) / (number - 1) // 实际间隔
  return { containerWidth, gap, number }
}

export const waterfall: Directive = {
  mounted(el, binding, vnode) {
    createWaterFall(el, binding, vnode)
  },
  updated(el, binding, vnode) {
    createWaterFall(el, binding, vnode)
  },
}
