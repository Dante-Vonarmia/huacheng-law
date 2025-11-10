# 技术实现规格说明

## 一、新建组件技术规格

### 1.1 Carousel 轮播组件

**文件路径**: `ui-kit/components/Carousel.svelte`

**Props接口**:
```typescript
interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean; // 默认true
  interval?: number; // 默认5000ms
  showDots?: boolean; // 默认true
  showArrows?: boolean; // 默认true
  transition?: 'fade' | 'slide'; // 默认fade
  height?: string; // 默认'600px'
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

**核心功能**:
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

// 手动控制
function goToSlide(index: number) {
  currentIndex = index;
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    startAutoplay(); // 重启自动播放
  }
}

function nextSlide() {
  goToSlide((currentIndex + 1) % items.length);
}

function prevSlide() {
  goToSlide((currentIndex - 1 + items.length) % items.length);
}

// 响应式图片预加载
onMount(() => {
  items.forEach(item => {
    const img = new Image();
    img.src = item.image;
  });
  startAutoplay();
});

onDestroy(() => {
  if (autoplayTimer) clearInterval(autoplayTimer);
});
```

**样式要点**:
```scss
.carousel {
  position: relative;
  width: 100%;
  height: var(--carousel-height, 600px);
  overflow: hidden;

  &__track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    // or use opacity for fade transition
  }

  &__slide {
    flex: 0 0 100%;
    position: relative;

    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 2;
    }

    &-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
      z-index: 1;
    }
  }

  &__dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 3;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s;

    &--active {
      background: white;
      width: 32px;
      border-radius: 6px;
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }

    &--prev {
      left: 24px;
    }

    &--next {
      right: 24px;
    }
  }

  @include mobile {
    height: 400px;

    &__arrow {
      width: 36px;
      height: 36px;
    }
  }
}
```

**使用示例**:
```svelte
<script>
import Carousel from '$ui/components/Carousel.svelte';

const bannerSlides = [
  {
    id: '1',
    image: '/images/banner/legal-services.jpg',
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
  // more...
];
</script>

<Carousel
  items={bannerSlides}
  autoplay={true}
  interval={5000}
  transition="fade"
  height="700px"
/>
```

---

### 1.2 VideoCard 视频卡片组件

**文件路径**: `ui-kit/domain/VideoCard.svelte`

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
  thumbnail: string;
  duration: string; // "5:32"
  video_url: string; // YouTube embed URL or local path
  description_zh?: string;
  description_en?: string;
  views?: number;
  published_date?: string;
  category?: string;
}
```

**核心功能**:
```typescript
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher<{
  play: { videoId: string; videoUrl: string };
}>();

let isPlaying = false;

function handlePlay() {
  dispatch('play', {
    videoId: video.id,
    videoUrl: video.video_url
  });
  // Parent component can handle opening modal
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
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: $color-text-primary;
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

**视频播放Modal组件**:
```svelte
<!-- ui-kit/components/VideoModal.svelte -->
<script lang="ts">
import Modal from '$ui/components/Modal.svelte';

export let isOpen = false;
export let videoUrl = '';
export let title = '';

function handleClose() {
  isOpen = false;
  // Clear iframe to stop video
  videoUrl = '';
}
</script>

<Modal {isOpen} on:close={handleClose} size="xl">
  <div class="video-modal">
    <h2>{title}</h2>
    <div class="video-modal__player">
      {#if videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')}
        <iframe
          src={videoUrl}
          title={title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else}
        <video controls autoplay>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      {/if}
    </div>
  </div>
</Modal>

<style lang="scss">
.video-modal {
  &__player {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: black;

    iframe,
    video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
```

---

### 1.3 CaseCard 案例卡片组件

**文件路径**: `ui-kit/domain/CaseCard.svelte`

**Props接口**:
```typescript
interface CaseCardProps {
  case: Case;
  variant?: 'default' | 'featured'; // 默认default
}

interface Case {
  id: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
  practice_area: string;
  result_zh: string;
  result_en: string;
  amount?: string; // "涉案金额5000万"
  year: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}
```

**样式要点**:
```scss
.case-card {
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);

    .case-card__image img {
      transform: scale(1.05);
    }
  }

  &--featured {
    border: 2px solid $color-secondary;

    .case-card__badge {
      background: $color-secondary;
    }
  }

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: $color-bg-secondary;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }

  &__badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: $color-primary;
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
  }

  &__content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__practice {
    font-size: 14px;
    color: $color-primary;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__summary {
    font-size: 15px;
    line-height: 1.6;
    color: $color-text-secondary;
    margin-bottom: 16px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__result {
    background: $color-bg-light;
    padding: 12px 16px;
    border-radius: 4px;
    border-left: 3px solid $color-accent;
    margin-bottom: 16px;

    &-label {
      font-size: 12px;
      color: $color-text-tertiary;
      margin-bottom: 4px;
    }

    &-text {
      font-size: 15px;
      font-weight: 600;
      color: $color-accent;
    }
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: $color-text-tertiary;
  }

  &__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}
```

---

### 1.4 SideNav 侧边导航组件

**文件路径**: `ui-kit/components/SideNav.svelte`

**Props接口**:
```typescript
interface SideNavProps {
  items: NavItem[];
  activeId?: string; // 当前激活项ID
}

interface NavItem {
  id: string;
  label_zh: string;
  label_en: string;
  anchor: string; // #intro
  icon?: string; // 可选图标
}
```

**核心功能**:
```typescript
import { onMount, onDestroy } from 'svelte';
import { writable } from 'svelte/store';

let activeId = writable<string>(items[0]?.id || '');
let isMobileMenuOpen = false;

// Intersection Observer for auto-highlight
function setupObserver() {
  const options = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const item = items.find(item => item.anchor === `#${id}`);
        if (item) {
          activeId.set(item.id);
        }
      }
    });
  }, options);

  items.forEach(item => {
    const anchor = item.anchor.replace('#', '');
    const element = document.getElementById(anchor);
    if (element) {
      observer.observe(element);
    }
  });

  return observer;
}

// Smooth scroll to anchor
function scrollToAnchor(anchor: string) {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    isMobileMenuOpen = false;
  }
}

let observer: IntersectionObserver | null = null;

onMount(() => {
  observer = setupObserver();
});

onDestroy(() => {
  if (observer) {
    observer.disconnect();
  }
});
```

**样式要点**:
```scss
.side-nav {
  position: sticky;
  top: 100px; // Below navigation
  height: fit-content;
  max-height: calc(100vh - 150px);
  overflow-y: auto;

  @include mobile {
    position: fixed;
    bottom: 20px;
    right: 20px;
    top: auto;
    z-index: 100;

    &__toggle {
      display: block;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: $color-primary;
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }

  @include desktop {
    &__toggle {
      display: none;
    }
  }

  &__menu {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    @include mobile {
      position: absolute;
      bottom: 70px;
      right: 0;
      min-width: 200px;
      display: none;

      &--open {
        display: block;
      }
    }
  }

  &__item {
    display: block;
    padding: 12px 16px;
    color: $color-text-secondary;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: $color-primary;
      background: $color-bg-light;
    }

    &--active {
      color: $color-primary;
      border-left-color: $color-primary;
      background: $color-bg-light;
      font-weight: 600;
    }
  }
}
```

---

### 1.5 OrgChart 组织架构图组件

**文件路径**: `ui-kit/components/OrgChart.svelte`

**Props接口**:
```typescript
interface OrgChartProps {
  data: OrgNode;
  variant?: 'tree' | 'list'; // 默认tree
}

interface OrgNode {
  id: string;
  name_zh: string;
  name_en: string;
  type: 'headquarters' | 'branch' | 'department' | 'team';
  employees?: number;
  leader?: string;
  children?: OrgNode[];
  collapsed?: boolean;
}
```

**核心功能**:
```typescript
import { writable } from 'svelte/store';

// 可折叠节点状态管理
const collapsedNodes = writable<Set<string>>(new Set());

function toggleNode(nodeId: string) {
  collapsedNodes.update(set => {
    const newSet = new Set(set);
    if (newSet.has(nodeId)) {
      newSet.delete(nodeId);
    } else {
      newSet.add(nodeId);
    }
    return newSet;
  });
}

function isCollapsed(nodeId: string, $collapsedNodes: Set<string>): boolean {
  return $collapsedNodes.has(nodeId);
}
```

**递归组件结构**:
```svelte
<!-- OrgChart.svelte -->
<script lang="ts">
export let data: OrgNode;
export let variant: 'tree' | 'list' = 'tree';

import OrgNode from './OrgNode.svelte';
</script>

<div class="org-chart" class:org-chart--{variant}>
  <OrgNode node={data} level={0} {variant} />
</div>

<!-- OrgNode.svelte (递归子组件) -->
<script lang="ts">
export let node: OrgNode;
export let level: number = 0;
export let variant: 'tree' | 'list' = 'tree';

let isCollapsed = false;

function toggleCollapse() {
  isCollapsed = !isCollapsed;
}
</script>

<div class="org-node" class:org-node--level-{level}>
  <button
    class="org-node__card"
    class:org-node__card--{node.type}
    on:click={toggleCollapse}
    disabled={!node.children || node.children.length === 0}
  >
    <div class="org-node__name">{node.name_zh}</div>
    {#if node.leader}
      <div class="org-node__leader">{node.leader}</div>
    {/if}
    {#if node.employees}
      <div class="org-node__employees">{node.employees} 人</div>
    {/if}
    {#if node.children && node.children.length > 0}
      <div class="org-node__toggle">
        {isCollapsed ? '+' : '-'}
      </div>
    {/if}
  </button>

  {#if node.children && !isCollapsed}
    <div class="org-node__children">
      {#each node.children as child}
        <svelte:self node={child} level={level + 1} {variant} />
      {/each}
    </div>
  {/if}
</div>
```

**样式要点**:
```scss
.org-chart {
  padding: 40px 0;

  &--tree {
    .org-node {
      &__children {
        display: flex;
        gap: 24px;
        justify-content: center;
        margin-top: 24px;
        flex-wrap: wrap;

        &::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 50%;
          width: 2px;
          height: 12px;
          background: $color-border;
        }
      }
    }
  }

  &--list {
    .org-node {
      &__children {
        margin-left: 32px;
        margin-top: 16px;
        border-left: 2px solid $color-border;
        padding-left: 16px;
      }
    }
  }
}

.org-node {
  position: relative;

  &__card {
    background: white;
    border: 2px solid $color-border;
    border-radius: 8px;
    padding: 16px 24px;
    min-width: 200px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &--headquarters {
      border-color: $color-primary;
      background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
      color: white;
    }

    &--branch {
      border-color: $color-accent;
      background: $color-bg-light;
    }

    &--department {
      border-color: $color-border;
    }
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__leader {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  &__employees {
    font-size: 13px;
    opacity: 0.7;
  }

  &__toggle {
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: $color-primary;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
  }

  @include mobile {
    &__card {
      min-width: 150px;
      padding: 12px 16px;
      font-size: 14px;
    }
  }
}
```

---

### 1.6 FilterBar 筛选条组件

**文件路径**: `ui-kit/components/FilterBar.svelte`

**Props接口**:
```typescript
interface FilterBarProps {
  filters: FilterConfig[];
  onFilterChange?: (filters: FilterValues) => void;
}

interface FilterConfig {
  id: string;
  type: 'select' | 'multiselect' | 'search' | 'radio';
  label_zh: string;
  label_en: string;
  placeholder_zh?: string;
  placeholder_en?: string;
  options?: FilterOption[];
}

interface FilterOption {
  value: string;
  label_zh: string;
  label_en: string;
  count?: number;
}

type FilterValues = Record<string, string | string[]>;
```

**核心功能**:
```typescript
import { writable } from 'svelte/store';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
  change: FilterValues;
}>();

let filterValues = writable<FilterValues>({});

function handleFilterChange(filterId: string, value: any) {
  filterValues.update(values => {
    const newValues = { ...values, [filterId]: value };
    dispatch('change', newValues);
    return newValues;
  });
}

function resetFilters() {
  filterValues.set({});
  dispatch('change', {});
}

// Helper: Apply filters to data
export function applyFilters<T>(
  data: T[],
  filterValues: FilterValues,
  filterFn: (item: T, values: FilterValues) => boolean
): T[] {
  if (Object.keys(filterValues).length === 0) {
    return data;
  }
  return data.filter(item => filterFn(item, filterValues));
}
```

**样式要点**:
```scss
.filter-bar {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__reset {
    font-size: 14px;
    color: $color-primary;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: $color-accent;
    }
  }

  &__filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    color: $color-text-primary;
  }

  &__select,
  &__input {
    padding: 10px 14px;
    border: 1px solid $color-border;
    border-radius: 4px;
    font-size: 15px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }

  &__multiselect {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid $color-border;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: $color-primary;
      background: $color-bg-light;
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    &--checked {
      border-color: $color-primary;
      background: rgba($color-primary, 0.1);
    }
  }
}
```

**使用示例**:
```svelte
<script>
import FilterBar, { applyFilters } from '$ui/components/FilterBar.svelte';

const filters = [
  {
    id: 'practice',
    type: 'multiselect',
    label_zh: '业务领域',
    label_en: 'Practice Area',
    options: [
      { value: 'ip', label_zh: '知识产权', label_en: 'IP', count: 15 },
      { value: 'corporate', label_zh: '公司法务', label_en: 'Corporate', count: 20 },
      // more...
    ]
  },
  {
    id: 'title',
    type: 'select',
    label_zh: '职称',
    label_en: 'Title',
    options: [
      { value: 'partner', label_zh: '合伙人', label_en: 'Partner' },
      { value: 'senior', label_zh: '资深律师', label_en: 'Senior Lawyer' },
      // more...
    ]
  },
  {
    id: 'keyword',
    type: 'search',
    label_zh: '关键词搜索',
    label_en: 'Search',
    placeholder_zh: '搜索律师姓名或专长...',
    placeholder_en: 'Search name or expertise...'
  }
];

let allLawyers = [...]; // 原始数据
let filteredLawyers = allLawyers;

function handleFilterChange(event) {
  const filterValues = event.detail;

  filteredLawyers = applyFilters(allLawyers, filterValues, (lawyer, values) => {
    // Practice area filter
    if (values.practice && values.practice.length > 0) {
      if (!values.practice.some(p => lawyer.practice_areas.includes(p))) {
        return false;
      }
    }

    // Title filter
    if (values.title && lawyer.title !== values.title) {
      return false;
    }

    // Keyword search
    if (values.keyword) {
      const keyword = values.keyword.toLowerCase();
      const searchText = `${lawyer.name_zh} ${lawyer.name_en} ${lawyer.bio_zh}`.toLowerCase();
      if (!searchText.includes(keyword)) {
        return false;
      }
    }

    return true;
  });
}
</script>

<FilterBar {filters} on:change={handleFilterChange} />

<div class="lawyer-grid">
  {#each filteredLawyers as lawyer}
    <LawyerCard {lawyer} />
  {/each}
</div>
```

---

### 1.7 Pagination 分页组件

**文件路径**: `ui-kit/components/Pagination.svelte`

**Props接口**:
```typescript
interface PaginationProps {
  total: number; // 总条数
  pageSize: number; // 每页条数
  currentPage: number; // 当前页码（从1开始）
  pageSizeOptions?: number[]; // 每页条数选项，默认[12, 24, 48]
  showPageSize?: boolean; // 是否显示每页条数选择器，默认true
  showTotal?: boolean; // 是否显示总数，默认true
  maxPageButtons?: number; // 最多显示页码按钮数，默认7
}
```

**核心功能**:
```typescript
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
  pageChange: number;
  pageSizeChange: number;
}>();

$: totalPages = Math.ceil(total / pageSize);
$: startItem = (currentPage - 1) * pageSize + 1;
$: endItem = Math.min(currentPage * pageSize, total);

// 生成页码按钮数组
$: pageNumbers = generatePageNumbers(currentPage, totalPages, maxPageButtons);

function generatePageNumbers(current: number, total: number, max: number): (number | string)[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (current > 3) {
    pages.push('...');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  pages.push(total);

  return pages;
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    dispatch('pageChange', page);
  }
}

function changePageSize(size: number) {
  dispatch('pageSizeChange', size);
  // Reset to page 1 when page size changes
  dispatch('pageChange', 1);
}
```

**样式要点**:
```scss
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  &__info {
    font-size: 14px;
    color: $color-text-secondary;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__button {
    min-width: 36px;
    height: 36px;
    padding: 0 12px;
    border: 1px solid $color-border;
    background: white;
    color: $color-text-primary;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(:disabled) {
      border-color: $color-primary;
      color: $color-primary;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &--active {
      background: $color-primary;
      color: white;
      border-color: $color-primary;
    }

    &--ellipsis {
      cursor: default;
      border: none;

      &:hover {
        border: none;
        color: $color-text-primary;
      }
    }
  }

  &__size-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    select {
      padding: 6px 10px;
      border: 1px solid $color-border;
      border-radius: 4px;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: $color-primary;
      }
    }
  }

  @include mobile {
    flex-direction: column;
    align-items: stretch;

    &__controls {
      justify-content: center;
    }

    &__info {
      text-align: center;
    }
  }
}
```

---

## 二、数据适配器层设计

### 2.1 目录结构

```
src/lib/adapters/
├── api/
│   ├── types.ts              # 公共类型定义
│   ├── base.adapter.ts       # 基础适配器类
│   ├── lawyers.adapter.ts    # 律师数据适配器
│   ├── practices.adapter.ts  # 业务领域适配器
│   ├── news.adapter.ts       # 新闻适配器
│   ├── publications.adapter.ts
│   ├── events.adapter.ts
│   ├── careers.adapter.ts
│   └── index.ts              # 统一导出
├── mock/
│   ├── lawyers.json          # 模拟律师数据
│   ├── practices.json        # 模拟业务领域数据
│   ├── news.json
│   ├── publications.json
│   ├── events.json
│   └── careers.json
└── README.md                 # 适配器使用文档
```

### 2.2 类型定义（types.ts）

```typescript
// src/lib/adapters/api/types.ts

// ============= API 响应基础类型 =============
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

// ============= 律师 API 数据类型 =============
export interface LawyerApiData {
  id: number;
  name: string;
  name_en?: string;
  title: string;
  photo_url: string;
  office_id: number;
  practice_area_ids: number[];
  languages: string[];
  email: string;
  phone: string;
  bio: string;
  bio_en?: string;
  education: string[];
  experience_years: number;
  is_partner: boolean;
  is_featured: boolean;
  display_order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

// 前端展示数据类型
export interface Lawyer {
  id: string;
  name_zh: string;
  name_en: string;
  title_zh: string;
  title_en: string;
  photo: string;
  office: string;
  practice_areas: string[];
  languages: string[];
  email: string;
  phone: string;
  bio_zh: string;
  bio_en: string;
  education: string[];
  experience: string;
  isPartner: boolean;
  isFeatured: boolean;
}

// ============= 业务领域 API 数据类型 =============
export interface PracticeAreaApiData {
  id: number;
  slug: string;
  name: string;
  name_en?: string;
  description: string;
  description_en?: string;
  icon_url?: string;
  cover_image_url?: string;
  services: string[];
  case_count: number;
  team_member_ids: number[];
  display_order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface PracticeArea {
  id: string;
  slug: string;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  icon?: string;
  coverImage?: string;
  services: string[];
  cases: string;
}

// ============= 新闻 API 数据类型 =============
export interface NewsApiData {
  id: number;
  title: string;
  title_en?: string;
  summary: string;
  summary_en?: string;
  content: string; // HTML
  content_en?: string;
  category_id: number;
  author_id: number;
  cover_image_url?: string;
  published_at: string;
  read_time_minutes: number;
  views: number;
  is_featured: boolean;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
  content_zh: string;
  content_en: string;
  category: string;
  author: string;
  coverImage?: string;
  publishedDate: string;
  readTime: string;
  views?: number;
  isFeatured: boolean;
  tags: string[];
}

// ============= 通用筛选/排序参数 =============
export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  search?: string;
}
```

### 2.3 基础适配器类（base.adapter.ts）

```typescript
// src/lib/adapters/api/base.adapter.ts
import type { ApiResponse, PaginatedApiResponse, ErrorResponse, QueryParams } from './types';

export abstract class BaseAdapter {
  protected baseUrl: string;
  protected mockMode: boolean;

  constructor(baseUrl: string = '/api', mockMode: boolean = true) {
    this.baseUrl = baseUrl;
    this.mockMode = mockMode;
  }

  /**
   * 通用 GET 请求
   */
  protected async get<T>(
    endpoint: string,
    params?: QueryParams
  ): Promise<ApiResponse<T> | PaginatedApiResponse<T>> {
    if (this.mockMode) {
      return this.getMockData(endpoint, params);
    }

    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url);

    if (!response.ok) {
      return this.handleError(response);
    }

    return response.json();
  }

  /**
   * 通用 POST 请求
   */
  protected async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    if (this.mockMode) {
      console.log('[Mock POST]', endpoint, data);
      return {
        success: true,
        data: data as T,
        timestamp: new Date().toISOString()
      };
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return this.handleError(response);
    }

    return response.json();
  }

  /**
   * 构建URL（含查询参数）
   */
  private buildUrl(endpoint: string, params?: QueryParams): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            url.searchParams.append(key, JSON.stringify(value));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  /**
   * 错误处理
   */
  private async handleError(response: Response): Promise<ErrorResponse> {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // 无法解析错误响应，使用默认错误消息
    }

    return {
      success: false,
      error: {
        code: `HTTP_${response.status}`,
        message: errorMessage
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 获取模拟数据（子类实现）
   */
  protected abstract getMockData(endpoint: string, params?: QueryParams): Promise<any>;

  /**
   * 日期格式化
   */
  protected formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
    const date = new Date(dateString);

    if (format === 'short') {
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
}
```

### 2.4 律师适配器示例（lawyers.adapter.ts）

```typescript
// src/lib/adapters/api/lawyers.adapter.ts
import { BaseAdapter } from './base.adapter';
import type {
  LawyerApiData,
  Lawyer,
  QueryParams,
  PaginatedApiResponse
} from './types';
import mockLawyersData from '../mock/lawyers.json';

class LawyersAdapter extends BaseAdapter {
  /**
   * 获取律师列表
   */
  async getAll(params?: QueryParams): Promise<PaginatedApiResponse<Lawyer>> {
    const response = await this.get<LawyerApiData>('/lawyers', params);

    if ('pagination' in response) {
      return {
        ...response,
        data: response.data.map(this.adaptLawyer)
      };
    }

    // 如果没有分页信息，构造默认分页响应
    return {
      success: response.success,
      data: Array.isArray(response.data)
        ? response.data.map(this.adaptLawyer)
        : [this.adaptLawyer(response.data)],
      pagination: {
        page: 1,
        pageSize: 999,
        total: Array.isArray(response.data) ? response.data.length : 1,
        totalPages: 1
      },
      timestamp: response.timestamp
    };
  }

  /**
   * 根据ID获取律师详情
   */
  async getById(id: string): Promise<Lawyer | null> {
    const response = await this.get<LawyerApiData>(`/lawyers/${id}`);

    if (!response.success) {
      return null;
    }

    return this.adaptLawyer(response.data as LawyerApiData);
  }

  /**
   * 根据业务领域筛选律师
   */
  async getByPracticeArea(practiceAreaId: string, params?: QueryParams): Promise<Lawyer[]> {
    const response = await this.get<LawyerApiData>(
      '/lawyers',
      {
        ...params,
        filters: { practice_area_ids: [practiceAreaId] }
      }
    );

    if (!response.success || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map(this.adaptLawyer);
  }

  /**
   * 数据适配：API格式 → 前端格式
   */
  private adaptLawyer(apiData: LawyerApiData): Lawyer {
    return {
      id: String(apiData.id),
      name_zh: apiData.name,
      name_en: apiData.name_en || apiData.name,
      title_zh: apiData.title,
      title_en: apiData.title, // TODO: 真实API应提供英文职称
      photo: apiData.photo_url,
      office: this.getOfficeName(apiData.office_id),
      practice_areas: this.getPracticeAreaNames(apiData.practice_area_ids),
      languages: apiData.languages,
      email: apiData.email,
      phone: apiData.phone,
      bio_zh: apiData.bio,
      bio_en: apiData.bio_en || apiData.bio,
      education: apiData.education,
      experience: `${apiData.experience_years}年执业经验`,
      isPartner: apiData.is_partner,
      isFeatured: apiData.is_featured
    };
  }

  /**
   * Mock数据获取
   */
  protected async getMockData(endpoint: string, params?: QueryParams): Promise<any> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    const lawyers = mockLawyersData as LawyerApiData[];

    // 根据 endpoint 返回不同数据
    if (endpoint.includes('/lawyers/')) {
      const id = parseInt(endpoint.split('/').pop() || '0');
      const lawyer = lawyers.find(l => l.id === id);

      if (!lawyer) {
        return {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Lawyer not found' },
          timestamp: new Date().toISOString()
        };
      }

      return {
        success: true,
        data: lawyer,
        timestamp: new Date().toISOString()
      };
    }

    // 列表请求：应用筛选和分页
    let filteredLawyers = lawyers;

    // 应用筛选
    if (params?.filters) {
      const { practice_area_ids, office_id, is_partner } = params.filters;

      if (practice_area_ids) {
        filteredLawyers = filteredLawyers.filter(lawyer =>
          practice_area_ids.some((id: number) =>
            lawyer.practice_area_ids.includes(id)
          )
        );
      }

      if (office_id !== undefined) {
        filteredLawyers = filteredLawyers.filter(
          lawyer => lawyer.office_id === office_id
        );
      }

      if (is_partner !== undefined) {
        filteredLawyers = filteredLawyers.filter(
          lawyer => lawyer.is_partner === is_partner
        );
      }
    }

    // 应用搜索
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredLawyers = filteredLawyers.filter(lawyer =>
        lawyer.name.toLowerCase().includes(search) ||
        lawyer.bio.toLowerCase().includes(search)
      );
    }

    // 应用排序
    if (params?.sortBy) {
      const { sortBy, sortOrder = 'asc' } = params;
      filteredLawyers.sort((a, b) => {
        const aVal = (a as any)[sortBy];
        const bVal = (b as any)[sortBy];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    // 应用分页
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 12;
    const start = (page - 1) * pageSize;
    const paginatedLawyers = filteredLawyers.slice(start, start + pageSize);

    return {
      success: true,
      data: paginatedLawyers,
      pagination: {
        page,
        pageSize,
        total: filteredLawyers.length,
        totalPages: Math.ceil(filteredLawyers.length / pageSize)
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 辅助方法：获取办公室名称
   */
  private getOfficeName(officeId: number): string {
    const offices: Record<number, string> = {
      1: '上海',
      2: '北京',
      3: '深圳'
    };
    return offices[officeId] || '未知';
  }

  /**
   * 辅助方法：获取业务领域名称
   */
  private getPracticeAreaNames(ids: number[]): string[] {
    const practiceAreas: Record<number, string> = {
      1: '知识产权',
      2: '公司法务',
      3: '诉讼仲裁',
      4: '金融法',
      5: '房地产法',
      6: '劳动法'
    };
    return ids.map(id => practiceAreas[id] || `领域${id}`);
  }
}

// 导出单例
export const lawyersAdapter = new LawyersAdapter('/api', true); // mockMode = true
```

---

## 三、页面整合示例

### 3.1 律师团队页面完整实现

```svelte
<!-- src/routes/team/+page.svelte -->
<script lang="ts">
import { onMount } from 'svelte';
import Navigation from '$ui/layouts/Navigation.svelte';
import Footer from '$ui/layouts/Footer.svelte';
import Hero from '$ui/layouts/Hero.svelte';
import FilterBar from '$ui/components/FilterBar.svelte';
import Pagination from '$ui/components/Pagination.svelte';
import LawyerCard from '$ui/domain/LawyerCard.svelte';
import { lawyersAdapter } from '$lib/adapters/api/lawyers.adapter';
import type { Lawyer } from '$lib/adapters/api/types';

// 数据状态
let lawyers: Lawyer[] = [];
let filteredLawyers: Lawyer[] = [];
let displayedLawyers: Lawyer[] = [];
let isLoading = true;
let error: string | null = null;

// 分页状态
let currentPage = 1;
let pageSize = 12;
let total = 0;

// 筛选配置
const filters = [
  {
    id: 'practice',
    type: 'multiselect',
    label_zh: '业务领域',
    label_en: 'Practice Area',
    options: [
      { value: '知识产权', label_zh: '知识产权', label_en: 'IP' },
      { value: '公司法务', label_zh: '公司法务', label_en: 'Corporate' },
      { value: '诉讼仲裁', label_zh: '诉讼仲裁', label_en: 'Litigation' },
      { value: '金融法', label_zh: '金融法', label_en: 'Finance' },
      { value: '房地产法', label_zh: '房地产法', label_en: 'Real Estate' },
      { value: '劳动法', label_zh: '劳动法', label_en: 'Labor' }
    ]
  },
  {
    id: 'office',
    type: 'select',
    label_zh: '办公室',
    label_en: 'Office',
    options: [
      { value: '', label_zh: '全部', label_en: 'All' },
      { value: '上海', label_zh: '上海', label_en: 'Shanghai' },
      { value: '北京', label_zh: '北京', label_en: 'Beijing' },
      { value: '深圳', label_zh: '深圳', label_en: 'Shenzhen' }
    ]
  },
  {
    id: 'keyword',
    type: 'search',
    label_zh: '关键词搜索',
    label_en: 'Search',
    placeholder_zh: '搜索律师姓名...',
    placeholder_en: 'Search lawyer name...'
  }
];

// 加载数据
onMount(async () => {
  try {
    const response = await lawyersAdapter.getAll();
    if (response.success) {
      lawyers = response.data;
      filteredLawyers = lawyers;
      total = response.data.length;
      updateDisplayedLawyers();
    }
  } catch (e) {
    error = 'Failed to load lawyers';
    console.error(e);
  } finally {
    isLoading = false;
  }
});

// 筛选处理
function handleFilterChange(event: CustomEvent) {
  const filterValues = event.detail;

  filteredLawyers = lawyers.filter(lawyer => {
    // 业务领域筛选
    if (filterValues.practice && filterValues.practice.length > 0) {
      const hasMatchingPractice = filterValues.practice.some((p: string) =>
        lawyer.practice_areas.includes(p)
      );
      if (!hasMatchingPractice) return false;
    }

    // 办公室筛选
    if (filterValues.office && filterValues.office !== '') {
      if (lawyer.office !== filterValues.office) return false;
    }

    // 关键词搜索
    if (filterValues.keyword) {
      const keyword = filterValues.keyword.toLowerCase();
      const searchText = `${lawyer.name_zh} ${lawyer.name_en} ${lawyer.bio_zh}`.toLowerCase();
      if (!searchText.includes(keyword)) return false;
    }

    return true;
  });

  total = filteredLawyers.length;
  currentPage = 1; // 重置到第一页
  updateDisplayedLawyers();
}

// 分页处理
function handlePageChange(event: CustomEvent<number>) {
  currentPage = event.detail;
  updateDisplayedLawyers();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handlePageSizeChange(event: CustomEvent<number>) {
  pageSize = event.detail;
  currentPage = 1;
  updateDisplayedLawyers();
}

// 更新当前页显示的数据
function updateDisplayedLawyers() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  displayedLawyers = filteredLawyers.slice(start, end);
}
</script>

<Navigation />

<main>
  <Hero
    title_zh="专业律师团队"
    title_en="Our Legal Team"
    subtitle_zh="汇聚行业精英，为您提供专业法律服务"
    subtitle_en="Elite professionals providing expert legal services"
    backgroundImage="/images/hero/team-bg.jpg"
    height="medium"
  />

  <section class="team-section">
    <div class="container">
      <!-- 筛选栏 -->
      <FilterBar {filters} on:change={handleFilterChange} />

      <!-- 律师卡片网格 -->
      {#if isLoading}
        <div class="loading">加载中...</div>
      {:else if error}
        <div class="error">{error}</div>
      {:else if displayedLawyers.length === 0}
        <div class="empty">
          <p>没有找到符合条件的律师</p>
        </div>
      {:else}
        <div class="lawyer-grid">
          {#each displayedLawyers as lawyer (lawyer.id)}
            <LawyerCard {lawyer} />
          {/each}
        </div>

        <!-- 分页 -->
        {#if total > pageSize}
          <div class="pagination-wrapper">
            <Pagination
              {total}
              {pageSize}
              {currentPage}
              on:pageChange={handlePageChange}
              on:pageSizeChange={handlePageSizeChange}
            />
          </div>
        {/if}
      {/if}
    </div>
  </section>
</main>

<Footer />

<style lang="scss">
@use '$ui/styles/variables' as *;
@use '$ui/styles/mixins' as *;

.team-section {
  padding: 64px 0;
  background: $color-bg-light;

  @include mobile {
    padding: 40px 0;
  }
}

.lawyer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 48px;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.pagination-wrapper {
  margin-top: 48px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
  color: $color-text-secondary;
}

.error {
  color: $color-error;
}
</style>
```

---

## 四、性能优化清单

### 4.1 图片优化

```typescript
// src/lib/utils/image.ts

/**
 * 生成响应式图片 srcset
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * 懒加载图片指令
 */
export function lazyload(node: HTMLImageElement) {
  const src = node.getAttribute('data-src');
  const srcset = node.getAttribute('data-srcset');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (src) node.src = src;
          if (srcset) node.srcset = srcset;
          node.classList.add('loaded');
          observer.unobserve(node);
        }
      });
    },
    {
      rootMargin: '50px'
    }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}
```

**使用示例**:
```svelte
<script>
import { lazyload } from '$lib/utils/image';
</script>

<img
  use:lazyload
  data-src="/images/lawyer-1.jpg"
  data-srcset="/images/lawyer-1.jpg?w=300 300w, /images/lawyer-1.jpg?w=600 600w"
  sizes="(max-width: 768px) 100vw, 300px"
  alt="Lawyer Name"
  class="lawyer-photo"
/>

<style>
.lawyer-photo {
  opacity: 0;
  transition: opacity 0.3s;
}

.lawyer-photo.loaded {
  opacity: 1;
}
</style>
```

### 4.2 动画性能优化

```scss
// 使用 transform 代替 position
// ❌ 性能差
.card:hover {
  top: -4px;
}

// ✅ 性能好
.card:hover {
  transform: translateY(-4px);
}

// 使用 will-change 提示浏览器优化
.animated-element {
  will-change: transform, opacity;
}

// 避免同时动画多个属性
// ❌ 避免
.element {
  transition: all 0.3s;
}

// ✅ 推荐
.element {
  transition: transform 0.3s, opacity 0.3s;
}

// 尊重用户偏好
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.3 代码分割

```typescript
// 动态导入组件（懒加载）
// src/routes/+page.svelte

let VideoModal;

async function openVideoModal() {
  if (!VideoModal) {
    const module = await import('$ui/components/VideoModal.svelte');
    VideoModal = module.default;
  }
  showVideoModal = true;
}
```

---

**文档版本**: v1.0
**创建日期**: 2025-11-06
**最后更新**: 2025-11-06
