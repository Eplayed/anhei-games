/**
 * 全局游戏版本状态
 * 模块级单例 — 所有组件共享同一份 currentVersion
 * 默认 D4，URL 同步 ?version=D4，localStorage 持久化
 * 主题驱动：切换版本时自动在 <html> 上设置 .theme-d2/.theme-d3/.theme-d4
 */
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

var currentVersion = ref('D4');
var initialized = false;

/* 背景图映射（使用 import.meta.env.BASE_URL 自动适配部署路径） */
var base = import.meta.env.BASE_URL;
var bgMap = {
  'D2': base + 'images/bg/d2-bg.jpeg',
  'D3': base + 'images/bg/d3-bg.jpg',
  'D4': base + 'images/bg/d4-bg.jpg'
};

/**
 * 设置 body 背景图
 */
function applyBackgroundImage(version) {
  var bgUrl = bgMap[version];
  if (bgUrl) {
    document.body.style.backgroundImage = 'url(' + bgUrl + ')';
  }
}

/**
 * 在 <html> 上设置主题 CSS 类，并触发过渡动画
 */
function applyThemeClass(version) {
  var root = document.documentElement;
  // 添加过渡动画类
  root.classList.add('theme-transition');
  // 切换主题类
  root.classList.remove('theme-d2', 'theme-d3', 'theme-d4');
  root.classList.add('theme-' + version.toLowerCase());
  // 切换背景图
  applyBackgroundImage(version);
  // 400ms 后移除过渡动画类，避免影响后续交互性能
  setTimeout(function () {
    root.classList.remove('theme-transition');
  }, 400);
}

export function useVersion() {
  var router = useRouter();
  var route = useRoute();

  if (!initialized) {
    initialized = true;

    // 1. 优先从 URL 读取版本
    var urlVersion = route.query.version;
    // 2. 其次从 localStorage 读取
    var savedVersion = localStorage.getItem('game-version');
    // 3. 默认 D4
    var initialVersion = urlVersion || savedVersion || 'D4';

    // 确保版本值合法
    if (initialVersion !== 'D2' && initialVersion !== 'D3' && initialVersion !== 'D4') {
      initialVersion = 'D4';
    }

    currentVersion.value = initialVersion;

    // 立即应用主题类（初始化时不需要过渡动画）
    var root = document.documentElement;
    root.classList.remove('theme-d2', 'theme-d3', 'theme-d4');
    root.classList.add('theme-' + initialVersion.toLowerCase());
    // 立即应用背景图
    applyBackgroundImage(initialVersion);

    // 清理旧的 theme-color localStorage key
    if (localStorage.getItem('theme-color')) {
      localStorage.removeItem('theme-color');
    }

    // 版本变化时同步到 URL + 主题 + localStorage
    watch(currentVersion, function (v) {
      // 同步 URL
      router.replace({
        query: Object.assign({}, route.query, { version: v })
      });
      // 同步主题类（带过渡动画）
      applyThemeClass(v);
      // 持久化到 localStorage
      localStorage.setItem('game-version', v);
    });
  }

  // 版本号到中文名的映射
  var versionName = {
    'D2': '暗黑破坏神2',
    'D3': '暗黑破坏神3',
    'D4': '暗黑破坏神4'
  };

  var currentVersionName = function () {
    return versionName[currentVersion.value] || currentVersion.value;
  };

  return {
    currentVersion: currentVersion,
    currentVersionName: currentVersionName
  };
}
