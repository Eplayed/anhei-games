<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      placeholder="搜索资源、攻略、工具..."
      class="diablo-input w-full pl-10 pr-10 py-3 touch-manipulation"
      style="font-size: 16px; font-family: var(--font-body)"
    />

    <!-- 搜索图标 -->
    <svg
      class="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
      style="color: var(--ink-stone)"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>

    <!-- 清除按钮 -->
    <button
      v-if="modelValue"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
      style="color: var(--ink-stone)"
      @click="clearSearch"
      aria-label="清除搜索"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { debounce } from '../utils/helpers.js';

var props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  debounceDelay: {
    type: Number,
    default: 300
  }
});

var emit = defineEmits(['update:modelValue', 'search']);

var debouncedSearch = debounce(function (value) {
  emit('search', value);
}, props.debounceDelay);

var handleInput = function (e) {
  var value = e.target.value;
  emit('update:modelValue', value);
  debouncedSearch(value);
};

var clearSearch = function () {
  emit('update:modelValue', '');
  emit('search', '');
};
</script>
