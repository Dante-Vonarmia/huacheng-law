# 导航菜单配置文档

## 📋 概述

本文档说明华诚律所网站的导航菜单结构、配置和使用方式。

## 🗂️ 导航结构

### 主导航菜单（所有页面）

所有页面（除首页外）使用 `Header.svelte` 组件，菜单配置来自 `src/lib/data/navigation.ts`。

#### 一级菜单（7项）

| 序号 | 中文 | 英文 | 路径 | Mega Menu |
|------|------|------|------|-----------|
| 1 | 首页 | HOME | `/` | ❌ |
| 2 | 关于华诚 | ABOUT US | `/about` | ❌ |
| 3 | 业务领域 | PRACTICE AREAS | `/practices` | ✅ 13个子项 |
| 4 | 专业人士 | OUR PEOPLE | `/team` | ✅ 5个子项 |
| 5 | 新闻与出版物 | NEWS & PUBLICATIONS | `/publications` | ✅ 4个子项 |
| 6 | 研讨会与活动 | SEMINARS & EVENTS | `/events` | ❌ |
| 7 | 联系我们 | CONTACT US | `/contact` | ❌ |

---

### 业务领域 Mega Menu（13项）

#### 核心业务（5项）
1. 知识产权 - `/practices/intellectual-property`
2. 公司及商业法务 - `/practices/corporate-commercial`
3. 数据相关法律及知识产权 - `/practices/data-legal-ip`
4. 资本市场 - `/practices/capital-market`
5. 金融及资产管理 - `/practices/financial-asset-management`

#### 行业专长（4项）
6. 重组及破产 - `/practices/restructuring-insolvency`
7. 文化、娱乐及体育 - `/practices/culture-entertainment-sports`
8. 建筑、房地产及基础设施 - `/practices/construction-real-estate`
9. 劳动及雇佣 - `/practices/labor-employment`

#### 专业服务（4项）
10. 家族法及财富管理 - `/practices/family-wealth-management`
11. 贸易、海关及税务 - `/practices/trade-customs-taxation`
12. 诉讼及争议解决 - `/practices/litigation-dispute-resolution`
13. 调查 - `/practices/investigation`

**特殊链接**：
- "查看全部业务领域 →" - `/practices` (显示在最后一列底部)

---

### 专业人士 Mega Menu（5项）

#### 我们的团队（3项）
1. 律师团队 - `/team`
2. 合伙人 - `/team?filter=partner`
3. 律师 - `/team?filter=associate`

#### 加入华诚（2项）
4. 招聘职位 - `/careers`
5. 企业文化 - `/about#culture`

---

### 新闻与出版物 Mega Menu（4项）

#### 动态资讯（2项）
1. 华诚最新动态 - `/news/watson-band`
2. 最新法律新闻 - `/news/legal`

#### 资源中心（2项）
3. 出版物 - `/publications`
4. 视频 - `/videos`

---

## 🏠 首页导航（特殊）

首页使用内联单页应用导航（锚点滚动），配置在 `src/routes/[lang=locale]/(home)/+page.svelte`。

### 首页菜单项（8项）

1. 首页 - `#home`
2. 关于 - `#about`
3. 业务 - `#practices`
4. 团队 - `#team`
5. 出版物 - `#publications`
6. 新闻 - `#news`
7. 活动 - `#events`
8. 联系 - `#contact`

**特点**：
- ✅ 透明导航栏（滚动后变白）
- ✅ 固定导航栏（滚动到一定位置后出现）
- ✅ 锚点平滑滚动
- ✅ 当前章节高亮

---

## 📱 响应式设计

### 桌面端（> 1024px）

**Header.svelte**:
- 水平导航栏
- Mega Menu 下拉展开（3列网格布局）
- 鼠标悬停显示子菜单

**首页**:
- 透明顶部导航 + Hero 导航
- 中英文双语标签
- 滚动后出现固定导航

### 移动端（≤ 1024px）

**Header.svelte**:
- Logo 居中
- 右侧：语言切换 + 汉堡菜单
- 点击打开弹出式菜单（右上角下拉）
- 子菜单自动展开显示（分组标题 + 子项）

**首页**:
- 简化导航（仅主要菜单项）
- 全屏移动菜单
- 点击菜单项平滑滚动到对应章节

---

## 🎨 移动端菜单优化

### 已实现的优化：

1. **自定义滚动条**（仅 webkit 浏览器）
   - 宽度：6px
   - 透明轨道
   - 半透明滑块，悬停时加深

2. **响应式高度**
   - 平板：`calc(100vh - 80px)`
   - 手机：`calc(100vh - 72px)`
   - 避免遮挡底部内容

3. **分组标题样式**
   - 大写字母
   - 加粗字体（700）
   - 增加字间距（0.1em）
   - 灰色文字（tertiary color）

4. **子菜单项交互**
   - 悬停：背景色 + 右移 2px
   - 点击：更深背景色
   - 行高 1.4 增强可读性
   - 圆角 4px 柔和设计

---

## 🔧 配置文件

### 主要文件

1. **`src/lib/data/navigation.ts`**
   - 导航菜单数据源
   - TypeScript 接口定义
   - 支持多语言（中文/英文）

2. **`src/lib/components/Header.svelte`**
   - 多页应用导航组件
   - 桌面 + 移动端完整实现
   - 使用 `navigation.ts` 数据

3. **`src/routes/[lang=locale]/(home)/+page.svelte`**
   - 首页单页应用导航
   - 内联菜单配置
   - 锚点滚动逻辑

4. **`ui-kit/components/LocaleSwitcher.svelte`**
   - 语言切换组件
   - 支持中文/英文/日语
   - 保持当前页面路径

---

## ✅ 页面路由验证

所有导航链接对应的页面均已创建：

### 核心页面
- ✅ `/` - 首页
- ✅ `/about` - 关于华诚
- ✅ `/team` - 律师团队
- ✅ `/practices` - 业务领域列表
- ✅ `/publications` - 出版物列表
- ✅ `/events` - 研讨会与活动
- ✅ `/contact` - 联系我们
- ✅ `/careers` - 招聘职位
- ✅ `/videos` - 视频资源

### 业务领域详情页
- ✅ `/practices/[slug]` - 13个业务领域详情页（动态路由）

### 新闻页面
- ✅ `/news/watson-band` - 华诚最新动态
- ✅ `/news/legal` - 最新法律新闻
- ✅ `/news/[id]` - 新闻详情页

### 其他详情页
- ✅ `/team/[id]` - 律师个人详情页
- ✅ `/publications/[id]` - 出版物详情页
- ✅ `/events/[id]` - 活动详情页

---

## 🌐 多语言支持

### 当前语言
- 中文（zh）- 默认
- 英文（en）
- 日语（ja）

### 切换方式
1. 点击导航栏右侧 LocaleSwitcher 组件
2. 下拉菜单选择语言
3. 客户端导航（无页面刷新）
4. 保持当前页面位置（`noScroll: true`）

### URL 结构
- 中文：`/` 或 `/zh/`
- 英文：`/en/`
- 日语：`/ja/`

---

## 📝 维护指南

### 添加新菜单项

1. 编辑 `src/lib/data/navigation.ts`
2. 在 `mainNavigation` 数组中添加新项：
   ```typescript
   {
     id: 'new-item',
     label_zh: '新菜单项',
     label_en: 'New Item',
     path: '/new-item'
   }
   ```
3. 创建对应页面：`src/routes/(app)/new-item/+page.svelte`
4. （可选）添加 Mega Menu 子项

### 添加 Mega Menu

```typescript
{
  id: 'example',
  label_zh: '示例菜单',
  label_en: 'Example',
  path: '/example',
  megaMenu: {
    columns: [
      {
        id: 'col-1',
        title_zh: '分类一',
        title_en: 'Category 1',
        items: [
          {
            id: 'item-1',
            label_zh: '子项1',
            label_en: 'Item 1',
            path: '/example/item-1'
          }
        ]
      }
    ]
  }
}
```

### 修改移动端菜单样式

编辑 `src/lib/components/Header.svelte` 的 SCSS 部分：
- `.mobile-menu` - 菜单容器
- `.mobile-children` - 子菜单区域
- `.mobile-group-title` - 分组标题
- `.mobile-child-link` - 子菜单项

---

## 🐛 已知问题

1. **首页和其他页面菜单不完全一致**
   - 原因：首页使用单页应用模式，其他页面使用多页应用模式
   - 影响：首页菜单较简化（8项 vs 7项），无 Mega Menu
   - 状态：预期行为，不需要修复

2. **MinimalNav.svelte 未被使用**
   - 位置：`ui-kit/components/MinimalNav.svelte`
   - 状态：保留作为备用组件，不影响当前功能

---

## 🔄 更新历史

### 2025-11-14
- ✅ 统一导航配置，使用 `navigation.ts` 作为唯一数据源
- ✅ 优化移动端菜单样式（滚动条、间距、交互）
- ✅ 验证所有页面路由存在
- ✅ 创建本文档

---

**维护者**: Claude Code
**最后更新**: 2025-11-14
