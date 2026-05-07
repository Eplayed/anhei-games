<script setup>
/**
 * AboutPage - 关于页面
 * 介绍本站的目的和相关信息
 */
</script>

<template>
  <div class="about-page py-12 px-4 max-w-4xl mx-auto">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">关于本站</h1>
      <p class="text-gray-400">了解魔兽世界玩家导航站的由来和目标</p>
    </div>

    <!-- 主要内容 -->
    <div class="space-y-8">
      <!-- 网站介绍 -->
      <div class="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-accent mb-4">🎮 网站介绍</h2>
        <p class="text-dark-text leading-relaxed">
          魔兽世界玩家导航站是一个由玩家为玩家制作的<strong>非官方粉丝站点</strong>。
          我们的目标是为魔兽世界玩家提供一个<strong>一站式工具导航服务</strong>，
          帮助大家快速找到所需的游戏工具、攻略网站和数据查询平台。
        </p>
      </div>

      <!-- 功能特色 -->
      <div class="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-accent mb-4">✨ 功能特色</h2>
        <ul class="space-y-2 text-dark-text">
          <li class="flex items-start gap-2">
            <span class="text-accent mt-1">▸</span>
            <span><strong>八大分类</strong> - 常用工具、提升实力、大秘境、插件工具等</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent mt-1">▸</span>
            <span><strong>智能搜索</strong> - 快速找到需要的工具</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent mt-1">▸</span>
            <span><strong>收藏功能</strong> - 收藏常用工具，快速访问</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent mt-1">▸</span>
            <span><strong>响应式设计</strong> - 手机、平板、电脑都能完美显示</span>
          </li>
        </ul>
      </div>

      <!-- 免责声明 -->
      <div class="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-yellow-400 mb-4">⚠️ 免责声明</h2>
        <p class="text-yellow-100 leading-relaxed">
          本站为<strong>非官方粉丝站点</strong>，与暴雪娱乐（Blizzard Entertainment）无任何关联。
          所有魔兽世界相关商标、版权和知识产权均归暴雪娱乐所有。
          本站仅提供工具导航服务，所有外部链接内容由对应网站负责。
          如有侵权，请联系我们删除。
        </p>
      </div>

      <!-- 联系方式 -->
      <div class="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-accent mb-4">📬 联系我们</h2>
        <p class="text-dark-text mb-4">
          如果你有任何建议或发现链接失效，欢迎通过以下方式联系我们：
        </p>
        <div class="space-y-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-dark-text hover:text-accent transition-colors"
          >
            <el-icon><Promotion /></el-icon>
            <span>GitHub Issues</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
