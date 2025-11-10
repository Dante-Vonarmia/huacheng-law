# UI Kit 使用指南

完整的使用指南和最佳实践

## 📚 目录

- [快速开始](#快速开始)
- [导入方式](#导入方式)
- [组件使用](#组件使用)
- [样式系统](#样式系统)
- [响应式设计](#响应式设计)
- [主题定制](#主题定制)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

## 快速开始

### 1. 在页面中使用组件

```svelte
<script>
  // 方式1: 从主入口导入
  import { Button, Card, Navigation } from '$ui';

  // 方式2: 从子模块导入
  import { Button } from '$ui/components';
  import { Navigation } from '$ui/layouts';
  import { LawyerCard } from '$ui/domain';
</script>

<Navigation sticky={true} transparent={false} />

<section>
  <Card>
    <h2>欢迎</h2>
    <p>使用华诚UI Kit构建专业网站</p>
    <Button variant="primary">开始使用</Button>
  </Card>
</section>
```

### 2. 使用样式系统

```svelte
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .my-section {
    padding: $spacing-xl;
    background: $color-primary;

    @include respond-to('mobile') {
      padding: $spacing-md;
    }
  }
</style>
```

## 导入方式

### 组件导入

```typescript
// ✅ 推荐: 从主入口导入（自动tree-shaking）
import { Button, Card, Input } from '$ui';

// ✅ 也可以: 从子模块导入（更明确）
import { Button } from '$ui/components';
import { Navigation, Footer } from '$ui/layouts';
import { LawyerCard } from '$ui/domain';

// ❌ 不推荐: 导入具体文件路径
import Button from '$ui/components/Button.svelte';
```

### 样式导入

```scss
// ✅ 推荐: 使用 @use（现代 SCSS）
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;
</style>

// ⚠️ 可用但不推荐: 使用 @import（将被废弃）
<style lang="scss">
  @import '$ui/styles/variables.scss';
  @import '$ui/styles/mixins.scss';
</style>
```

## 组件使用

### Button 按钮

```svelte
<script>
  import { Button } from '$ui';

  function handleClick() {
    console.log('Button clicked!');
  }
</script>

<!-- 基础用法 -->
<Button>默认按钮</Button>

<!-- 不同变体 -->
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="outline-light">浅色轮廓</Button>
<Button variant="text">文本按钮</Button>

<!-- 不同尺寸 -->
<Button size="sm">小按钮</Button>
<Button size="md">中按钮</Button>
<Button size="lg">大按钮</Button>

<!-- 状态 -->
<Button disabled>禁用按钮</Button>

<!-- 事件处理 -->
<Button on:click={handleClick}>点击我</Button>

<!-- 完整示例 -->
<Button
  variant="primary"
  size="lg"
  type="submit"
  on:click={handleClick}
>
  提交表单
</Button>
```

### Card 卡片

```svelte
<script>
  import { Card } from '$ui';
</script>

<!-- 基础卡片 -->
<Card>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</Card>

<!-- 带槽的卡片 -->
<Card variant="elevated" padding="lg">
  <div slot="header">
    <h3>头部</h3>
  </div>

  <p>这是卡片的主要内容区域。</p>

  <div slot="footer">
    <Button>操作</Button>
  </div>
</Card>

<!-- 不同变体 -->
<Card variant="bordered">边框卡片</Card>
<Card variant="elevated">阴影卡片</Card>
```

### Navigation 导航栏

```svelte
<script>
  import { Navigation } from '$ui/layouts';
</script>

<!-- 固定顶部的不透明导航栏 -->
<Navigation sticky={true} transparent={false} />

<!-- 透明导航栏（适合首页Hero区域） -->
<Navigation sticky={false} transparent={true} />
```

### LawyerCard 律师卡片

```svelte
<script>
  import { LawyerCard } from '$ui/domain';

  const lawyer = {
    id: '1',
    name_zh: '张明华',
    name_en: 'Zhang Minghua',
    title_zh: '创始合伙人',
    title_en: 'Founding Partner',
    photo: 'https://example.com/photo.jpg',
    office: '上海',
    practice_ids: ['ip', 'corporate'],
    languages: ['中文', '英文'],
    education: ['北京大学法学院', '哈佛大学法学硕士'],
    experience: ['30年执业经验', '知识产权领域资深专家'],
    bio_zh: '专注知识产权和公司法领域30年',
    bio_en: 'Specializing in IP and Corporate Law'
  };

  const practices = [
    { id: 'ip', name_zh: '知识产权', name_en: 'IP Law' },
    { id: 'corporate', name_zh: '公司法', name_en: 'Corporate Law' }
  ];
</script>

<LawyerCard {lawyer} {practices} locale="zh" variant="default" />
```

## 样式系统

### 颜色使用

```scss
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  .element {
    // 主题色
    color: $color-primary;          // #1a5f3f 深绿
    background: $color-secondary;   // #c9a858 金色
    border-color: $color-accent;    // #2d8659 强调色

    // 文本颜色
    color: $color-text-primary;     // #1a1a1a 主要文本
    color: $color-text-secondary;   // #4a4a4a 次要文本
    color: $color-text-tertiary;    // #8a8a8a 三级文本

    // 状态色
    color: $color-success;          // 成功
    color: $color-warning;          // 警告
    color: $color-error;            // 错误
    color: $color-info;             // 信息
  }
</style>
```

### 间距使用

```scss
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  .element {
    // 间距变量
    padding: $spacing-xs;    // 4px
    margin: $spacing-sm;     // 8px
    gap: $spacing-md;        // 16px
    padding: $spacing-lg;    // 24px
    margin: $spacing-xl;     // 32px
    padding: $spacing-2xl;   // 48px
    margin: $spacing-3xl;    // 64px
  }
</style>
```

### 排版使用

```scss
<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  h1 {
    font-family: $font-family-heading;
    font-size: $font-size-5xl;      // 64px
    font-weight: $font-weight-bold;
  }

  p {
    font-family: $font-family-body;
    font-size: $font-size-base;     // 16px
    line-height: $line-height-normal;
  }
</style>
```

## 响应式设计

### 使用响应式 Mixin

```scss
<style lang="scss">
  @use '$ui/styles/mixins.scss' as *;

  .element {
    padding: 48px;

    // 平板设备（≤1024px）
    @include respond-to('tablet') {
      padding: 32px;
    }

    // 移动设备（≤768px）
    @include respond-to('mobile') {
      padding: 16px;
    }
  }
</style>
```

### 响应式网格

```scss
<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;

    @include respond-to('tablet') {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    @include respond-to('mobile') {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
</style>
```

## 主题定制

### 覆盖颜色变量

```scss
<!-- 在你的组件中 -->
<style lang="scss">
  @use '$ui/styles/variables.scss' as * with (
    $color-primary: #custom-color,
    $color-secondary: #another-color
  );

  .custom-element {
    color: $color-primary; // 使用自定义颜色
  }
</style>
```

### 创建自定义主题

```scss
// my-theme.scss
@use '$ui/styles/variables.scss' as vars;

$my-primary: #123456;
$my-secondary: #654321;

.theme-custom {
  --color-primary: #{$my-primary};
  --color-secondary: #{$my-secondary};

  * {
    // 应用自定义主题
  }
}
```

## 最佳实践

### 1. 组件组合

```svelte
<script>
  import { Card, Button, Typography } from '$ui';
</script>

<Card variant="elevated" padding="lg">
  <Typography variant="h3" slot="header">
    标题
  </Typography>

  <Typography variant="body">
    内容文字
  </Typography>

  <div slot="footer">
    <Button variant="outline" size="md">取消</Button>
    <Button variant="primary" size="md">确认</Button>
  </div>
</Card>
```

### 2. 响应式布局

```svelte
<script>
  import { Card } from '$ui';

  const items = [...]; // 数据数组
</script>

<div class="grid-responsive">
  {#each items as item}
    <Card>
      <!-- 内容 -->
    </Card>
  {/each}
</div>

<style lang="scss">
  @use '$ui/styles/mixins.scss' as *;

  .grid-responsive {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @include respond-to('tablet') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('mobile') {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### 3. 条件渲染

```svelte
<script>
  import { Button } from '$ui';

  let loading = false;

  async function handleSubmit() {
    loading = true;
    try {
      // 提交逻辑
    } finally {
      loading = false;
    }
  }
</script>

<Button
  variant="primary"
  disabled={loading}
  on:click={handleSubmit}
>
  {loading ? '提交中...' : '提交'}
</Button>
```

### 4. 事件处理

```svelte
<script>
  import { Button, Modal } from '$ui';

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleConfirm() {
    // 处理确认逻辑
    closeModal();
  }
</script>

<Button on:click={openModal}>打开模态框</Button>

<Modal
  show={showModal}
  on:close={closeModal}
  on:confirm={handleConfirm}
>
  <h3>确认操作</h3>
  <p>您确定要执行此操作吗？</p>
</Modal>
```

## 常见问题

### Q: 如何更改组件的默认样式？

A: 使用CSS变量或覆盖SCSS变量：

```scss
<style lang="scss">
  // 方式1: CSS变量
  :global(.button) {
    --button-bg: #custom-color;
  }

  // 方式2: SCSS变量覆盖
  @use '$ui/styles/variables.scss' as * with (
    $color-primary: #custom-color
  );
</style>
```

### Q: 组件支持哪些浏览器？

A: 支持所有现代浏览器：
- Chrome/Edge (最新2个版本)
- Firefox (最新2个版本)
- Safari (最新2个版本)
- 移动端 Safari/Chrome

### Q: 如何在TypeScript中使用？

A: 所有组件都有完整的TypeScript类型定义：

```typescript
import type { ButtonProps } from '$ui/components/Button.svelte';

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  disabled: false
};
```

### Q: 如何优化性能？

A:
1. 只导入需要的组件
2. 使用代码分割和懒加载
3. 避免在循环中创建复杂组件
4. 使用虚拟滚动处理大列表

```svelte
<script>
  // ✅ 只导入需要的组件
  import { Button, Card } from '$ui';

  // ✅ 懒加载
  import { onMount } from 'svelte';

  let HeavyComponent;

  onMount(async () => {
    const module = await import('./HeavyComponent.svelte');
    HeavyComponent = module.default;
  });
</script>
```

### Q: 如何处理表单验证？

A: 结合Svelte的响应式和Input组件：

```svelte
<script>
  import { Input, Button } from '$ui';

  let email = '';
  let emailError = '';

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      emailError = '请输入有效的邮箱地址';
      return false;
    }
    emailError = '';
    return true;
  }

  function handleSubmit() {
    if (validateEmail()) {
      // 提交表单
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <Input
    type="email"
    bind:value={email}
    error={emailError}
    on:blur={validateEmail}
    placeholder="请输入邮箱"
  />
  <Button type="submit">提交</Button>
</form>
```

## 获取帮助

- 📖 查看 [完整文档](./README.md)
- 📋 查看 [组件清单](./COMPONENTS.md)
- 💡 查看具体组件的示例代码
- 🐛 报告问题或建议

---

**最后更新**: 2024-11-04
