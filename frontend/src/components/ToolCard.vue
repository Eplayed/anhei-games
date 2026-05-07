<script setup>
/**
 * ToolCard - 工具卡片组件
 * 展示单个工具的卡片，支持收藏和点击跳转
 */
import { ref } from 'vue'
import { Star, StarFilled } from '@element-plus/icons-vue'

const props = defineProps({
  tool: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-favorite'])

// 处理卡片点击 - 跳转到工具链接
function handleCardClick() {
  if (props.tool.url) {
    window.open(props.tool.url, '_blank', 'noopener,noreferrer')
  }
}

// 处理收藏点击
function handleFavoriteClick(e) {
  e.stopPropagation()
  emit('toggle-favorite', props.tool.id)
}

// 处理图片加载失败
const imgError = ref(false)
function handleImgError() {
  imgError.value = true
}
</script>

<template>
  <div
    class="tool-card group bg-dark-card rounded-lg p-4 cursor-pointer
           transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
           border border-gray-700 hover:border-accent"
    @click="handleCardClick"
  >
    <!-- 卡片头部：图标 + 名称和收藏按钮 -->
    <div class="flex items-start justify-between mb-2">
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <!-- 工具图标 -->
        <div class="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img
            v-if="tool.icon && !imgError"
            :src="tool.icon"
            :alt="tool.name"
            class="w-8 h-8 object-contain"
            @error="handleImgError"
          />
          <span v-else class="text-accent text-lg font-bold">
            {{ tool.name.charAt(0) }}
          </span>
        </div>

        <!-- 工具名称 -->
        <h3 class="text-dark-text font-semibold text-sm truncate flex-1">
          {{ tool.name }}
        </h3>
      </div>

      <!-- 收藏按钮 -->
      <el-button
        :icon="isFavorite ? StarFilled : Star"
        size="small"
        text
        :class="isFavorite ? 'text-accent' : 'text-gray-500'"
        @click="handleFavoriteClick"
      />
    </div>

    <!-- 工具描述 -->
    <p class="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-2">
      {{ tool.description }}
    </p>

    <!-- 标签 -->
    <div class="flex flex-wrap gap-1 mt-auto">
      <span
        v-for="tag in tool.tags.slice(0, 3)"
        :key="tag"
        class="text-xs bg-primary/30 text-dark-text px-2 py-0.5 rounded"
      >
        {{ tag }}
      </span>
    </div>

    <!-- 备注（如有） -->
    <p v-if="tool.note" class="text-xs text-yellow-500 mt-2">
      ⚠️ {{ tool.note }}
    </p>
  </div>
</template>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
