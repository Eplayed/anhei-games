#!/usr/bin/env node
/**
 * blueposts-fetcher.mjs
 * 主入口：并行抓取6个数据源，合并去重，写入 bluePosts.js
 *
 * 用法：
 *   node scripts/blueposts-fetcher.mjs
 */

import { fetchCnSite, fetchEnApi, mergePosts, generateOutputFile, OUTPUT_FILE } from './blueposts-merger.mjs';

var CN_SITES = [
  { gameVersion: 'D4', baseUrl: 'https://d4.blizzard.cn/news/' },
  { gameVersion: 'D3', baseUrl: 'https://d3.blizzard.cn/news/' },
  { gameVersion: 'D2', baseUrl: 'https://d2.blizzard.cn/news/' }
];

var EN_APIS = [
  { gameVersion: 'D4', url: 'https://news.blizzard.com/en-us/api/news/diablo-4' },
  { gameVersion: 'D3', url: 'https://news.blizzard.com/en-us/api/news/diablo-3' },
  { gameVersion: 'D2', url: 'https://news.blizzard.com/en-us/api/news/diablo-2-resurrected' }
];

async function main() {
  console.log('=== 暗黑破坏神蓝贴自动抓取开始 ===');
  console.log('时间: ' + new Date().toISOString());

  var cnPosts = [];
  var enPosts = [];

  // 并行抓取中文站点
  console.log('\n--- 抓取中文站点 ---');
  var cnPromises = CN_SITES.map(function (site) {
    return fetchCnSite(site.gameVersion, site.baseUrl)
      .then(function (posts) {
        cnPosts = cnPosts.concat(posts);
        console.log('  ✓ ' + site.gameVersion + ' CN: ' + posts.length + ' items');
      })
      .catch(function (err) {
        console.error('  ✗ ' + site.gameVersion + ' CN failed: ' + err.message);
      });
  });

  // 并行抓取英文 API
  console.log('\n--- 抓取英文 API ---');
  var enPromises = EN_APIS.map(function (api) {
    return fetchEnApi(api.gameVersion, api.url)
      .then(function (posts) {
        enPosts = enPosts.concat(posts);
        console.log('  ✓ ' + api.gameVersion + ' EN: ' + posts.length + ' items');
      })
      .catch(function (err) {
        console.error('  ✗ ' + api.gameVersion + ' EN failed: ' + err.message);
      });
  });

  // 等待所有抓取完成
  await Promise.all(cnPromises.concat(enPromises));

  console.log('\n--- 合并去重 ---');
  console.log('CN total: ' + cnPosts.length + ', EN total: ' + enPosts.length);

  var merged = mergePosts(cnPosts, enPosts);
  console.log('Merged total: ' + merged.length + ' posts');

  if (merged.length === 0) {
    console.error('\n✗ 所有数据源均失败，保留现有数据，不写入文件');
    process.exit(1);
  }

  // 生成输出文件
  var output = generateOutputFile(merged);

  var fs = await import('fs');
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log('\n✓ 写入 ' + OUTPUT_FILE);
  console.log('  共 ' + merged.length + ' 条蓝贴');
  console.log('\n=== 完成 ===');
}

main().catch(function (err) {
  console.error('Fatal error:', err);
  process.exit(1);
});
