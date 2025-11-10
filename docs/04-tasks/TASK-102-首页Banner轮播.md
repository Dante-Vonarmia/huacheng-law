# TASK-102: 首页主视觉Banner轮播

## 状态
- [ ] 待设计确认
- 优先级: P0
- 预计工时: 8小时 (1.0天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
首页的主视觉Banner区域是用户进入网站后第一眼看到的内容，需要强烈的视觉冲击力和品牌展示效果。通过轮播展示律所的核心服务、品牌形象、重要新闻等内容，吸引用户注意力。

## 目标
在首页顶部集成 Carousel 轮播组件，展示律所的主视觉内容：
1. **轮播内容**：3-5 张高质量 Banner 图片
2. **文案展示**：每张 Banner 包含标题、副标题、CTA 按钮
3. **自动播放**：默认 5 秒自动切换
4. **交互控制**：左右箭头、底部圆点导航
5. **响应式**：移动端、平板、桌面不同尺寸适配
6. **性能优化**：图片预加载、懒加载

## 设计要求（待确认）

### 视觉设计
- [ ] Banner 尺寸：桌面 1920x700px，移动端 750x500px
- [ ] 图片主题：律所办公环境、团队合影、标志性案例等
- [ ] 文案位置：居中或左对齐（待设计稿确认）
- [ ] 字体大小：标题 48px/36px/28px（桌面/平板/移动）
- [ ] CTA 按钮样式：主色按钮，悬停效果（待确认）
- [ ] 遮罩层透明度：渐变黑色 0.3-0.6（待确认）

### 内容策略
- [ ] Banner 数量：3-5 张（待确认）
- [ ] 更新频率：月度更新或按需更新
- [ ] 内容类型：
  - Banner 1: 律所主视觉（品牌形象）
  - Banner 2: 核心服务介绍
  - Banner 3: 重要新闻或活动
  - Banner 4-5: 荣誉展示、招聘信息等

### 交互设计
- [ ] 自动播放间隔：5 秒（可调整）
- [ ] 过渡效果：淡入淡出（fade）或滑动（slide）
- [ ] 键盘支持：左右箭头键切换
- [ ] 触摸支持：移动端滑动切换（可选）
- [ ] 暂停控制：鼠标悬停时是否暂停（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/+page.svelte` - 首页主文件（修改）
- `src/lib/data/banner-slides.ts` - Banner 数据（新建）

### 2. 实现步骤

#### 步骤1：准备 Banner 数据
创建 `src/lib/data/banner-slides.ts`：
```typescript
export const bannerSlides = [
  {
    id: '1',
    image: '/images/banner/banner-1.jpg',  // 待设计提供
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
    image: '/images/banner/banner-2.jpg',
    title_zh: '知识产权保护专家',
    title_en: 'IP Protection Experts',
    subtitle_zh: '为您的创新保驾护航',
    subtitle_en: 'Protecting Your Innovation',
    cta: {
      text_zh: '查看服务',
      text_en: 'Our Services',
      link: '/practices'
    }
  },
  // ... 更多 Banner
];
```

#### 步骤2：集成到首页
在 `src/routes/+page.svelte` 中：
```svelte
<script lang="ts">
import Carousel from '$ui/components/Carousel.svelte';
import { bannerSlides } from '$lib/data/banner-slides';
</script>

<!-- Banner 轮播区 -->
<section class="home-banner">
  <Carousel
    items={bannerSlides}
    autoplay={true}
    interval={5000}
    showDots={true}
    showArrows={true}
    transition="fade"
    height="700px"
  />
</section>
```

#### 步骤3：响应式适配
```scss
.home-banner {
  width: 100%;
  margin: 0;

  @include respond-to('mobile') {
    :global(.carousel) {
      height: 500px;
    }
  }
}
```

## 验收标准

### 功能验收
- [ ] 页面加载后 Banner 自动播放
- [ ] 点击左右箭头可以切换 Banner
- [ ] 点击底部圆点可以跳转到对应 Banner
- [ ] CTA 按钮点击跳转到正确页面
- [ ] 键盘左右箭头可以控制切换
- [ ] 图片加载完成前显示占位图或背景色

### 视觉验收（待设计稿确认）
- [ ] Banner 尺寸在不同设备上正确显示
- [ ] 文案位置、字体大小符合设计稿
- [ ] CTA 按钮样式符合设计规范
- [ ] 遮罩层透明度正确
- [ ] 过渡动画流畅自然
- [ ] 圆点导航位置和样式正确

### 性能验收
- [ ] 首屏 Banner 立即显示（不延迟）
- [ ] 其他 Banner 图片预加载
- [ ] 图片使用 WebP 格式（带 fallback）
- [ ] 图片经过压缩优化
- [ ] Lighthouse 性能评分 > 90

## 设计资源需求

### 图片资源
- [ ] Banner 1: 主视觉图（1920x700px，移动端 750x500px）
- [ ] Banner 2: 服务介绍图
- [ ] Banner 3: 新闻活动图
- [ ] Banner 4-5: 其他主题图
- [ ] 格式：原图 JPG/PNG，优化后 WebP

### 文案内容
- [ ] 每个 Banner 的中英文标题
- [ ] 每个 Banner 的中英文副标题
- [ ] CTA 按钮文案
- [ ] CTA 按钮链接地址

### 设计规范
- [ ] Banner 文案字体、大小、颜色
- [ ] CTA 按钮样式规范
- [ ] 遮罩层颜色和透明度
- [ ] 响应式断点规则

## 依赖关系
- 前置任务: TASK-001（Carousel 组件已完成）
- 依赖资源: 设计稿、Banner 图片、文案内容
- 后续任务: TASK-109（性能优化）

## 文件变更清单
- [ ] `src/routes/+page.svelte` - 集成 Carousel 组件
- [ ] `src/lib/data/banner-slides.ts` - 新建 Banner 数据文件
- [ ] `static/images/banner/` - 存放 Banner 图片

## 备注
- 等待设计稿确认后再开始开发
- 图片需要设计师提供高质量原图
- 文案内容需要市场部或律所确认
- 考虑添加视频 Banner 支持（后期优化）
- 考虑添加触摸滑动支持（移动端）
