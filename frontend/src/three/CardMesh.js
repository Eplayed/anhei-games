/**
 * CardMesh.js - 3D 卡片几何体 + Canvas 纹理生成
 * 将资源数据渲染为 Three.js 3D 对象
 */

import * as THREE from 'three'

// 版本主题色映射
var VERSION_COLORS = {
  D4: { primary: '#c8860a', accent: '#f0a030', bg: '#1a1510' },
  D3: { primary: '#dc2626', accent: '#ef4444', bg: '#1a1010' },
  D2: { primary: '#6b8a5e', accent: '#8fbf7f', bg: '#101a10' }
}

// 版本标签色映射
var VERSION_TAG_COLORS = {
  D4: '#c8860a',
  D3: '#dc2626',
  D2: '#6b8a5e',
  ALL: '#8b8b8b'
}

/**
 * 在离屏 Canvas 上绘制卡片纹理
 * @param {Object} resource - 资源数据
 * @param {Object} options - 可选配置
 * @returns {HTMLCanvasElement}
 */
export function createCardTexture(resource, options) {
  var width = 256
  var height = 384
  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  var ctx = canvas.getContext('2d')

  var colors = VERSION_COLORS[resource.gameVersion] || VERSION_COLORS.D4

  // ---- 背景 ----
  ctx.fillStyle = '#14131c'
  ctx.fillRect(0, 0, width, height)

  // ---- 金色顶线 ----
  var gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, 'transparent')
  gradient.addColorStop(0.3, colors.primary)
  gradient.addColorStop(0.7, colors.primary)
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, 3)

  // ---- 边框 ----
  ctx.strokeStyle = colors.primary + '40'
  ctx.lineWidth = 1
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1)

  // ---- 图标区域 ----
  var iconSize = 40
  var iconX = 16
  var iconY = 16

  // 绘制图标背景
  ctx.fillStyle = '#2a2535'
  ctx.fillRect(iconX, iconY, iconSize, iconSize)
  ctx.strokeStyle = colors.primary + '60'
  ctx.lineWidth = 1
  ctx.strokeRect(iconX, iconY, iconSize, iconSize)

  // 首字母作为图标（使用系统字体确保兼容性）
  ctx.fillStyle = colors.primary
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText((resource.name || '?')[0], iconX + iconSize / 2, iconY + iconSize / 2)

  // ---- 名称 ----
  ctx.fillStyle = '#e8e6f0'
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  var nameX = iconX + iconSize + 10
  var maxNameWidth = width - nameX - 16
  var name = resource.name || ''
  // 截断长名称
  while (ctx.measureText(name).width > maxNameWidth && name.length > 3) {
    name = name.slice(0, -1)
  }
  if (name !== resource.name) name += '...'
  ctx.fillText(name, nameX, iconY + 10)

  // ---- 标签 ----
  var tags = resource.tags || []
  var tagY = iconY + iconSize + 12
  var tagX = 16
  ctx.font = '10px system-ui, -apple-system, sans-serif'
  for (var i = 0; i < Math.min(tags.length, 3); i++) {
    var tag = tags[i]
    var tagWidth = ctx.measureText(tag).width + 12
    if (tagX + tagWidth > width - 16) break

    ctx.fillStyle = colors.primary + '20'
    ctx.fillRect(tagX, tagY, tagWidth, 18)
    ctx.strokeStyle = colors.primary + '60'
    ctx.lineWidth = 0.5
    ctx.strokeRect(tagX, tagY, tagWidth, 18)
    ctx.fillStyle = colors.accent
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(tag, tagX + tagWidth / 2, tagY + 9)
    tagX += tagWidth + 6
  }

  // ---- 描述 ----
  if (resource.description) {
    ctx.fillStyle = '#9b99a8'
    ctx.font = '11px system-ui, -apple-system, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    var descY = tagY + 30
    var words = resource.description.split('')
    var line = ''
    var maxLines = 4
    var lineCount = 0
    for (var w = 0; w < words.length; w++) {
      var testLine = line + words[w]
      if (ctx.measureText(testLine).width > width - 32) {
        ctx.fillText(line, 16, descY)
        line = words[w]
        descY += 16
        lineCount++
        if (lineCount >= maxLines) break
      } else {
        line = testLine
      }
    }
    if (lineCount < maxLines && line) {
      ctx.fillText(line, 16, descY)
    }
  }

  // ---- 底部区域 ----
  // 版本标签
  var versionColor = VERSION_TAG_COLORS[resource.gameVersion] || VERSION_TAG_COLORS.ALL
  ctx.fillStyle = versionColor + '30'
  ctx.fillRect(16, height - 36, 36, 20)
  ctx.strokeStyle = versionColor
  ctx.lineWidth = 1
  ctx.strokeRect(16, height - 36, 36, 20)
  ctx.fillStyle = versionColor
  ctx.font = 'bold 10px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(resource.gameVersion || 'ALL', 34, height - 26)

  // HOT 徽章
  if (resource.isHot) {
    ctx.fillStyle = '#dc2626'
    var hotX = width - 50
    ctx.fillRect(hotX, height - 36, 34, 20)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('HOT', hotX + 17, height - 26)
  }

  // 箭头
  ctx.fillStyle = colors.primary
  ctx.font = '14px sans-serif'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.fillText('\u2192', width - 16, height - 26)

  return canvas
}

/**
 * 创建 3D 卡片 Mesh
 * @param {Object} resource - 资源数据
 * @param {Object} cardBackTexture - 卡片背面纹理
 * @returns {THREE.Group}
 */
export function createCardMesh(resource, cardBackTexture) {
  var group = new THREE.Group()
  group.userData = { resourceId: resource.id, resource: resource }

  var cardWidth = 1.6
  var cardHeight = 2.4

  // ---- 正面 ----
  var frontCanvas = createCardTexture(resource)
  var frontTexture = new THREE.CanvasTexture(frontCanvas)
  frontTexture.colorSpace = THREE.SRGBColorSpace
  frontTexture.minFilter = THREE.LinearFilter
  frontTexture.magFilter = THREE.LinearFilter

  var frontGeo = new THREE.PlaneGeometry(cardWidth, cardHeight)
  var frontMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.7,
    metalness: 0.1,
    transparent: true,
    opacity: 1
  })
  var frontMesh = new THREE.Mesh(frontGeo, frontMat)
  frontMesh.position.z = 0.01
  frontMesh.name = 'card-front'
  group.add(frontMesh)

  // ---- 背面 ----
  var backGeo = new THREE.PlaneGeometry(cardWidth, cardHeight)
  var backMat = new THREE.MeshStandardMaterial({
    map: cardBackTexture || null,
    color: cardBackTexture ? 0xffffff : 0x1a1520,
    roughness: 0.8,
    metalness: 0.05,
    transparent: true,
    opacity: 1
  })
  var backMesh = new THREE.Mesh(backGeo, backMat)
  backMesh.rotation.y = Math.PI
  backMesh.position.z = -0.01
  backMesh.name = 'card-back'
  group.add(backMesh)

  // ---- 边框 ----
  var edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(cardWidth, cardHeight, 0.02))
  var edgeMat = new THREE.LineBasicMaterial({
    color: 0xc8860a,
    transparent: true,
    opacity: 0.4
  })
  var edgeLine = new THREE.LineSegments(edgeGeo, edgeMat)
  edgeLine.name = 'card-edge'
  group.add(edgeLine)

  // 默认隐藏（入场动画时显示）
  group.visible = false

  return group
}

/**
 * 更新卡片纹理（版本切换时）
 * @param {THREE.Group} cardGroup
 * @param {Object} resource
 */
export function updateCardTexture(cardGroup, resource) {
  var frontMesh = cardGroup.getObjectByName('card-front')
  if (!frontMesh) return

  var oldTexture = frontMesh.material.map
  var newCanvas = createCardTexture(resource)
  var newTexture = new THREE.CanvasTexture(newCanvas)
  newTexture.colorSpace = THREE.SRGBColorSpace
  newTexture.minFilter = THREE.LinearFilter
  newTexture.magFilter = THREE.LinearFilter

  frontMesh.material.map = newTexture
  frontMesh.material.needsUpdate = true

  if (oldTexture) oldTexture.dispose()
}

/**
 * 销毁卡片
 * @param {THREE.Group} cardGroup
 */
export function disposeCard(cardGroup) {
  cardGroup.traverse(function(child) {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      if (child.material.map) child.material.map.dispose()
      child.material.dispose()
    }
  })
  cardGroup.clear()
}

/**
 * 创建卡片背面纹理（共享）
 * @returns {THREE.CanvasTexture}
 */
export function createCardBackTexture() {
  var canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 384
  var ctx = canvas.getContext('2d')

  // 暗色底
  ctx.fillStyle = '#0e0d16'
  ctx.fillRect(0, 0, 256, 384)

  // 金色边框
  ctx.strokeStyle = '#c8860a60'
  ctx.lineWidth = 2
  ctx.strokeRect(8, 8, 240, 368)

  // 中心装饰菱形
  ctx.beginPath()
  ctx.moveTo(128, 140)
  ctx.lineTo(160, 192)
  ctx.lineTo(128, 244)
  ctx.lineTo(96, 192)
  ctx.closePath()
  ctx.strokeStyle = '#c8860a40'
  ctx.lineWidth = 1
  ctx.stroke()

  // 小菱形
  ctx.beginPath()
  ctx.moveTo(128, 165)
  ctx.lineTo(140, 192)
  ctx.lineTo(128, 219)
  ctx.lineTo(116, 192)
  ctx.closePath()
  ctx.fillStyle = '#c8860a15'
  ctx.fill()

  var texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
