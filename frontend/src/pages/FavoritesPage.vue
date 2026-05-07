<script setup>
/**
 * FavoritesPage - 收藏页面
 * 展示用户收藏的工具
 */
import { ref, computed } from 'vue'
import ToolCard from '@/components/ToolCard.vue'
import { tools } from '@/config/tools'

// 从 localStorage 获取收藏列表
const favorites = ref(JSON.parse(localStorage.getItem('wow-nav-favorites') || '[]'))

// 收藏的工具列表
const favoriteTools = computed(() => {
  return tools.filter(tool => favorites.value.includes(tool.id))
})

// 切换收藏
function toggleFavorite(toolId) {
  const index = favorites.value.indexOf(toolId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(toolId)
  }
  localStorage.setItem('wow-nav-favorites', JSON.stringify(favorites.value))
}

function isFavorite(toolId) {
  return favorites.value.includes(toolId)
}
</script>

<template>
  <div class="favorites-page py-6 px-4 max-w-7xl mx-auto">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">我的收藏</h1>
      <p class="text-gray-400">
        已收藏 {{ favoriteTools.length }} 个工具
      </p>
    </div>

    <!-- 收藏的工具网格 -->
    <div
      v-if="favoriteTools.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ToolCard
        v-for="tool in favoriteTools"
        :key="tool.id"
        :tool="tool"
        :is-favorite="true"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="text-center py-16"
    >
      <div class="text-6xl mb-4">⭐</div>
      <p class="text-gray-400 text-lg mb-2">暂无收藏</p>
      <p class="text-gray-500 text-sm mb-6">
        在首页点击工具卡片上的星星可以收藏常用工具
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-2 bg-accent text-primary-dark rounded-lg font-semibold hover:bg-accent-light transition-colors"
      >
        去首页看看
      </router-link>
    </div>
  </div>
</template>
