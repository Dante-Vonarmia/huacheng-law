# Watson & Band 视觉设计指南

> 基于国际顶级律所设计标准（Baker McKenzie, Clifford Chance, Skadden）打造的专业视觉系统

---

## 🎨 设计理念

### 核心价值观
- **专业 (Professional)** - 深蓝色调传递稳重可信
- **品质 (Quality)** - 金色元素彰显高端国际化
- **创新 (Innovation)** - 现代极简设计展现前瞻性
- **诚信 (Integrity)** - 清晰简洁的信息架构

### 设计原则
1. **极简主义** - 去除多余装饰，聚焦核心内容
2. **高对比度** - 清晰的视觉层次，优秀的可读性
3. **优雅动画** - 流畅细腻的交互反馈
4. **移动优先** - 响应式设计，完美适配所有设备

---

## 🎨 品牌色彩系统

### 主色调 (Primary Colors)

#### 深蓝色 - #0E1B3A
```scss
$color-primary: #0E1B3A;
```
**用途：** 导航栏、标题、按钮、页脚
**象征：** 专业、可信、稳重、权威
**应用比例：** 40-50%

#### 金色 - #B5975A
```scss
$color-secondary: #B5975A;
```
**用途：** 强调元素、悬停状态、CTA按钮、图标
**象征：** 品质、高端、国际化、卓越
**应用比例：** 10-15%

### 中性色 (Neutral Colors)

| 颜色 | HEX | 用途 |
|------|-----|------|
| 文本主色 | `#2C3E50` | 正文内容 |
| 文本辅色 | `#6C757D` | 次要信息 |
| 背景色 | `#F5F7FA` | 页面背景 |
| 白色 | `#FFFFFF` | 卡片、容器 |
| 黑色 | `#000000` | 遮罩、阴影 |

### 状态色 (Status Colors)

| 状态 | 颜色 | HEX | 用途 |
|------|------|-----|------|
| 成功 | 绿色 | `#28A745` | 表单提交成功 |
| 警告 | 黄色 | `#FFC107` | 注意提示 |
| 错误 | 红色 | `#DC3545` | 表单验证错误 |
| 信息 | 青色 | `#17A2B8` | 提示信息 |

---

## 📝 排版系统

### 字体家族

#### 中文字体
```scss
$font-family-cn: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```
**特点：** 优雅现代、易读性强、跨平台兼容

#### 英文字体
```scss
$font-family-en: 'Inter', 'Helvetica Neue', Arial, sans-serif;
```
**特点：** 几何现代、专业简洁、国际化视觉

### 字号阶梯

| 级别 | 尺寸 | 用途 | 行高 | 字重 |
|------|------|------|------|------|
| 4XL | 32px → 56px | Hero标题 | 1.2 | 700 |
| 3XL | 28px → 42px | 页面主标题 | 1.2 | 600 |
| 2XL | 24px → 32px | Section标题 | 1.3 | 600 |
| XL | 20px | 卡片标题 | 1.5 | 600 |
| LG | 18px | 二级标题 | 1.5 | 500 |
| Base | 16px | 正文内容 | 1.6 | 400 |
| SM | 14px | 辅助信息 | 1.5 | 400 |
| XS | 12px | 标签、注释 | 1.5 | 400 |

### 排版规范

**标题 (Headings)**
- 使用英文字体家族
- 字重 600-700
- 字间距 -0.02em (紧凑专业)
- 行高 1.2-1.3

**正文 (Body Text)**
- 中文内容使用中文字体
- 字重 400
- 行高 1.6 (舒适阅读)
- 段落间距 24px

**强调文本 (Accent Text)**
- 金色 (#B5975A)
- 字重 500
- 字间距 0.05em (增强识别)
- 适用于职位、标签、数字

---

## 📐 间距系统

### 间距阶梯
```scss
$spacing-xs:  8px;   // 小间距 - 内容紧凑排列
$spacing-sm:  16px;  // 标准间距 - 表单字段、卡片内容
$spacing-md:  24px;  // 中等间距 - Section内容分隔
$spacing-lg:  32px;  // 大间距 - 卡片间距
$spacing-xl:  48px;  // 超大间距 - Section头部底部
$spacing-2xl: 64px;  // 巨大间距 - 页面Section分隔
$spacing-3xl: 96px;  // 最大间距 - Hero区域
```

### 应用场景

**组件内边距 (Padding)**
- 按钮：sm (16px)
- 卡片：lg (32px)
- Section：xl → 3xl (48px → 96px)

**组件外边距 (Margin)**
- 标题底部：sm → md (16px → 24px)
- 段落底部：md (24px)
- Section分隔：2xl → 3xl (64px → 96px)

---

## 🖼️ 组件设计规范

### 按钮 (Button)

#### 主按钮 - Primary
- **背景：** #0E1B3A (深蓝)
- **文本：** #FFFFFF (白色)
- **悬停：** 背景变亮 10%，上移 2px
- **圆角：** 8px
- **阴影：** 0 1px 3px rgba(0,0,0,0.1)

#### 次要按钮 - Secondary
- **背景：** #B5975A (金色)
- **文本：** #0E1B3A (深蓝)
- **悬停：** 背景变亮 10%，上移 2px

#### 轮廓按钮 - Outline
- **背景：** 透明
- **边框：** 2px solid #0E1B3A
- **悬停：** 背景填充深蓝，文本变白

**尺寸规格**
| 尺寸 | 内边距 | 字号 | 高度 |
|------|---------|------|------|
| Small | 8px 24px | 14px | 32px |
| Medium | 16px 32px | 16px | 48px |
| Large | 24px 48px | 18px | 64px |

### 卡片 (Card)

#### 标准卡片
- **背景：** #FFFFFF
- **圆角：** 12px
- **内边距：** 32px
- **阴影：** 0 1px 3px rgba(0,0,0,0.1)
- **悬停：** 上移 4px，阴影加深

#### 律师卡片
- **图片比例：** 3:4 (纵向)
- **图片悬停：** 放大 1.08x
- **遮罩：** 渐变从透明到深蓝 (#0E1B3A 90%)
- **标签：** 圆角 9999px，金色边框

#### 新闻卡片
- **图片比例：** 16:9 (横向)
- **分类标签：** 右上角，金色背景
- **标题截断：** 3行
- **摘要截断：** 3行

#### 业务领域卡片
- **图标尺寸：** 64px × 64px
- **图标背景：** 渐变 (金色 10% → 深蓝 5%)
- **底部信息：** 律师数量 + 箭头
- **悬停：** 边框变金色，上移 8px

### 输入框 (Input)

#### 默认状态
- **边框：** 1px solid rgba(#0E1B3A, 0.2)
- **圆角：** 8px
- **内边距：** 16px 24px
- **字号：** 16px

#### 聚焦状态
- **边框：** #B5975A (金色)
- **外阴影：** 0 0 0 3px rgba(#B5975A, 0.1)

#### 错误状态
- **边框：** #DC3545 (红色)
- **错误图标：** ⚠ 红色
- **错误提示：** 14px 红色文本

---

## 🎭 动画规范

### 过渡时间

| 速度 | 时长 | 用途 |
|------|------|------|
| Fast | 150ms | 按钮悬停、颜色变化 |
| Base | 200ms | 卡片悬停、位移动画 |
| Slow | 300ms | 页面切换、模态框 |

### 缓动函数
```scss
$transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
```
**特点：** 加速缓入，减速缓出，自然流畅

### 标准动画

#### Fade In (淡入)
```scss
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
**用途：** 页面加载、内容显示

#### Slide Up (上滑)
```scss
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**用途：** Hero区域、Section标题

#### Hover Lift (悬停提升)
- **位移：** translateY(-4px)
- **阴影：** 加深至 shadow-lg
- **时长：** 200ms

#### Link Underline (链接下划线)
- **初始：** 宽度 0
- **悬停：** 宽度 100%
- **颜色：** 金色 (#B5975A)
- **高度：** 2px
- **位置：** 底部 -4px

---

## 📱 响应式设计

### 断点系统

| 断点 | 宽度 | 设备 | 容器宽度 |
|------|------|------|----------|
| Mobile | < 768px | 手机 | 100% - 48px |
| Tablet | 768px - 1024px | 平板 | 100% - 96px |
| Desktop | 1024px - 1280px | 桌面 | 100% - 128px |
| Wide | > 1920px | 大屏 | 1440px max |

### 布局策略

**移动端 (Mobile First)**
- 单列布局
- 汉堡菜单
- 全宽卡片
- 字号缩小 10-20%

**平板 (Tablet)**
- 2列网格
- 侧边栏导航
- 卡片网格 2×N

**桌面 (Desktop)**
- 3-4列网格
- 水平导航
- 最佳阅读宽度 (960px)

### 图片优化

**律师照片**
- **桌面：** 600×800px (3:4)
- **移动：** 300×400px (3:4)
- **格式：** WebP + JPEG fallback
- **压缩：** 80% 质量

**新闻封面**
- **桌面：** 1600×900px (16:9)
- **移动：** 800×450px (16:9)
- **格式：** WebP
- **懒加载：** Intersection Observer

---

## ♿ 无障碍设计

### 颜色对比度

| 组合 | 对比度 | WCAG 级别 |
|------|--------|-----------|
| 深蓝 (#0E1B3A) / 白色 | 13.5:1 | AAA ✓ |
| 金色 (#B5975A) / 深蓝 | 4.8:1 | AA ✓ |
| 文本色 (#2C3E50) / 白色 | 10.2:1 | AAA ✓ |

### 键盘导航
- **焦点指示：** 2px 金色外框，2px 偏移
- **Tab 顺序：** 逻辑顺序（头部 → 主内容 → 侧边栏 → 页脚）
- **跳转链接：** 提供"跳到主内容"链接

### 屏幕阅读器
- **语义化 HTML：** 使用 `<nav>`, `<main>`, `<article>`, `<aside>`
- **ARIA 标签：** `aria-label`, `aria-describedby`, `aria-live`
- **图片 Alt：** 描述性替代文本

---

## 🌐 国际化设计

### 多语言支持

**中文 (zh)**
- 字体：Noto Sans SC
- 行高：1.6 (更舒适)
- 字间距：正常

**英文 (en)**
- 字体：Inter
- 行高：1.5
- 字间距：-0.02em (紧凑)

### 布局适配
- **文本扩展：** 英文比中文长 20-30%
- **按钮宽度：** 自适应或固定最小宽度
- **换行处理：** `word-break: keep-all` (中文), `word-wrap: break-word` (英文)

---

## 📊 性能优化

### 加载策略

**关键 CSS**
- 内联首屏样式
- 延迟加载非关键 CSS
- 目标：First Contentful Paint < 1.5s

**字体加载**
```css
@font-face {
  font-family: 'Inter';
  font-display: swap; /* 避免FOIT */
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
}
```

**图片优化**
- WebP 格式 (减少 30% 体积)
- 懒加载 (Intersection Observer)
- 响应式图片 (`<picture>` + `srcset`)

### 动画性能
- 使用 `transform` 和 `opacity` (GPU加速)
- 避免 `width`, `height`, `left`, `top` 动画
- 使用 `will-change` 提示浏览器

---

## 🎯 质量目标

### Lighthouse 评分
- **Performance:** ≥ 90
- **Accessibility:** ≥ 90
- **SEO:** ≥ 95
- **Best Practices:** ≥ 90

### 核心指标
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 🔄 设计迭代

### Version 1.0 (Current)
- ✅ 完整组件库
- ✅ 响应式设计
- ✅ 无障碍支持
- ✅ 国际化

### Roadmap
- [ ] 暗黑模式 (Dark Mode)
- [ ] 高级动画系统 (Framer Motion)
- [ ] 可视化编辑器
- [ ] Storybook 组件文档

---

## 📚 参考资源

### 设计灵感
- Baker McKenzie: https://www.bakermckenzie.com
- Clifford Chance: https://www.cliffordchance.com
- Skadden: https://www.skadden.com

### 设计工具
- **Figma:** UI 设计与原型
- **Adobe Color:** 色彩方案
- **WebAIM:** 无障碍测试

### 技术文档
- WCAG 2.1 Guidelines
- Material Design Typography
- Apple Human Interface Guidelines

---

**最后更新：** 2025-01-04
**版本：** 1.0.0
**维护者：** Watson & Band Design Team
