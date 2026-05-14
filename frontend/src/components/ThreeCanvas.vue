<template>
  <div ref="canvasContainer" class="three-canvas-container">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps } from 'vue'

var props = defineProps({
  resources: { type: Array, default: function() { return [] } },
  bluePosts: { type: Array, default: function() { return [] } },
  d4Events: { type: Array, default: function() { return [] } },
  currentVersion: { type: String, default: 'D4' }
})

var canvasContainer = ref(null)
var canvasEl = ref(null)

// Three.js 模块（懒加载）
var THREE = null
var SceneManager = null
var sceneManager = null
var animFrameId = null
var isDisposed = false

onMounted(async function() {
  try {
    // 懒加载 Three.js
    var threeModule = await import('three')
    THREE = threeModule
    var smModule = await import('../three/SceneManager.js')
    SceneManager = smModule.SceneManager

    if (!canvasEl.value || isDisposed) return

    // 初始化渲染器
    var renderer = new THREE.WebGLRenderer({
      canvas: canvasEl.value,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // 初始化场景管理器
    sceneManager = new SceneManager({
      renderer: renderer,
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(
        50,
        canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
        0.1,
        100
      )
    })

    // 初始数据
    sceneManager.setResources(props.resources)
    sceneManager.setVersionTheme(props.currentVersion)

    // 渲染循环
    var clock = new THREE.Clock()
    function animate() {
      if (isDisposed) return
      animFrameId = requestAnimationFrame(animate)
      var dt = clock.getDelta()
      sceneManager.update(dt)
      renderer.render(sceneManager.scene, sceneManager.camera)
    }
    animate()

    // 监听窗口大小
    var resizeObserver = new ResizeObserver(function(entries) {
      if (!entries[0] || isDisposed) return
      var width = entries[0].contentRect.width
      var height = entries[0].contentRect.height
      if (width === 0 || height === 0) return
      renderer.setSize(width, height)
      sceneManager.camera.aspect = width / height
      sceneManager.camera.updateProjectionMatrix()
    })
    resizeObserver.observe(canvasContainer.value)

    // 存储 resizeObserver 以便清理
    canvasContainer.value._resizeObserver = resizeObserver

    // 监听 WebGL 上下文丢失
    canvasEl.value.addEventListener('webglcontextlost', handleContextLost)

  } catch (e) {
    console.error('[ThreeCanvas] 初始化失败:', e)
  }
})

function handleContextLost(e) {
  e.preventDefault()
  console.warn('[ThreeCanvas] WebGL 上下文丢失')
  // 通知 use3DMode 切换到 2D
  cleanup()
}

function cleanup() {
  isDisposed = true
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }
  if (sceneManager) {
    sceneManager.dispose()
    sceneManager = null
  }
  if (canvasContainer.value && canvasContainer.value._resizeObserver) {
    canvasContainer.value._resizeObserver.disconnect()
  }
  if (canvasEl.value) {
    canvasEl.value.removeEventListener('webglcontextlost', handleContextLost)
    var gl = canvasEl.value.getContext('webgl2') || canvasEl.value.getContext('webgl')
    if (gl) {
      gl.getExtension('WEBGL_lose_context')
      if (gl.getExtension('WEBGL_lose_context')) {
        gl.getExtension('WEBGL_lose_context').loseContext()
      }
    }
  }
}

onUnmounted(function() {
  cleanup()
})

// 监听资源变化
watch(function() { return props.resources }, function(newResources) {
  if (sceneManager) sceneManager.setResources(newResources)
}, { deep: true })

// 监听版本变化
watch(function() { return props.currentVersion }, function(newVersion) {
  if (sceneManager) sceneManager.setVersionTheme(newVersion)
})
</script>

<style scoped>
.three-canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.three-canvas-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
