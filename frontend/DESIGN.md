# DESIGN.md - 暗黑破坏神导航站设计系统

> 设计灵感：暴雪暗黑破坏神4官网 / 莉莉丝主视觉
> 参考规范：[awesome-design-md](https://github.com/voltagent/awesome-design-md)

---

## 1. 颜色方案

### 1.1 品牌色

| Token | 色值 | 用途 |
|-------|------|------|
| `--brand-gold` | `#c8860a` | 品牌金铜 — 主强调色（莉莉丝光环） |
| `--brand-gold-dim` | `#8b6914` | 深金铜 — 渐变终点 / 按钮底色 |
| `--brand-gold-bright` | `#f0a030` | 亮金铜 — 悬停态 / 激活态 |
| `--brand-gold-muted` | `#9a7a2e` | 柔金铜 — 次级强调 / 图标 |
| `--brand-red` | `#dc2626` | 品牌血红 — 危险 / 警示 / 进行中 |
| `--brand-red-glow` | `#ef4444` | 亮红 — 血红悬停 / 脉冲 |
| `--brand-red-dim` | `#8b0000` | 暗红 — 背景标记 |

### 1.2 表面色（Canvas System）

| Token | 色值 | 用途 |
|-------|------|------|
| `--canvas-deep` | `#0a0a0f` | 最深背景 — body 底色 |
| `--canvas-base` | `#14131c` | 基础画布 — 卡片 / 面板 |
| `--canvas-mid` | `#1e1d28` | 中层画布 — 导航栏 / 工具栏 |
| `--canvas-raised` | `#282734` | 浮起画布 — 悬停态背景 |
| `--canvas-soft` | `#3a3948` | 柔和表面 — 输入框 / 占位背景 |

### 1.3 文字色

| Token | 色值 | 用途 |
|-------|------|------|
| `--ink-heading` | `#e8dcc8` | 标题文字（羊皮纸色） |
| `--ink-body` | `#c8c5be` | 正文文字 |
| `--ink-mute` | `#8a8780` | 次要文字 / 描述 |
| `--ink-stone` | `#5a5852` | 石化文字 / 禁用态 |
| `--ink-ash` | `#3a3835` | 灰烬文字 / 占位符 |
| `--ink-on-gold` | `#1a1508` | 金色背景上的文字 |

### 1.4 语义色

| Token | 色值 | 用途 |
|-------|------|------|
| `--status-active` | `#dc2626` | 进行中 / 危险 |
| `--status-success` | `#22c55e` | 成功 / 在线 |
| `--status-warning` | `#eab308` | 警告 / 即将 |
| `--status-info` | `#3b82f6` | 信息 / 链接 |

### 1.5 边框与线条

| Token | 色值 | 用途 |
|-------|------|------|
| `--hairline` | `rgba(200, 134, 10, 0.2)` | 发丝线 — 卡片默认边框 |
| `--hairline-bright` | `rgba(200, 134, 10, 0.4)` | 亮发丝线 — 悬停态边框 |
| `--hairline-glow` | `rgba(200, 134, 10, 0.6)` | 发光线 — 聚焦 / 激活边框 |
| `--divider` | `rgba(200, 134, 10, 0.12)` | 分隔线 — 区域分隔 |

---

## 2. 排版层级

### 2.1 字体栈

```css
--font-display: 'Cinzel', 'Georgia', serif;       /* 标题 / 按钮 / 装饰 */
--font-body: 'Inter', 'system-ui', sans-serif;      /* 正文 / UI 文字 */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;  /* 倒计时 / 代码 */
```

### 2.2 排版阶梯（14 级）

| Level | Token | Size | Weight | Font | Tracking | Leading | 用途 |
|-------|-------|------|--------|------|----------|---------|------|
| 1 | `--display-xl` | 48px | 700 | Display | -0.5px | 1.1 | Hero 主标题 |
| 2 | `--display-lg` | 36px | 700 | Display | -0.25px | 1.15 | 区块标题 |
| 3 | `--display-md` | 28px | 700 | Display | 0px | 1.2 | 子区块标题 |
| 4 | `--heading-xl` | 24px | 600 | Display | 0px | 1.25 | 大卡片标题 |
| 5 | `--heading-lg` | 20px | 600 | Display | 0.25px | 1.3 | 卡片标题 |
| 6 | `--heading-md` | 18px | 600 | Display | 0.25px | 1.3 | 小标题 |
| 7 | `--heading-sm` | 16px | 600 | Body | 0px | 1.4 | 导航标题 |
| 8 | `--body-lg` | 16px | 400 | Body | 0px | 1.7 | 大正文 |
| 9 | `--body-md` | 14px | 400 | Body | 0px | 1.6 | 默认正文 |
| 10 | `--body-sm` | 13px | 400 | Body | 0px | 1.5 | 小正文 |
| 11 | `--caption` | 12px | 500 | Body | 0.25px | 1.4 | 元数据 / 时间 |
| 12 | `--micro` | 11px | 500 | Body | 0.5px | 1.3 | 极小文字 |
| 13 | `--button` | 13px | 700 | Display | 1px | 1.0 | 按钮 |
| 14 | `--nav-link` | 12px | 600 | Body | 0.75px | 1.0 | 导航链接 |

---

## 3. 间距系统

基准单位：`4px`，8 级阶梯。

| Token | Value | 用途 |
|-------|-------|------|
| `--space-xxs` | 4px | 极小间距（图标与文字） |
| `--space-xs` | 8px | 小间距（紧凑元素） |
| `--space-sm` | 12px | 标准内间距 |
| `--space-md` | 16px | 默认间距 |
| `--space-lg` | 24px | 区块内间距 |
| `--space-xl` | 32px | 区块间间距 |
| `--space-2xl` | 48px | 大区块分隔 |
| `--space-super` | 64px | 页面级分隔 |

---

## 4. 圆角系统

| Token | Value | 用途 |
|-------|-------|------|
| `--radius-none` | 0px | 方正元素（装饰方块） |
| `--radius-xs` | 2px | 微圆角（标签/徽章） |
| `--radius-sm` | 4px | 小圆角（卡片/输入框） |
| `--radius-md` | 8px | 中圆角（大面板） |
| `--radius-full` | 9999px | 完全圆形（头像） |

> **设计原则**：暗黑风格使用锐利几何，卡片/按钮圆角不超过 `4px`。绝不使用药丸形（pill shape）。

---

## 5. 深度系统（无投影）

暗黑界面不使用传统 box-shadow 承载深度，改用**亮度阶梯**：

| Level | 名称 | 实现方式 | 用途 |
|-------|------|----------|------|
| 0 | Flat | 纯色背景 | 画布内区块 |
| 1 | Hairline | 1px 发丝线边框 | 默认卡片 |
| 2 | Raised | 背景亮度提升 + 边框变亮 | 悬停态 |
| 3 | Glow | 金色发光边框 (box-shadow gold halo) | 聚焦 / 激活 |

```css
/* Level 0: Flat */
background: var(--canvas-base);

/* Level 1: Hairline */
background: var(--canvas-base);
border: 1px solid var(--hairline);

/* Level 2: Raised */
background: var(--canvas-raised);
border: 1px solid var(--hairline-bright);

/* Level 3: Glow */
background: var(--canvas-base);
border: 1px solid var(--hairline-glow);
box-shadow: 0 0 12px rgba(200, 134, 10, 0.15), inset 0 0 8px rgba(200, 134, 10, 0.05);
```

---

## 6. 组件样式

### 6.1 按钮

| 状态 | 背景 | 边框 | 文字 |
|------|------|------|------|
| Default | `linear-gradient(180deg, --brand-gold, --brand-gold-dim)` | 1px `--brand-gold-bright` | `--ink-on-gold` |
| Hover | `linear-gradient(180deg, --brand-gold-bright, --brand-gold)` | 1px `--brand-gold-bright` | `--ink-on-gold` |
| Active | `linear-gradient(180deg, --brand-gold-dim, --brand-gold-dim)` | 1px `--brand-gold` | `--ink-on-gold` |
| Disabled | `--canvas-soft` | 1px `--ink-stone` | `--ink-stone` |

- 圆角：`var(--radius-sm)` (4px)
- 内间距：`8px 20px`
- 字体：`var(--font-display)` 13px 700
- 字间距：1px
- 过渡：`all 0.2s ease`

### 6.2 幽灵按钮（Ghost Button）

| 状态 | 背景 | 边框 | 文字 |
|------|------|------|------|
| Default | transparent | 1px `--brand-gold` | `--brand-gold` |
| Hover | `--brand-gold` | 1px `--brand-gold` | `--ink-on-gold` |

### 6.3 卡片

- 背景：`var(--canvas-base)`
- 边框：1px `var(--hairline)`
- 圆角：`var(--radius-sm)` (4px)
- 内间距：`var(--space-md)` (16px)
- 悬停：Level 2 (Raised)
- 顶部装饰线：1px 金色渐变，透明度 0.3

### 6.4 输入框

- 背景：`var(--canvas-deep)`
- 边框：1px `var(--hairline)`
- 圆角：`var(--radius-sm)` (4px)
- 内间距：`10px 14px`
- 聚焦：Level 3 (Glow)
- 占位符色：`var(--ink-ash)`

### 6.5 标签/徽章

- 背景：`var(--canvas-deep)`
- 边框：1px `var(--hairline)` 或 `var(--brand-gold)` 半透明
- 文字：`var(--brand-gold)`
- 圆角：`var(--radius-xs)` (2px)
- 内间距：`2px 8px`

### 6.6 导航栏

- 背景：`var(--canvas-mid)` (中层画布)
- 底部边框：1px `var(--divider)`
- 高度：auto (py-3)
- Logo 字体：`var(--font-display)` 24px 700 `var(--brand-gold)`

### 6.7 蓝贴列表项

- 背景：transparent
- 左边框：2px `var(--brand-gold)`
- 悬停：`var(--canvas-raised)`
- 圆角：2px

---

## 7. 布局原则

### 7.1 容器

- 最大宽度：`1280px` (xl 断点)
- 水平内边距：`16px` (mobile) / `24px` (desktop)
- 居中对齐

### 7.2 网格系统

- 首页事件倒计时：`grid-cols-2 lg:grid-cols-4`，间距 `12px`
- 版本入口：`grid-cols-3`，间距 `12px`
- 蓝贴 + 版本双栏：`grid-cols-1 lg:grid-cols-2`，间距 `16px`
- 热门资源：`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6`，间距 `12px`

### 7.3 间距节奏

- 区块间间距：`var(--space-md)` (16px) — 保持一屏紧凑
- 区块内间距：`var(--space-sm)` (12px)
- 元素内间距：`var(--space-xs)` (8px)

---

## 8. 响应式断点

| 断点 | 宽度 | 策略 |
|------|------|------|
| xs | < 640px | 单列堆叠，缩小字号 |
| sm | 640px+ | 2列网格 |
| md | 768px+ | 导航展开，3列网格 |
| lg | 1024px+ | 双栏布局，4列网格 |
| xl | 1280px+ | 6列网格，最大宽度锁定 |

---

## 9. 动效规范

### 9.1 过渡时间

| 类型 | Duration | Easing |
|------|----------|--------|
| 微交互（hover 颜色） | 150ms | ease |
| 标准过渡（边框/背景） | 200ms | ease |
| 位移过渡 | 300ms | ease-out |
| 展开/收起 | 200ms | ease-out |

### 9.2 动效原则

- **克制**：暗黑风格以静态为主，动效仅用于状态反馈
- **无弹跳**：不使用 spring/bounce 过度弹性
- **无位移悬停**：卡片悬停不 translateY，仅用亮度/边框变化承深度
- **发光是特效**：金色光晕仅用于聚焦态，不用于常态

---

## 10. 设计禁区

### DON'T

- 药丸形按钮 / 标签 (pill shape, radius > 8px on interactive elements)
- 彩色投影 / 大面积模糊光晕
- 卡片悬停上浮 (translateY)
- 渐变文字（标题保持纯色 + 微弱 text-shadow）
- 高饱和度背景色
- 圆润的卡通风格图标
- 光泽扫过效果 (shimmer sweep)

### DO

- 锐利几何 (2-4px radius)
- 亮度阶梯承深度（非投影）
- 金色发丝线装饰
- 衬线展示字体 (Cinzel)
- 负字间距标题 (-0.5px ~ 0px)
- 暗沉克制配色
- 微弱 text-shadow 仅用于品牌标题

---

*文档版本：v1.0 | 更新日期：2026-05-08*
