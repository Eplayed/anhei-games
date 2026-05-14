/**
 * useMouseTilt.js - 鼠标透视倾斜效果
 * 跟踪全局鼠标位置，为元素计算 rotateX/rotateY 倾斜角度
 * 鼠标靠近元素中心时倾斜更大，远离时回到原位
 */
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'

// 全局鼠标位置（模块级单例，避免多监听器）
var mouseX = ref(0)
var mouseY = ref(0)
var listeners = 0

function updateMousePosition(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

/**
 * 鼠标透视倾斜效果
 * @param {Object} options
 * @param {number} options.maxTilt - 最大倾斜角度（度），默认 8
 * @param {number} options.perspective - 透视距离（px），默认 800
 * @param {number} options.scale - 悬停时缩放，默认 1.02
 * @param {number} options.speed - 过渡速度（ms），默认 200
 * @param {boolean} options.enabled - 是否启用，默认 true
 * @returns {Object} { elementRef, tiltStyle, onMouseEnter, onMouseLeave, onMouseMove, enabled }
 */
export function useMouseTilt(options) {
  var maxTilt = (options && options.maxTilt) || 8
  var perspective = (options && options.perspective) || 800
  var scale = (options && options.scale) || 1.02
  var speed = (options && options.speed) || 200
  var initialEnabled = (options && options.enabled !== undefined) ? options.enabled : true

  var enabled = ref(initialEnabled)
  var isHovering = ref(false)
  var tiltX = ref(0)
  var tiltY = ref(0)
  var currentScale = ref(1)
  var elementRef = ref(null)

  function onMouseEnter() {
    if (!enabled.value) return
    isHovering.value = true
    currentScale.value = scale
  }

  function onMouseLeave() {
    isHovering.value = false
    tiltX.value = 0
    tiltY.value = 0
    currentScale.value = 1
  }

  function onMouseMove(e) {
    if (!enabled.value || !isHovering.value || !elementRef.value) return

    var rect = elementRef.value.getBoundingClientRect()
    var centerX = rect.left + rect.width / 2
    var centerY = rect.top + rect.height / 2

    // 鼠标相对元素中心的偏移比例 (-1 到 1)
    var ratioX = (e.clientX - centerX) / (rect.width / 2)
    var ratioY = (e.clientY - centerY) / (rect.height / 2)

    // 限制在 -1 到 1
    ratioX = Math.max(-1, Math.min(1, ratioX))
    ratioY = Math.max(-1, Math.min(1, ratioY))

    // rotateX: 鼠标在上方→正旋转（顶部远离），鼠标在下方→负旋转
    // rotateY: 鼠标在右方→正旋转（右侧远离），鼠标在左方→负旋转
    tiltX.value = -ratioY * maxTilt
    tiltY.value = ratioX * maxTilt
  }

  // 计算样式对象
  function getTiltStyle() {
    if (!enabled.value) {
      return {
        transform: 'perspective(' + perspective + 'px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform ' + speed + 'ms ease-out',
        willChange: 'auto'
      }
    }
    return {
      transform: 'perspective(' + perspective + 'px) rotateX(' + tiltX.value + 'deg) rotateY(' + tiltY.value + 'deg) scale(' + currentScale.value + ')',
      transition: 'transform ' + speed + 'ms ease-out',
      willChange: isHovering.value ? 'transform' : 'auto'
    }
  }

  // 挂载全局鼠标监听
  onMounted(function() {
    if (listeners === 0) {
      window.addEventListener('mousemove', updateMousePosition)
    }
    listeners++
  })

  onUnmounted(function() {
    listeners--
    if (listeners <= 0) {
      window.removeEventListener('mousemove', updateMousePosition)
      listeners = 0
    }
  })

  return {
    elementRef: elementRef,
    getTiltStyle: getTiltStyle,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseMove: onMouseMove,
    enabled: enabled,
    isHovering: isHovering
  }
}

/**
 * 全局鼠标视差效果
 * 根据鼠标在视口中的位置，为元素计算偏移量
 * @param {Object} options
 * @param {number} options.intensity - 偏移强度（px），默认 20
 * @param {boolean} options.invert - 是否反向，默认 false
 * @returns {Object} { offsetX, offsetY, mouseX, mouseY }
 */
export function useMouseParallax(options) {
  var intensity = (options && options.intensity) || 20
  var invert = (options && options.invert) || false

  var offsetX = ref(0)
  var offsetY = ref(0)

  var stopWatch = null

  onMounted(function() {
    stopWatch = watchEffect(function() {
      var vw = window.innerWidth
      var vh = window.innerHeight
      if (vw === 0 || vh === 0) return
      // 鼠标位置归一化到 -1 ~ 1
      var nx = (mouseX.value / vw - 0.5) * 2
      var ny = (mouseY.value / vh - 0.5) * 2
      var dir = invert ? -1 : 1
      offsetX.value = nx * intensity * dir
      offsetY.value = ny * intensity * dir
    })
  })

  onUnmounted(function() {
    if (stopWatch) stopWatch()
  })

  return {
    offsetX: offsetX,
    offsetY: offsetY,
    mouseX: mouseX,
    mouseY: mouseY
  }
}
