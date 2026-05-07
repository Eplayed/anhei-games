<template>
  <div class="diablo-card card-hover">
    <!-- 资源图标 + 收藏按钮 -->
    <div class="flex items-start space-x-3 mb-3">
      <img 
        v-if="resource.icon" 
        :src="resource.icon" 
        :alt="resource.name"
        class="w-8 h-8 rounded"
        @error="handleIconError"
      />
      <div 
        v-else 
        class="w-8 h-8 rounded bg-[#c8860a] flex items-center justify-center text-[#1a1a1a] font-bold"
      >
        {{ resource.name.charAt(0) }}
      </div>
      
      <!-- 资源名称 -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-[#e0e0e0] mb-1">
          {{ resource.name }}
        </h3>
        
        <!-- 标签 -->
        <div class="flex flex-wrap gap-1 mb-2">
          <span 
            v-for="tag in resource.tags" 
            :key="tag"
            class="text-xs px-2 py-0.5 bg-[#1a1a1a] border border-[#c8860a] text-[#c8860a] rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      
      <!-- 热门标记 + 收藏按钮 -->
      <div class="flex flex-col items-end space-y-2">
        <span 
          v-if="resource.isHot" 
          class="text-xs px-2 py-1 bg-red-600 text-white rounded"
        >
          HOT
        </span>
        
        <!-- 收藏按钮 -->
        <button
          class="text-2xl hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
          :class="isFav ? 'text-red-500' : 'text-gray-400'"
          @click="toggleFav"
          :title="isFav ? '取消收藏' : '添加收藏'"
          :aria-label="isFav ? '取消收藏' : '添加收藏'"
        >
          {{ isFav ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>

    <!-- 描述 -->
    <p class="text-sm text-gray-400 mb-3 line-clamp-2">
      {{ resource.description }}
    </p>

    <!-- 游戏版本标签 + 访问按钮 -->
    <div class="flex items-center justify-between">
      <span class="text-xs px-2 py-1 bg-[#1a1a1a] border border-gray-600 text-gray-400 rounded">
        {{ resource.gameVersion }}
      </span>
      
      <!-- 访问按钮 -->
      <a
        :href="resource.url"
        target="_blank"
        rel="noopener noreferrer"
        class="diablo-btn text-sm px-3 py-1"
      >
        访问网站 →
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { isFavorite, toggleFavorite } from '../utils/storage.js';

const props = defineProps({
  resource: {
    type: Object,
    required: true
  }
});

const isFav = ref(false);

onMounted(() => {
  isFav.value = isFavorite(props.resource.id);
});

const toggleFav = () => {
  isFav.value = toggleFavorite(props.resource.id);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
