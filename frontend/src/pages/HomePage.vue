<script setup>
/**
 * HomePage - 首页组件
 * 整合 ToolCard 和 CategoryTabs，实现工具导航首页
 */
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CategoryTabs from '@/components/CategoryTabs.vue'
import ToolCard from '@/components/ToolCard.vue'
import { tools, getToolsByCategory, searchTools } from '@/config/tools'
import { getCategoryById } from '@/config/categories'
import { SEARCH_DEBOUNCE_DELAY } from '@/config/constants'

// 当前选中的分类
const currentCategory = ref('common')

// 搜索关键词
const searchQuery = ref('')

// 从 localStorage 获取收藏列表
const favorites = ref(JSON.parse(localStorage.getItem('wow-nav-favorites') || '[]'))

// 根据分类和搜索词过滤工具
const filteredTools = computed(() => {
  let result = getToolsByCategory(currentCategory.value)

  if (searchQuery.value.trim()) {
    result = searchTools(searchQuery.value)
    // 如果同时有分类筛选，再过滤一次
    if (currentCategory.value !== 'all') {
      result = result.filter(tool => tool.category === currentCategory.value)
    }
  }

  return result
})

// 当前分类信息
const currentCategoryInfo = computed(() => {
  return getCategoryById(currentCategory.value)
})

// 处理搜索
function handleSearch(query) {
  searchQuery.value = query
}

// 处理分类切换
function handleCategoryChange(categoryId) {
  currentCategory.value = categoryId
}

// 切换收藏
function toggleFavorite(toolId) {
  const index = favorites.value.indexOf(toolId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(toolId)
  }
  // 持久化到 localStorage
  localStorage.setItem('wow-nav-favorites', JSON.stringify(favorites.value))
}

// 检查是否收藏
function isFavorite(toolId) {
  return favorites.value.includes(toolId)
}

// 监听路由查询（用于从 header 搜索）
const route = useRoute()
watch(() => route.query.search, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery
  }
}, { immediate: true })

onMounted(() => {
  // 初始化：如果有搜索参数，设置搜索词
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})
</script>

<template>
  <div class="home-page py-6 px-4 max-w-7xl mx-auto">
    <!-- 页面标题区域 -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
        魔兽世界玩家导航
      </h1>
      <p class="text-gray-400 text-sm md:text-base">
        {{ currentCategoryInfo?.description || '快速访问游戏相关工具和网站' }}
      </p>
    </div>

    <!-- 分类标签栏 -->
    <div class="mb-6">
      <CategoryTabs
        :current-category="currentCategory"
        @update:current-category="handleCategoryChange"
      />
    </div>

    <!-- 搜索结果统计 -->
    <div v-if="searchQuery" class="mb-4 text-sm text-gray-400">
      搜索 "{{ searchQuery }}" - 找到 {{ filteredTools.length }} 个工具
      <button
        class="ml-2 text-accent hover:underline"
        @click="clearSearch"
      >
        清除搜索
      </button>
    </div>

    <!-- 工具卡片网格 -->
    <div
      v-if="filteredTools.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ToolCard
        v-for="tool in filteredTools"
        :key="tool.id"
        :tool="tool"
        :is-favorite="isFavorite(tool.id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="text-center py-16"
    >
      <div class="text-6xl mb-4">🔍</div>
      <p class="text-gray-400 text-lg mb-2">未找到相关工具</p>
      <p class="text-gray-500 text-sm">
        试试其他关键词或切换分类
      </p>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
