<template>
  <Transition name="modal">
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-75" @click="closeModal"></div>
      
      <div class="relative diablo-frame p-6 max-w-md w-full mx-4">
        <h3 class="diablo-title text-2xl mb-4">📌 设为首页</h3>
        
        <div class="space-y-4 text-sm">
          <p class="text-gray-300">将"暗黑导航"设为浏览器首页，快速访问暗黑资源！</p>
          
          <div class="diablo-card p-4">
            <h4 class="text-[#c8860a] font-bold mb-2">Chrome 浏览器</h4>
            <ol class="list-decimal list-inside space-y-1 text-gray-400">
              <li>点击右上角三点菜单 <code class="text-[#c8860a]">⋮</code></li>
              <li>选择"设置" → "外观"</li>
              <li>在"显示主页按钮"中启用，并填写本站地址</li>
              <li>或在"启动时"选择"打开特定网页"，添加本站</li>
            </ol>
          </div>

          <div class="diablo-card p-4">
            <h4 class="text-[#c8860a] font-bold mb-2">Edge 浏览器</h4>
            <ol class="list-decimal list-inside space-y-1 text-gray-400">
              <li>点击右上角三点菜单 <code class="text-[#c8860a]">⋯</code></li>
              <li>选择"设置" → "启动时"</li>
              <li>选择"打开特定页面"，点击"添加新页面"</li>
              <li>输入本站地址：<code class="text-[#c8860a]">http://localhost:5173</code></li>
            </ol>
          </div>

          <div class="diablo-card p-4">
            <h4 class="text-[#c8860a] font-bold mb-2">Firefox 浏览器</h4>
            <ol class="list-decimal list-inside space-y-1 text-gray-400">
              <li>点击右上角菜单 <code class="text-[#c8860a]">☰</code></li>
              <li>选择"设置" → "主页"</li>
              <li>在"新建窗口和标签页"中选择"自定义网址"</li>
              <li>输入本站地址</li>
            </ol>
          </div>

          <div class="mt-4 p-3 bg-[#2a2a2a] rounded border border-[#c8860a]">
            <p class="text-xs text-gray-400">
              💡 提示：您也可以将本站<strong class="text-[#c8860a]">拖拽到书签栏</strong>，快速访问！
            </p>
          </div>
        </div>

        <button 
          class="mt-6 diablo-btn w-full py-2"
          @click="closeModal"
        >
          知道了
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

defineExpose({
  openModal
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
