<template>
  <div>
    <h3 class="diablo-title text-2xl mb-6 flex items-center gap-3">
      <span class="text-3xl">⏳</span>
      D4 世界事件倒计时
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      <!-- 世界 Boss -->
      <div class="diablo-card">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">👹</span>
          <h4 class="diablo-title text-lg">世界 Boss</h4>
        </div>
        <div class="mb-2">
          <span class="text-sm text-gray-400">下一个 Boss</span>
          <p class="font-bold text-base mt-1" style="color: var(--brand-gold)">{{ boss.bossName }}</p>
        </div>
        <div class="text-center py-3">
          <div class="text-3xl font-bold font-mono tracking-wider" style="color: var(--ink-heading)">
            {{ bossCountdown }}
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ boss.startTime }}</p>
        </div>
      </div>

      <!-- 军团事件 -->
      <div class="diablo-card">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">🗡️</span>
          <h4 class="diablo-title text-lg">军团事件</h4>
        </div>
        <div class="mb-2">
          <span class="text-sm text-gray-400">下次刷新</span>
          <p class="font-bold text-base mt-1" style="color: var(--brand-gold)">军团来袭</p>
        </div>
        <div class="text-center py-3">
          <div class="text-3xl font-bold font-mono tracking-wider" style="color: var(--ink-heading)">
            {{ legionCountdown }}
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ legion.startTime }}</p>
        </div>
      </div>

      <!-- 地狱狂潮 -->
      <div class="diablo-card">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">🔥</span>
          <h4 class="diablo-title text-lg">地狱狂潮</h4>
        </div>
        <div class="mb-2">
          <span
            class="text-xs px-2 py-0.5 rounded font-bold"
            :class="helltide.inProgress ? 'diablo-badge-active' : 'diablo-badge-idle'"
          >
            {{ helltide.inProgress ? '🔥 进行中' : '⏸ 等待中' }}
          </span>
        </div>
        <div class="text-center py-3">
          <div
            class="text-3xl font-bold font-mono tracking-wider"
            :style="{ color: helltide.inProgress ? 'var(--brand-red-glow)' : 'var(--ink-heading)' }"
          >
            {{ helltideCountdown }}
          </div>
          <p class="text-xs text-gray-500 mt-1">
            {{ helltide.inProgress ? '距结束: ' + helltide.endTime : '距开始: ' + helltide.startTime }}
          </p>
        </div>
      </div>
    </div>

    <p class="text-center text-xs text-gray-600 mt-4">
      基于游戏服务器时间计算 · 纯本地运算 · 无需 API
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getWorldBoss, getLegion, getHelltide, formatCountdown, formatTime } from '../utils/d4-events.js'

// 响应式当前时间
const now = ref(Date.now())
let timer = null

onMounted(function () {
  timer = setInterval(function () {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(function () {
  if (timer) clearInterval(timer)
})

// 计算事件数据
const boss = computed(function () { return getWorldBoss(now.value) })
const legion = computed(function () { return getLegion(now.value) })
const helltide = computed(function () { return getHelltide(now.value) })

// 格式化倒计时
const bossCountdown = computed(function () { return formatCountdown(boss.value.remaining) })
const legionCountdown = computed(function () { return formatCountdown(legion.value.remaining) })

const helltideCountdown = computed(function () {
  if (helltide.value.inProgress) {
    return formatCountdown(helltide.value.currentEnd.remaining)
  }
  return formatCountdown(helltide.value.nextStart.remaining)
})

// 格式化开始/结束时间
const bossStartTime = computed(function () { return formatTime(boss.value.timestamp) })
const legionStartTime = computed(function () { return formatTime(legion.value.timestamp) })

const helltideEndTime = computed(function () {
  if (helltide.value.currentEnd) return formatTime(helltide.value.currentEnd.timestamp)
  return ''
})

const helltideStartTime = computed(function () {
  return formatTime(helltide.value.nextStart.timestamp)
})
</script>
