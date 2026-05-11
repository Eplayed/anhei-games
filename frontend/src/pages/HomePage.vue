<template>
  <div>
    <!-- ====== P0: 全视口沉浸式 Hero ====== -->
    <section class="diablo-hero">
      <div class="diablo-hero-content">
        <!-- 纪念碑式大标题 -->
        <h2 class="diablo-hero-title">
          暗黑破坏神<br class="sm:hidden" />玩家导航
        </h2>
        <!-- 版本副标题 -->
        <p class="diablo-hero-sub">
          {{ currentVersionName() }} &middot; 一站式资源入口
        </p>
        <!-- 搜索框 -->
        <div class="w-full max-w-xl mx-auto">
          <SearchBar />
        </div>
      </div>
      <!-- 向下滚动指示器 -->
      <div class="diablo-hero-scroll" @click="scrollToContent">
        <svg class="diablo-scroll-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- ====== 主内容区域 ====== -->
    <div ref="contentRef" class="diablo-main-content">

    <!-- D4 专属：事件倒计时 (4列) -->
    <section v-if="currentVersion === 'D4'" class="mb-6">
      <div class="diablo-section-header">
        <span class="diablo-section-num">I</span>
        <h3 class="diablo-title uppercase tracking-wider">世界事件</h3>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- 世界 Boss -->
        <div class="diablo-card-glass py-3 px-4">
          <div class="flex items-center gap-1.5 mb-2">
            <span class="text-base">&#x1F479;</span>
            <h4 class="diablo-title text-xs uppercase tracking-widest">世界 Boss</h4>
          </div>
          <p class="text-xs font-bold mb-1 truncate" style="color: var(--brand-gold)">{{ boss.bossName }}</p>
          <div class="text-2xl font-bold tracking-wider text-center font-mono" style="color: var(--ink-heading)">
            {{ bossCountdown }}
          </div>
          <p class="text-center mt-0.5" style="font: var(--micro); color: var(--ink-stone)">{{ bossStartTime }}</p>
        </div>

        <!-- 军团事件 -->
        <div class="diablo-card-glass py-3 px-4">
          <div class="flex items-center gap-1.5 mb-2">
            <span class="text-base">&#x1F5E1;&#xFE0F;</span>
            <h4 class="diablo-title text-xs uppercase tracking-widest">军团事件</h4>
          </div>
          <p class="text-xs font-bold mb-1" style="color: var(--brand-gold)">军团来袭</p>
          <div class="text-2xl font-bold tracking-wider text-center font-mono" style="color: var(--ink-heading)">
            {{ legionCountdown }}
          </div>
          <p class="text-center mt-0.5" style="font: var(--micro); color: var(--ink-stone)">{{ legionStartTime }}</p>
        </div>

        <!-- 地狱狂潮 -->
        <div class="diablo-card-glass py-3 px-4">
          <div class="flex items-center gap-1.5 mb-2">
            <span class="text-base">&#x1F525;</span>
            <h4 class="diablo-title text-xs uppercase tracking-widest">地狱狂潮</h4>
          </div>
          <span class="diablo-badge-active" v-if="helltide.inProgress">进行中</span>
          <span class="diablo-badge-idle" v-else>等待中</span>
          <div
            class="text-2xl font-bold tracking-wider text-center mt-1 font-mono"
            :style="{ color: helltide.inProgress ? 'var(--brand-red-glow)' : 'var(--ink-heading)' }"
          >
            {{ helltideCountdown }}
          </div>
          <p class="text-center mt-0.5" style="font: var(--micro); color: var(--ink-stone)">
            {{ helltide.inProgress ? '距结束 ' + helltideEndTime : '距开始 ' + helltideStartTime }}
          </p>
        </div>

        <!-- 赛季倒计时 -->
        <div class="diablo-card-glass py-3 px-4">
          <div class="flex items-center gap-1.5 mb-2">
            <span class="text-base">&#x1F3C6;</span>
            <h4 class="diablo-title text-xs uppercase tracking-widest">赛季倒计时</h4>
          </div>
          <p class="text-xs font-bold mb-1" style="color: var(--brand-gold)">{{ seasonName }}</p>
          <div class="text-2xl font-bold tracking-wider text-center font-mono" style="color: var(--ink-heading)">
            {{ daysLeft }}
          </div>
          <p class="text-center mt-0.5" style="font: var(--micro); color: var(--ink-stone)">天剩余</p>
        </div>
      </div>
    </section>

    <!-- 装饰分隔 -->
    <div class="diablo-section-divider">
      <div class="diablo-section-divider-diamond"></div>
    </div>

    <!-- 游戏工具 + 热门资源（左2/3）+ 蓝贴速递（右1/3）：磨砂双栏 -->
    <div class="diablo-card-glass p-4 sm:p-5 mb-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <!-- 左栏 2/3：游戏工具 + 热门资源 -->
        <div class="lg:col-span-2 flex flex-col gap-4 min-w-0">

          <!-- 游戏工具 -->
          <section>
            <div class="diablo-section-header">
              <span class="diablo-section-num">II</span>
              <h3 class="diablo-title uppercase tracking-wider">游戏工具</h3>
              <router-link
                to="/tools"
                class="text-xs no-underline transition-opacity hover:opacity-80 ml-auto mr-0"
                style="color: var(--brand-gold)"
              >
                查看全部 &rarr;
              </router-link>
            </div>
            <div class="overflow-y-auto" style="max-height: 200px;">
              <a
                v-for="resource in filteredTools"
                :key="resource.id"
                :href="resource.url"
                target="_blank"
                rel="noopener noreferrer"
                class="diablo-mini-card no-underline group"
              >
                <img
                  v-if="resource.icon"
                  :src="resource.icon"
                  :alt="resource.name"
                  class="w-5 h-5 rounded-sm flex-shrink-0"
                  style="border: 1px solid var(--hairline)"
                />
                <span
                  v-else
                  class="w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style="background: var(--brand-gold-dim); color: var(--ink-on-gold)"
                >{{ resource.name.charAt(0) }}</span>
                <span class="text-sm truncate flex-1" style="color: var(--ink-heading)">{{ resource.name }}</span>
                <span
                  v-for="tag in resource.tags.slice(0, 2)"
                  :key="tag"
                  class="diablo-tag text-[10px] hidden sm:inline-flex"
                >{{ tag }}</span>
                <span class="diablo-tag text-[10px] hidden lg:inline-flex" style="border-color: var(--ink-stone); color: var(--ink-mute)">{{ resource.gameVersion }}</span>
                <svg class="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" style="color: var(--ink-stone)" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5z"/></svg>
              </a>
              <div
                v-if="filteredTools.length === 0"
                class="text-center py-4"
                style="color: var(--ink-stone); font: var(--body-sm)"
              >
                暂无该版本的游戏工具
              </div>
            </div>
          </section>

          <!-- 热门资源 -->
          <section>
            <div class="diablo-section-header">
              <span class="diablo-section-num">III</span>
              <h3 class="diablo-title uppercase tracking-wider">热门资源</h3>
            </div>
            <div class="overflow-y-auto" style="max-height: 200px;">
              <a
                v-for="resource in filteredHotResources"
                :key="resource.id"
                :href="resource.url"
                target="_blank"
                rel="noopener noreferrer"
                class="diablo-mini-card no-underline group"
              >
                <img
                  v-if="resource.icon"
                  :src="resource.icon"
                  :alt="resource.name"
                  class="w-5 h-5 rounded-sm flex-shrink-0"
                  style="border: 1px solid var(--hairline)"
                />
                <span
                  v-else
                  class="w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style="background: var(--brand-gold-dim); color: var(--ink-on-gold)"
                >{{ resource.name.charAt(0) }}</span>
                <span
                  v-if="resource.isHot"
                  class="diablo-badge-hot text-[9px]"
                >HOT</span>
                <span class="text-sm truncate flex-1" style="color: var(--ink-heading)">{{ resource.name }}</span>
                <span
                  v-for="tag in resource.tags.slice(0, 2)"
                  :key="tag"
                  class="diablo-tag text-[10px] hidden sm:inline-flex"
                >{{ tag }}</span>
                <svg class="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" style="color: var(--ink-stone)" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5z"/></svg>
              </a>
              <div
                v-if="filteredHotResources.length === 0"
                class="text-center py-4"
                style="color: var(--ink-stone); font: var(--body-sm)"
              >
                暂无该版本的热门资源
              </div>
            </div>
          </section>
        </div>

        <!-- 右栏 1/3：蓝贴速递 -->
        <section class="lg:col-span-1 min-w-0">
          <div class="diablo-section-header">
            <span class="diablo-section-num">IV</span>
            <h3 class="diablo-title uppercase tracking-wider">蓝贴速递</h3>
            <router-link
              to="/news"
              class="text-xs no-underline transition-opacity hover:opacity-80 ml-auto mr-0"
              style="color: var(--brand-gold)"
            >
              更多 &rarr;
            </router-link>
          </div>
          <div class="space-y-1.5 overflow-y-auto" style="max-height: 420px;">
            <a
              v-for="post in filteredBluePosts"
              :key="post.id"
              :href="post.url"
              target="_blank"
              rel="noopener noreferrer"
              class="diablo-post-item no-underline"
            >
              <span
                class="diablo-tag flex-shrink-0"
                :style="versionTagStyle(post.gameVersion)"
              >{{ versionLabel(post.gameVersion) }}</span>
              <span
                v-if="post.category"
                class="diablo-tag flex-shrink-0 text-[10px]"
                style="border-color: var(--ink-stone); color: var(--ink-mute)"
              >{{ categoryLabel(post.category) }}</span>
              <span class="text-sm truncate flex-1" style="color: var(--ink-body)">{{ post.title }}</span>
              <span class="flex-shrink-0 hidden sm:inline" style="font: var(--micro); color: var(--ink-stone)">{{ post.publishTime }}</span>
            </a>
            <div
              v-if="filteredBluePosts.length === 0"
              class="text-center py-4"
              style="color: var(--ink-stone); font: var(--body-sm)"
            >
              暂无该版本的蓝贴资讯
            </div>
          </div>
        </section>
      </div>
    </div>
    </div><!-- /diablo-main-content -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import { useVersion } from '../composables/useVersion.js';
import {
  getWorldBoss, getLegion, getHelltide,
  formatCountdown, formatTime
} from '../utils/d4-events.js';
import { resources } from '../data/resources.js';
import { bluePosts } from '../data/bluePosts.js';
import { filterByGameVersion } from '../utils/helpers.js';

var { currentVersion, currentVersionName } = useVersion();

// ===== Hero 滚动指示 =====
var contentRef = ref(null);
var scrollToContent = function () {
  if (contentRef.value) {
    contentRef.value.scrollIntoView({ behavior: 'smooth' });
  }
};

// ===== 赛季倒计时（D4 专属） =====
var seasonName = ref('第5赛季');
var seasonEndDate = ref('2026-08-01');
var now = ref(Date.now());
var timer = null;

onMounted(function () {
  timer = setInterval(function () { now.value = Date.now() }, 1000);
});
onUnmounted(function () {
  if (timer) clearInterval(timer);
});

var daysLeft = computed(function () {
  var diff = new Date(seasonEndDate.value).getTime() - now.value;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// ===== D4 事件倒计时（仅 D4 版本展示） =====
var boss = computed(function () { return getWorldBoss(now.value) });
var legion = computed(function () { return getLegion(now.value) });
var helltide = computed(function () { return getHelltide(now.value) });

var bossCountdown = computed(function () { return formatCountdown(boss.value.remaining) });
var legionCountdown = computed(function () { return formatCountdown(legion.value.remaining) });
var helltideCountdown = computed(function () {
  if (helltide.value.inProgress) return formatCountdown(helltide.value.currentEnd.remaining);
  return formatCountdown(helltide.value.nextStart.remaining);
});
var bossStartTime = computed(function () { return formatTime(boss.value.timestamp) });
var legionStartTime = computed(function () { return formatTime(legion.value.timestamp) });
var helltideStartTime = computed(function () { return formatTime(helltide.value.nextStart.timestamp) });
var helltideEndTime = computed(function () {
  return helltide.value.currentEnd ? formatTime(helltide.value.currentEnd.timestamp) : '';
});

// ===== 蓝贴 + 热门资源（按版本过滤） =====
var filteredBluePosts = computed(function () {
  return filterByGameVersion(bluePosts, currentVersion.value).slice(0, 8);
});

// 版本标签颜色样式
var versionTagStyle = function (version) {
  var colors = {
    D4: 'border-color: var(--brand-red); color: var(--brand-red)',
    D3: 'border-color: #f5a623; color: #f5a623',
    D2: 'border-color: #7ec8e3; color: #7ec8e3'
  };
  return colors[version] || '';
};

// 版本标签名称
var versionLabel = function (version) {
  var labels = { D4: 'D4', D3: 'D3', D2: 'D2' };
  return labels[version] || version;
};

// 分类标签名称
var categoryLabel = function (category) {
  var labels = {
    hotfix: '热修复',
    patch: '补丁',
    expansion: '扩展',
    event: '活动',
    season: '赛季',
    ladder: '天梯',
    announcement: '公告'
  };
  return labels[category] || category;
};

var filteredTools = computed(function () {
  var tools = resources.filter(function (r) { return r.category === 'tool' });
  return filterByGameVersion(tools, currentVersion.value);
});

var filteredHotResources = computed(function () {
  var hot = resources.filter(function (r) { return r.isHot });
  return filterByGameVersion(hot, currentVersion.value);
});
</script>

<style scoped>
/* ====== 全视口沉浸式 Hero ====== */
.diablo-hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 80px 16px 120px;
}

.diablo-hero-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: heroFadeIn 0.8s ease-out;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 纪念碑式大标题 */
.diablo-hero-title {
  font: var(--display-xl);
  color: var(--brand-gold);
  letter-spacing: 3px;
  text-shadow: 0 0 20px var(--hairline-bright), 0 2px 4px rgba(0,0,0,0.5);
  line-height: 1.15;
}

@media (max-width: 640px) {
  .diablo-hero-title {
    font-size: 32px;
    letter-spacing: 1px;
  }
}

/* 副标题 */
.diablo-hero-sub {
  font: var(--heading-lg);
  color: var(--ink-mute);
  letter-spacing: 1px;
  margin-bottom: 8px;
}

@media (max-width: 640px) {
  .diablo-hero-sub {
    font-size: 14px;
  }
}

/* 滚动指示器 */
.diablo-hero-scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  opacity: 0.4;
  transition: opacity var(--ease-base);
  animation: scrollBounce 2s ease-in-out infinite;
}

.diablo-hero-scroll:hover {
  opacity: 0.8;
}

.diablo-scroll-icon {
  width: 28px;
  height: 28px;
  color: var(--brand-gold);
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

/* ====== 首页紧凑小卡片行 ====== */
.diablo-mini-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background var(--ease-base);
}
.diablo-mini-card:hover {
  background: var(--fill-raised);
}

.diablo-main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 48px;
}
</style>
