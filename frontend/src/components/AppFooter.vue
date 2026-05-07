<template>
  <footer class="diablo-frame mt-12 py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 关于本站 -->
        <div>
          <h3 class="diablo-title text-lg mb-4">关于本站</h3>
          <p class="text-sm text-gray-400">
            暗黑破坏神玩家导航站，为暗黑系列（D2/D3/D4）玩家提供一站式资源入口。
            聚合攻略、工具、新闻，让玩家快速找到所需内容。
          </p>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="diablo-title text-lg mb-4">快速链接</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/" class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation">
                首页
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/guides" class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation">
                攻略社区
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/tools" class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation">
                工具集合
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/news" class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation">
                新闻资讯
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/favorites" class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation">
                我的收藏
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- 友情链接 -->
        <div>
          <h3 class="diablo-title text-lg mb-4">相关资源</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a 
                href="https://maxroll.gg" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation"
              >
                MAXROLL.gg
              </a>
            </li>
            <li>
              <a 
                href="https://bbs.d.163.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation"
              >
                凯恩之角
              </a>
            </li>
            <li>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-diablo-gold transition-colors inline-block py-1 touch-manipulation"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="mt-8 pt-8 diablo-divider border-t text-center text-sm text-gray-500">
        <p>&copy; 2026 暗黑导航站 - 本站仅供学习交流使用</p>
        <p class="mt-2">暗黑破坏神为暴雪娱乐注册商标，本站与暴雪娱乐无关</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer组件无需额外逻辑
</script>
