# TASK-104: 首页精选视频区

## 状态
- [ ] 待设计确认
- 优先级: P0
- 预计工时: 6小时 (0.75天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
首页需要展示律所的精选视频内容，包括专业讲座、律所介绍、案例解析等。通过视频形式，用户可以更直观地了解律所的专业能力和服务特色，增强用户信任感和互动体验。

## 目标
在首页集成精选视频展示区，具备以下特性：
1. **视频展示**：3-4 个精选视频卡片
2. **卡片信息**：封面图、标题、时长、播放按钮
3. **点击播放**：跳转到视频详情页或弹窗播放（待确认）
4. **横向滚动**：移动端支持横向滑动查看更多
5. **查看更多**：底部"查看全部视频"按钮跳转到视频列表页
6. **响应式布局**：桌面端 3 列，平板 2 列，移动端横向滚动

## 设计要求（待确认）

### 视觉设计
- [ ] 区域标题："精选视频" / "Featured Videos"
- [ ] 标题样式：字体大小、颜色、对齐方式（待确认）
- [ ] 视频卡片尺寸：16:9 比例（待确认具体尺寸）
- [ ] 封面图尺寸：640x360px（待确认）
- [ ] 布局方式：桌面端 Grid 3 列 / 移动端横向滚动（待确认）
- [ ] 卡片间距：24px / 16px（桌面/移动）（待确认）
- [ ] 播放按钮样式：圆形、三角形图标、悬停效果（待确认）
- [ ] 时长标签位置：右下角（待确认）
- [ ] 查看更多按钮样式：主色按钮 / 文字链接（待确认）

### 内容策略
- [ ] 视频数量：首页显示 3-4 个（待确认）
- [ ] 视频类型：
  - 律所介绍视频
  - 专业讲座录像
  - 案例解析视频
  - 律师访谈视频
- [ ] 更新频率：月度更新或按需更新
- [ ] 视频来源：自制 / 第三方平台（YouTube/优酷/腾讯视频）（待确认）
- [ ] 视频时长：建议 3-10 分钟

### 交互设计
- [ ] 点击行为：跳转详情页 / 弹窗播放 / 站内播放器（待确认）
- [ ] 悬停效果：封面放大、播放按钮高亮（待确认）
- [ ] 移动端滑动：是否支持触摸横向滑动（待确认）
- [ ] 加载状态：骨架屏 / 占位图（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/+page.svelte` - 首页主文件（修改）
- `src/lib/data/featured-videos.ts` - 精选视频数据（新建）
- `ui-kit/domain/VideoCard.svelte` - 视频卡片组件（已存在，TASK-005）

### 2. 实现步骤

#### 步骤1：准备视频数据
创建 `src/lib/data/featured-videos.ts`：
```typescript
export const featuredVideos = [
  {
    id: '1',
    title_zh: '华诚律所专业介绍',
    title_en: 'Watson & Band Introduction',
    description_zh: '深入了解华诚律师事务所的专业服务和团队实力',
    description_en: 'Learn about our professional services and team',
    thumbnail: '/images/videos/video-1-thumb.jpg',  // 待设计提供
    video_url: '/videos/intro.mp4',  // 或第三方平台链接
    duration: '5:30',  // 5分30秒
    category_zh: '律所介绍',
    category_en: 'Introduction',
    publish_date: '2024-10-15'
  },
  {
    id: '2',
    title_zh: '知识产权保护实务讲座',
    title_en: 'IP Protection Seminar',
    description_zh: '资深律师解析企业知识产权保护要点',
    description_en: 'Expert insights on IP protection',
    thumbnail: '/images/videos/video-2-thumb.jpg',
    video_url: 'https://www.youtube.com/watch?v=xxxxx',  // 示例
    duration: '8:45',
    category_zh: '专业讲座',
    category_en: 'Seminar',
    publish_date: '2024-09-20'
  },
  {
    id: '3',
    title_zh: '跨境并购案例解析',
    title_en: 'Cross-border M&A Case Study',
    description_zh: '解读华诚律所成功的跨境并购案例',
    description_en: 'Analysis of successful M&A cases',
    thumbnail: '/images/videos/video-3-thumb.jpg',
    video_url: '/videos/case-study.mp4',
    duration: '6:15',
    category_zh: '案例分析',
    category_en: 'Case Study',
    publish_date: '2024-08-10'
  }
  // ... 更多视频（根据设计确认数量）
];
```

#### 步骤2：集成到首页
在 `src/routes/+page.svelte` 中：
```svelte
<script lang=\"ts\">
import { VideoCard } from '$ui/domain';
import { featuredVideos } from '$lib/data/featured-videos';

function handleVideoPlay(videoId: string) {
  // 待确认：跳转详情页 / 弹窗播放 / 站内播放
  // 方案1: 跳转到详情页
  // goto(`/videos/${videoId}`);

  // 方案2: 打开弹窗播放器
  // openVideoModal(videoId);

  console.log('Play video:', videoId);
}
</script>

<!-- 精选视频区 -->
<section class=\"featured-videos\">
  <div class=\"container\">
    <div class=\"featured-videos__header\">
      <h2 class=\"featured-videos__title\">精选视频</h2>
      <p class=\"featured-videos__subtitle\">了解华诚的专业服务与行业洞察</p>
    </div>

    <div class=\"featured-videos__grid\">
      {#each featuredVideos.slice(0, 3) as video}
        <VideoCard
          title={video.title_zh}
          description={video.description_zh}
          thumbnail={video.thumbnail}
          duration={video.duration}
          category={video.category_zh}
          on:play={() => handleVideoPlay(video.id)}
        />
      {/each}
    </div>

    <div class=\"featured-videos__footer\">
      <a href=\"/videos\" class=\"btn btn--primary\">查看全部视频</a>
    </div>
  </div>
</section>
```

#### 步骤3：响应式布局样式
```scss
.featured-videos {
  padding: 80px 0;
  background: $color-bg-light;

  @include respond-to('mobile') {
    padding: 60px 0;
  }

  &__header {
    text-align: center;
    margin-bottom: 48px;

    @include respond-to('mobile') {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-size: 36px;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: 12px;

    @include respond-to('mobile') {
      font-size: 28px;
    }
  }

  &__subtitle {
    font-size: 18px;
    color: $color-text-secondary;

    @include respond-to('mobile') {
      font-size: 16px;
    }
  }

  // 桌面端：Grid 3 列
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;

    @include respond-to('tablet') {
      grid-template-columns: repeat(2, 1fr);
    }

    // 移动端：横向滚动（待确认）
    @include respond-to('mobile') {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 16px;
      padding-bottom: 16px;
      margin-bottom: 32px;

      // 隐藏滚动条（可选）
      &::-webkit-scrollbar {
        display: none;
      }

      :global(.video-card) {
        flex: 0 0 80%;
        scroll-snap-align: start;
      }
    }
  }

  &__footer {
    text-align: center;
  }
}
```

### 3. 播放方案（待确认）

**方案1：跳转到视频详情页**
```typescript
function handleVideoPlay(videoId: string) {
  goto(`/videos/${videoId}`);
}
```
- 优点：SEO 友好，独立 URL
- 缺点：需要额外页面跳转

**方案2：弹窗播放器**
```typescript
import { Modal } from '$ui/components';

let showVideoModal = $state(false);
let currentVideoUrl = $state('');

function handleVideoPlay(video: Video) {
  currentVideoUrl = video.video_url;
  showVideoModal = true;
}
```
```svelte
{#if showVideoModal}
  <Modal on:close={() => showVideoModal = false}>
    <video controls autoplay src={currentVideoUrl} />
  </Modal>
{/if}
```
- 优点：无需页面跳转，体验流畅
- 缺点：SEO 不友好

**方案3：第三方平台嵌入**
如果使用 YouTube/优酷等：
```svelte
<iframe
  src=\"https://www.youtube.com/embed/{videoId}\"
  frameborder=\"0\"
  allowfullscreen
/>
```

## 验收标准

### 功能验收（待设计确认后）
- [ ] 首页精选视频区正确显示 3-4 个视频
- [ ] 每个视频卡片显示封面、标题、时长、分类
- [ ] 点击视频卡片触发播放行为（跳转/弹窗）
- [ ] 点击"查看全部视频"跳转到视频列表页
- [ ] 移动端横向滚动流畅（如采用该方案）
- [ ] 视频封面加载失败时显示占位图

### 视觉验收（待设计稿确认）
- [ ] 区域标题样式符合设计规范
- [ ] 视频卡片尺寸、间距符合设计稿
- [ ] 播放按钮样式、悬停效果正确
- [ ] 时长标签位置和样式正确
- [ ] 桌面/平板/移动端布局正确
- [ ] 响应式断点切换正确

### 性能验收
- [ ] 视频封面图经过压缩优化
- [ ] 封面图使用 WebP 格式（带 fallback）
- [ ] 懒加载视频封面（viewport 外不加载）
- [ ] 视频本身不预加载（点击才加载）
- [ ] 移动端横向滚动性能流畅

## 设计资源需求

### 视频内容
- [ ] 3-4 个精选视频文件（或第三方平台链接）
- [ ] 每个视频的封面图（640x360px，16:9 比例）
- [ ] 视频标题（中英文）
- [ ] 视频描述（中英文，50-100 字）
- [ ] 视频时长（格式：MM:SS）
- [ ] 视频分类（律所介绍/专业讲座/案例分析等）

### 设计规范
- [ ] 区域标题字体、大小、颜色
- [ ] 视频卡片尺寸和间距
- [ ] 播放按钮样式规范
- [ ] 时长标签样式规范
- [ ] 查看更多按钮样式
- [ ] 响应式布局规则

### 视频托管方案
- [ ] 自托管：视频文件存放位置（static/videos/ 或 CDN）
- [ ] 第三方平台：YouTube/优酷/腾讯视频账号和视频 ID
- [ ] 嵌入方式：iframe / 原生 video / 第三方播放器 SDK

## 依赖关系
- 前置任务: TASK-005（VideoCard 组件已完成）
- 依赖资源: 视频文件、封面图、文案内容、设计稿
- 后续任务: TASK-605（视频列表页）、TASK-606（视频详情页）

## 文件变更清单
- [ ] `src/routes/+page.svelte` - 集成精选视频区
- [ ] `src/lib/data/featured-videos.ts` - 新建视频数据文件
- [ ] `static/images/videos/` - 存放视频封面图
- [ ] `static/videos/` - 存放视频文件（如自托管）

## 备注
- 等待设计稿确认后再开始开发
- 需要确认视频播放方案（详情页/弹窗/第三方嵌入）
- 需要确认视频托管方案（自托管/第三方平台）
- 移动端横向滚动需要确认是否采用
- 考虑视频懒加载和性能优化
- 考虑添加视频播放统计（后期优化）
