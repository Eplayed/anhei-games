/**
 * 8大分类配置
 * 对应魔兽世界玩家导航站的核心分类
 */
export const categories = [
  {
    id: 'common',
    name: '常用工具',
    icon: 'Promotion', // Element Plus 图标名称
    description: '玩家最常用的工具和网站'
  },
  {
    id: 'improve',
    name: '提升实力',
    icon: 'TrendCharts',
    description: '攻略、配装、数据分析'
  },
  {
    id: 'mythic-plus',
    name: '大秘境',
    icon: 'DataBoard',
    description: 'M+成绩查询、路线规划'
  },
  {
    id: 'addons',
    name: '插件工具',
    icon: 'SetUp',
    description: '插件下载与管理'
  },
  {
    id: 'official',
    name: '官方前瞻',
    icon: 'Bell',
    description: '官方资讯获取'
  },
  {
    id: 'community',
    name: '社区论坛',
    icon: 'ChatDotRound',
    description: '社区讨论交流'
  },
  {
    id: 'database',
    name: '数据百科',
    icon: 'Notebook',
    description: '游戏数据库'
  },
  {
    id: 'casual',
    name: '休闲收藏',
    icon: 'Star',
    description: '成就、宠物、坐骑'
  }
]

// 根据 id 获取分类
export function getCategoryById(id) {
  return categories.find(cat => cat.id === id) || null
}

// 获取所有分类 id
export function getCategoryIds() {
  return categories.map(cat => cat.id)
}
