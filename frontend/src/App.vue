<template>
  <div id="app" class="min-h-screen bg-[#1a1a1a] text-[#e0e0e0]">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
    
    <AppFooter />
    
    <!-- 主题切换器 -->
    <ThemeSwitcher />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
</script>
