<template>
  <div>
    <!-- 页面标题 -->
    <section class="mb-6">
      <h2 class="diablo-title text-2xl md:text-3xl font-bold mb-2">
        新闻资讯
      </h2>
      <p style="font: var(--body-sm); color: var(--ink-mute)">
        官方公告、更新日志、社区动态 &middot; 当前版本：{{ currentVersionName() }}
      </p>
    </section>

    <!-- 新闻列表 -->
    <section>
      <div class="space-y-4">
        <div
          v-for="item in filteredNews"
          :key="item.id"
          class="diablo-card hover:scale-[1.01] transition-transform duration-200"
        >
          <!-- 新闻标题 -->
          <h3 class="text-base sm:text-lg font-semibold mb-2" style="color: var(--ink-heading)">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="no-underline transition-colors"
              style="color: var(--ink-heading)"
            >
              {{ item.title }}
            </a>
          </h3>

          <!-- 新闻元信息 -->
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="diablo-tag">
              {{ item.source }}
            </span>
            <span style="font: var(--caption); color: var(--ink-stone)">{{ formatDate(item.publishTime) }}</span>
          </div>

          <!-- 新闻摘要 -->
          <p v-if="item.summary" style="font: var(--body-sm); color: var(--ink-mute)">
            {{ item.summary }}
          </p>
        </div>
      </div>

      <!-- 无结果提示 -->
      <div
        v-if="filteredNews.length === 0"
        class="text-center py-12"
        style="color: var(--ink-stone)"
      >
        <p class="text-lg font-semibold" style="color: var(--ink-mute)">暂无新闻资讯</p>
        <p class="mt-2" style="font: var(--body-sm)">切换游戏版本或稍后再来</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useVersion } from '../composables/useVersion.js';
import { formatDate, filterByGameVersion } from '../utils/helpers.js';
import { news } from '../data/news.js';

var { currentVersion, currentVersionName } = useVersion();

var filteredNews = computed(function () {
  return filterByGameVersion(news, currentVersion.value);
});
</script>
