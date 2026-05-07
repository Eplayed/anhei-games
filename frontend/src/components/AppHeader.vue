<template>
  <header class="diablo-frame sticky top-0 z-50 mb-6">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo和站点名称 -->
      <div class="flex items-center space-x-4">
        <h1 class="diablo-title text-2xl md:text-3xl font-bold">
          暗黑导航
        </h1>
      </div>

      <!-- 导航链接 - 桌面端 -->
      <nav class="hidden md:flex space-x-6">
        <RouterLink 
          to="/" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          active-class="text-diablo-gold"
        >
          首页
        </RouterLink>
        <RouterLink 
          to="/guides" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          active-class="text-diablo-gold"
        >
          攻略社区
        </RouterLink>
        <RouterLink 
          to="/tools" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          active-class="text-diablo-gold"
        >
          工具集合
        </RouterLink>
        <RouterLink 
          to="/news" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          active-class="text-diablo-gold"
        >
          新闻资讯
        </RouterLink>
      </nav>

      <!-- 游戏版本切换 -->
      <GameVersionTabs 
        :currentVersion="currentVersion" 
        @update:version="(v) => $emit('update:version', v)" 
      />

      <!-- 移动端汉堡菜单 -->
      <button 
        class="md:hidden diablo-btn px-3 py-2"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span class="sr-only">菜单</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            v-if="!mobileMenuOpen"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path 
            v-else
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- 移动端导航菜单 -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden diablo-frame mt-2 mx-4 p-4"
    >
      <nav class="flex flex-col space-y-3">
        <RouterLink 
          to="/" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          @click="mobileMenuOpen = false"
        >
          首页
        </RouterLink>
        <RouterLink 
          to="/guides" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          @click="mobileMenuOpen = false"
        >
          攻略社区
        </RouterLink>
        <RouterLink 
          to="/tools" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          @click="mobileMenuOpen = false"
        >
          工具集合
        </RouterLink>
        <RouterLink 
          to="/news" 
          class="text-light-text hover:text-diablo-gold transition-colors"
          @click="mobileMenuOpen = false"
        >
          新闻资讯
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import GameVersionTabs from './GameVersionTabs.vue';

defineProps({
  currentVersion: {
    type: String,
    default: 'ALL'
  }
});

const emit = defineEmits(['update:version']);

const mobileMenuOpen = ref(false);
</script>
