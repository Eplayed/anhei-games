<script setup>
/**
 * AppHeader - 顶部导航栏组件
 * 包含 Logo、搜索栏、导航链接
 */
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SearchBar from './SearchBar.vue'

const router = useRouter()
const route = useRoute()

// 移动端菜单是否展开
const mobileMenuOpen = ref(false)

// 导航链接
const navLinks = [
  { name: '首页', path: '/' },
  { name: '收藏', path: '/favorites' },
  { name: '关于', path: '/about' }
]

// 判断当前路由是否激活
function isActive(path) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// 处理搜索
function handleSearch(query) {
  // 如果是首页，直接传递搜索词
  if (route.path === '/') {
    // 通过事件总线或 store 传递
    // 这里简单使用 router 跳转带参数
    router.push({ path: '/', query: query ? { search: query } : {} })
  } else {
    // 非首页先跳转到首页再搜索
    router.push({ path: '/', query: query ? { search: query } : {} })
  }
}

// 切换移动端菜单
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header class="bg-primary-dark border-b border-gray-700 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- 桌面端导航 -->
      <div class="hidden md:flex items-center justify-between h-16">
        <!-- Logo + 网站名称 -->
        <router-link to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div class="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span class="text-primary-dark font-bold text-xl">W</span>
          </div>
          <span class="text-white font-bold text-lg hidden lg:block">魔兽导航</span>
        </router-link>

        <!-- 搜索栏 -->
        <div class="flex-1 max-w-md mx-8">
          <SearchBar @search="handleSearch" />
        </div>

        <!-- 导航链接 -->
        <nav class="flex items-center gap-6">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium transition-colors"
            :class="isActive(link.path) ? 'text-accent' : 'text-dark-text hover:text-white'"
          >
            {{ link.name }}
          </router-link>
        </nav>
      </div>

      <!-- 移动端导航 -->
      <div class="md:hidden flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span class="text-primary-dark font-bold">W</span>
          </div>
          <span class="text-white font-bold text-sm">魔兽导航</span>
        </router-link>

        <!-- 移动端菜单按钮 -->
        <button
          class="text-dark-text hover:text-white p-2"
          @click="toggleMobileMenu"
        >
          <el-icon :size="24">
            <component :is="mobileMenuOpen ? 'Close' : 'Menu'" />
          </el-icon>
        </button>
      </div>

      <!-- 移动端搜索栏 -->
      <div class="md:hidden pb-3">
        <SearchBar @search="handleSearch" />
      </div>

      <!-- 移动端菜单 -->
      <transition name="slide-down">
        <nav
          v-if="mobileMenuOpen"
          class="md:hidden py-3 border-t border-gray-700"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block py-2 text-sm font-medium transition-colors"
            :class="isActive(link.path) ? 'text-accent' : 'text-dark-text hover:text-white'"
            @click="mobileMenuOpen = false"
          >
            {{ link.name }}
          </router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
