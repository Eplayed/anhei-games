/**
 * 全局游戏版本状态
 * 模块级单例 — 所有组件共享同一份 currentVersion
 * 默认 D4，URL 同步 ?version=D4
 */
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

var currentVersion = ref('D4');
var initialized = false;

export function useVersion() {
  var router = useRouter();
  var route = useRoute();

  if (!initialized) {
    initialized = true;
    // 首次从 URL 读取版本
    if (route.query.version) {
      currentVersion.value = route.query.version;
    }
    // 版本变化时同步到 URL（不触发页面导航）
    watch(currentVersion, function (v) {
      router.replace({
        query: Object.assign({}, route.query, { version: v })
      });
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
