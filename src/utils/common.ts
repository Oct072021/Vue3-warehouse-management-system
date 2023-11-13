/**
 * time stamp + setTimeOut
 *
 * @param {Function} fn
 * @param {Number} delay
 *
 * @returns {Function}
 */
export function throttle(fn: Function, delay: number) {
	let timeout: number | null = null
	let startTime: number = Date.now()
	return function (this: any) {
		const currentTime = Date.now()
		const remaining = delay - (currentTime - startTime)
		if (timeout) clearTimeout(timeout)
		if (remaining <= 0) {
			// first click must work
			fn.apply(this, arguments)
			startTime = Date.now()
		} else {
			// last click must work
			timeout = window.setTimeout(() => fn.apply(this, arguments), remaining)
		}
	}
}
/**
 * setTimeOut
 *
 * @param {Function} fn
 * @param {Number} delay
 *
 * @returns {Function}
 */
// export function debounce(fn, delay) {
//   let timeout = null
//   return function() {
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(() => fn.apply(this, arguments), delay)
//   }
// }
