/**
 * CardLayout.js - 3D 卡片布局算法
 * 弧形墙 / 散射 / 聚焦 / 环形
 */

/**
 * 弧形墙布局 — 卡片沿圆柱面排列
 * @param {number} count - 卡片数量
 * @param {Object} options
 * @returns {Array<{position: {x,y,z}, rotation: {x,y,z}}>}
 */
export function curvedWallLayout(count, options) {
  var opts = options || {}
  var radius = opts.radius || 6
  var arcAngle = opts.arcAngle || (Math.PI * 0.65) // ~120°
  var rows = opts.rows || 1
  var rowSpacing = opts.rowSpacing || 2.8
  var tiltAngle = opts.tiltAngle || 0.08 // 向内倾斜 ~5°

  var result = []
  var cardsPerRow = Math.ceil(count / rows)

  for (var r = 0; r < rows; r++) {
    var cardsInRow = Math.min(cardsPerRow, count - r * cardsPerRow)
    var startAngle = -arcAngle / 2
    var angleStep = cardsInRow > 1 ? arcAngle / (cardsInRow - 1) : 0

    for (var i = 0; i < cardsInRow; i++) {
      var angle = startAngle + angleStep * i
      var x = Math.sin(angle) * radius
      var z = Math.cos(angle) * radius - radius // 让中心在 z=0
      var y = (r - (rows - 1) / 2) * rowSpacing

      result.push({
        position: { x: x, y: y, z: z },
        rotation: { x: 0, y: -angle + tiltAngle, z: 0 }
      })
    }
  }

  return result
}

/**
 * 散射布局 — 版本切换时的过渡动画目标
 * @param {number} count
 * @param {Object} options
 * @returns {Array<{position: {x,y,z}, rotation: {x,y,z}}>}
 */
export function scatterLayout(count, options) {
  var opts = options || {}
  var spread = opts.spread || 3
  var result = []

  for (var i = 0; i < count; i++) {
    result.push({
      position: {
        x: (Math.random() - 0.5) * spread * 2,
        y: (Math.random() - 0.5) * spread * 1.5,
        z: (Math.random() - 0.5) * spread - 3
      },
      rotation: {
        x: (Math.random() - 0.5) * Math.PI,
        y: (Math.random() - 0.5) * Math.PI,
        z: (Math.random() - 0.5) * Math.PI * 0.5
      }
    })
  }

  return result
}

/**
 * 聚焦布局 — 选中卡片居中放大，其余后退
 * @param {number} count
 * @param {number} focusIndex - 选中的卡片索引
 * @param {Object} options
 * @returns {Array<{position: {x,y,z}, rotation: {x,y,z}}>}
 */
export function focusLayout(count, focusIndex, options) {
  var opts = options || {}
  var radius = opts.radius || 7
  var arcAngle = opts.arcAngle || (Math.PI * 0.5)
  var result = []

  for (var i = 0; i < count; i++) {
    if (i === focusIndex) {
      // 聚焦卡片：居中偏前
      result.push({
        position: { x: 0, y: 0, z: 3 },
        rotation: { x: 0, y: 0, z: 0 }
      })
    } else {
      // 其他卡片：后退 + 散开
      var angle = ((i - focusIndex) / (count - 1)) * arcAngle - arcAngle / 2
      result.push({
        position: {
          x: Math.sin(angle) * radius,
          y: (Math.random() - 0.5) * 0.5,
          z: Math.cos(angle) * radius - radius - 2
        },
        rotation: { x: 0, y: -angle * 0.3, z: 0 }
      })
    }
  }

  return result
}

/**
 * 环形布局 — D4 事件卡片在顶部水平环
 * @param {number} count
 * @param {Object} options
 * @returns {Array<{position: {x,y,z}, rotation: {x,y,z}}>}
 */
export function ringLayout(count, options) {
  var opts = options || {}
  var radius = opts.radius || 3
  var yPosition = opts.yPosition || 4
  var result = []

  for (var i = 0; i < count; i++) {
    var angle = (i / count) * Math.PI * 2
    result.push({
      position: {
        x: Math.sin(angle) * radius,
        y: yPosition,
        z: Math.cos(angle) * radius - 1
      },
      rotation: {
        x: 0,
        y: -angle,
        z: 0
      }
    })
  }

  return result
}

/**
 * 入场起始布局 — 卡片从下方飞入
 * @param {number} count
 * @returns {Array<{position: {x,y,z}, rotation: {x,y,z}}>}
 */
export function entranceLayout(count) {
  var result = []
  for (var i = 0; i < count; i++) {
    result.push({
      position: { x: 0, y: -5 - Math.random() * 2, z: -15 - Math.random() * 5 },
      rotation: { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5, z: 0 }
    })
  }
  return result
}
