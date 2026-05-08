/**
 * D4 世界事件倒计时计算
 * 纯前端本地计算，不依赖任何 API
 * 适用于 Web 和小程序（零依赖）
 *
 * 数据来源: d2core.com d4-world-events.js
 * 注意: 如果暴雪调整事件周期/时间表，需手动更新参数
 */

// ==================== 配置（可热更新） ====================

/**
 * 世界 Boss 配置
 * 锚点: 2023-10-27 22:00:00 UTC+8
 * 周期: 12600 秒 (3小时30分钟)
 */
const WORLD_BOSS_ANCHOR = '2023-10-27T22:00:00+08:00'
const WORLD_BOSS_CYCLE = 12600 * 1000 // ms

/**
 * Boss 名称映射 (n % 15)
 * 0,1,2,8,9 → "疫王"阿煞巴
 * 3,4,10,11,12 → 徘徊死魔
 * 5,6,7,13,14 → "诅咒之金"贪魔
 */
const BOSS_MAP = {
  '疫王阿煞巴': [0, 1, 2, 8, 9],
  '徘徊死魔': [3, 4, 10, 11, 12],
  '诅咒之金贪魔': [5, 6, 7, 13, 14],
}

/**
 * 军团事件配置
 * 锚点: 2023-10-22 14:55:00 UTC+8
 * 周期: 1500 秒 (25分钟)
 */
const LEGION_ANCHOR = '2023-10-22T14:55:00+08:00'
const LEGION_CYCLE = 1500 * 1000 // ms

/**
 * 地狱狂潮配置
 * 每小时 :00 开始，:55 结束
 * 运行 55 分钟，休息 5 分钟
 */

// ==================== 工具函数 ====================

/**
 * 格式化剩余毫秒为 HH:MM:SS
 * @param {number} ms
 * @returns {string}
 */
export function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00'
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/**
 * 格式化时间戳为 HH:MM
 * @param {number} ts - 时间戳 (ms)
 * @returns {string}
 */
export function formatTime(ts) {
  const d = new Date(ts)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// ==================== 核心计算函数 ====================

/**
 * 世界 Boss 倒计时
 * @param {number} [now=Date.now()] - 当前时间戳 (ms)
 * @returns {{ bossName: string, timestamp: number, remaining: number }}
 */
export function getWorldBoss(now) {
  now = now || Date.now()
  var anchor = new Date(WORLD_BOSS_ANCHOR).getTime()
  var target = anchor
  var count = 0

  while (now >= target + WORLD_BOSS_CYCLE) {
    target += WORLD_BOSS_CYCLE
    count++
  }
  // 精确定位到下一个事件
  target += WORLD_BOSS_CYCLE
  count++

  var bossName = '"疫王"阿煞巴'
  var idx = count % 15

  if (BOSS_MAP['徘徊死魔'].indexOf(idx) !== -1) {
    bossName = '徘徊死魔'
  } else if (BOSS_MAP['诅咒之金贪魔'].indexOf(idx) !== -1) {
    bossName = '"诅咒之金"贪魔'
  }

  return {
    bossName: bossName,
    timestamp: target,
    remaining: target - now
  }
}

/**
 * 军团事件倒计时
 * @param {number} [now=Date.now()] - 当前时间戳 (ms)
 * @returns {{ timestamp: number, remaining: number }}
 */
export function getLegion(now) {
  now = now || Date.now()
  var anchor = new Date(LEGION_ANCHOR).getTime()
  var target = anchor

  while (now >= target + LEGION_CYCLE) {
    target += LEGION_CYCLE
  }
  target += LEGION_CYCLE

  return {
    timestamp: target,
    remaining: target - now
  }
}

/**
 * 地狱狂潮倒计时
 * 每小时 :00 开始，:55 结束
 * @param {number} [now=Date.now()] - 当前时间戳 (ms)
 * @returns {{ inProgress: boolean, currentEnd: object|null, nextStart: object }}
 */
export function getHelltide(now) {
  now = now || Date.now()
  var d = new Date(now)
  var minutes = d.getMinutes()
  var inProgress = minutes < 55

  var currentEnd = null
  var nextStart = null

  if (inProgress) {
    // 当前小时的 :55 结束
    currentEnd = new Date(d)
    currentEnd.setMinutes(55, 0, 0)
    // 下下个整点开始（跳过5分钟间隔）
    nextStart = new Date(currentEnd.getTime() + 5 * 60 * 1000)
  } else {
    // 下个整点开始
    nextStart = new Date(d)
    nextStart.setHours(d.getHours() + 1, 0, 0, 0)
  }

  return {
    inProgress: inProgress,
    currentEnd: currentEnd
      ? { timestamp: currentEnd.getTime(), remaining: currentEnd.getTime() - now }
      : null,
    nextStart: { timestamp: nextStart.getTime(), remaining: nextStart.getTime() - now }
  }
}

/**
 * 获取所有 D4 事件状态（一站式调用）
 * @param {number} [now=Date.now()]
 * @returns {{ worldBoss: object, legion: object, helltide: object }}
 */
export function getAllD4Events(now) {
  return {
    worldBoss: getWorldBoss(now),
    legion: getLegion(now),
    helltide: getHelltide(now)
  }
}
