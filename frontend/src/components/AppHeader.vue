<template>
  <header class="diablo-frost-nav sticky top-0 z-50 mb-5" :class="{ scrolled: isScrolled }">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <h1 class="diablo-title text-xl md:text-2xl font-bold tracking-wide">
          暗黑导航
        </h1>
      </div>

      <!-- 导航链接 - 桌面端 -->
      <nav class="hidden md:flex space-x-5">
        <RouterLink
          to="/"
          class="text-sm font-semibold hover:text-[var(--brand-gold)] transition-colors py-2"
          :class="{ 'text-[var(--brand-gold)]': $route.path === '/' }"
          style="color: var(--ink-body)"
        >
          首页
        </RouterLink>
        <RouterLink
          to="/guides"
          class="text-sm font-semibold hover:text-[var(--brand-gold)] transition-colors py-2"
          :class="{ 'text-[var(--brand-gold)]': $route.path === '/guides' }"
          style="color: var(--ink-body)"
        >
          攻略社区
        </RouterLink>
        <RouterLink
          to="/tools"
          class="text-sm font-semibold hover:text-[var(--brand-gold)] transition-colors py-2"
          :class="{ 'text-[var(--brand-gold)]': $route.path === '/tools' }"
          style="color: var(--ink-body)"
        >
          工具集合
        </RouterLink>
        <RouterLink
          to="/news"
          class="text-sm font-semibold hover:text-[var(--brand-gold)] transition-colors py-2"
          :class="{ 'text-[var(--brand-gold)]': $route.path === '/news' }"
          style="color: var(--ink-body)"
        >
          新闻资讯
        </RouterLink>
        <RouterLink
          to="/favorites"
          class="text-sm font-semibold hover:text-[var(--brand-gold)] transition-colors py-2"
          :class="{ 'text-[var(--brand-gold)]': $route.path === '/favorites' }"
          style="color: var(--ink-body)"
        >
          我的收藏
        </RouterLink>
      </nav>

      <!-- 游戏版本切换 -->
      <GameVersionTabs />

      <!-- 工具按钮组 -->
      <div class="hidden md:flex items-center space-x-2">
        <button
          class="diablo-btn-ghost text-xs px-3 py-1.5"
          @click="setHomepageRef.openModal()"
          title="设为首页"
        >
          设为主页
        </button>

        <button
          class="diablo-btn-ghost text-xs px-3 py-1.5"
          @click="openBattleNet()"
          title="启动战网"
        >
          启动战网
        </button>
      </div>

      <!-- 移动端汉堡菜单 -->
      <button
        class="md:hidden diablo-btn-ghost px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-label="mobileMenuOpen ? '关闭菜单' : '打开菜单'"
      >
        <span class="sr-only">{{ mobileMenuOpen ? '关闭菜单' : '打开菜单' }}</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        class="md:hidden mx-4 mb-3 p-3"
        style="background: rgba(20, 19, 28, 0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--hairline); border-radius: var(--radius-sm);"
      >
        <nav class="flex flex-col space-y-1">
          <RouterLink
            to="/"
            class="block px-4 py-3 text-sm font-semibold transition-colors"
            :class="{ 'text-[var(--brand-gold)]': $route.path === '/' }"
            :style="{ color: $route.path === '/' ? undefined : 'var(--ink-body)' }"
            @click="mobileMenuOpen = false"
          >
            首页
          </RouterLink>
          <RouterLink
            to="/guides"
            class="block px-4 py-3 text-sm font-semibold transition-colors"
            :class="{ 'text-[var(--brand-gold)]': $route.path === '/guides' }"
            :style="{ color: $route.path === '/guides' ? undefined : 'var(--ink-body)' }"
            @click="mobileMenuOpen = false"
          >
            攻略社区
          </RouterLink>
          <RouterLink
            to="/tools"
            class="block px-4 py-3 text-sm font-semibold transition-colors"
            :class="{ 'text-[var(--brand-gold)]': $route.path === '/tools' }"
            :style="{ color: $route.path === '/tools' ? undefined : 'var(--ink-body)' }"
            @click="mobileMenuOpen = false"
          >
            工具集合
          </RouterLink>
          <RouterLink
            to="/news"
            class="block px-4 py-3 text-sm font-semibold transition-colors"
            :class="{ 'text-[var(--brand-gold)]': $route.path === '/news' }"
            :style="{ color: $route.path === '/news' ? undefined : 'var(--ink-body)' }"
            @click="mobileMenuOpen = false"
          >
            新闻资讯
          </RouterLink>
          <RouterLink
            to="/favorites"
            class="block px-4 py-3 text-sm font-semibold transition-colors"
            :class="{ 'text-[var(--brand-gold)]': $route.path === '/favorites' }"
            :style="{ color: $route.path === '/favorites' ? undefined : 'var(--ink-body)' }"
            @click="mobileMenuOpen = false"
          >
            我的收藏
          </RouterLink>

          <div class="pt-2 mt-1 space-y-1" style="border-top: 1px solid var(--divider);">
            <button
              class="w-full text-left px-4 py-3 text-sm font-semibold transition-colors"
              style="color: var(--brand-gold)"
              @click="setHomepageRef.openModal(); mobileMenuOpen = false;"
            >
              设为主页
            </button>
            <button
              class="w-full text-left px-4 py-3 text-sm font-semibold transition-colors"
              style="color: var(--brand-gold)"
              @click="openBattleNet(); mobileMenuOpen = false;"
            >
              启动战网
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import GameVersionTabs from './GameVersionTabs.vue';
import SetHomepage from './SetHomepage.vue';

var route = useRoute();
var mobileMenuOpen = ref(false);
var setHomepageRef = ref(null);
var isScrolled = ref(false);

// 滚动检测：滚动超过 60px 时增强磨砂
var onScroll = function () {
  isScrolled.value = window.scrollY > 60;
};
onMounted(function () { window.addEventListener('scroll', onScroll, { passive: true }); });
onUnmounted(function () { window.removeEventListener('scroll', onScroll); });

var openBattleNet = function () {
  window.location.href = 'battlenet://';
  setTimeout(function () {
    if (confirm('未能启动战网客户端。是否前往下载页面？')) {
      window.open('https://www.battlenet.com.cn/download/', '_blank');
    }
  }, 500);
};
</script>
