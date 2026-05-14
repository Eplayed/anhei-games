/**
 * ParticleSystem.js - 暗黑主题粒子系统
 * 余烬/灰烬/金尘 + 自定义 Shader
 */

import * as THREE from 'three'
import vertexShader from './shaders/particles.vert?raw'
import fragmentShader from './shaders/particles.frag?raw'

// 版本主题色
var VERSION_PARTICLE_COLORS = {
  D4: { ember: new THREE.Color(0.78, 0.53, 0.04), ash: new THREE.Color(0.4, 0.35, 0.3), gold: new THREE.Color(0.94, 0.63, 0.19) },
  D3: { ember: new THREE.Color(0.86, 0.15, 0.15), ash: new THREE.Color(0.4, 0.2, 0.2), gold: new THREE.Color(0.94, 0.27, 0.27) },
  D2: { ember: new THREE.Color(0.42, 0.54, 0.37), ash: new THREE.Color(0.25, 0.35, 0.25), gold: new THREE.Color(0.56, 0.75, 0.5) }
}

function ParticleSystem(options) {
  var opts = options || {}
  this.maxParticles = opts.maxParticles || 500
  this.scene = opts.scene || null

  this.version = 'D4'
  this.uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uEmberColor: { value: VERSION_PARTICLE_COLORS.D4.ember },
    uAshColor: { value: VERSION_PARTICLE_COLORS.D4.ash },
    uGoldColor: { value: VERSION_PARTICLE_COLORS.D4.gold }
  }

  this._createParticles()
}

ParticleSystem.prototype._createParticles = function() {
  var count = this.maxParticles

  // 属性缓冲
  var positions = new Float32Array(count * 3)
  var sizes = new Float32Array(count)
  var lifetimes = new Float32Array(count)
  var types = new Float32Array(count)
  var randoms = new Float32Array(count)

  for (var i = 0; i < count; i++) {
    // 随机位置（圆柱体积内）
    var angle = Math.random() * Math.PI * 2
    var radius = Math.random() * 6
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = Math.sin(angle) * radius - 3

    // 粒子大小
    var typeRoll = Math.random()
    if (typeRoll < 0.6) {
      // 余烬 - 中等大小
      types[i] = 0
      sizes[i] = 2 + Math.random() * 3
    } else if (typeRoll < 0.85) {
      // 灰烬 - 小
      types[i] = 1
      sizes[i] = 1 + Math.random() * 2
    } else {
      // 金尘 - 大但少
      types[i] = 2
      sizes[i] = 3 + Math.random() * 4
    }

    // 生命周期
    lifetimes[i] = Math.random()

    // 随机种子
    randoms[i] = Math.random()
  }

  var geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aLifetime', new THREE.BufferAttribute(lifetimes, 1))
  geometry.setAttribute('aType', new THREE.BufferAttribute(types, 1))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

  var material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: this.uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  this.points = new THREE.Points(geometry, material)
  this.geometry = geometry
  this.material = material
}

ParticleSystem.prototype.mount = function(scene) {
  this.scene = scene
  scene.add(this.points)
}

ParticleSystem.prototype.unmount = function() {
  if (this.scene && this.points) {
    this.scene.remove(this.points)
  }
}

ParticleSystem.prototype.update = function(dt) {
  this.uniforms.uTime.value += dt
}

ParticleSystem.prototype.setTheme = function(version) {
  if (this.version === version) return
  this.version = version
  var colors = VERSION_PARTICLE_COLORS[version] || VERSION_PARTICLE_COLORS.D4
  this.uniforms.uEmberColor.value = colors.ember
  this.uniforms.uAshColor.value = colors.ash
  this.uniforms.uGoldColor.value = colors.gold
}

/**
 * 更新金尘粒子位置（跟随光标/手部位置）
 * @param {THREE.Vector3} position
 */
ParticleSystem.prototype.setGoldDustTarget = function(position) {
  if (!position) return
  var positions = this.geometry.getAttribute('position')
  var types = this.geometry.getAttribute('aType')

  for (var i = 0; i < this.maxParticles; i++) {
    if (types.array[i] > 1.5) {
      // 金尘粒子向目标位置缓慢靠近
      positions.array[i * 3] += (position.x - positions.array[i * 3]) * 0.02
      positions.array[i * 3 + 1] += (position.y - positions.array[i * 3 + 1]) * 0.02
      positions.array[i * 3 + 2] += (position.z - positions.array[i * 3 + 2]) * 0.02
    }
  }
  positions.needsUpdate = true
}

ParticleSystem.prototype.dispose = function() {
  this.unmount()
  if (this.geometry) this.geometry.dispose()
  if (this.material) this.material.dispose()
  this.points = null
  this.geometry = null
  this.material = null
}

export { ParticleSystem }
