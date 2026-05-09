<template>
  <div class="diablo-frost-layer"></div>
  <div id="app" class="diablo-content-layer min-h-screen" style="color: var(--ink-body)">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
