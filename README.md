# 暗黑系游戏导航站 (Anhei Games)

> 暗黑破坏神系列游戏导航站，覆盖 D2/D3/D4，提供攻略、工具、新闻一站式入口。

## 🌐 在线访问

**GitHub Pages 线上地址：**
👉 **https://eplayed.github.io/anhei-games/**

---

## ✨ 功能特性

- 🎮 **多版本切换** — D2 / D3 / D4 三套独立主题，一键切换
- 🔍 **智能搜索** — 支持百度 / Bing / Google 多引擎切换
- 📰 **蓝贴速递** — 自动同步暴雪官方蓝贴
- 📅 **事件倒计时** — D4 世界 Boss / 军团事件 / 地狱狂潮实时倒计时
- ⭐ **收藏系统** — 本地收藏喜欢的攻略和工具
- 🎨 **暗黑哥特风** — 三套版本主题（D4 金铜暗黑 / D2 古铜暗绿 / D3 血红烈焰）

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3.5 + Vue Router 4.6 |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS 4 + 自定义 CSS 设计令牌 |
| UI 组件 | Element Plus（少量使用） |
| 部署 | GitHub Pages (GitHub Actions) |

---

## 🚀 本地开发

```bash
# 克隆项目
git clone git@github.com:Eplayed/anhei-games.git
cd anhei-games/frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
cd frontend && unset NODE_OPTIONS && npm run build
```

---

## 📁 项目结构

```
anhei-games/
├── frontend/
│   ├── src/
│   │   ├── components/    # 公共组件
│   │   ├── pages/         # 页面组件
│   │   ├── composables/   # 组合式函数（如 useVersion）
│   │   ├── data/          # 静态数据（蓝贴、资源等）
│   │   └── utils/         # 工具函数
│   └── ...
├── scripts/               # 蓝贴自动抓取脚本
└── .github/workflows/     # GitHub Actions 部署配置
```

---

## 📄 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 沉浸式 Hero + 蓝贴速递 + 热门资源 |
| `/guides` | 攻略社区 | 各版本攻略资源 |
| `/tools` | 工具集合 | D2/D3/D4 实用工具 |
| `/news` | 新闻资讯 | 官方新闻与社区动态 |
| `/favorites` | 我的收藏 | 本地收藏夹 |

---

## 🔄 自动更新

蓝贴数据通过 GitHub Actions 每周自动抓取更新，无需手动维护。

---

## 📝 License

MIT
