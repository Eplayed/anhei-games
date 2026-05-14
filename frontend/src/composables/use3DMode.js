/**
 * use3DMode - 3D/2D 模式状态管理
 * 自动检测设备能力 → 推荐模式
 * 手动切换 → localStorage 持久化
 * 手势状态 → 独立管理
 */

import { ref, watch } from 'vue'
import { useDeviceCapability } from './useDeviceCapability.js'

var STORAGE_KEY_MODE = 'diablo-3d-mode'       // 'auto' | '3d' | '2d'
var STORAGE_KEY_CAMERA = 'diablo-3d-camera'    // 'granted' | 'denied' | 'unasked'

// 模块级单例
var is3DMode = ref(null)          // null = 未检测
var isGestureEnabled = ref(false) // 手势是否启用
var userPreference = ref('auto')  // 用户偏好
var cameraPreference = ref('unasked')
var initialized = false

function loadPreference() {
  try {
    var mode = localStorage.getItem(STORAGE_KEY_MODE)
    if (mode === '3d' || mode === '2d' || mode === 'auto') {
      userPreference.value = mode
    }
    var cam = localStorage.getItem(STORAGE_KEY_CAMERA)
    if (cam === 'granted' || cam === 'denied' || cam === 'unasked') {
      cameraPreference.value = cam
    }
  } catch (e) {
    // ignore
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // ignore
  }
}

export function use3DMode() {
  var capability = useDeviceCapability()

  if (!initialized) {
    loadPreference()
    initialized = true
  }

  // 根据设备能力 + 用户偏好计算最终模式
  function resolveMode() {
    if (userPreference.value === '2d') {
      is3DMode.value = false
      return
    }
    if (userPreference.value === '3d') {
      // 用户强制3D，但无 WebGL 时仍降级
      is3DMode.value = capability.hasWebGL.value
      return
    }
    // auto: 跟随推荐
    is3DMode.value = capability.recommendedMode.value !== '2d'
  }

  // 设备检测完成后计算
  watch(function() { return capability.isDetecting.value }, function(detecting) {
    if (!detecting) {
      resolveMode()
    }
  })

  // 如果已有缓存结果，立即计算
  if (!capability.isDetecting.value) {
    resolveMode()
  }

  // 手势是否可用：3D模式 + 摄像头 + 用户授权
  function resolveGesture() {
    if (!is3DMode.value) {
      isGestureEnabled.value = false
      return
    }
    isGestureEnabled.value = capability.hasCamera.value && cameraPreference.value === 'granted'
  }

  watch(function() { return is3DMode.value }, resolveGesture)

  // ---- 暴露方法 ----

  function toggle3DMode() {
    if (is3DMode.value) {
      // 切到 2D
      userPreference.value = '2d'
      is3DMode.value = false
    } else {
      // 切到 3D
      if (!capability.hasWebGL.value) return // 无法切3D
      userPreference.value = '3d'
      is3DMode.value = true
    }
    savePreference(STORAGE_KEY_MODE, userPreference.value)
  }

  function setAutoMode() {
    userPreference.value = 'auto'
    resolveMode()
    savePreference(STORAGE_KEY_MODE, 'auto')
  }

  function enableGestures() {
    cameraPreference.value = 'granted'
    isGestureEnabled.value = true
    savePreference(STORAGE_KEY_CAMERA, 'granted')
  }

  function disableGestures() {
    cameraPreference.value = 'denied'
    isGestureEnabled.value = false
    savePreference(STORAGE_KEY_CAMERA, 'denied')
  }

  function skipGestures() {
    cameraPreference.value = 'unasked'
    isGestureEnabled.value = false
    savePreference(STORAGE_KEY_CAMERA, 'unasked')
  }

  // 3D模式支持级别
  var modeLevel = ref('full') // 'full' | 'basic' | 'none'
  watch(function() { return capability.recommendedMode.value }, function(mode) {
    if (mode === '3d') modeLevel.value = 'full'
    else if (mode === '3d-basic') modeLevel.value = 'basic'
    else modeLevel.value = 'none'
  })

  return {
    is3DMode: is3DMode,
    isGestureEnabled: isGestureEnabled,
    userPreference: userPreference,
    cameraPreference: cameraPreference,
    modeLevel: modeLevel,
    capability: capability,
    toggle3DMode: toggle3DMode,
    setAutoMode: setAutoMode,
    enableGestures: enableGestures,
    disableGestures: disableGestures,
    skipGestures: skipGestures
  }
}
