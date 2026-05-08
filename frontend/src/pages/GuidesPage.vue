<template>
  <div>
    <!-- 页面标题 -->
    <section class="mb-6">
      <h2 class="diablo-title text-2xl md:text-3xl font-bold mb-2">
        攻略社区
      </h2>
      <p style="font: var(--body-sm); color: var(--ink-mute)">
        聚合各大攻略站、社区论坛，快速找到所需攻略
      </p>
    </section>

    <!-- 搜索 + 中文筛选 -->
    <section class="mb-6 flex flex-col md:flex-row gap-3 items-start md:items-center">
      <div class="flex-1 max-w-md">
        <SearchBar v-model="searchQuery" @search="handleSearch" />
      </div>
      <button
        class="diablo-btn-ghost text-xs px-3 py-1.5"
        :class="{ 'diablo-btn': showChineseOnly }"
        @click="showChineseOnly = !showChineseOnly"
      >
        中文资源
      </button>
    </section>

    <!-- 资源列表 -->
    <section>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResourceCard
          v-for="resource in filteredResources"
          :key="resource.id"
          :resource="resource"
        />
      </div>

      <!-- 无结果提示 -->
      <div
        v-if="filteredResources.length === 0"
        class="text-center py-12"
        style="color: var(--ink-stone)"
      >
        <p class="text-lg font-semibold" style="color: var(--ink-mute)">未找到相关资源</p>
        <p class="mt-2" style="font: var(--body-sm)">尝试调整搜索关键词或切换游戏版本</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import ResourceCard from '../components/ResourceCard.vue';
import { useVersion } from '../composables/useVersion.js';
import { resources } from '../data/resources.js';
import { filterByGameVersion, filterResources } from '../utils/helpers.js';

var { currentVersion } = useVersion();
var searchQuery = ref('');
var showChineseOnly = ref(false);

var filteredResources = computed(function () {
  var result = resources.filter(function (r) { return r.category === 'guide' });
  result = filterByGameVersion(result, currentVersion.value);
  result = filterResources(result, searchQuery.value);
  if (showChineseOnly.value) {
    result = result.filter(function (r) {
      return r.tags.some(function (t) { return t.indexOf('中文') !== -1 });
    });
  }
  return result;
});

var handleSearch = function (query) {
  searchQuery.value = query;
};
</script>
