<script setup>
/**
 * CategoryTabs - 分类标签栏组件
 * 显示8个分类标签，支持点击切换和平滑过渡动画
 */
import { computed } from 'vue'
import { categories } from '@/config/categories'
import {
  Promotion,
  TrendCharts,
  DataBoard,
  SetUp,
  Bell,
  ChatDotRound,
  Notebook,
  Star
} from '@element-plus/icons-vue'

// 图标映射
const iconMap = {
  Promotion,
  TrendCharts,
  DataBoard,
  SetUp,
  Bell,
  ChatDotRound,
  Notebook,
  Star
}

const props = defineProps({
  currentCategory: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:currentCategory'])

// 计算当前激活的分类索引（用于动画指示条）
const activeIndex = computed(() => {
  return categories.findIndex(cat => cat.id === props.currentCategory)
})

// 获取分类图标组件
function getIconComponent(iconName) {
  return iconMap[iconName] || null
}

// 处理分类切换
function handleCategoryClick(categoryId) {
  emit('update:currentCategory', categoryId)
}
</script>

<template>
  <div class="category-tabs-wrapper overflow-x-auto scrollbar-hide">
    <div class="category-tabs flex gap-1 md:gap-2 p-1 min-w-max md:min-w-0 md:flex-wrap">
      <button
        v-for="category in categories"
        :key="category.id"
        class="category-tab group relative px-3 py-2 md:px-4 rounded-lg text-sm whitespace-nowrap
               transition-all duration-300 flex items-center gap-1.5"
        :class="[
          currentCategory === category.id
            ? 'bg-primary text-accent font-semibold shadow-md'
            : 'text-dark-text hover:bg-dark-card hover:text-white'
        ]"
        @click="handleCategoryClick(category.id)"
      >
        <!-- Element Plus 图标 -->
        <component
          v-if="getIconComponent(category.icon)"
          :is="getIconComponent(category.icon)"
          class="w-4 h-4"
        />

        <!-- 分类名称 -->
        <span>{{ category.name }}</span>

        <!-- 底部指示条（激活状态） -->
        <div
          v-if="currentCategory === category.id"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full
                 transition-all duration-300"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-tabs-wrapper {
  -webkit-overflow-scrolling: touch;
}

/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.category-tab {
  position: relative;
  overflow: hidden;
}

.category-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(246, 173, 85, 0.1), transparent);
  transition: left 0.5s;
}

.category-tab:hover::before {
  left: 100%;
}
</style>
