# TASK-005: VideoCard视频卡片组件

## 状态
- [x] 已完成
- 优先级: P1
- 预计工时: 2.4小时 (0.3天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
在首页"精选视频区"需要展示律所的宣传视频、讲座录像、专业讲解等视频内容。视频卡片组件需要提供视觉吸引力和良好的交互体验，引导用户点击观看。

当前缺少专门的视频卡片组件，需要一个支持缩略图预览、播放按钮、时长显示、点击播放的视频卡片组件。

## 目标
创建一个功能完善的 VideoCard 视频卡片组件，具备以下特性：
1. **缩略图预览**：显示视频封面图（16:9 比例）
2. **播放按钮**：悬停时放大的播放按钮
3. **时长显示**：右下角显示视频时长（如：5:32）
4. **渐变遮罩**：底部渐变遮罩增强可读性
5. **视频信息**：标题、发布日期、观看次数、分类
6. **两种样式**：default（完整信息）和 compact（紧凑）
7. **点击播放**：触发 play 事件，由父组件处理播放（Modal）

## 技术实现

### 1. 涉及文件
- `ui-kit/domain/VideoCard.svelte` - 主组件文件（新建）
- `ui-kit/domain/index.ts` - 导出配置（修改）
- `src/routes/+page.svelte` - 组件集成（后续任务）

### 2. 实现步骤

#### 步骤1：创建组件文件
创建 `ui-kit/domain/VideoCard.svelte`，包含：
- TypeScript Props 接口定义
- play 事件派发
- 缩略图容器（16:9 比例）
- 播放按钮图标
- 时长标签
- 视频信息区

#### 步骤2：实现核心功能

**事件派发**:
```typescript
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
  play: { videoId: string; videoUrl: string };
}>();

function handlePlay() {
  dispatch('play', {
    videoId: video.id,
    videoUrl: video.video_url
  });
}
```

**播放按钮样式**:
- 白色圆形背景（64px）
- 绿色三角形播放图标
- 悬停时放大 1.1 倍

**时长显示**:
- 右下角绝对定位
- 黑色半透明背景
- 白色文字

#### 步骤3：实现样式
使用 SCSS 实现：
- 16:9 比例缩略图容器（aspect-ratio）
- 底部渐变遮罩（从透明到黑色 70%）
- 播放按钮居中定位
- 悬停时卡片上移 4px
- 标题截断（最多 2 行）
- 元信息样式（日期、观看次数）

#### 步骤4：导出组件
在 `ui-kit/domain/index.ts` 添加（或创建文件）：
```typescript
export { default as VideoCard } from './VideoCard.svelte';
```

### 3. 关键代码逻辑

**Props接口**:
```typescript
interface VideoCardProps {
  video: Video;
  variant?: 'default' | 'compact'; // 默认default
}

interface Video {
  id: string;
  title_zh: string;
  title_en: string;
  thumbnail: string;           // 缩略图URL
  duration: string;            // 时长 "5:32"
  video_url: string;           // YouTube embed URL 或本地路径
  description_zh?: string;
  description_en?: string;
  views?: number;              // 观看次数
  published_date?: string;     // 发布日期
  category?: string;           // 分类
}
```

**样式要点**:
```scss
.video-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);

    .video-card__play {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  &__thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  }

  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    // 三角形播放图标
    &::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 20px solid $color-primary;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      margin-left: 4px;
    }
  }

  &__duration {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
  }

  &__info {
    padding: 16px;
    background: white;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: $color-text-secondary;
  }
}
```

### 4. 数据结构

**Demo数据示例**:
```typescript
const videos = [
  {
    id: '1',
    title_zh: '华诚律所 - 知识产权保护专题讲座',
    title_en: 'Watson & Band - IP Protection Seminar',
    thumbnail: 'https://images.unsplash.com/photo-1560439513-74b037a25d84',
    duration: '12:35',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description_zh: '深入解析知识产权保护的法律要点',
    views: 1523,
    published_date: '2025-10-15',
    category: '专业讲座'
  },
  {
    id: '2',
    title_zh: '企业合规管理实务分享',
    title_en: 'Corporate Compliance Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    duration: '8:42',
    video_url: 'https://www.youtube.com/embed/abc123',
    views: 987,
    published_date: '2025-09-20',
    category: '实务分享'
  }
];
```

**使用示例（父组件处理播放）**:
```svelte
<script>
import VideoCard from '$ui/domain/VideoCard.svelte';
import Modal from '$ui/components/Modal.svelte';

let isVideoModalOpen = false;
let currentVideo = { url: '', title: '' };

function handleVideoPlay(event) {
  const { videoUrl, videoId } = event.detail;
  currentVideo = { url: videoUrl, title: videos.find(v => v.id === videoId)?.title_zh || '' };
  isVideoModalOpen = true;
}
</script>

<div class="video-grid">
  {#each videos as video}
    <VideoCard {video} on:play={handleVideoPlay} />
  {/each}
</div>

<!-- 视频播放 Modal -->
<Modal bind:isOpen={isVideoModalOpen} size="xl">
  <div class="video-player">
    <h2>{currentVideo.title}</h2>
    <div class="video-player__container">
      <iframe
        src={currentVideo.url}
        title={currentVideo.title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</Modal>
```

## 验收标准

### 功能验收
- [ ] 缩略图正确显示（16:9 比例）
- [ ] 播放按钮居中显示
- [ ] 时长标签显示在右下角
- [ ] 点击卡片触发 play 事件
- [ ] play 事件携带 videoId 和 videoUrl
- [ ] 标题最多显示 2 行，超出显示省略号
- [ ] default 和 compact 两种样式都正常工作

### 视觉验收
- [ ] 悬停时卡片上移 4px
- [ ] 悬停时播放按钮放大 1.1 倍
- [ ] 渐变遮罩从透明到黑色 70%
- [ ] 播放按钮白色圆形背景+绿色三角形
- [ ] 时长标签黑色半透明背景
- [ ] 标题、日期、观看次数样式正确
- [ ] 响应式布局正确

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] 正确使用 createEventDispatcher
- [ ] 使用 aspect-ratio 保持 16:9 比例
- [ ] 播放图标使用 CSS 三角形（::after）
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 组件已在 domain/index.ts 导出

## 文件变更清单
- [ ] `ui-kit/domain/VideoCard.svelte` - 新建
- [ ] `ui-kit/domain/index.ts` - 添加导出（或新建）

## Git Commit信息

```
feat(ui): TASK-005 VideoCard视频卡片组件

- Add VideoCard.svelte component with TypeScript
- Support 16:9 aspect ratio thumbnail display
- Add play button with hover scale animation
- Add duration label and gradient overlay
- Support default/compact variants
- Dispatch play event for parent handling
- Export component in domain/index.ts

Closes: TASK-005
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问测试页面（集成到首页或 /showcase）
3. 验证缩略图 16:9 比例
4. 验证播放按钮居中显示
5. 验证时长标签位置
6. 点击卡片验证 play 事件
7. 验证悬停动画效果
8. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-104（首页精选视频区）
- 被依赖: TASK-104

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.2节
- YouTube Embed API: https://developers.google.com/youtube/iframe_api_reference
- Aspect Ratio CSS: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio

## 备注
- 缩略图使用 aspect-ratio 而非 padding-bottom hack
- 播放图标使用纯 CSS 实现（::after 伪元素）
- video_url 支持 YouTube embed URL 或本地视频路径
- 视频播放由父组件通过 Modal 处理
- compact 变体可以隐藏部分元信息（如观看次数）
- 考虑添加加载占位图（后期优化）
