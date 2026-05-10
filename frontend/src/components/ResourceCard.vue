<template>
  <div class="diablo-card diablo-card-hover transition-all duration-200">
    <!-- 资源图标 + 名称 + 收藏 -->
    <div class="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
      <img
        v-if="resource.icon"
        :src="resource.icon"
        :alt="resource.name"
        class="w-6 h-6 sm:w-8 sm:h-8 rounded-sm flex-shrink-0"
        style="border: 1px solid var(--hairline)"
        @error="handleIconError"
      />
      <div
        v-else
        class="w-6 h-6 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
        style="background: var(--brand-gold-dim); color: var(--ink-on-gold)"
      >
        {{ resource.name.charAt(0) }}
      </div>

      <!-- 名称 + 标签 -->
      <div class="flex-1 min-w-0">
        <h3 class="text-xs sm:text-sm font-semibold mb-1 truncate" style="color: var(--ink-heading)">
          {{ resource.name }}
        </h3>
        <div class="flex flex-wrap gap-0.5 sm:gap-1">
          <span
            v-for="(tag, index) in displayTags"
            :key="tag"
            class="diablo-tag text-[10px] sm:text-xs"
          >
            {{ tag }}
          </span>
          <span
            v-if="resource.tags.length > maxTags"
            class="diablo-tag text-[10px] sm:text-xs"
            style="opacity: 0.6"
          >
            +{{ resource.tags.length - maxTags }}
          </span>
        </div>
      </div>

      <!-- HOT + 收藏 -->
      <div class="flex flex-col items-end space-y-1">
        <span
          v-if="resource.isHot"
          class="diablo-badge-hot text-[10px] sm:text-xs"
        >
          HOT
        </span>

        <button
          class="text-base sm:text-xl transition-transform min-h-[32px] min-w-[32px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center touch-manipulation"
          :class="isFav ? 'scale-110' : 'opacity-60 hover:opacity-100'"
          @click="toggleFav"
          :title="isFav ? '取消收藏' : '添加收藏'"
          :aria-label="isFav ? '取消收藏' : '添加收藏'"
        >
          {{ isFav ? '❤️' : '💍' }}
        </button>
      </div>
    </div>

    <!-- 描述 -->
    <p class="mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-2" style="color: var(--ink-mute)">
      {{ resource.description }}
    </p>

    <!-- 游戏版本 + 访问按钮 -->
    <div class="flex items-center justify-between gap-2">
      <span class="diablo-tag text-[10px] sm:text-xs truncate" style="border-color: var(--ink-stone); color: var(--ink-mute)">
        {{ resource.gameVersion }}
      </span>

      <a
        :href="resource.url"
        target="_blank"
        rel="noopener noreferrer"
        class="diablo-btn text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 no-underline flex-shrink-0"
      >
        <span class="hidden sm:inline">访问 →</span>
        <span class="sm:hidden">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { isFavorite, toggleFavorite } from '../utils/storage.js';

var props = defineProps({
  resource: {
    type: Object,
    required: true
  }
});

var isFav = ref(false);

var maxTags = computed(function() {
  if (typeof window !== 'undefined' && window.innerWidth < 640) {
    return 2;
  }
  return 3;
});

var displayTags = computed(function() {
  return props.resource.tags.slice(0, maxTags.value);
});

onMounted(function () {
  isFav.value = isFavorite(props.resource.id);
});

var toggleFav = function () {
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
