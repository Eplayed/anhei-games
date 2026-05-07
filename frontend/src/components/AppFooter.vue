<script setup>
/**
 * AppFooter - 页脚组件
 * 包含免责声明、数据源说明、GitHub链接、版权信息
 */
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-primary-dark border-t border-gray-700 mt-auto">
    <div class="container mx-auto px-4 py-8">
      <!-- 免责声明 -->
      <div class="mb-6 p-4 bg-dark-card rounded-lg">
        <h3 class="text-accent font-semibold mb-2 text-sm">⚠️ 免责声明</h3>
        <p class="text-gray-400 text-xs leading-relaxed">
          本网站为魔兽世界玩家自发制作的<strong class="text-dark-text">非官方粉丝站点</strong>，
          与暴雪娱乐（Blizzard Entertainment）无任何关联。所有魔兽世界相关商标与版权
          均归暴雪娱乐所有。本站仅提供工具导航服务，所有外部链接内容由对应网站负责。
        </p>
      </div>

      <!-- 信息链接 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- 数据源说明 -->
        <div>
          <h4 class="text-white font-semibold mb-2 text-sm">数据源</h4>
          <ul class="space-y-1 text-xs text-gray-400">
            <li>• Raider.IO - 大秘境数据</li>
            <li>• Warcraft Logs - 战斗日志</li>
            <li>• Wowhead - 游戏数据库</li>
            <li>• NGA - 国内玩家社区</li>
          </ul>
        </div>

        <!-- 相关链接 -->
        <div>
          <h4 class="text-white font-semibold mb-2 text-sm">相关链接</h4>
          <ul class="space-y-1 text-xs">
            <li>
              <a href="https://worldofwarcraft.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-accent transition-colors">
                魔兽世界官网
              </a>
            </li>
            <li>
              <a href="https://battle.net" target="_blank" rel="noopener" class="text-gray-400 hover:text-accent transition-colors">
                Battle.net
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-accent transition-colors">
                GitHub 源码
              </a>
            </li>
          </ul>
        </div>

        <!-- 关于项目 -->
        <div>
          <h4 class="text-white font-semibold mb-2 text-sm">关于本站</h4>
          <p class="text-xs text-gray-400 leading-relaxed">
            魔兽世界玩家导航站致力于为玩家提供便捷的工具链接服务，
            帮助玩家快速找到所需的游戏工具和攻略资源。
          </p>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-2">
        <p class="text-xs text-gray-500">
          © {{ currentYear }} 魔兽世界玩家导航 - 非官方粉丝站点
        </p>
        <p class="text-xs text-gray-500">
          World of Warcraft is a trademark of Blizzard Entertainment
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
