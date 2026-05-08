<template>
  <div class="flex space-x-1.5 flex-wrap">
    <button
      v-for="ver in versions"
      :key="ver.value"
      class="px-3 py-1.5 text-xs font-semibold tracking-wide transition-all min-h-[36px] touch-manipulation"
      :class="currentVersion === ver.value
        ? 'diablo-btn'
        : 'diablo-btn-ghost'"
      @click="currentVersion = ver.value"
    >
      {{ ver.label }}
    </button>
  </div>
</template>

<script setup>
import { useVersion } from '../composables/useVersion.js';

var versions = [
  { value: 'D2', label: '暗黑2' },
  { value: 'D3', label: '暗黑3' },
  { value: 'D4', label: '暗黑4' }
];

var { currentVersion } = useVersion();
</script>
