<template>
  <div class="flex space-x-2 flex-wrap gap-2">
    <button
      v-for="version in versions"
      :key="version.value"
      class="px-4 py-2 rounded transition-all min-h-[44px] touch-manipulation"
      :class="{
        'diablo-btn': currentVersion === version.value,
        'bg-dark-card border border-diablo-gold text-light-text hover:border-diablo-gold-light': currentVersion !== version.value
      }"
      @click="selectVersion(version.value)"
    >
      {{ version.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  currentVersion: {
    type: String,
    default: 'ALL'
  }
});

const emit = defineEmits(['update:version']);

const versions = [
  { value: 'ALL', label: '全部' },
  { value: 'D2', label: 'D2' },
  { value: 'D3', label: 'D3' },
  { value: 'D4', label: 'D4' }
];

const selectVersion = (version) => {
  emit('update:version', version);
};
</script>
