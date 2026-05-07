<template>
  <div>
    <!-- 页面标题 -->
    <section class="mb-8">
      <h2 class="diablo-title text-3xl md:text-4xl font-bold mb-4">
        工具集合
      </h2>
      <p class="text-gray-400">
        各类计算器、模拟器、查询工具，助你规划Build
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

    <!-- 工具列表 -->
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
        <p class="text-xl">未找到相关工具</p>
        <p class="mt-2">尝试调整搜索关键词或游戏版本筛选</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GameVersionTabs from '../components/GameVersionTabs.vue';
import SearchBar from '../components/SearchBar.vue';
import ResourceCard from '../components/ResourceCard.vue';
import { resources } from '../data/resources.js';
import { filterByGameVersion, filterResources } from '../utils/helpers.js';

const currentVersion = ref('ALL');
const searchQuery = ref('');
const showChineseOnly = ref(false);

const filteredResources = computed(() => {
  let result = resources.filter(r => r.category === 'tool');
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
