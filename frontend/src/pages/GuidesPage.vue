<template>
  <div>
    <!-- 页面标题 -->
    <section class="mb-8">
      <h2 class="diablo-title text-3xl md:text-4xl font-bold mb-4">
        攻略社区
      </h2>
      <p class="text-gray-400">
        聚合各大攻略站、社区论坛，快速找到所需攻略
      </p>
    </section>

    <!-- 游戏版本切换 + 搜索 + 中文筛选 -->
    <section class="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
      <GameVersionTabs 
        :currentVersion="currentVersion" 
        @update:version="handleVersionChange"
      />
      <div class="flex-1 max-w-md">
        <SearchBar v-model="searchQuery" @search="handleSearch" />
      </div>
      <button
        class="px-3 py-2 rounded border transition-colors"
        :class="showChineseOnly ? 'diablo-btn' : 'border-[#c8860a] text-[#c8860a] hover:bg-[#c8860a] hover:text-[#1a1a1a]'"
        @click="showChineseOnly = !showChineseOnly"
      >
        中文资源
      </button>
    </section>

    <!-- 资源列表 -->
    <section>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <ResourceCard 
          v-for="resource in filteredResources"
          :key="resource.id"
          :resource="resource"
        />
      </div>
      
      <!-- 无结果提示 -->
      <div 
        v-if="filteredResources.length === 0"
        class="text-center py-12 text-gray-400"
      >
        <p class="text-xl">未找到相关资源</p>
        <p class="mt-2">尝试调整搜索关键词或游戏版本筛选</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import GameVersionTabs from '../components/GameVersionTabs.vue';
import SearchBar from '../components/SearchBar.vue';
import ResourceCard from '../components/ResourceCard.vue';
import { resources } from '../data/resources.js';
import { filterByGameVersion, filterResources } from '../utils/helpers.js';

const route = useRoute();
const currentVersion = ref(route.query.version || 'ALL');
const searchQuery = ref(route.query.search || '');
const showChineseOnly = ref(false);

const filteredResources = computed(() => {
  let result = resources.filter(r => r.category === 'guide');
  result = filterByGameVersion(result, currentVersion.value);
  result = filterResources(result, searchQuery.value);
  if (showChineseOnly.value) {
    result = result.filter(r => r.tags.some(t => t.includes('中文')));
  }
  return result;
});

const handleVersionChange = (version) => {
  currentVersion.value = version;
};

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>
