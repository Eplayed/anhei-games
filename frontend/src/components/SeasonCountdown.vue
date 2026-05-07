<template>
  <div class="diablo-card">
    <h3 class="diablo-title text-xl mb-4">赛季倒计时</h3>
    
    <div v-if="daysLeft >= 0" class="text-center">
      <div class="text-4xl font-bold text-[#c8860a] mb-2">
        {{ daysLeft }} 天
      </div>
      <p class="text-gray-400">
        {{ seasonName }} 剩余时间
      </p>
    </div>
    
    <div v-else class="text-center text-gray-400">
      <p>新赛季即将开始</p>
    </div>
    
    <div class="mt-4 text-sm text-gray-500 text-center">
      赛季结束日期: {{ formatDate(seasonEndDate.value) }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { formatDate } from '../utils/helpers.js';

// 赛季配置（可手动更新）
const seasonName = ref('第5赛季');
const seasonEndDate = ref('2026-08-01'); // 手动更新此日期

const now = ref(Date.now());

let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now();
  }, 60000); // 每分钟更新一次
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const daysLeft = computed(() => {
  const end = new Date(seasonEndDate.value).getTime();
  const diff = end - now.value;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});
</script>
