<template>
  <footer class="mt-10 pt-6 pb-8" style="background: var(--canvas-mid); border-top: 1px solid var(--divider);">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 关于本站 -->
        <div>
          <h3 class="diablo-title text-sm mb-3 uppercase tracking-wider">关于本站</h3>
          <p style="font: var(--body-sm); color: var(--ink-mute)">
            暗黑破坏神玩家导航站，为暗黑系列（D2/D3/D4）玩家提供一站式资源入口。
            聚合攻略、工具、新闻，让玩家快速找到所需内容。
          </p>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="diablo-title text-sm mb-3 uppercase tracking-wider">快速链接</h3>
          <ul class="space-y-1.5">
            <li>
              <RouterLink to="/" class="block py-1 transition-colors" style="font: var(--body-sm); color: var(--ink-mute)">
                首页
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/guides" class="block py-1 transition-colors" style="font: var(--body-sm); color: var(--ink-mute)">
                攻略社区
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/tools" class="block py-1 transition-colors" style="font: var(--body-sm); color: var(--ink-mute)">
                工具集合
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/news" class="block py-1 transition-colors" style="font: var(--body-sm); color: var(--ink-mute)">
                新闻资讯
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/favorites" class="block py-1 transition-colors" style="font: var(--body-sm); color: var(--ink-mute)">
                我的收藏
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- 友情链接 -->
        <div>
          <h3 class="diablo-title text-sm mb-3 uppercase tracking-wider">相关资源</h3>
          <ul class="space-y-1.5">
            <li>
              <a
                href="https://maxroll.gg"
                target="_blank"
                rel="noopener noreferrer"
                class="block py-1 transition-colors"
                style="font: var(--body-sm); color: var(--ink-mute)"
              >
                MAXROLL.gg
              </a>
            </li>
            <li>
              <a
                href="https://bbs.d.163.com"
                target="_blank"
                rel="noopener noreferrer"
                class="block py-1 transition-colors"
                style="font: var(--body-sm); color: var(--ink-mute)"
              >
                凯恩之角
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="block py-1 transition-colors"
                style="font: var(--body-sm); color: var(--ink-mute)"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="mt-6 pt-5 text-center" style="border-top: 1px solid var(--divider);">
        <p style="font: var(--caption); color: var(--ink-stone)">
          &copy; 2026 暗黑导航站 - 本站仅供学习交流使用
        </p>
        <p class="mt-1" style="font: var(--micro); color: var(--ink-stone)">
          暗黑破坏神为暴雪娱乐注册商标，本站与暴雪娱乐无关
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer 组件无需额外逻辑
</script>
