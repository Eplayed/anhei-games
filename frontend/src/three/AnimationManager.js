/**
 * AnimationManager.js - 轻量补间动画系统
 * 无外部依赖，基于 lerp + 缓动函数
 */

// ---- 缓动函数 ----

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export function easeOutBack(t) {
  var c1 = 1.70158
  var c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export function easeOutElastic(t) {
  if (t === 0 || t === 1) return t
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1
}

// ---- 补间动画 ----

var activeTweens = []

/**
 * 创建补间动画
 * @param {Object} target - 目标对象（如 THREE.Group.position）
 * @param {Object} endProps - 目标属性 { x: 1, y: 2 }
 * @param {number} duration - 持续时间（秒）
 * @param {Function} easing - 缓动函数
 * @returns {Promise}
 */
export function animateTo(target, endProps, duration, easing) {
  return new Promise(function(resolve) {
    var startProps = {}
    for (var key in endProps) {
      if (endProps.hasOwnProperty(key)) {
        startProps[key] = target[key]
      }
    }

    var tween = {
      target: target,
      startProps: startProps,
      endProps: endProps,
      duration: duration || 0.6,
      elapsed: 0,
      easing: easing || easeOutCubic,
      resolve: resolve,
      done: false
    }

    activeTweens.push(tween)
  })
}

/**
 * 交错动画 — 一组对象依次动画
 * @param {Array} targets - 目标对象数组
 * @param {Function} getEndProps - 函数 (index) => endProps
 * @param {number} duration - 每个动画持续时间
 * @param {number} stagger - 交错延迟（秒）
 * @param {Function} easing - 缓动函数
 * @returns {Promise}
 */
export function staggerAnimate(targets, getEndProps, duration, stagger, easing) {
  var promises = []
  for (var i = 0; i < targets.length; i++) {
    (function(index) {
      var delay = index * (stagger || 0.05)
      promises.push(
        new Promise(function(resolve) {
          setTimeout(function() {
            animateTo(targets[index], getEndProps(index), duration, easing).then(resolve)
          }, delay * 1000)
        })
      )
    })(i)
  }
  return Promise.all(promises)
}

/**
 * 每帧更新 — 从渲染循环调用
 * @param {number} dt - 帧间隔时间（秒）
 */
export function updateTweens(dt) {
  for (var i = activeTweens.length - 1; i >= 0; i--) {
    var tween = activeTweens[i]
    if (tween.done) continue

    tween.elapsed += dt
    var t = Math.min(tween.elapsed / tween.duration, 1)
    var easedT = tween.easing(t)

    for (var key in tween.endProps) {
      if (tween.endProps.hasOwnProperty(key)) {
        tween.target[key] = tween.startProps[key] + (tween.endProps[key] - tween.startProps[key]) * easedT
      }
    }

    if (t >= 1) {
      tween.done = true
      tween.resolve()
      activeTweens.splice(i, 1)
    }
  }
}

/**
 * 清除所有动画
 */
export function clearAllTweens() {
  for (var i = 0; i < activeTweens.length; i++) {
    activeTweens[i].done = true
    activeTweens[i].resolve()
  }
  activeTweens.length = 0
}
