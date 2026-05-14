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

    // 鼠标交互事件
    var isDragging = false
    var lastMouseX = 0
    var lastMouseY = 0

    function onMouseMove(e) {
      if (!sceneManager || !canvasContainer.value) return
      var rect = canvasContainer.value.getBoundingClientRect()
      var ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      var ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1

      // 射线检测悬停
      var hit = sceneManager.raycastCards(ndcX, ndcY)
      if (hit) {
        sceneManager.hoverCard(hit.index)
        canvasContainer.value.style.cursor = 'pointer'
      } else {
        sceneManager.hoverCard(-1)
        canvasContainer.value.style.cursor = 'default'
      }

      // 相机轻微跟随鼠标
      if (!isDragging && sceneManager.camera) {
        var targetX = ndcX * 0.5
        var targetY = ndcY * 0.3 + 2
        sceneManager.camera.position.x += (targetX - sceneManager.camera.position.x) * 0.02
        sceneManager.camera.position.y += (targetY - sceneManager.camera.position.y) * 0.02
        sceneManager.camera.lookAt(0, 0, 0)
      }

      lastMouseX = e.clientX
      lastMouseY = e.clientY
    }

    function onClick(e) {
      if (!sceneManager || !canvasContainer.value) return
      var rect = canvasContainer.value.getBoundingClientRect()
      var ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      var ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1

      var hit = sceneManager.raycastCards(ndcX, ndcY)
      if (hit && hit.index >= 0) {
        var resource = props.resources[hit.index]
        if (resource && resource.url && !resource.isDead) {
          window.open(resource.url, '_blank', 'noopener noreferrer')
        }
      }
    }

    canvasContainer.value.addEventListener('mousemove', onMouseMove)
    canvasContainer.value.addEventListener('click', onClick)

    // 存储事件处理器以便清理
    canvasContainer.value._mouseMoveHandler = onMouseMove
    canvasContainer.value._clickHandler = onClick

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
  if (canvasContainer.value) {
    if (canvasContainer.value._resizeObserver) {
      canvasContainer.value._resizeObserver.disconnect()
    }
    if (canvasContainer.value._mouseMoveHandler) {
      canvasContainer.value.removeEventListener('mousemove', canvasContainer.value._mouseMoveHandler)
    }
    if (canvasContainer.value._clickHandler) {
      canvasContainer.value.removeEventListener('click', canvasContainer.value._clickHandler)
    }
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
