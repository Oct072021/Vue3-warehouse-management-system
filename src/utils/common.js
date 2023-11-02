/**
 * time stamp + setTimeOut
 *
 * @param {Function} fn
 * @param {Number} delay
 *
 * @returns {Function}
 */
export function throttle(fn, delay) {
  let timer = null
  let startTime = Date.now()
  return function() {
    const currentTime = Date.now()
    const remaining = delay - (currentTime - startTime)
    clearTimeout(timer)
    if (remaining <= 0) {
      // first click must work
      fn.apply(this, arguments)
      startTime = Date.now()
    } else {
      // last click must work
      timer = setTimeout(() => fn.apply(this, arguments), remaining)
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
export function debounce(fn, delay) {
  let timeout = null
  return function() {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, arguments), delay)
  }
}
