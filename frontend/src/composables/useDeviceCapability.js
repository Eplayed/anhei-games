/**
 * useDeviceCapability - 设备能力检测
 * 检测 WebGL、GPU 性能分级、摄像头可用性
 * 返回推荐模式：3d / 3d-basic / 2d
 */

import { ref, onMounted } from 'vue'

// GPU 性能分级关键词
var HIGH_GPU_PATTERNS = ['RTX', 'GTX 1', 'GTX 2', 'Radeon RX 6', 'Radeon RX 7', 'Apple M', 'Apple GPU']
var LOW_GPU_PATTERNS = ['Intel UHD', 'Intel HD', 'Mesa', 'SwiftShader', 'llvmpipe']

function classifyGPU(renderer) {
  if (!renderer) return 'mid'
  var upper = renderer.toUpperCase()
  for (var i = 0; i < HIGH_GPU_PATTERNS.length; i++) {
    if (upper.indexOf(HIGH_GPU_PATTERNS[i].toUpperCase()) >= 0) return 'high'
  }
  for (var j = 0; j < LOW_GPU_PATTERNS.length; j++) {
    if (upper.indexOf(LOW_GPU_PATTERNS[j].toUpperCase()) >= 0) return 'low'
  }
  return 'mid'
}

function detectWebGL() {
  try {
    var canvas = document.createElement('canvas')
    var gl = canvas.getContext('webgl2')
    if (gl) return { version: 2, gl: gl }
    gl = canvas.getContext('webgl')
    if (gl) return { version: 1, gl: gl }
  } catch (e) {
    // ignore
  }
  return { version: 0, gl: null }
}

function getGPURenderer(gl) {
  if (!gl) return 'unknown'
  try {
    var ext = gl.getExtension('WEBGL_debug_renderer_info')
    if (ext) return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
  } catch (e) {
    // ignore
  }
  return 'unknown'
}

function detectCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return Promise.resolve(false)
  }
  return navigator.mediaDevices.enumerateDevices().then(function(devices) {
    for (var i = 0; i < devices.length; i++) {
      if (devices[i].kind === 'videoinput') return true
    }
    return false
  }).catch(function() {
    return false
  })
}

// 简易性能探针：渲染 50 帧测量平均帧时间
function performanceProbe(gl) {
  return new Promise(function(resolve) {
    if (!gl) {
      resolve({ avgFrameTime: 999, fps: 0 })
      return
    }
    var canvas = gl.canvas
    canvas.width = 256
    canvas.height = 256
    var frames = 0
    var total = 0
    var maxFrames = 50

    function measureFrame(timestamp) {
      if (frames === 0) {
        frames++
        requestAnimationFrame(measureFrame)
        return
      }
      var now = performance.now()
      total += now - (timestamp || now)
      frames++
      if (frames < maxFrames) {
        requestAnimationFrame(measureFrame)
      } else {
        var avgFrameTime = total / (frames - 1)
        resolve({
          avgFrameTime: avgFrameTime,
          fps: Math.round(1000 / avgFrameTime)
        })
      }
    }

    // 用简单渲染循环代替空白 rAF 测量
    var vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, 'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}')
    gl.compileShader(vs)
    var fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, 'precision mediump float;void main(){gl_FragColor=vec4(1,0,0,1);}')
    gl.compileShader(fs)
    var prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    var buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
    var loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    var frameCount = 0
    var startTime = performance.now()

    function renderProbe() {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frameCount++
      if (frameCount < maxFrames) {
        requestAnimationFrame(renderProbe)
      } else {
        var elapsed = performance.now() - startTime
        var avgMs = elapsed / frameCount
        // 清理
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        gl.deleteProgram(prog)
        gl.deleteBuffer(buf)
        resolve({
          avgFrameTime: avgMs,
          fps: Math.round(1000 / avgMs)
        })
      }
    }

    requestAnimationFrame(renderProbe)
  })
}

// 模块级缓存（单例）
var cachedResult = null

export function useDeviceCapability() {
  var hasWebGL = ref(false)
  var webglVersion = ref(0)
  var gpuTier = ref('mid')
  var gpuRenderer = ref('unknown')
  var hasCamera = ref(false)
  var performanceScore = ref(0)
  var recommendedMode = ref('2d') // '3d' | '3d-basic' | '2d'
  var isDetecting = ref(true)

  if (cachedResult) {
    // 返回缓存结果
    hasWebGL.value = cachedResult.hasWebGL
    webglVersion.value = cachedResult.webglVersion
    gpuTier.value = cachedResult.gpuTier
    gpuRenderer.value = cachedResult.gpuRenderer
    hasCamera.value = cachedResult.hasCamera
    performanceScore.value = cachedResult.performanceScore
    recommendedMode.value = cachedResult.recommendedMode
    isDetecting.value = false
  }

  onMounted(function() {
    if (cachedResult) return

    // 1. WebGL 检测
    var webgl = detectWebGL()
    hasWebGL.value = webgl.version > 0
    webglVersion.value = webgl.version

    if (!hasWebGL.value) {
      recommendedMode.value = '2d'
      isDetecting.value = false
      cachedResult = {
        hasWebGL: false, webglVersion: 0, gpuTier: 'low',
        gpuRenderer: 'unknown', hasCamera: false, performanceScore: 0,
        recommendedMode: '2d'
      }
      return
    }

    // 2. GPU 分级
    var renderer = getGPURenderer(webgl.gl)
    gpuRenderer.value = renderer
    gpuTier.value = classifyGPU(renderer)

    // 3. 摄像头检测
    detectCamera().then(function(cameraAvailable) {
      hasCamera.value = cameraAvailable

      // 4. 性能探针
      return performanceProbe(webgl.gl)
    }).then(function(probe) {
      var fps = probe ? probe.fps : 0
      performanceScore.value = fps

      // 5. 综合推荐
      if (gpuTier.value === 'low' || fps < 20) {
        recommendedMode.value = '2d'
      } else if (gpuTier.value === 'mid' || fps < 40) {
        recommendedMode.value = '3d-basic' // 3D 无手势
      } else {
        recommendedMode.value = '3d' // 完整 3D + 手势
      }

      isDetecting.value = false
      cachedResult = {
        hasWebGL: hasWebGL.value,
        webglVersion: webglVersion.value,
        gpuTier: gpuTier.value,
        gpuRenderer: gpuRenderer.value,
        hasCamera: hasCamera.value,
        performanceScore: performanceScore.value,
        recommendedMode: recommendedMode.value
      }
    }).catch(function() {
      recommendedMode.value = '2d'
      isDetecting.value = false
    })
  })

  return {
    hasWebGL: hasWebGL,
    webglVersion: webglVersion,
    gpuTier: gpuTier,
    gpuRenderer: gpuRenderer,
    hasCamera: hasCamera,
    performanceScore: performanceScore,
    recommendedMode: recommendedMode,
    isDetecting: isDetecting
  }
}
