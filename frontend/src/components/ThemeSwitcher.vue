<template>
  <div class="fixed top-20 right-4 z-40">
    <!-- 主题切换面板 -->
    <Transition name="slide">
      <div 
        v-if="showPanel" 
        class="diablo-frame p-4 w-64"
      >
        <h3 class="diablo-title text-lg mb-4">🎨 切换主题色</h3>
        
        <div class="space-y-3">
          <div 
            v-for="theme in themes"
            :key="theme.name"
            class="p-3 rounded cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            :class="currentTheme === theme.name ? 'border border-[#c8860a]' : ''"
            @click="applyTheme(theme)"
          >
            <div class="flex items-center space-x-3">
              <div 
                class="w-8 h-8 rounded"
                :style="{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }"
              ></div>
              <div>
                <div class="font-bold">{{ theme.label }}</div>
                <div class="text-xs text-gray-400">{{ theme.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 切换按钮（移动端） -->
    <button
      v-if="!showPanel"
      class="md:hidden fixed top-20 right-4 z-40 diablo-btn p-3 rounded-full shadow-lg"
      @click="showPanel = true"
      title="切换主题"
    >
      🎨
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const themes = [
  {
    name: 'default',
    label: '暗金经典',
    primary: '#c8860a',
    secondary: '#8b6914',
    description: '经典暗金色主题'
  },
  {
    name: 'crimson',
    label: '血色玫瑰',
    primary: '#8b0000',
    secondary: '#4a0000',
    description: '暗黑破坏神经典红'
  },
  {
    name: 'frost',
    label: '冰霜之蓝',
    primary: '#4a90e2',
    secondary: '#357abd',
    description: '冰系法术主题'
  },
  {
    name: 'nature',
    label: '森林绿意',
    primary: '#2e8b57',
    secondary: '#1a5c3a',
    description: '德鲁伊自然主题'
  },
  {
    name: 'purple',
    label: '暗影紫调',
    primary: '#8b008b',
    secondary: '#5c005c',
    description: '暗影魔法主题'
  }
]

const currentTheme = ref('default')
const showPanel = ref(false)

const applyTheme = (theme) => {
  currentTheme.value = theme.name
  
  // 更新 CSS 变量
  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-secondary', theme.secondary)
  
  // 保存到 localStorage
  localStorage.setItem('theme-color', theme.name)
  
  // 显示成功提示
  showPanel.value = false
}

const toggleThemePanel = () => {
  showPanel.value = !showPanel.value
}

// 监听来自 Header 的切换事件
onMounted(() => {
  window.addEventListener('toggle-theme', toggleThemePanel)
  
  // 加载保存的主题
  const savedTheme = localStorage.getItem('theme-color')
  if (savedTheme) {
    const theme = themes.find(t => t.name === savedTheme)
    if (theme) {
      applyTheme(theme)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('toggle-theme', toggleThemePanel)
})

defineExpose({
  toggleThemePanel
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
