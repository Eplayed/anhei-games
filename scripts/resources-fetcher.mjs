#!/usr/bin/env node
/**
 * resources-fetcher.mjs
 * 主入口：资源健康检查 + favicon补全，每月自动执行
 *
 * 用法：
 *   node scripts/resources-fetcher.mjs
 *
 * 阶段：
 *   1. 健康检查 — HEAD 请求检测 URL 存活，标记 isDead
 *   2. favicon补全 — 尝试补全缺失的 icon 字段
 *   3. 生成输出 — 重新写入 resources.js
 */

import { healthCheck, fetchFavicon, generateOutputFile, loadExistingResources, OUTPUT_FILE } from './resources-merger.mjs';

async function main() {
  console.log('=== 暗黑导航资源健康检查开始 ===');
  console.log('时间: ' + new Date().toISOString());

  // 读取现有资源数据
  var resources = loadExistingResources();
  console.log('现有资源: ' + resources.length + ' 条');

  if (resources.length === 0) {
    console.error('✗ 未读取到现有资源数据，退出');
    process.exit(1);
  }

  // 阶段1：健康检查
  var checkResult = await healthCheck(resources);
  resources = checkResult.resources;

  // 阶段2：favicon 补全
  resources = await fetchFavicon(resources);

  // 阶段3：更新 updateTime 为今天
  var today = new Date().toISOString().slice(0, 10);
  for (var i = 0; i < resources.length; i++) {
    if (!resources[i].isDead) {
      resources[i].updateTime = today;
    }
  }

  // 生成输出文件
  var output = generateOutputFile(resources);

  var fs = await import('fs');
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log('\n✓ 写入 ' + OUTPUT_FILE);
  console.log('  总计 ' + resources.length + ' 条资源');
  console.log('  存活 ' + checkResult.aliveCount + ' 条，失效 ' + checkResult.deadCount + ' 条');
  console.log('\n=== 完成 ===');
}

main().catch(function (err) {
  console.error('Fatal error:', err);
  process.exit(1);
});
