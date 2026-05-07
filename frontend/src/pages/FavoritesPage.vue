<template>
  <div>
    <!-- 页面标题 -->
    <section class="mb-8">
      <h2 class="diablo-title text-3xl md:text-4xl font-bold mb-4">
        我的收藏
      </h2>
      <p class="text-gray-400">
        你收藏的资源和工具
      </p>
    </section>

    <!-- 收藏列表 -->
    <section v-if="favoriteResources.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <ResourceCard 
          v-for="resource in favoriteResources"
          :key="resource.id"
          :resource="resource"
        />
      </div>
    </section>
    
    <!-- 无收藏提示 -->
    <section 
      v-else
      class="text-center py-12 text-gray-400"
    >
      <p class="text-xl mb-4">暂无收藏</p>
      <p>访问攻略社区或工具集合，点击卡片上的收藏按钮添加</p>
      <div class="mt-6 space-x-4">
        <RouterLink 
          to="/guides" 
          class="diablo-btn inline-block px-4 py-2"
        >
          去攻略社区
        </RouterLink>
        <RouterLink 
          to="/tools" 
          class="diablo-btn inline-block px-4 py-2"
        >
          去工具集合
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ResourceCard from '../components/ResourceCard.vue';
import { resources } from '../data/resources.js';
import { getFavorites } from '../utils/storage.js';

const favoriteResources = computed(() => {
  const favorites = getFavorites();
  return resources.filter(r => favorites.includes(r.id));
});
</script>
