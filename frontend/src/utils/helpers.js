/**
 * 工具函数：防抖
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * 工具函数：节流
 * @param {Function} fn - 要节流的函数
 * @param {number} interval - 间隔时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, interval = 200) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 工具函数：生成唯一 ID
 * @returns {string} 唯一 ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

/**
 * 工具函数：深拷贝
 * @param {*} obj - 要拷贝的对象
 * @returns {*} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  return JSON.parse(JSON.stringify(obj))
}
