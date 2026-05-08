const bluePosts = [
  // ===== D4 暗黑破坏神4 最新蓝贴 =====
  {
    id: 'bp-d4-20260507',
    title: '热修复 7：重新启用无尽怒气 aspect',
    summary: '修复了无尽怒气 aspect 无限缩放 bug，现已在 3.0.1 版本中重新启用该 aspect。',
    url: 'https://news.blizzard.com/en-us/article/24271857/',
    publishTime: '2026-05-07',
    gameVersion: 'D4',
    category: 'hotfix'
  },
  {
    id: 'bp-d4-20260506',
    title: '热修复 6：修复圣骑士免费试玩崩溃问题',
    summary: '修复了在 Battle.net 上使用圣骑士免费试玩时可能出现的崩溃问题。',
    url: 'https://news.blizzard.com/en-us/article/24271857/',
    publishTime: '2026-05-06',
    gameVersion: 'D4',
    category: 'hotfix'
  },
  {
    id: 'bp-d4-20260505',
    title: '热修复 5：修复多个无限刷取 bug',
    summary: '修复了 Choron 灵魂无限升级 glyphs、无限刷取传奇物品（冰霜之外 & Astaroth 战争计划节点）以及无尽怒气 aspect 无限缩放等多个 bug。',
    url: 'https://news.blizzard.com/en-us/article/24271857/',
    publishTime: '2026-05-05',
    gameVersion: 'D4',
    category: 'hotfix'
  },
  {
    id: 'bp-d4-20260430b',
    title: '《暗黑破坏神Ⅳ》× 闪迪推出联合礼盒',
    summary: '携手闪迪奥丁马仕固态硬盘打造限定联名装备。',
    url: 'https://d4.blizzard.cn/news/20260430/43086_1298562.html',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'event'
  },
  {
    id: 'bp-d4-20260430a',
    title: '「中国神话」系列外观现已上线',
    summary: '国服专属活动，满级即送圣骑士限定皮肤"九天玄女"，活动进行中。',
    url: 'https://d4.blizzard.cn/h5/20260428/luckydraw/?channel=gw',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'event'
  },
  {
    id: 'bp-d4-20260430',
    title: '"憎恨之王"扩展内容全球同步上线',
    summary: '与墨菲斯托的终极清算，憎恨之王扩展包 4月28日 正式登陆国服，国服限时免费领取已开启。',
    url: 'https://d4.blizzard.cn/news/24267729/index.html',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'expansion'
  },
  {
    id: 'bp-d4-20260429',
    title: '网鱼 x NVIDIA x 《暗黑破坏神Ⅳ》联动开启',
    summary: '4/28-5/17 活动期间，在指定网鱼网咖可领取绝版双手斧外观"竞争者之傲"，4城主题店同步开放。',
    url: 'https://d4.blizzard.cn/news/20260429/43086_1298498.html',
    publishTime: '2026-04-29',
    gameVersion: 'D4',
    category: 'event'
  },
  {
    id: 'bp-d4-20260428',
    title: '直播掉宝多平台上线',
    summary: '4/28-5/28 期间在抖音/斗鱼/虎牙绑定账号并观看暗黑破坏神Ⅳ直播/短视频，即可领取限定道具奖励。',
    url: 'https://d4.blizzard.cn/news/20260428/43086_1298235.html',
    publishTime: '2026-04-28',
    gameVersion: 'D4',
    category: 'event'
  },
  {
    id: 'bp-d4-20260424',
    title: '《暗黑破坏神 IV》v3.0.1 补丁说明',
    summary: '憎恨之王扩展包上线后的首个正式补丁，包含职业平衡调整、战争计划改动和大量 bug 修复。',
    url: 'https://d4.blizzard.cn/news/24271857/index.html',
    publishTime: '2026-04-24',
    gameVersion: 'D4',
    category: 'patch'
  },

  // ===== D3 暗黑破坏神3 最新蓝贴 =====
  {
    id: 'bp-d3-20260318',
    title: '第38赛季"无形之忆"3月27日开启',
    summary: '第38赛季"无形之忆"将于2026年3月27日正式开启，带来全新赛季主题和征服者成就。',
    url: 'https://d3.blizzard.cn/news/',
    publishTime: '2026-03-18',
    gameVersion: 'D3',
    category: 'season'
  },

  // ===== D2 暗黑破坏神2 重制版 最新蓝贴 =====
  {
    id: 'bp-d2-20260405',
    title: '国服环境净化处罚公告（4月5日更新）',
    summary: '针对国服中违规行为的处罚公告，持续维护游戏环境公平性。',
    url: 'https://d2.blizzard.cn/news/20260203/42929_1285202.html',
    publishTime: '2026-04-05',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-20260404',
    title: '术士君临 - 3.1.2 补丁说明',
    summary: '"术士君临"扩展包的最新补丁，包含术士职业平衡调整和恐怖区域更新。',
    url: 'https://d2.blizzard.cn/news/24271875/index.html',
    publishTime: '2026-04-04',
    gameVersion: 'D2',
    category: 'patch'
  },
  {
    id: 'bp-d2-20260212b',
    title: '在"术士君临"中倾泻湮灭之力',
    summary: '介绍全新术士职业的技能体系和玩法特色，以及扩展包的核心终局内容。',
    url: 'https://d2.blizzard.cn/news/24243863/index.html',
    publishTime: '2026-02-12',
    gameVersion: 'D2',
    category: 'expansion'
  },
  {
    id: 'bp-d2-20260212',
    title: '"术士君临"游戏扩展包正式上线',
    summary: '《暗黑破坏神2》重制版首个付费扩展包"术士君临"上线，带来全新职业术士及海量内容。',
    url: 'https://d2.blizzard.cn/news/262126142/index.html',
    publishTime: '2026-02-12',
    gameVersion: 'D2',
    category: 'expansion'
  },
  {
    id: 'bp-d2-20260209',
    title: '天梯第13赛季现已开启',
    summary: '《暗黑破坏神2》重制版天梯第13赛季于2月20日正式开始，这是"术士君临"扩展包后的首个天梯赛季。',
    url: 'https://d2.blizzard.cn/news/24246296/index.html',
    publishTime: '2026-02-09',
    gameVersion: 'D2',
    category: 'ladder'
  }
]

export { bluePosts }
