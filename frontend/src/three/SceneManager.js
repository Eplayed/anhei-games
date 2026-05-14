/**
 * SceneManager.js - 3D 场景管理
 * 灯光、卡片管理、交互状态、版本主题切换
 */

import * as THREE from 'three'
import { createCardMesh, createCardBackTexture, disposeCard } from './CardMesh.js'
import { curvedWallLayout, scatterLayout, entranceLayout, ringLayout } from './CardLayout.js'
import { animateTo, staggerAnimate, updateTweens, clearAllTweens, easeOutCubic, easeOutBack, easeOutElastic } from './AnimationManager.js'

// 版本主题色
var VERSION_THEMES = {
  D4: {
    primary: 0xc8860a,
    accent: 0xf0a030,
    ambient: 0x1a1520,
    fog: 0x0a0810
  },
  D3: {
    primary: 0xdc2626,
    accent: 0xef4444,
    ambient: 0x1a1010,
    fog: 0x0a0505
  },
  D2: {
    primary: 0x6b8a5e,
    accent: 0x8fbf7f,
    ambient: 0x101a10,
    fog: 0x050a05
  }
}

function SceneManager(options) {
  this.renderer = options.renderer
  this.scene = options.scene
  this.camera = options.camera

  // 相机初始位置
  this.camera.position.set(0, 2, 12)
  this.camera.lookAt(0, 0, 0)

  // 卡片
  this.cards = []
  this.d4EventCards = []
  this.cardBackTexture = null

  // 交互
  this.hoveredIndex = -1
  this.selectedIndex = -1
  this.currentVersion = 'D4'

  // 鼠标/手势光标位置（NDC）
  this.cursorNDC = new THREE.Vector2(0, 0)
  this.raycaster = new THREE.Raycaster()

  // 粒子（后续集成）
  this.particles = null

  // 光标球（后续集成）
  this.cursorOrb = null

  // 初始化灯光
  this._initLights()
  // 创建共享卡片背面纹理
  this.cardBackTexture = createCardBackTexture()

  // 设置场景背景为透明
  this.scene.background = null
}

// ---- 灯光 ----

SceneManager.prototype._initLights = function() {
  var theme = VERSION_THEMES.D4

  // 环境光
  this.ambientLight = new THREE.AmbientLight(theme.ambient, 0.3)
  this.scene.add(this.ambientLight)

  // 主点光（金色）
  this.mainLight = new THREE.PointLight(theme.primary, 1.2, 30)
  this.mainLight.position.set(0, 8, 5)
  this.scene.add(this.mainLight)

  // 辅点光（红色）
  this.rimLight = new THREE.PointLight(0xdc2626, 0.4, 20)
  this.rimLight.position.set(-5, 3, -3)
  this.scene.add(this.rimLight)

  // 聚光灯
  this.spotLight = new THREE.SpotLight(0xf0a030, 0.6, 20, Math.PI / 4, 0.5)
  this.spotLight.position.set(0, 10, 0)
  this.scene.add(this.spotLight)
}

// ---- 卡片管理 ----

SceneManager.prototype.setResources = function(resources) {
  // 清除旧卡片
  this._removeAllCards()

  if (!resources || resources.length === 0) return

  // 创建新卡片
  var startPositions = entranceLayout(resources.length)
  var targetPositions = curvedWallLayout(resources.length, {
    radius: 6,
    arcAngle: Math.PI * 0.65,
    rows: Math.ceil(resources.length / 8),
    rowSpacing: 2.8
  })

  for (var i = 0; i < resources.length; i++) {
    var card = createCardMesh(resources[i], this.cardBackTexture)
    card.visible = true

    // 初始位置
    var sp = startPositions[i]
    card.position.set(sp.position.x, sp.position.y, sp.position.z)
    card.rotation.set(sp.rotation.x, sp.rotation.y, sp.rotation.z)

    // 存储目标位置用于交互恢复
    card.userData.targetPosition = { x: sp.position.x, y: sp.position.y, z: sp.position.z }
    card.userData.targetRotation = { x: sp.rotation.x, y: sp.rotation.y, z: sp.rotation.z }

    this.scene.add(card)
    this.cards.push(card)
  }

  // 交错飞入动画
  var self = this
  staggerAnimate(
    this.cards.map(function(c) { return c.position }),
    function(index) {
      var tp = targetPositions[index]
      return { x: tp.position.x, y: tp.position.y, z: tp.position.z }
    },
    0.6,
    0.05,
    easeOutBack
  )

  staggerAnimate(
    this.cards.map(function(c) { return c.rotation }),
    function(index) {
      var tp = targetPositions[index]
      return { x: tp.rotation.x, y: tp.rotation.y, z: tp.rotation.z }
    },
    0.6,
    0.05,
    easeOutCubic
  )
}

SceneManager.prototype._removeAllCards = function() {
  for (var i = 0; i < this.cards.length; i++) {
    disposeCard(this.cards[i])
    this.scene.remove(this.cards[i])
  }
  this.cards = []
  this.hoveredIndex = -1
  this.selectedIndex = -1
}

// ---- 交互 ----

SceneManager.prototype.hoverCard = function(index) {
  if (this.hoveredIndex === index) return

  // 还原上一个悬停卡片
  if (this.hoveredIndex >= 0 && this.hoveredIndex < this.cards.length) {
    var prev = this.cards[this.hoveredIndex]
    var prevTarget = prev.userData.targetPosition
    if (prevTarget) {
      animateTo(prev.position, { x: prevTarget.x, y: prevTarget.y, z: prevTarget.z }, 0.3, easeOutCubic)
    }
    // 恢复边框透明度
    var prevEdge = prev.getObjectByName('card-edge')
    if (prevEdge) {
      prevEdge.material.opacity = 0.4
    }
  }

  this.hoveredIndex = index

  // 新悬停卡片前移
  if (index >= 0 && index < this.cards.length) {
    var card = this.cards[index]
    var target = card.userData.targetPosition
    if (target) {
      animateTo(card.position, { x: target.x, y: target.y, z: target.z + 1.5 }, 0.3, easeOutCubic)
    }

    // 金色边框高亮
    var edge = card.getObjectByName('card-edge')
    if (edge) {
      edge.material.opacity = 0.9
    }
  }
}

SceneManager.prototype.selectCard = function(index) {
  if (this.selectedIndex === index) return
  this.selectedIndex = index

  // TODO: 聚焦动画 — 选中卡片飞到前方
}

SceneManager.prototype.deselectCard = function() {
  this.selectedIndex = -1
}

// ---- 版本主题切换 ----

SceneManager.prototype.setVersionTheme = function(version) {
  if (this.currentVersion === version) return
  var oldVersion = this.currentVersion
  this.currentVersion = version

  var theme = VERSION_THEMES[version] || VERSION_THEMES.D4

  // 更新灯光颜色
  this.mainLight.color.setHex(theme.primary)
  this.ambientLight.color.setHex(theme.ambient)

  // 卡片散射 → 重聚动画
  var self = this
  if (this.cards.length > 0) {
    var scatterPos = scatterLayout(this.cards.length, { spread: 3 })

    // 先散射
    var scatterPromises = []
    for (var i = 0; i < this.cards.length; i++) {
      scatterPromises.push(
        animateTo(this.cards[i].position, scatterPos[i].position, 0.4, easeOutCubic)
      )
      animateTo(this.cards[i].rotation, scatterPos[i].rotation, 0.4, easeOutCubic)
    }

    Promise.all(scatterPromises).then(function() {
      // 重新排列
      var targetPositions = curvedWallLayout(self.cards.length, {
        radius: 6,
        arcAngle: Math.PI * 0.65,
        rows: Math.ceil(self.cards.length / 8),
        rowSpacing: 2.8
      })

      staggerAnimate(
        self.cards.map(function(c) { return c.position }),
        function(index) {
          return targetPositions[index].position
        },
        0.5,
        0.04,
        easeOutBack
      )

      staggerAnimate(
        self.cards.map(function(c) { return c.rotation }),
        function(index) {
          return targetPositions[index].rotation
        },
        0.5,
        0.04,
        easeOutCubic
      )
    })
  }

  // TODO: 更新粒子颜色
}

// ---- 射线检测（鼠标/手势交互用）----

SceneManager.prototype.raycastCards = function(ndcX, ndcY) {
  this.cursorNDC.set(ndcX, ndcY)
  this.raycaster.setFromCamera(this.cursorNDC, this.camera)

  var cardMeshes = []
  for (var i = 0; i < this.cards.length; i++) {
    var front = this.cards[i].getObjectByName('card-front')
    if (front) cardMeshes.push(front)
  }

  var intersects = this.raycaster.intersectObjects(cardMeshes)
  if (intersects.length > 0) {
    // 找到对应的卡片索引
    var hitObject = intersects[0].object
    for (var j = 0; j < this.cards.length; j++) {
      if (this.cards[j].getObjectByName('card-front') === hitObject) {
        return { index: j, point: intersects[0].point }
      }
    }
  }
  return null
}

// ---- 更新 ----

SceneManager.prototype.update = function(dt) {
  updateTweens(dt)

  // D4 事件卡片缓慢旋转
  for (var i = 0; i < this.d4EventCards.length; i++) {
    this.d4EventCards[i].rotation.y += 0.001
  }

  // TODO: 更新粒子
  // TODO: 更新光标球
}

// ---- 销毁 ----

SceneManager.prototype.dispose = function() {
  clearAllTweens()
  this._removeAllCards()

  // 清理 D4 事件卡片
  for (var i = 0; i < this.d4EventCards.length; i++) {
    disposeCard(this.d4EventCards[i])
    this.scene.remove(this.d4EventCards[i])
  }
  this.d4EventCards = []

  // 清理纹理
  if (this.cardBackTexture) {
    this.cardBackTexture.dispose()
    this.cardBackTexture = null
  }

  // 清理灯光
  this.scene.remove(this.ambientLight)
  this.scene.remove(this.mainLight)
  this.scene.remove(this.rimLight)
  this.scene.remove(this.spotLight)

  // 清理渲染器
  if (this.renderer) {
    this.renderer.dispose()
  }
}

export { SceneManager }
