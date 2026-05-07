/**
 * 常量定义
 * 包含应用级别的常量配置
 */

// 应用信息
export const APP_NAME = '魔兽世界玩家导航'
export const APP_DESCRIPTION = '魔兽世界玩家必备工具导航站'

// 主题色（与 tailwind.config.js 保持一致）
export const THEME_COLORS = {
  primary: '#1a365d',
  accent: '#f6ad55',
  darkBg: '#1a202c',
  darkCard: '#2d3748',
  darkText: '#e2e8f0'
}

// 搜索配置
export const SEARCH_DEBOUNCE_DELAY = 300 // 搜索防抖延迟（毫秒）

// 本地存储键名
export const STORAGE_KEYS = {
  favorites: 'wow-nav-favorites',
  theme: 'wow-nav-theme'
}

// 每页显示工具数量（未来分页使用）
export const PAGE_SIZE = 20

// 默认分类
export const DEFAULT_CATEGORY = 'common'
