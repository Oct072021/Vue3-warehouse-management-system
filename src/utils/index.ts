// 解析时间
export function parseTime<T extends object | string | number>(time: T, cFormat: string): string {
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    let _time: string | number
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        _time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        _time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      _time = time * 1000
    }
    date = new Date(_time!)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key as keyof typeof formatObj]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 格式化时间
export function formatTime(time: number, option: string) {
  if (('' + time).length === 10) {
    time = parseInt(time + '') * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - +d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject<T>(url: string): T {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {} as T
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1) as keyof T
    let val = decodeURIComponent($2) as T[keyof T]
    // val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 返回字节长度(支持UTF-8)
export function byteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

// obj转url参数
export function param<T extends object>(json: T) {
  return Object.keys(json)
    .map((key) => {
      if (json[key as keyof T] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key as keyof T] + '')
    })
    .filter((item) => item !== undefined)
    .join('&')
}

// url参数转obj
export function param2Obj<T extends object>(url: string): T {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  const obj = {} as T
  if (search) {
    const searchArr = search.split('&')
    searchArr.forEach((v) => {
      const index = v.indexOf('=')
      if (index !== -1) {
        const name = v.substring(0, index) as keyof T
        const val = v.substring(index + 1, v.length) as T[keyof T]
        obj[name] = val
      }
    })
  }
  return obj
}

// 合并两个obj
export function objectMerge<T extends object, U extends object>(target: T, source: U): T & U {
  // 遍历 source 的所有属性，递归合并
  ;(Object.keys(source) as Array<keyof U>).forEach((property) => {
    const sourceProperty = source[property]
    const targetProperty = (target as Record<keyof U, unknown>)[property]

    if (typeof sourceProperty === 'object' && sourceProperty !== null) {
      ;(target as Record<keyof U, unknown>)[property] = objectMerge(targetProperty as U, sourceProperty)
    } else {
      ;(target as Record<keyof U, unknown>)[property] = sourceProperty
    }
  })

  return target as T & U
}

// 切换class
export function toggleClass(element: HTMLElement, className: string) {
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

// 获取当天时间
export function getTime(type?: string) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

// deepClone简易版，只支持处理object和array    完整功能请使用 lodash's _.cloneDeep
export function deepClone<T extends object | unknown[]>(source: T): T {
  // 处理基本类型和null
  if (source === null || typeof source !== 'object') {
    return source
  }
  // 处理数组
  if (Array.isArray(source)) {
    return source.map((item) => deepClone(item)) as T
  }
  // 处理普通对象
  const clone = Object.create(Object.getPrototypeOf(source))
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      clone[key] = deepClone(source[key as keyof T] as T)
    }
  }
  return clone as T
}

// 防抖
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let args: Parameters<T>
  let context: unknown
  let timestamp: number
  let result: ReturnType<T> | undefined

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = null
          args = null!
        }
      }
    }
  }

  return function (this: unknown, ...innerArgs: Parameters<T>): ReturnType<T> | undefined {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, innerArgs)
      context = null
      args = null!
    }

    return result
  }
}

// 数组去重
export function uniqueArr<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

// 创建唯一的string
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536 + '') + ''
  return (+(randomNum + timestamp)).toString(32)
}

// Check if an element has a class
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
// Add class to element
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
// Remove class from element
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
