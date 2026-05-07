<template>
  <div>
    <!-- 页面标题 -->
    <section class="mb-8">
      <h2 class="diablo-title text-3xl md:text-4xl font-bold mb-4">
        新闻资讯
      </h2>
      <p class="text-gray-400">
        官方公告、更新日志、社区动态
      </p>
    </section>

    <!-- 新闻列表 -->
    <section>
      <div class="space-y-6">
        <div 
          v-for="item in filteredNews"
          :key="item.id"
          class="diablo-card"
        >
          <!-- 新闻标题 -->
          <h3 class="text-xl font-semibold text-light-text mb-2">
            <a 
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-diablo-gold transition-colors"
            >
              {{ item.title }}
            </a>
          </h3>
          
          <!-- 新闻元信息 -->
          <div class="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <span class="px-2 py-0.5 bg-dark-bg border border-diablo-gold text-diablo-gold rounded">
              {{ item.source }}
            </span>
            <span>{{ formatDate(item.publishTime) }}</span>
            <span 
              v-if="item.gameVersion"
              class="px-2 py-0.5 bg-dark-bg border border-gray-600 text-gray-400 rounded"
            >
              {{ item.gameVersion }}
            </span>
          </div>
          
          <!-- 新闻摘要 -->
          <p v-if="item.summary" class="text-gray-400">
            {{ item.summary }}
          </p>
        </div>
      </div>
      
      <!-- 无结果提示 -->
      <div 
        v-if="filteredNews.length === 0"
        class="text-center py-12 text-gray-400"
      >
        <p class="text-xl">暂无新闻资讯</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatDate } from '../utils/helpers.js';
import { news } from '../data/news.js';

// 当前只展示所有新闻（未来可添加游戏版本筛选）
const filteredNews = computed(() => {
  return news;
});
</script>
