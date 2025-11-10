# TASK-001: Carousel轮播组件

## 状态
- [x] 已完成
- 优先级: P0
- 预计工时: 4小时 (0.5天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
首页需要一个专业的轮播Banner组件来展示律所的核心服务、重要新闻和品牌形象。这是访客进入网站后看到的第一个元素，对用户体验和品牌印象至关重要。

当前首页缺少动态的视觉吸引力，需要一个支持自动播放、手动控制、响应式设计的轮播组件。

## 目标
创建一个功能完善、视觉优雅的 Carousel 轮播组件，具备以下特性：
1. **自动播放**：默认每5秒自动切换
2. **手动控制**：支持左右箭头按钮和底部圆点导航
3. **流畅过渡**：支持淡入淡出(fade)和滑动(slide)两种过渡效果
4. **响应式设计**：完美适配移动端、平板、桌面
5. **图片预加载**：优化加载性能
6. **可配置**：支持自定义高度、间隔时间、是否显示控制器

## 技术实现

### 1. 涉及文件
- `ui-kit/components/Carousel.svelte` - 主组件文件（新建）
- `ui-kit/components/index.ts` - 导出配置（修改）
- `src/routes/showcase/+page.svelte` - 组件演示（修改）

### 2. 实现步骤

#### 步骤1：创建组件文件
创建 `ui-kit/components/Carousel.svelte`，包含：
- TypeScript Props 接口定义
- 响应式状态管理
- 自动播放逻辑
- 手动控制函数
- 图片预加载
- 生命周期管理

#### 步骤2：实现核心功能
```typescript
// 状态管理
let currentIndex = 0;
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

// 自动播放
function startAutoplay() {
  if (!autoplay) return;
  autoplayTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
  }, interval);
}

// 切换控制
function goToSlide(index: number) {
  currentIndex = index;
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    startAutoplay();
  }
}
```

#### 步骤3：实现样式
使用 SCSS 实现：
- 响应式容器布局
- 淡入淡出/滑动过渡动画
- 圆点导航样式
- 左右箭头按钮
- 移动端适配

#### 步骤4：导出组件
在 `ui-kit/components/index.ts` 添加：
```typescript
export { default as Carousel } from './Carousel.svelte';
```

#### 步骤5：添加演示
在 `src/routes/showcase/+page.svelte` 添加 Carousel 演示区块

### 3. 关键代码逻辑

**Props接口**:
```typescript
interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;        // 默认true
  interval?: number;         // 默认5000ms
  showDots?: boolean;        // 默认true
  showArrows?: boolean;      // 默认true
  transition?: 'fade' | 'slide';  // 默认fade
  height?: string;           // 默认'600px'
}

interface CarouselItem {
  id: string;
  image: string;
  title_zh: string;
  title_en: string;
  subtitle_zh?: string;
  subtitle_en?: string;
  cta?: {
    text_zh: string;
    text_en: string;
    link: string;
  };
}
```

**过渡效果**:
- **Fade模式**: 使用 `opacity` 和绝对定位，所有幻灯片叠加，通过透明度切换
- **Slide模式**: 使用 `transform: translateX()`，幻灯片横向排列，通过平移切换

**响应式设计**:
- 桌面: 高度 600px
- 移动端: 高度 400px
- 箭头按钮: 桌面 48px，移动端 36px

### 4. 数据结构

**Demo数据示例**:
```typescript
const bannerSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    title_zh: '专业的法律服务团队',
    title_en: 'Professional Legal Team',
    subtitle_zh: '30年行业经验，值得信赖',
    subtitle_en: '30 Years of Experience',
    cta: {
      text_zh: '了解更多',
      text_en: 'Learn More',
      link: '/about'
    }
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
    title_zh: '知识产权保护专家',
    title_en: 'IP Protection Experts',
    subtitle_zh: '为您的创新保驾护航',
    subtitle_en: 'Protecting Your Innovation'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
    title_zh: '全方位法律解决方案',
    title_en: 'Comprehensive Legal Solutions',
    subtitle_zh: '专注于为企业提供优质服务',
    subtitle_en: 'Dedicated to Quality Service'
  }
];
```

## 验收标准

### 功能验收
- [ ] 自动播放功能正常，间隔时间可配置
- [ ] 点击左右箭头可以切换幻灯片
- [ ] 点击圆点可以跳转到对应幻灯片
- [ ] 手动切换后自动播放重新启动
- [ ] 组件卸载时清除定时器
- [ ] 图片预加载功能正常
- [ ] 支持 fade 和 slide 两种过渡效果

### 视觉验收
- [ ] 过渡动画流畅自然（0.6s ease-out）
- [ ] 圆点导航位置正确，激活状态明显
- [ ] 左右箭头按钮hover效果正确
- [ ] 文字内容居中显示，层级正确
- [ ] 渐变遮罩层效果自然
- [ ] 响应式布局在移动端/平板/桌面都正确显示

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] Props 参数都有默认值
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 响应式使用 mixins（@include mobile）
- [ ] 组件已在 index.ts 导出
- [ ] 在 Showcase 页面有完整演示

## 文件变更清单
- [ ] `ui-kit/components/Carousel.svelte` - 新建
- [ ] `ui-kit/components/index.ts` - 添加导出
- [ ] `src/routes/showcase/+page.svelte` - 添加演示（可选）

## Git Commit信息

```
feat(ui): TASK-001 Carousel轮播组件

- Add Carousel.svelte component with TypeScript
- Support auto-play and manual control
- Support fade/slide transition modes
- Add responsive design for mobile/tablet/desktop
- Export component in index.ts

Closes: TASK-001
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问 Showcase 页面：`http://localhost:5174/showcase`
3. 验证自动播放（每5秒切换）
4. 点击左右箭头验证手动切换
5. 点击圆点验证跳转功能
6. 调整浏览器窗口验证响应式
7. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-102（首页Banner轮播集成）
- 被依赖: TASK-102

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.1节
- 旧网站参考: http://www.watson-band.com/（查看现有轮播效果）
- Unsplash 图片: https://unsplash.com/（Demo图片来源）

## 备注
- 使用 Unsplash 的律所相关图片作为 Demo
- 过渡效果默认使用 fade，性能更好
- 移动端可以考虑添加触摸滑动支持（后期优化）
- CTA 按钮是可选的，有些幻灯片可以不显示
