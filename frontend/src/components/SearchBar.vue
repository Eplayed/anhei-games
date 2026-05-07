<script setup>
/**
 * SearchBar - 搜索栏组件
 * 支持防抖搜索、实时过滤、清除按钮
 */
import { ref, watch } from 'vue'
import { debounce } from '@/utils/helpers'

const emit = defineEmits(['search'])

// 搜索关键词
const searchQuery = ref('')

// 是否显示清除按钮
const showClear = ref(false)

// 防抖处理搜索
const debouncedSearch = debounce((value) => {
  emit('search', value)
}, 300)

// 监听搜索输入
function handleInput(value) {
  searchQuery.value = value
  showClear.value = value.length > 0
  debouncedSearch(value)
}

// 清除搜索
function handleClear() {
  searchQuery.value = ''
  showClear.value = false
  emit('search', '')
}
</script>

<template>
  <div class="search-bar w-full max-w-md mx-auto">
    <el-input
      :model-value="searchQuery"
      placeholder="搜索工具名称、描述或标签..."
      size="large"
      clearable
      class="search-input"
      @input="handleInput"
      @clear="handleClear"
    >
      <template #prefix>
        <el-icon class="text-gray-400">
          <Search />
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.search-bar :deep(.el-input__wrapper) {
  background-color: #2d3748;
  border: 1px solid #4a5568;
  box-shadow: none;
  transition: all 0.3s;
}

.search-bar :deep(.el-input__wrapper:hover) {
  border-color: #f6ad55;
}

.search-bar :deep(.el-input__wrapper.is-focus) {
  border-color: #f6ad55;
  box-shadow: 0 0 0 1px #f6ad55;
}

.search-bar :deep(.el-input__inner) {
  color: #e2e8f0;
}

.search-bar :deep(.el-input__inner::placeholder) {
  color: #718096;
}
</style>
