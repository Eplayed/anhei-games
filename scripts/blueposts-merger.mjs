/**
 * blueposts-merger.mjs
 * 暗黑破坏神蓝贴数据抓取、合并、去重模块
 *
 * 数据源：
 *   中文 HTML: d4.blizzard.cn/news/、d3.blizzard.cn/news/、d2.blizzard.cn/news/
 *   英文 API:  news.blizzard.com/en-us/api/news/diablo-{4,3,2-resurrected}
 *
 * 输出格式：
 *   { id, title, summary, url, publishTime, gameVersion, category }
 */

import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));
var OUTPUT_FILE = join(__dirname, '..', 'frontend', 'src', 'data', 'bluePosts.js');

// ===== 常量配置 =====

var HTTP_TIMEOUT = 15000;
var MAX_CN_PAGES = 3;

// 中文站点配置
var CN_SITES = [
  { gameVersion: 'D4', baseUrl: 'https://d4.blizzard.cn/news/' },
  { gameVersion: 'D3', baseUrl: 'https://d3.blizzard.cn/news/' },
  { gameVersion: 'D2', baseUrl: 'https://d2.blizzard.cn/news/' }
];

// 英文 API 配置
var EN_APIS = [
  { gameVersion: 'D4', url: 'https://news.blizzard.com/en-us/api/news/diablo-4' },
  { gameVersion: 'D3', url: 'https://news.blizzard.com/en-us/api/news/diablo-3' },
  { gameVersion: 'D2', url: 'https://news.blizzard.com/en-us/api/news/diablo-2-resurrected' }
];

// ===== HTTP 请求工具 =====

function httpGet(url, retries) {
  retries = retries || 1;
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    },
    signal: AbortSignal.timeout(HTTP_TIMEOUT)
  })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
      return res.text();
    })
    .catch(function (err) {
      if (retries > 0) {
        console.log('  retry ' + url + ' ...');
        return new Promise(function (resolve) { setTimeout(function() { resolve(); }, 2000); })
          .then(function () { return httpGet(url, retries - 1); });
      }
      throw err;
    });
}

// ===== 中文 HTML 解析 =====

function fetchCnSite(gameVersion, baseUrl) {
  var allItems = [];

  return (function fetchPage(pageNum) {
    var pageUrl = pageNum === 1 ? baseUrl : baseUrl.replace(/\/$/, '') + '/index_' + pageNum + '.html';
    console.log('  fetching CN ' + gameVersion + ' page ' + pageNum + ': ' + pageUrl);

    return httpGet(pageUrl)
      .then(function (html) {
        var $ = cheerio.load(html);
        var items = [];

        $('.list-data-container .item-box').each(function () {
          var el = $(this);
          var titleEl = el.find('.content-title');
          var dateEl = el.find('.content-date');
          var linkEl = el.find('a.fill-link');

          var title = titleEl.text().trim();
          var dateStr = dateEl.text().trim();
          var href = linkEl.attr('href') || '';

          if (!title || !href) return;

          var url = href;
          if (url.startsWith('/')) {
            url = 'https://' + new URL(baseUrl).host + url;
          }

          var articleId = extractArticleId(url, gameVersion);

          items.push({
            id: articleId,
            title: title,
            summary: '',
            url: url,
            publishTime: parseCnDate(dateStr),
            gameVersion: gameVersion,
            category: mapCategory(title, ''),
            source: 'cn'
          });
        });

        console.log('    found ' + items.length + ' items');
        allItems = allItems.concat(items);

        // 检查是否有下一页
        var hasNextPage = false;
        $('.page-data-container a').each(function () {
          var aText = $(this).text().trim();
          if (aText === '下一页' || aText === 'Next') hasNextPage = true;
        });

        if (hasNextPage && pageNum < MAX_CN_PAGES) {
          return fetchPage(pageNum + 1);
        }
        return allItems;
      });
  })(1)
    .catch(function (err) {
      console.error('  ERROR fetching CN ' + gameVersion + ': ' + err.message);
      return allItems;
    });
}

// ===== 英文 JSON API 抓取 =====
// 实际结构: { feed: { contentItems: [{ contentId, contentType, context: { locale }, properties: { title, category, newsUrl, ... } }] } }

function fetchEnApi(gameVersion, apiUrl) {
  console.log('  fetching EN API ' + gameVersion + ': ' + apiUrl);

  return httpGet(apiUrl)
    .then(function (text) {
      var data = JSON.parse(text);
      var items = [];

      // 正确解析：data.feed.contentItems[].properties
      var contentItems = (data.feed && data.feed.contentItems) || [];
      console.log('    API returned ' + contentItems.length + ' contentItems');

      for (var i = 0; i < contentItems.length; i++) {
        var ci = contentItems[i];
        var props = ci.properties || {};

        var title = props.title || '';
        var summary = props.summary || props.description || '';
        var url = props.newsUrl || props.url || '';
        var rawCategory = props.category || ci.contentType || '';
        var dateStr = props.lastUpdated || props.publishDate || props.createdDate || '';

        if (!title) continue;

        var articleId = extractArticleId(url, gameVersion);

        items.push({
          id: articleId,
          title: title,
          summary: summary,
          url: url,
          publishTime: parseEnDate(dateStr),
          gameVersion: gameVersion,
          category: mapEnCategory(rawCategory, title),
          source: 'en'
        });
      }

      console.log('    parsed ' + items.length + ' valid items');
      return items;
    })
    .catch(function (err) {
      console.error('  ERROR fetching EN API ' + gameVersion + ': ' + err.message);
      return [];
    });
}

// ===== 工具函数 =====

// 从 URL 提取文章 ID
function extractArticleId(url, gameVersion) {
  if (!url) return 'bp-' + gameVersion.toLowerCase() + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);

  // 尝试从路径中提取数字 ID（如 43086_1296479 或 24267729）
  var match = url.match(/(\d{5,})/);
  if (match) return 'bp-' + gameVersion.toLowerCase() + '-' + match[1];

  // 从路径末尾提取 slug
  var parts = url.replace(/\/$/, '').split('/');
  var slug = parts[parts.length - 1] || '';
  slug = slug.replace(/\.html$/i, '').replace(/^index_/, '');
  if (slug) return 'bp-' + gameVersion.toLowerCase() + '-' + slug;

  return 'bp-' + gameVersion.toLowerCase() + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

// 解析中文日期格式（2026-05-07 或 2026年5月7日）
function parseCnDate(dateStr) {
  if (!dateStr) return new Date().toISOString().slice(0, 10);

  var m = dateStr.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (m) {
    return m[1] + '-' + pad(m[2]) + '-' + pad(m[3]);
  }

  m = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})/);
  if (m) {
    return m[1] + '-' + pad(m[2]) + '-' + pad(m[3]);
  }

  return new Date().toISOString().slice(0, 10);
}

// 解析英文日期格式（ISO 8601）
function parseEnDate(dateStr) {
  if (!dateStr) return new Date().toISOString().slice(0, 10);

  var d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
}

function pad(n) {
  var s = String(n);
  return s.length < 2 ? '0' + s : s;
}

// ===== 分类映射 =====

// 中文标题关键词推断
function mapCategory(title, summary) {
  var text = (title + ' ' + summary).toLowerCase();

  if (text.indexOf('热修复') !== -1) return 'hotfix';
  if (text.indexOf('hotfix') !== -1) return 'hotfix';
  if (text.indexOf('补丁说明') !== -1) return 'patch';
  if (text.indexOf('补丁笔记') !== -1) return 'patch';
  if (text.indexOf('更新日志') !== -1) return 'patch';
  if (text.indexOf('patch') !== -1) return 'patch';
  if (text.indexOf('扩展包') !== -1) return 'expansion';
  if (text.indexOf('扩展内容') !== -1) return 'expansion';
  if (text.indexOf('君临') !== -1) return 'expansion';
  if (text.indexOf('expansion') !== -1) return 'expansion';
  if (text.indexOf('天梯') !== -1) return 'ladder';
  if (text.indexOf('赛季') !== -1) return 'season';
  if (text.indexOf('活动') !== -1) return 'event';
  if (text.indexOf('联动') !== -1) return 'event';
  if (text.indexOf('外观') !== -1) return 'event';
  if (text.indexOf('直播') !== -1) return 'event';
  if (text.indexOf('公告') !== -1) return 'announcement';
  if (text.indexOf('处罚') !== -1) return 'announcement';

  return 'announcement';
}

// 英文 API category 映射
function mapEnCategory(rawCategory, title) {
  var cat = (rawCategory || '').toLowerCase();
  var text = (title || '').toLowerCase();

  if (cat.indexOf('hotfix') !== -1) return 'hotfix';
  if (cat.indexOf('patch') !== -1 || cat.indexOf('update') !== -1) return 'patch';
  if (cat.indexOf('esport') !== -1) return 'event';
  if (cat.indexOf('ladder') !== -1) return 'ladder';
  if (cat.indexOf('season') !== -1) return 'season';
  if (cat.indexOf('blog') !== -1) return 'event';

  // 标题关键词兜底
  if (text.indexOf('hotfix') !== -1) return 'hotfix';
  if (text.indexOf('patch note') !== -1) return 'patch';
  if (text.indexOf('expansion') !== -1) return 'expansion';
  if (text.indexOf('season') !== -1) return 'season';
  if (text.indexOf('ladder') !== -1) return 'ladder';

  return 'announcement';
}

// ===== 数据合并去重 =====

function mergePosts(cnPosts, enPosts) {
  var postMap = {};

  // 1. 先放入英文数据
  for (var i = 0; i < enPosts.length; i++) {
    var ep = enPosts[i];
    var key = ep.gameVersion + '_' + ep.id;
    postMap[key] = ep;
  }

  // 2. 中文数据覆盖英文（中文优先）
  for (var j = 0; j < cnPosts.length; j++) {
    var cp = cnPosts[j];
    var cnKey = cp.gameVersion + '_' + cp.id;
    postMap[cnKey] = cp;
  }

  // 3. 读取现有数据，补充已有条目（90 天内）
  var existingPosts = loadExistingPosts();
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);

  for (var k = 0; k < existingPosts.length; k++) {
    var xp = existingPosts[k];
    var exKey = xp.gameVersion + '_' + xp.id;
    if (!postMap[exKey]) {
      var postDate = new Date(xp.publishTime);
      if (postDate >= cutoff) {
        postMap[exKey] = xp;
      }
    }
  }

  // 4. 转为数组并按日期降序排序
  var allPosts = [];
  for (var p in postMap) {
    allPosts.push(postMap[p]);
  }

  allPosts.sort(function (a, b) {
    return (b.publishTime || '').localeCompare(a.publishTime || '');
  });

  // 5. 按版本分组，每版本最多 30 条，总计不超过 80 条
  var grouped = { D4: [], D3: [], D2: [] };
  for (var m = 0; m < allPosts.length; m++) {
    var post = allPosts[m];
    var gv = post.gameVersion;
    if (grouped[gv] && grouped[gv].length < 30) {
      grouped[gv].push(post);
    }
  }

  var result = []
    .concat(grouped.D4 || [])
    .concat(grouped.D3 || [])
    .concat(grouped.D2 || []);

  if (result.length > 80) {
    result = result.slice(0, 80);
  }

  return result;
}

// 加载现有的 bluePosts.js 数据
function loadExistingPosts() {
  try {
    var content = readFileSync(OUTPUT_FILE, 'utf-8');
    // 提取数组内容并 eval 解析
    var match = content.match(/const\s+bluePosts\s*=\s*(\[[\s\S]*?\])\s*;?\s*$/m);
    if (match) {
      var arr = eval('(' + match[1] + ')');
      return Array.isArray(arr) ? arr : [];
    }
    return [];
  } catch (e) {
    console.log('  no existing bluePosts.js found, starting fresh');
    return [];
  }
}

// ===== 生成输出文件 =====

function generateOutputFile(posts) {
  var lines = [];
  lines.push('const bluePosts = [');

  var currentVersion = '';
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];

    // 版本分组注释
    if (post.gameVersion !== currentVersion) {
      if (currentVersion !== '') lines.push('');
      var versionNames = { D4: 'D4 暗黑破坏神4 最新蓝贴', D3: 'D3 暗黑破坏神3 最新蓝贴', D2: 'D2 暗黑破坏神2 重制版 最新蓝贴' };
      lines.push('  // ===== ' + (versionNames[post.gameVersion] || post.gameVersion) + ' =====');
      currentVersion = post.gameVersion;
    }

    var title = escapeJs(post.title);
    var summary = escapeJs(post.summary || '');
    var url = escapeJs(post.url);
    var id = escapeJs(post.id);
    var publishTime = escapeJs(post.publishTime);
    var gameVersion = escapeJs(post.gameVersion);
    var category = escapeJs(post.category);

    lines.push('  {');
    lines.push('    id: \'' + id + '\',');
    lines.push('    title: \'' + title + '\',');
    lines.push('    summary: \'' + summary + '\',');
    lines.push('    url: \'' + url + '\',');
    lines.push('    publishTime: \'' + publishTime + '\',');
    lines.push('    gameVersion: \'' + gameVersion + '\',');
    lines.push('    category: \'' + category + '\'');
    if (i < posts.length - 1) {
      lines.push('  },');
    } else {
      lines.push('  }');
    }
  }

  lines.push(']');
  lines.push('');
  lines.push('export { bluePosts }');
  lines.push('');

  return lines.join('\n');
}

function escapeJs(str) {
  return (str || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// ===== 导出公共接口 =====

export { fetchCnSite, fetchEnApi, mergePosts, generateOutputFile, loadExistingPosts, OUTPUT_FILE, CN_SITES, EN_APIS };
