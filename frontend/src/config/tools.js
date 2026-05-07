/**
 * 工具链接数据配置
 * 包含所有导航工具的配置数据
 * 每个分类至少包含 5-10 个工具
 */
export const tools = [
  // ==================== 常用工具 (common) ====================
  {
    id: 1,
    name: 'Raider.IO',
    description: '大秘境与团本排行榜，查看角色成绩',
    url: 'https://raider.io',
    icon: 'https://raider.io/images/brand/favicon.ico',
    category: 'common',
    featured: true,
    tags: ['排行榜', '大秘境', '团本', '角色查询'],
    note: '需科学上网访问'
  },
  {
    id: 2,
    name: 'Warcraft Logs',
    description: '团队副本数据分析，查看战斗日志',
    url: 'https://www.warcraftlogs.com',
    icon: 'https://www.warcraftlogs.com/favicon.ico',
    category: 'common',
    featured: true,
    tags: ['日志', '数据分析', '团本'],
    note: '需科学上网访问'
  },
  {
    id: 3,
    name: 'Wowhead',
    description: '最全面的魔兽世界数据库和攻略站',
    url: 'https://www.wowhead.com',
    icon: 'https://www.wowhead.com/images/favicon.ico',
    category: 'common',
    featured: true,
    tags: ['数据库', '攻略', '任务'],
    note: ''
  },
  {
    id: 4,
    name: 'NGA 魔兽世界板块',
    description: '国内最大的魔兽世界玩家社区',
    url: 'https://bbs.nga.cn/thread.php?fid=-7',
    icon: '',
    category: 'common',
    featured: true,
    tags: ['论坛', '攻略', '社区'],
    note: ''
  },
  {
    id: 5,
    name: '魔兽世界官网',
    description: '暴雪官方魔兽世界网站',
    url: 'https://wow.blizzard.cn',
    icon: 'https://wow.blizzard.cn/favicon.ico',
    category: 'common',
    featured: true,
    tags: ['官方', '新闻', '下载'],
    note: ''
  },
  {
    id: 6,
    name: '178 魔兽世界',
    description: '国内权威魔兽世界资讯站',
    url: 'https://wow.178.com',
    icon: '',
    category: 'common',
    featured: false,
    tags: ['资讯', '攻略', '数据库'],
    note: ''
  },
  {
    id: 7,
    name: '魔兽橙装',
    description: '橙装属性查询和模拟',
    url: 'https://www.wow橙装.com',
    icon: '',
    category: 'common',
    featured: false,
    tags: ['橙装', '属性', '模拟'],
    note: '国服可用'
  },

  // ==================== 提升实力 (improve) ====================
  {
    id: 8,
    name: 'Icy Veins',
    description: '职业攻略、配装推荐、天赋模拟',
    url: 'https://www.icy-veins.com/wow/',
    icon: 'https://www.icy-veins.com/favicon.ico',
    category: 'improve',
    featured: true,
    tags: ['攻略', '配装', '天赋'],
    note: '需科学上网'
  },
  {
    id: 9,
    name: 'Wowhead 职业指南',
    description: '详细的职业攻略和配装指南',
    url: 'https://www.wowhead.com/guides/classes',
    icon: '',
    category: 'improve',
    featured: true,
    tags: ['职业', '攻略', '配装'],
    note: ''
  },
  {
    id: 10,
    name: 'SimulationCraft',
    description: '伤害模拟工具，优化你的配装',
    url: 'https://www.simulationcraft.org',
    icon: '',
    category: 'improve',
    featured: true,
    tags: ['模拟', '配装', 'DPS'],
    note: '需下载客户端'
  },
  {
    id: 11,
    name: 'Ask Mr. Robot',
    description: '配装优化和天赋推荐',
    url: 'https://www.askmrrobot.com',
    icon: '',
    category: 'improve',
    featured: false,
    tags: ['配装', '优化', '天赋'],
    note: '需科学上网'
  },
  {
    id: 12,
    name: 'WoW Analyzer',
    description: '战斗日志分析，提升输出手法',
    url: 'https://wowanalyzer.com',
    icon: '',
    category: 'improve',
    featured: false,
    tags: ['日志分析', '手法', '提升'],
    note: '开源项目'
  },
  {
    id: 13,
    name: 'Bloodmallet',
    description: '热门天赋模拟和数据图表',
    url: 'https://www.bloodmallet.com',
    icon: '',
    category: 'improve',
    featured: false,
    tags: ['天赋', '模拟', '数据'],
    note: ''
  },
  {
    id: 14,
    name: 'Archon',
    description: '团本战术规划和团队管理工具',
    url: 'https://archon.gg',
    icon: '',
    category: 'improve',
    featured: false,
    tags: ['团本', '战术', '团队'],
    note: '需科学上网'
  },

  // ==================== 大秘境 (mythic-plus) ====================
  {
    id: 15,
    name: 'Raider.IO M+',
    description: '大秘境成绩查询和排行榜',
    url: 'https://raider.io/mythic-plus',
    icon: '',
    category: 'mythic-plus',
    featured: true,
    tags: ['大秘境', '排行榜', '成绩'],
    note: ''
  },
  {
    id: 16,
    name: 'Keystone Hero',
    description: '大秘境词缀日历和路线推荐',
    url: 'https://keystone-heroes.com',
    icon: '',
    category: 'mythic-plus',
    featured: true,
    tags: ['词缀', '路线', '日历'],
    note: ''
  },
  {
    id: 17,
    name: 'M+ 路线指南',
    description: '各副本最优路线和战术',
    url: 'https://www.wowhead.com/guides/mythic-plus-dungeons',
    icon: '',
    category: 'mythic-plus',
    featured: false,
    tags: ['路线', '战术', '副本'],
    note: 'Wowhead 提供'
  },
  {
    id: 18,
    name: 'Mythic+ 词缀',
    description: '本周词缀查询和说明',
    url: 'https://mythicpl.us',
    icon: '',
    category: 'mythic-plus',
    featured: true,
    tags: ['词缀', '每周', '说明'],
    note: ''
  },
  {
    id: 19,
    name: 'Tanknotes',
    description: '大秘境坦克攻略和路线',
    url: 'https://tanknotes.com',
    icon: '',
    category: 'mythic-plus',
    featured: false,
    tags: ['坦克', '攻略', '路线'],
    note: '需科学上网'
  },
  {
    id: 20,
    name: 'Raider.IO 中国',
    description: 'Raider.IO 国内镜像站',
    url: 'https://cn.raider.io',
    icon: '',
    category: 'mythic-plus',
    featured: false,
    tags: ['大秘境', '排行榜', '镜像'],
    note: '国内可访问'
  },
  {
    id: 21,
    name: 'M+ 成绩模拟器',
    description: '计算你需要的 M+ 分数',
    url: 'https://wow-mplus-scores.com',
    icon: '',
    category: 'mythic-plus',
    featured: false,
    tags: ['分数', '计算', '模拟'],
    note: ''
  },

  // ==================== 插件工具 (addons) ====================
  {
    id: 22,
    name: 'CurseForge',
    description: '最大的魔兽世界插件下载平台',
    url: 'https://www.curseforge.com/wow/addons',
    icon: 'https://www.curseforge.com/favicon.ico',
    category: 'addons',
    featured: true,
    tags: ['插件', '下载', '管理'],
    note: '需科学上网'
  },
  {
    id: 23,
    name: 'WoWInterface',
    description: '老牌魔兽插件网站',
    url: 'https://www.wowinterface.com',
    icon: '',
    category: 'addons',
    featured: false,
    tags: ['插件', '下载', '经典'],
    note: '需科学上网'
  },
  {
    id: 24,
    name: 'ElvUI',
    description: '最受欢迎的界面替换插件',
    url: 'https://www.tukui.org',
    icon: '',
    category: 'addons',
    featured: true,
    tags: ['界面', 'ElvUI', '自定义'],
    note: ''
  },
  {
    id: 25,
    name: 'WeakAuras',
    description: '技能监控和提示插件',
    url: 'https://wago.io',
    icon: 'https://wago.io/favicon.ico',
    category: 'addons',
    featured: true,
    tags: ['WeakAuras', '监控', '提示'],
    note: '字符串分享平台'
  },
  {
    id: 26,
    name: 'Details!',
    description: '伤害统计插件',
    url: 'https://www.curseforge.com/wow/addons/details',
    icon: '',
    category: 'addons',
    featured: false,
    tags: ['伤害', '统计', 'DPS'],
    note: ''
  },
  {
    id: 27,
    name: 'Deadly Boss Mods',
    description: '副本报警插件（DBM）',
    url: 'https://www.deadlybossmods.net',
    icon: '',
    category: 'addons',
    featured: false,
    tags: ['DBM', '报警', '副本'],
    note: ''
  },
  {
    id: 28,
    name: 'BigWigs',
    description: '另一款流行的副本报警插件',
    url: 'https://www.curseforge.com/wow/addons/big-wigs',
    icon: '',
    category: 'addons',
    featured: false,
    tags: ['BigWigs', '报警', '副本'],
    note: 'DBM 替代品'
  },
  {
    id: 29,
    name: 'Auctionator',
    description: '拍卖行辅助插件',
    url: 'https://www.curseforge.com/wow/addons/auctionator',
    icon: '',
    category: 'addons',
    featured: false,
    tags: ['拍卖行', '经济', '购物'],
    note: ''
  },

  // ==================== 官方前瞻 (official) ====================
  {
    id: 30,
    name: '暴雪官方新闻',
    description: '魔兽世界官方新闻发布',
    url: 'https://news.blizzard.com/zh-cn/world-of-warcraft',
    icon: '',
    category: 'official',
    featured: true,
    tags: ['官方', '新闻', '公告'],
    note: ''
  },
  {
    id: 31,
    name: '蓝帖汇总',
    description: '官方论坛蓝帖翻译和汇总',
    url: 'https://bbs.nga.cn/thread.php?fid=-7',
    icon: '',
    category: 'official',
    featured: true,
    tags: ['蓝帖', '官方', '翻译'],
    note: 'NGA 版块'
  },
  {
    id: 32,
    name: '魔兽世界测试服',
    description: 'PTR 测试服信息和更新',
    url: 'https://www.wowhead.com/news/category/public-test-realm',
    icon: '',
    category: 'official',
    featured: false,
    tags: ['测试服', 'PTR', '前瞻'],
    note: 'Wowhead 提供'
  },
  {
    id: 33,
    name: '版本更新说明',
    description: '官方版本更新日志',
    url: 'https://worldofwarcraft.com/zh-cn/news',
    icon: '',
    category: 'official',
    featured: true,
    tags: ['更新', '补丁', '说明'],
    note: ''
  },
  {
    id: 34,
    name: '暴雪开发者访谈',
    description: '官方开发者问答和访谈',
    url: 'https://www.wowhead.com/news/category/interviews',
    icon: '',
    category: 'official',
    featured: false,
    tags: ['访谈', '开发者', '问答'],
    note: 'Wowhead 整理'
  },
  {
    id: 35,
    name: '魔兽世界 Twitter',
    description: '官方 Twitter 账号',
    url: 'https://twitter.com/warcraft',
    icon: '',
    category: 'official',
    featured: false,
    tags: ['Twitter', '官方', '社交'],
    note: '需科学上网'
  },

  // ==================== 社区论坛 (community) ====================
  {
    id: 36,
    name: 'NGA 艾泽拉斯',
    description: '国内最大魔兽社区，攻略讨论',
    url: 'https://bbs.nga.cn/thread.php?fid=-7',
    icon: '',
    category: 'community',
    featured: true,
    tags: ['论坛', '攻略', '讨论'],
    note: ''
  },
  {
    id: 37,
    name: 'Reddit r/wow',
    description: '国外最大魔兽社区',
    url: 'https://www.reddit.com/r/wow',
    icon: 'https://www.reddit.com/favicon.ico',
    category: 'community',
    featured: true,
    tags: ['Reddit', '社区', '讨论'],
    note: '需科学上网'
  },
  {
    id: 38,
    name: '魔兽世界贴吧',
    description: '百度魔兽世界吧',
    url: 'https://tieba.baidu.com/f?kw=%E9%AD%94%E5%85%BD%E4%B8%96%E7%95%8C',
    icon: '',
    category: 'community',
    featured: false,
    tags: ['贴吧', '社区', '讨论'],
    note: ''
  },
  {
    id: 39,
    name: 'Discord 社区',
    description: '魔兽世界 Discord 服务器列表',
    url: 'https://discord.com/invite/wow',
    icon: '',
    category: 'community',
    featured: false,
    tags: ['Discord', '聊天', '社区'],
    note: '需科学上网'
  },
  {
    id: 40,
    name: '风暴之怒论坛',
    description: '国内魔兽玩家社区',
    url: 'https://www.stormrage.cn',
    icon: '',
    category: 'community',
    featured: false,
    tags: ['论坛', '社区'],
    note: '需注册'
  },
  {
    id: 41,
    name: 'WoW Official Forums',
    description: '魔兽世界官方论坛',
    url: 'https://us.forums.blizzard.com/en/wow',
    icon: '',
    category: 'community',
    featured: false,
    tags: ['官方', '论坛', '讨论'],
    note: '需科学上网'
  },

  // ==================== 数据百科 (database) ====================
  {
    id: 42,
    name: 'Wowhead 数据库',
    description: '最全面的魔兽世界数据库',
    url: 'https://www.wowhead.com/database',
    icon: '',
    category: 'database',
    featured: true,
    tags: ['数据库', '物品', '任务', 'NPC'],
    note: '支持中文'
  },
  {
    id: 43,
    name: 'Wowpedia',
    description: '魔兽世界百科 Wiki',
    url: 'https://wowpedia.fandom.com',
    icon: '',
    category: 'database',
    featured: true,
    tags: ['百科', 'Wiki', '背景故事'],
    note: ''
  },
  {
    id: 44,
    name: '背包客工作室',
    description: '国服魔兽数据库',
    url: 'https://db.178.com',
    icon: '',
    category: 'database',
    featured: false,
    tags: ['数据库', '国服', '物品'],
    note: ''
  },
  {
    id: 45,
    name: '魔兽世界 API',
    description: '暴雪官方 API 文档',
    url: 'https://develop.battle.net',
    icon: '',
    category: 'database',
    featured: false,
    tags: ['API', '开发者', '数据'],
    note: '需申请 Key'
  },
  {
    id: 46,
    name: '成就查询',
    description: '查成就进度和攻略',
    url: 'https://www.wowhead.com/achievements',
    icon: '',
    category: 'database',
    featured: false,
    tags: ['成就', '查询', '攻略'],
    note: ''
  },
  {
    id: 47,
    name: '宠物对战数据库',
    description: '宠物对战数据和攻略',
    url: 'https://www.wow-petguide.com',
    icon: '',
    category: 'database',
    featured: false,
    tags: ['宠物', '对战', '数据'],
    note: '需科学上网'
  },

  // ==================== 休闲收藏 (casual) ====================
  {
    id: 48,
    name: '坐骑收集',
    description: '坐骑掉落查询和攻略',
    url: 'https://www.wowhead.com/mounts',
    icon: '',
    category: 'casual',
    featured: true,
    tags: ['坐骑', '掉落', '收藏'],
    note: 'Wowhead 提供'
  },
  {
    id: 49,
    name: '宠物对战',
    description: '宠物对战攻略和队伍配置',
    url: 'https://www.wow-petguide.com',
    icon: '',
    category: 'casual',
    featured: true,
    tags: ['宠物', '对战', '攻略'],
    note: ''
  },
  {
    id: 50,
    name: '幻化搭配',
    description: '幻化套装收集和预览',
    url: 'https://www.wowhead.com/lookalike-sets/appearances',
    icon: '',
    category: 'casual',
    featured: true,
    tags: ['幻化', '外观', '收藏'],
    note: 'Wowhead 提供'
  },
  {
    id: 51,
    name: '成就指南',
    description: '成就攻略和完成技巧',
    url: 'https://www.wowhead.com/achievements/guide',
    icon: '',
    category: 'casual',
    featured: false,
    tags: ['成就', '攻略', '技巧'],
    note: ''
  },
  {
    id: 52,
    name: '玩具收集',
    description: '玩具盒物品收集和效果',
    url: 'https://www.wowhead.com/items/type:toy',
    icon: '',
    category: 'casual',
    featured: false,
    tags: ['玩具', '收集', '效果'],
    note: ''
  },
  {
    id: 53,
    name: '传家宝查询',
    description: '传家宝列表和获取方式',
    url: 'https://www.wowhead.com/items/quality:7',
    icon: '',
    category: 'casual',
    featured: false,
    tags: ['传家宝', '升级', '新手'],
    note: ''
  },
  {
    id: 54,
    name: '外观收藏',
    description: '全外观收集进度查询',
    url: 'https://simplearmory.com',
    icon: '',
    category: 'casual',
    featured: false,
    tags: ['外观', '收藏', '进度'],
    note: '需输入角色名'
  },
  {
    id: 55,
    name: '公会查找器',
    description: '寻找适合自己的公会',
    url: 'https://worldofwarcraft.com/zh-cn/guild/finder',
    icon: '',
    category: 'casual',
    featured: false,
    tags: ['公会', '社交', '查找'],
    note: '官方工具'
  }
]

/**
 * 根据分类 id 获取工具列表
 * @param {string} categoryId - 分类 ID
 * @returns {Array} 工具列表
 */
export function getToolsByCategory(categoryId) {
  if (categoryId === 'all') return tools
  return tools.filter(tool => tool.category === categoryId)
}

/**
 * 根据 ID 获取单个工具
 * @param {number} id - 工具 ID
 * @returns {Object|null} 工具对象
 */
export function getToolById(id) {
  return tools.find(tool => tool.id === id) || null
}

/**
 * 搜索工具（名称、描述、标签）
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的工具列表
 */
export function searchTools(query) {
  if (!query || !query.trim()) return tools

  const lowerQuery = query.toLowerCase().trim()
  return tools.filter(tool => {
    return (
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  })
}

/**
 * 获取推荐工具（featured = true）
 * @returns {Array} 推荐工具列表
 */
export function getFeaturedTools() {
  return tools.filter(tool => tool.featured)
}
