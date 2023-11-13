/**
 * Parse the time to string
 * @param {(Date|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: string | number | Date, cFormat?: string) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string') {
			if (/^[0-9]+$/.test(time)) {
				// support "1548221490638"
				time = parseInt(time)
			} else {
				// support safari
				// https://stackoverflow.com/questions/4310953/invalid-date-in-safari
				time = time.replace(new RegExp(/-/gm), '/')
			}
		}

		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj: { [index: string]: number } = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: number, option: string) {
	if (('' + time).length === 10) {
		time = parseInt('' + time) * 1000
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
export function getQueryObject(url: string) {
	url = url == null ? window.location.href : url
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj: { [index: string]: string } = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1)
		let val = decodeURIComponent($2)
		val = String(val)
		obj[name] = val
		return rs
	})
	return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
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

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual: any[]) {
	const newArray = []
	for (let i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i])
		}
	}
	return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json: { [index: string]: any }) {
	if (!json) return ''
	return cleanArray(
		Object.keys(json).map(key => {
			if (json[key] === undefined) return ''
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
		})
	).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
	const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
	if (!search) {
		return {}
	}
	const obj: { [index: string]: string } = {}
	const searchArr = search.split('&')
	searchArr.forEach(v => {
		const index = v.indexOf('=')
		if (index !== -1) {
			const name = v.substring(0, index)
			const val = v.substring(index + 1, v.length)
			obj[name] = val
		}
	})
	return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val: string) {
	const div = document.createElement('div')
	div.innerHTML = val
	return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target: { [index: string]: any }, source: { [index: string]: any }) {
	if (typeof target !== 'object') {
		target = {}
	}
	if (Array.isArray(source)) {
		return source.slice()
	}
	Object.keys(source).forEach(property => {
		const sourceProperty = source[property]
		if (typeof sourceProperty === 'object') {
			target[property] = objectMerge(target[property], sourceProperty)
		} else {
			target[property] = sourceProperty
		}
	})
	return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element: HTMLElement, className: string) {
	if (!element || !className) {
		return
	}
	let classString = element.className
	const nameIndex = classString.indexOf(className)
	if (nameIndex === -1) {
		classString += '' + className
	} else {
		classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
	}
	element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type: string) {
	if (type === 'start') {
		return new Date().getTime() - 3600 * 1000 * 24 * 90
	} else {
		return new Date(new Date().toDateString())
	}
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: Function, wait: number, immediate: boolean) {
	let timeout: number | null, context: any

	return function (this: any, ...args: any[]) {
		context = this
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		// if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			func.apply(context, args)
			context = args = null as any
			return
		}
		if (timeout) clearTimeout(timeout)
		timeout = window.setTimeout(function () {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				func.apply(context, args)
				if (!timeout) context = args = null as any
			}
		}, wait)

		return
	}
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source: { [index: string]: any }) {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments  --deepClone')
	}
	const targetObj: { [index: string]: any } = source.constructor === Array ? [] : {}
	Object.keys(source).forEach(keys => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr: any[]) {
	return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
	const timestamp = +new Date() + ''
	const randomNum = parseInt('' + (1 + Math.random()) * 65536) + ''
	return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
	return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
	if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
	if (hasClass(ele, cls)) {
		const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
		ele.className = ele.className.replace(reg, ' ')
	}
}
