# TASK-002: SideNav侧边导航组件

## 状态
- [x] 已完成
- 优先级: P0
- 预计工时: 3小时 (0.3天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
在"关于华诚"、"业务领域详情"等长内容页面中，需要一个侧边导航组件来帮助用户快速定位到页面的不同章节。这种导航方式在专业网站中非常常见，可以显著提升用户体验。

当前页面缺少章节导航功能，用户需要手动滚动查找内容，体验不佳。需要一个支持自动高亮当前章节、平滑滚动、响应式设计的侧边导航组件。

## 目标
创建一个功能完善的 SideNav 侧边导航组件，具备以下特性：
1. **自动高亮**：使用 Intersection Observer 自动检测当前章节并高亮对应导航项
2. **平滑滚动**：点击导航项时平滑滚动到对应章节
3. **固定定位**：在桌面端使用 sticky 定位，跟随页面滚动
4. **响应式设计**：移动端使用浮动按钮+抽屉菜单模式
5. **可配置**：支持自定义导航项、图标、激活状态

## 技术实现

### 1. 涉及文件
- `ui-kit/components/SideNav.svelte` - 主组件文件（新建）
- `ui-kit/components/index.ts` - 导出配置（修改）
- `src/routes/about/+page.svelte` - 组件集成（后续任务）

### 2. 实现步骤

#### 步骤1：创建组件文件
创建 `ui-kit/components/SideNav.svelte`，包含：
- TypeScript Props 接口定义
- Intersection Observer 逻辑
- 平滑滚动函数
- 移动端抽屉状态管理
- 生命周期管理

#### 步骤2：实现核心功能

**Intersection Observer 自动高亮**:
```typescript
onMount(() => {
  const options = {
    root: null,
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId = entry.target.id;
      }
    });
  }, options);

  items.forEach(item => {
    const element = document.querySelector(item.anchor);
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
});
```

**平滑滚动**:
```typescript
function scrollToSection(anchor: string) {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (isMobileOpen) {
    isMobileOpen = false; // 移动端点击后关闭抽屉
  }
}
```

#### 步骤3：实现样式
使用 SCSS 实现：
- 桌面端：固定在左侧，sticky 定位
- 移动端：浮动按钮+抽屉菜单
- 激活状态：左侧边框高亮
- 悬停效果：背景色变化

#### 步骤4：导出组件
在 `ui-kit/components/index.ts` 添加：
```typescript
export { default as SideNav } from './SideNav.svelte';
```

### 3. 关键代码逻辑

**Props接口**:
```typescript
interface SideNavProps {
  items: NavItem[];
  activeId?: string;
}

interface NavItem {
  id: string;
  label_zh: string;
  label_en: string;
  anchor: string;  // 如: #intro
  icon?: string;
}
```

**状态管理**:
```typescript
let activeId = $state('');  // 当前激活的章节ID
let isMobileOpen = $state(false);  // 移动端抽屉是否打开
```

**响应式设计**:
- 桌面端 (>1024px):
  - 左侧固定导航，宽度 240px
  - Sticky 定位，top: 100px
  - 竖向排列导航项
- 移动端 (≤1024px):
  - 右下角浮动按钮（汉堡图标）
  - 点击展开全屏抽屉菜单
  - 抽屉从右侧滑入

### 4. 数据结构

**Demo数据示例**:
```typescript
const aboutNavItems = [
  {
    id: 'intro',
    label_zh: '律所简介',
    label_en: 'Introduction',
    anchor: '#intro'
  },
  {
    id: 'history',
    label_zh: '发展历程',
    label_en: 'History',
    anchor: '#history'
  },
  {
    id: 'team',
    label_zh: '专业团队',
    label_en: 'Team',
    anchor: '#team'
  },
  {
    id: 'culture',
    label_zh: '企业文化',
    label_en: 'Culture',
    anchor: '#culture'
  },
  {
    id: 'contact',
    label_zh: '联系方式',
    label_en: 'Contact',
    anchor: '#contact'
  }
];
```

## 验收标准

### 功能验收
- [ ] Intersection Observer 正确检测当前章节
- [ ] 激活的导航项自动高亮显示
- [ ] 点击导航项平滑滚动到对应章节
- [ ] 桌面端 sticky 定位正常工作
- [ ] 移动端浮动按钮显示正确
- [ ] 移动端抽屉菜单可以打开/关闭
- [ ] 移动端点击导航项后抽屉自动关闭
- [ ] 组件卸载时清除 Intersection Observer

### 视觉验收
- [ ] 激活状态有明显的视觉反馈（左侧绿色边框）
- [ ] 悬停效果自然（背景色变化）
- [ ] 移动端抽屉滑入动画流畅
- [ ] 浮动按钮位置固定在右下角
- [ ] 字体大小和间距符合设计规范
- [ ] 响应式布局在移动端/平板/桌面都正确显示

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] 使用 Svelte 5 的 runes ($state, $derived)
- [ ] Intersection Observer 正确清理
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 响应式使用 mixins（@include respond-to）
- [ ] 组件已在 index.ts 导出

## 文件变更清单
- [ ] `ui-kit/components/SideNav.svelte` - 新建
- [ ] `ui-kit/components/index.ts` - 添加导出

## Git Commit信息

```
feat(ui): TASK-002 SideNav侧边导航组件

- Add SideNav.svelte component with TypeScript
- Support auto-highlight with Intersection Observer
- Support smooth scroll to sections
- Add responsive design (desktop sticky + mobile drawer)
- Export component in index.ts

Closes: TASK-002
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问测试页面（集成到 /about 或 /showcase）
3. 验证桌面端 sticky 定位效果
4. 滚动页面验证自动高亮功能
5. 点击导航项验证平滑滚动
6. 缩小浏览器窗口验证移动端抽屉
7. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-201（关于华诚页面集成）
- 被依赖: TASK-201, TASK-301（业务领域详情页）

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.2节
- Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- 旧网站参考: http://www.watson-band.com/（查看现有导航效果）

## 备注
- Intersection Observer 的 rootMargin 设置为 `-100px 0px -60% 0px`，确保章节进入视口上部 40% 时激活
- 移动端抽屉使用 transform 动画，性能更好
- 考虑添加返回顶部按钮（后期优化）
- 图标支持可选，初版可以不使用图标
