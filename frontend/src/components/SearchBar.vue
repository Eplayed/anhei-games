<template>
  <div class="search-module">
    <!-- 搜索引擎切换 -->
    <div class="engine-tabs">
      <button
        v-for="engine in engines"
        :key="engine.id"
        class="engine-tab"
        :class="{ active: currentEngine === engine.id }"
        @click="currentEngine = engine.id"
      >
        {{ engine.name }}
      </button>
    </div>

    <!-- 搜索表单 -->
    <form class="search-form" @submit.prevent="doSearch">
      <input
        ref="searchInput"
        v-model="query"
        type="text"
        class="search-input"
        :placeholder="currentEngineObj.placeholder"
        @keydown.enter="doSearch"
      />
      <button type="submit" class="search-btn">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="search-btn-text">搜索</span>
      </button>
    </form>

    <!-- 快捷入口 -->
    <div class="quick-links">
      <a
        v-for="link in quickLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="quick-link"
        :title="link.name"
      >
        <span class="quick-icon" v-html="link.icon"></span>
        <span class="quick-label">{{ link.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// ===== 搜索引擎配置 =====
var engines = [
  { id: 'baidu', name: '百度', placeholder: '搜索互联网，或输入网址', url: 'https://www.baidu.com/s?wd=' },
  { id: 'bing', name: 'Bing', placeholder: '搜索互联网，或输入网址', url: 'https://www.bing.com/search?q=' },
  { id: 'google', name: 'Google', placeholder: '搜索互联网，或输入网址', url: 'https://www.google.com/search?q=' }
];

var currentEngine = ref('baidu');

var currentEngineObj = computed(function () {
  return engines.find(function (e) { return e.id === currentEngine.value }) || engines[0];
});

var query = ref('');

var doSearch = function () {
  var keyword = query.value.trim();
  if (!keyword) return;

  // 如果是网址则直接跳转
  if (/^https?:\/\//.test(keyword) || /^www\./.test(keyword) || /^[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}/.test(keyword)) {
    var href = keyword.indexOf('http') === 0 ? keyword : 'http://' + keyword;
    window.open(href, '_blank');
    return;
  }

  // 否则用搜索引擎搜索
  window.open(currentEngineObj.value.url + encodeURIComponent(keyword), '_blank');
};

// ===== 快捷入口配置 =====
var quickLinks = [
  {
    name: '地图',
    url: 'https://map.baidu.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
  },
  {
    name: '翻译',
    url: 'https://fanyi.baidu.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>'
  },
  {
    name: '图片',
    url: 'https://image.baidu.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg>'
  },
  {
    name: '新闻',
    url: 'https://news.baidu.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>'
  },
  {
    name: '微博',
    url: 'https://weibo.com',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm-1.375-7.181c-2.558.252-4.471 1.869-4.278 3.609.196 1.741 2.413 2.881 4.971 2.629 2.556-.25 4.471-1.868 4.275-3.609-.193-1.742-2.41-2.882-4.968-2.629zm.744 3.582c-.555.566-1.542.777-2.243.477-.696-.3-.827-1.03-.271-1.594.549-.563 1.508-.77 2.203-.479.7.297.871 1.031.311 1.596zm.959-1.744c-.207.208-.575.29-.795.178-.216-.108-.27-.36-.063-.57.207-.208.563-.292.779-.178.222.108.284.359.079.57zM18.5 7.625l1.463 1.463a.375.375 0 01-.266.641h-.878a.376.376 0 01-.266-.11l-.548-.548a.376.376 0 01-.11-.266V7.925a.376.376 0 01.641-.266l-.036-.034zM17.5 5l1.463 1.463a.375.375 0 01-.266.641h-.878a.376.376 0 01-.266-.11l-.548-.548a.376.376 0 01-.11-.266V5.325a.376.376 0 01.641-.266L17.5 5zm-.625 2.375L19.338 8.8a.375.375 0 01-.266.641h-.878a.376.376 0 01-.266-.11l-2.463-2.463a.376.376 0 01-.11-.266V5.725a.376.376 0 01.641-.266l.059.053.625.625a.376.376 0 01.11.266v.714a.376.376 0 00.375.376h.714a.376.376 0 01.266.11l-.002-.128z"/></svg>'
  },
  {
    name: '小红书',
    url: 'https://www.xiaohongshu.com',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5h-3l1.5-2.5-2 1.2L12 6l-1 2.2-2-1.2L10.5 9.5h-3v5h2v3.5h1V14.5h3v3.5h1V14.5h2v-5z"/></svg>'
  },
  {
    name: 'B站',
    url: 'https://www.bilibili.com',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 01.16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>'
  },
  {
    name: '豆包',
    url: 'https://www.doubao.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
  }
];
</script>

<style scoped>
.search-module {
  width: 100%;
}

/* ===== 搜索引擎切换 ===== */
.engine-tabs {
  display: flex;
  gap: 2px;
  margin-bottom: -1px;
  padding-left: 4px;
  position: relative;
  z-index: 2;
}

.engine-tab {
  padding: 6px 18px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-body, system-ui);
  color: var(--ink-mute);
  background: var(--canvas-deep, #0a0a0f);
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: var(--radius-sm, 4px) var(--radius-sm, 4px) 0 0;
  cursor: pointer;
  transition: all var(--ease-micro, 150ms ease);
  letter-spacing: 0.5px;
}

.engine-tab:hover {
  color: var(--ink-body, #c8c5be);
}

.engine-tab.active {
  color: var(--brand-gold, #c8860a);
  background: var(--canvas-base, #14131c);
  border-color: var(--hairline, rgba(200, 134, 10, 0.2));
  border-bottom-color: var(--canvas-base, #14131c);
}

/* ===== 搜索表单 ===== */
.search-form {
  display: flex;
  align-items: stretch;
  background: var(--canvas-base, #14131c);
  border: 1px solid var(--hairline, rgba(200, 134, 10, 0.2));
  border-radius: var(--radius-sm, 4px);
  overflow: hidden;
  transition: border-color var(--ease-base, 200ms ease), box-shadow var(--ease-base, 200ms ease), transform 0.2s ease;
}

.search-form:focus-within {
  border-color: var(--hairline-glow, rgba(200, 134, 10, 0.6));
  box-shadow: 0 0 12px var(--hairline), inset 0 0 6px var(--hairline);
  transform: scale(1.01);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--ink-body, #c8c5be);
  padding: 12px 16px;
  font: var(--body-md, 400 14px/1.6 system-ui);
  outline: none;
  min-width: 0;
}

.search-input::placeholder {
  color: var(--ink-ash, #3a3835);
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(180deg, var(--brand-gold, #c8860a), var(--brand-gold-dim, #8b6914));
  color: var(--ink-on-gold, #1a1508);
  border: 1px solid var(--brand-gold-bright, #f0a030);
  font: var(--button, 700 13px/1 system-ui);
  letter-spacing: 1px;
  cursor: pointer;
  transition: all var(--ease-base, 200ms ease);
  flex-shrink: 0;
}

.search-btn:hover {
  background: linear-gradient(180deg, var(--brand-gold-bright, #f0a030), var(--brand-gold, #c8860a));
  box-shadow: 0 0 12px var(--hairline);
}

.search-btn:active {
  background: linear-gradient(180deg, var(--brand-gold-dim, #8b6914), var(--brand-gold-dim, #8b6914));
}

.search-icon {
  width: 16px;
  height: 16px;
}

.search-btn-text {
  white-space: nowrap;
}

/* ===== 快捷入口 ===== */
.quick-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--canvas-raised, #282734);
  border: 1px solid var(--hairline, rgba(200, 134, 10, 0.2));
  border-radius: var(--radius-sm, 4px);
  color: var(--ink-mute, #8a8780);
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  transition: all var(--ease-micro, 150ms ease);
  cursor: pointer;
}

.quick-link:hover {
  color: var(--brand-gold, #c8860a);
  border-color: var(--hairline-bright, rgba(200, 134, 10, 0.4));
  background: var(--canvas-mid, #1e1d28);
}

.quick-icon {
  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;
}

.quick-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.quick-label {
  white-space: nowrap;
}

/* ===== 响应式 ===== */
@media (max-width: 480px) {
  .search-btn-text {
    display: none;
  }
  .search-btn {
    padding: 10px 14px;
  }
  .quick-link {
    padding: 5px 10px;
    font-size: 11px;
  }
  .engine-tab {
    padding: 5px 12px;
    font-size: 12px;
  }
}
</style>
