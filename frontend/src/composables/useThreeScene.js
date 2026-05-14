/**
 * useThreeScene - Vue composable 封装 SceneManager 生命周期
 * 处理 Three.js 懒加载、场景初始化/销毁、版本/资源同步
 */

import { ref, onMounted, onUnmounted, watch, getCurrentInstance } from 'vue'
import { useVersion } from './useVersion.js'

var isReady = ref(false)
var hoveredCardIndex = ref(-1)
var selectedCardIndex = ref(-1)

export function useThreeScene() {
  var sceneManager = ref(null)
  var particleSystem = ref(null)
  var animFrameId = null
  var container = ref(null)

  var version = useVersion()

  function initScene(canvas, containerEl) {
    return import('three').then(function(THREE) {
      return import('../three/SceneManager.js').then(function(smModule) {
        return import('../three/ParticleSystem.js').then(function(psModule) {
          // 渲染器
          var renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
          })
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          renderer.setSize(containerEl.clientWidth, containerEl.clientHeight)
          renderer.outputColorSpace = THREE.SRGBColorSpace
          renderer.toneMapping = THREE.ACESFilmicToneMapping
          renderer.toneMappingExposure = 1.2

          // 场景 + 相机
          var scene = new THREE.Scene()
          var camera = new THREE.PerspectiveCamera(
            50,
            containerEl.clientWidth / containerEl.clientHeight,
            0.1,
            100
          )
          camera.position.set(0, 2, 12)
          camera.lookAt(0, 0, 0)

          // SceneManager
          var sm = new smModule.SceneManager({
            renderer: renderer,
            scene: scene,
            camera: camera
          })

          // ParticleSystem
          var ps = new psModule.ParticleSystem({
            maxParticles: 500,
            scene: scene
          })
          ps.mount(scene)

          sceneManager.value = sm
          particleSystem.value = ps

          // 渲染循环
          var clock = new THREE.Clock()
          function animate() {
            animFrameId = requestAnimationFrame(animate)
            var dt = clock.getDelta()
            sm.update(dt)
            ps.update(dt)
            renderer.render(scene, camera)
          }
          animate()

          // 窗口大小监听
          var resizeObserver = new ResizeObserver(function(entries) {
            if (!entries[0]) return
            var width = entries[0].contentRect.width
            var height = entries[0].contentRect.height
            if (width === 0 || height === 0) return
            renderer.setSize(width, height)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
          })
          resizeObserver.observe(containerEl)
          containerEl._threeResizeObserver = resizeObserver

          // WebGL 上下文丢失
          canvas.addEventListener('webglcontextlost', function(e) {
            e.preventDefault()
            console.warn('[useThreeScene] WebGL 上下文丢失')
          })

          isReady.value = true
        })
      })
    })
  }

  function destroyScene() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = null
    }
    if (sceneManager.value) {
      sceneManager.value.dispose()
      sceneManager.value = null
    }
    if (particleSystem.value) {
      particleSystem.value.dispose()
      particleSystem.value = null
    }
    isReady.value = false
  }

  return {
    sceneManager: sceneManager,
    particleSystem: particleSystem,
    isReady: isReady,
    hoveredCardIndex: hoveredCardIndex,
    selectedCardIndex: selectedCardIndex,
    initScene: initScene,
    destroyScene: destroyScene
  }
}
