/**
 * resources-merger.mjs
 * 暗黑导航资源健康检查、favicon补全、输出模块
 *
 * 功能：
 *   1. healthCheck() — 逐个 HEAD 请求检测 URL 存活
 *   2. fetchFavicon() — 补全缺失的 icon 字段
 *   3. generateOutputFile() — 重新生成 resources.js
 *   4. loadExistingResources() — 读取现有资源数据
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));
var OUTPUT_FILE = join(__dirname, '..', 'frontend', 'src', 'data', 'resources.js');

// ===== 常量配置 =====

var HTTP_TIMEOUT = 8000;
var CONCURRENT_LIMIT = 10; // 并发检测上限

// ===== HTTP 请求工具 =====

function httpHead(url, retries) {
  retries = retries || 0;
  return fetch(url, {
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    signal: AbortSignal.timeout(HTTP_TIMEOUT),
    redirect: 'follow'
  })
    .then(function (res) {
      return { url: url, ok: res.ok, status: res.status };
    })
    .catch(function (err) {
      if (retries > 0) {
        return new Promise(function (resolve) {
          setTimeout(function () { resolve(); }, 1000);
        }).then(function () { return httpHead(url, retries - 1); });
      }
      return { url: url, ok: false, status: 0, error: err.message };
    });
}

// 限制并发数的批量请求
function batchHeads(urls, limit) {
  limit = limit || CONCURRENT_LIMIT;
  var results = [];
  var index = 0;

  function next() {
    if (index >= urls.length) return Promise.resolve();
    var current = index++;
    return httpHead(urls[current].url).then(function (res) {
      results.push(Object.assign({}, urls[current], { result: res }));
      return next();
    });
  }

  var workers = [];
  for (var i = 0; i < Math.min(limit, urls.length); i++) {
    workers.push(next());
  }

  return Promise.all(workers).then(function () { return results; });
}

// ===== 阶段1：健康检查 =====

function healthCheck(resources) {
  console.log('\n--- 阶段1：URL 健康检查 (' + resources.length + ' 条) ---');

  var items = resources.map(function (r) {
    return { id: r.id, url: r.url, name: r.name };
  });

  return batchHeads(items).then(function (results) {
    var dead = [];
    var alive = [];

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      if (r.result.ok) {
        alive.push(r.id);
      } else {
        // 403 通常意味着服务器存在但拒绝 HEAD 请求，不应标记为 dead
        // 429 是限流，也不应标记为 dead
        var status = r.result.status;
        if (status === 403 || status === 429 || status === 401) {
          alive.push(r.id);
        } else {
          dead.push({ id: r.id, name: r.name, url: r.url, status: status || 'timeout/error' });
        }
      }
    }

    console.log('  ✓ 存活: ' + alive.length + ' 条');
    console.log('  ✗ 失效: ' + dead.length + ' 条');

    if (dead.length > 0) {
      for (var j = 0; j < dead.length; j++) {
        console.log('    - [' + dead[j].status + '] ' + dead[j].name + ' (' + dead[j].url + ')');
      }
    }

    // 标记 dead 条目
    var deadIds = {};
    for (var k = 0; k < dead.length; k++) {
      deadIds[dead[k].id] = true;
    }

    var updated = resources.map(function (r) {
      var copy = Object.assign({}, r);
      if (deadIds[r.id]) {
        copy.isDead = true;
      } else {
        delete copy.isDead;
      }
      return copy;
    });

    return { resources: updated, deadCount: dead.length, aliveCount: alive.length };
  });
}

// ===== 阶段2：favicon 补全 =====

function fetchFavicon(resources) {
  console.log('\n--- 阶段2：favicon 补全 ---');

  var missing = resources.filter(function (r) {
    return !r.icon && !r.isDead;
  });

  console.log('  缺失 icon: ' + missing.length + ' 条');

  if (missing.length === 0) {
    return Promise.resolve(resources);
  }

  var faviconItems = missing.map(function (r) {
    try {
      var u = new URL(r.url);
      return { id: r.id, url: u.origin + '/favicon.ico' };
    } catch (e) {
      return null;
    }
  }).filter(Boolean);

  return batchHeads(faviconItems).then(function (results) {
    var filled = 0;
    var faviconMap = {};

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      if (r.result.ok && r.result.status === 200) {
        faviconMap[r.id] = r.url;
        filled++;
      }
    }

    console.log('  ✓ 补全: ' + filled + ' 条');

    var updated = resources.map(function (r) {
      if (faviconMap[r.id]) {
        return Object.assign({}, r, { icon: faviconMap[r.id] });
      }
      return r;
    });

    return updated;
  });
}

// ===== 加载现有资源数据 =====

function loadExistingResources() {
  try {
    var content = readFileSync(OUTPUT_FILE, 'utf-8');
    // 匹配 const resources = [...]; 到文件末尾
    var match = content.match(/const\s+resources\s*=\s*(\[[\s\S]*?\]);?\s*$/);
    if (match) {
      var arr = eval('(' + match[1] + ')');
      return Array.isArray(arr) ? arr : [];
    }
    return [];
  } catch (e) {
    console.log('  no existing resources.js found, starting fresh');
    return [];
  }
}

// ===== 生成输出文件 =====

function generateOutputFile(resources) {
  var lines = [];
  lines.push('// 资源数据 - 攻略社区、工具集合');
  lines.push('export const resources = [');

  var currentSection = '';
  var sectionOrder = { D4: 0, D3: 1, D2: 2, ALL: 3 };
  var categoryOrder = { guide: 0, tool: 1 };

  // 按 gameVersion + category 分组排序
  var sorted = resources.slice().sort(function (a, b) {
    var va = sectionOrder[a.gameVersion] !== undefined ? sectionOrder[a.gameVersion] : 9;
    var vb = sectionOrder[b.gameVersion] !== undefined ? sectionOrder[b.gameVersion] : 9;
    if (va !== vb) return va - vb;
    var ca = categoryOrder[a.category] !== undefined ? categoryOrder[a.category] : 9;
    var cb = categoryOrder[b.category] !== undefined ? categoryOrder[b.category] : 9;
    if (ca !== cb) return ca - cb;
    return (a.name || '').localeCompare(b.name || '');
  });

  for (var i = 0; i < sorted.length; i++) {
    var r = sorted[i];
    var section = r.gameVersion + '_' + r.category;

    if (section !== currentSection) {
      if (currentSection !== '') lines.push('');
      var versionNames = { D4: 'Diablo 4', D3: 'Diablo 3', D2: 'Diablo 2', ALL: '全系列' };
      var categoryNames = { guide: '攻略', tool: '工具' };
      var vName = versionNames[r.gameVersion] || r.gameVersion;
      var cName = categoryNames[r.category] || r.category;
      lines.push('  // ==================== ' + vName + ' ' + cName + ' ====================');
      currentSection = section;
    }

    lines.push('  {');
    lines.push("    id: '" + escapeJs(r.id) + "',");
    lines.push("    name: '" + escapeJs(r.name) + "',");
    lines.push("    description: '" + escapeJs(r.description) + "',");
    lines.push("    url: '" + escapeJs(r.url) + "',");
    lines.push("    category: '" + escapeJs(r.category) + "',");
    lines.push("    gameVersion: '" + escapeJs(r.gameVersion) + "',");

    // tags 数组
    var tagsStr = r.tags.map(function (t) { return "'" + escapeJs(t) + "'"; }).join(', ');
    lines.push('    tags: [' + tagsStr + '],');

    lines.push("    icon: '" + escapeJs(r.icon || '') + "',");
    lines.push('    isHot: ' + (r.isHot ? 'true' : 'false') + ',');

    if (r.isDead) {
      lines.push('    isDead: true,');
    }

    lines.push("    updateTime: '" + escapeJs(r.updateTime || new Date().toISOString().slice(0, 10)) + "'");

    if (i < sorted.length - 1) {
      lines.push('  },');
    } else {
      lines.push('  }');
    }
  }

  lines.push('];');
  lines.push('');

  return lines.join('\n');
}

function escapeJs(str) {
  return (str || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// ===== 导出公共接口 =====

export {
  healthCheck,
  fetchFavicon,
  generateOutputFile,
  loadExistingResources,
  OUTPUT_FILE
};
