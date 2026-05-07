<script setup>
/**
 * DefaultLayout - 默认布局组件
 * 包含顶部导航栏、主内容区和页脚
 */
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-dark-bg text-dark-text">
    <!-- 顶部导航栏 -->
    <AppHeader />

    <!-- 主内容区 -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
