# Watson & Band UI Kit

华诚律师事务所组件库 - 为法律行业网站设计的现代化UI组件库

## 📦 安装和使用

### 在项目中使用

```typescript
// 导入单个组件
import { Button, Card } from '$ui/components';

// 导入布局组件
import { Navigation, Footer } from '$ui/layouts';

// 导入业务组件
import { LawyerCard, NewsCard } from '$ui/domain';

// 从主入口导入
import { Button, Navigation, LawyerCard } from '$ui';
```

### 样式使用

```scss
// 在 .svelte 文件的 <style> 标签中使用
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .my-component {
    color: $color-primary;
    @include respond-to('mobile') {
      // 移动端样式
    }
  }
</style>
```

## 🎨 组件分类

### 基础组件 (Components)

位于 `ui-kit/components/`

- **Typography** - 排版组件
- **Button** - 按钮组件
- **Card** - 卡片组件
- **Input** - 输入框组件
- **Textarea** - 文本域组件
- **Link** - 链接组件
- **Badge** - 徽章组件
- **Stats** - 统计数据组件
- **Timeline** - 时间线组件
- **Testimonial** - 客户评价组件
- **LogoCloud** - Logo墙组件
- **Modal** - 模态框组件
- **Accordion** - 手风琴组件
- **Tabs** - 标签页组件

### 布局组件 (Layouts)

位于 `ui-kit/layouts/`

- **Hero** - 英雄区块组件
- **Navigation** - 导航栏组件
- **Footer** - 页脚组件
- **Section** - 区块容器组件

### 业务组件 (Domain Components)

位于 `ui-kit/domain/`

- **LawyerCard** - 律师卡片
- **NewsCard** - 新闻卡片
- **PracticeCard** - 业务领域卡片
- **ContactForm** - 联系表单

## 🎯 组件示例

### Button 按钮

```svelte
<script>
  import { Button } from '$ui';
</script>

<Button variant="primary" size="lg">
  联系我们
</Button>

<Button variant="outline" size="md">
  了解更多
</Button>

<Button variant="text" size="sm">
  查看详情 →
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'text'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `type`: 'button' | 'submit' | 'reset'

### Card 卡片

```svelte
<script>
  import { Card } from '$ui';
</script>

<Card>
  <h3>标题</h3>
  <p>内容</p>
</Card>

<Card variant="bordered" padding="lg">
  <div slot="header">卡片头部</div>
  <div>卡片内容</div>
  <div slot="footer">卡片底部</div>
</Card>
```

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated'
- `padding`: 'none' | 'sm' | 'md' | 'lg'

### Navigation 导航栏

```svelte
<script>
  import { Navigation } from '$ui/layouts';
</script>

<Navigation
  sticky={true}
  transparent={false}
/>
```

**Props:**
- `sticky`: boolean - 是否固定在顶部
- `transparent`: boolean - 是否透明背景

### LawyerCard 律师卡片

```svelte
<script>
  import { LawyerCard } from '$ui/domain';

  const lawyer = {
    id: '1',
    name_zh: '张明华',
    name_en: 'Zhang Minghua',
    title_zh: '创始合伙人',
    photo: 'https://...',
    practice_areas: ['知识产权法', '公司法'],
    // ... 更多字段
  };
</script>

<LawyerCard {lawyer} locale="zh" variant="default" />
```

## 📐 设计系统

### 颜色变量

```scss
$color-primary: #1a5f3f;      // 主色 - 深绿色
$color-secondary: #c9a858;    // 辅色 - 金色
$color-accent: #2d8659;       // 强调色

$color-text-primary: #1a1a1a;    // 主要文本
$color-text-secondary: #4a4a4a;  // 次要文本
$color-text-tertiary: #8a8a8a;   // 三级文本
```

### 断点 (Breakpoints)

```scss
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1280px;
$breakpoint-wide: 1920px;
```

### 响应式 Mixin

```scss
@include respond-to('mobile') {
  // 768px 以下
}

@include respond-to('tablet') {
  // 768px - 1024px
}

@include respond-to('desktop') {
  // 1024px 以上
}
```

## 🏗️ 目录结构

```
ui-kit/
├── components/          # 基础组件
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Input.svelte
│   └── index.ts
├── layouts/             # 布局组件
│   ├── Navigation.svelte
│   ├── Footer.svelte
│   └── index.ts
├── domain/              # 业务组件
│   ├── LawyerCard.svelte
│   ├── NewsCard.svelte
│   └── index.ts
├── styles/              # 样式系统
│   ├── variables.scss   # 变量
│   ├── mixins.scss      # Mixins
│   └── global.scss      # 全局样式
├── index.ts             # 主入口
└── README.md            # 文档
```

## 🎨 设计原则

1. **一致性**: 统一的视觉语言和交互模式
2. **可访问性**: 遵循WCAG 2.1标准
3. **响应式**: 支持所有主流设备和屏幕尺寸
4. **性能**: 优化加载速度和运行性能
5. **可维护性**: 清晰的代码结构和文档

## 🔧 开发指南

### 添加新组件

1. 在相应目录创建组件文件
2. 更新对应的 `index.ts` 文件
3. 更新主入口 `ui-kit/index.ts`
4. 添加组件文档和示例

### 组件规范

```svelte
<script lang="ts">
  // 1. Props定义
  export let variant: 'primary' | 'secondary' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  // 2. 内部状态
  let isActive = false;

  // 3. 事件处理
  function handleClick() {
    // ...
  }
</script>

<!-- 4. 模板 -->
<div class="component" class:active={isActive}>
  <slot />
</div>

<!-- 5. 样式 -->
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  .component {
    // 样式定义
  }
</style>
```

## 📝 更新日志

### v1.0.0 (2024-11-04)

#### 新增
- ✨ 创建完整的组件库导出系统
- ✨ 添加主入口文件 `ui-kit/index.ts`
- ✨ 完善所有子模块的 index.ts
- 📝 创建完整的组件库文档

#### 组件清单
- 基础组件: 14个
- 布局组件: 4个
- 业务组件: 4个
- 总计: 22个组件

## 🤝 贡献指南

开发新组件时，请遵循以下步骤：

1. Fork 项目并创建新分支
2. 按照组件规范开发
3. 添加必要的文档和示例
4. 提交 Pull Request

## 📄 许可证

Proprietary - © 2024 Watson & Band Law Firm

---

**维护者**: Watson & Band Development Team
**更新日期**: 2024-11-04
