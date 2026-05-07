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
          class="text-light-text hover:text-diablo-gold transition-colors px-3 py-2 rounded"
          active-class="text-diablo-gold"
        >
          首页
        </RouterLink>
        <RouterLink 
          to="/guides" 
          class="text-light-text hover:text-diablo-gold transition-colors px-3 py-2 rounded"
          active-class="text-diablo-gold"
        >
          攻略社区
        </RouterLink>
        <RouterLink 
          to="/tools" 
          class="text-light-text hover:text-diablo-gold transition-colors px-3 py-2 rounded"
          active-class="text-diablo-gold"
        >
          工具集合
        </RouterLink>
        <RouterLink 
          to="/news" 
          class="text-light-text hover:text-diablo-gold transition-colors px-3 py-2 rounded"
          active-class="text-diablo-gold"
        >
          新闻资讯
        </RouterLink>
        <RouterLink 
          to="/favorites" 
          class="text-light-text hover:text-diablo-gold transition-colors px-3 py-2 rounded"
          active-class="text-diablo-gold"
        >
          我的收藏
        </RouterLink>
      </nav>

      <!-- 游戏版本切换 -->
      <GameVersionTabs 
        :currentVersion="currentVersion" 
        @update:version="(v) => $emit('update:version', v)" 
      />

      <!-- 工具按钮组 -->
      <div class="hidden md:flex items-center space-x-2">
        <button
          class="px-3 py-2 rounded border border-[#c8860a] text-[#c8860a] hover:bg-[#c8860a] hover:text-[#1a1a1a] transition-colors text-sm"
          @click="setHomepageRef.openModal()"
          title="设为首页"
        >
          📌 设为主页
        </button>
        
        <button
          class="px-3 py-2 rounded border border-[#c8860a] text-[#c8860a] hover:bg-[#c8860a] hover:text-[#1a1a1a] transition-colors text-sm"
          @click="openBattleNet()"
          title="启动战网"
        >
          🎮 启动战网
        </button>

        <button
          class="px-3 py-2 rounded border border-[#c8860a] text-[#c8860a] hover:bg-[#c8860a] hover:text-[#1a1a1a] transition-colors text-sm"
          @click="toggleThemeColor()"
          title="切换主题色"
        >
          🎨 切换主题
        </button>
      </div>

      <!-- 移动端汉堡菜单按钮 -->
      <button 
        class="md:hidden diablo-btn px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-label="mobileMenuOpen ? '关闭菜单' : '打开菜单'"
      >
        <span class="sr-only">{{ mobileMenuOpen ? '关闭菜单' : '打开菜单' }}</span>
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
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden diablo-frame mt-2 mx-4 p-4"
      >
        <nav class="flex flex-col space-y-2">
          <RouterLink 
            to="/" 
            class="text-light-text hover:text-diablo-gold transition-colors px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation"
            @click="mobileMenuOpen = false"
          >
            首页
          </RouterLink>
          <RouterLink 
            to="/guides" 
            class="text-light-text hover:text-diablo-gold transition-colors px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation"
            @click="mobileMenuOpen = false"
          >
            攻略社区
          </RouterLink>
          <RouterLink 
            to="/tools" 
            class="text-light-text hover:text-diablo-gold transition-colors px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation"
            @click="mobileMenuOpen = false"
          >
            工具集合
          </RouterLink>
          <RouterLink 
            to="/news" 
            class="text-light-text hover:text-diablo-gold transition-colors px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation"
            @click="mobileMenuOpen = false"
          >
            新闻资讯
          </RouterLink>
          <RouterLink 
            to="/favorites" 
            class="text-light-text hover:text-diablo-gold transition-colors px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation"
            @click="mobileMenuOpen = false"
          >
            我的收藏
          </RouterLink>
          
          <!-- 移动端工具按钮 -->
          <div class="pt-2 border-t border-[#c8860a] space-y-2">
            <button
              class="w-full text-left px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation text-[#c8860a]"
              @click="setHomepageRef.openModal(); mobileMenuOpen = false;"
            >
              📌 设为主页
            </button>
            
            <button
              class="w-full text-left px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation text-[#c8860a]"
              @click="openBattleNet(); mobileMenuOpen = false;"
            >
              🎮 启动战网
            </button>

            <button
              class="w-full text-left px-4 py-3 rounded hover:bg-[#2a2a2a] touch-manipulation text-[#c8860a]"
              @click="toggleThemeColor(); mobileMenuOpen = false;"
            >
              🎨 切换主题
            </button>
          </div>
        </nav>
      </div>
    </Transition>

    <!-- 设为首页模态框 -->
    <SetHomepage ref="setHomepageRef" />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import GameVersionTabs from './GameVersionTabs.vue';
import SetHomepage from './SetHomepage.vue';

defineProps({
  currentVersion: {
    type: String,
    default: 'ALL'
  }
});

const emit = defineEmits(['update:version']);

const mobileMenuOpen = ref(false);
const setHomepageRef = ref(null);

const openBattleNet = () => {
  // 尝试启动 Battle.net 客户端
  window.location.href = 'battlenet://';
  // 如果失败，提示用户安装
  setTimeout(() => {
    if (confirm('未能启动战网客户端。是否前往下载页面？')) {
      window.open('https://www.battlenet.com.cn/download/', '_blank');
    }
  }, 500);
};

const toggleThemeColor = () => {
  // 切换主题色逻辑将在 ThemeSwitcher 组件中实现
  const event = new CustomEvent('toggle-theme');
  window.dispatchEvent(event);
};
</script>
