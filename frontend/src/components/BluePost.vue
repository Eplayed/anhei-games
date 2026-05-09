<template>
  <div class="diablo-frame p-6">
    <h3 class="diablo-title text-2xl mb-4">📋 蓝贴速递</h3>
    
    <div class="space-y-3">
      <a
        v-for="post in posts"
        :key="post.id"
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
        class="blue-post-link block p-3 rounded transition-colors"
      >
        <div class="flex items-start justify-between mb-1">
          <h4 class="text-lg blue-post-title transition-colors">
            {{ post.title }}
          </h4>
          <span class="text-xs px-2 py-1 blue-post-version rounded ml-2 flex-shrink-0">
            {{ post.gameVersion }}
          </span>
        </div>
        <p class="text-sm text-gray-400 mb-2">{{ post.summary }}</p>
        <div class="flex items-center text-xs text-gray-500">
          <span>{{ post.publishTime }}</span>
          <span class="ml-auto">阅读原文 →</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.blue-post-link {
  border-left: 4px solid var(--brand-gold);
}
.blue-post-link:hover {
  background: var(--canvas-raised);
}
.blue-post-title {
  color: var(--ink-heading);
}
.blue-post-title:hover {
  color: var(--brand-gold);
}
.blue-post-version {
  background: var(--canvas-raised);
  color: var(--brand-gold);
}
</style>
