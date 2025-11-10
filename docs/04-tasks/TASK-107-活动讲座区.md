# TASK-107: 首页活动讲座区

## 状态
- [ ] 待设计确认
- 优先级: P1
- 预计工时: 5小时 (0.625天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
首页需要展示律所举办的专业活动和讲座，包括研讨会、培训课程、行业交流活动等。通过展示活动信息，提升律所的行业影响力，吸引潜在客户参与，增强品牌曝光度。

## 目标
在首页集成活动讲座展示区，具备以下特性：
1. **活动展示**：3-4 个近期或即将举办的活动
2. **卡片信息**：活动标题、时间、地点、活动类型、状态（即将开始/进行中/已结束）
3. **时间显示**：突出显示活动日期和时间
4. **报名按钮**：即将开始的活动显示"报名参加"按钮（可选）
5. **点击跳转**：跳转到活动详情页
6. **查看更多**：底部"查看全部活动"按钮跳转到活动列表页
7. **响应式布局**：桌面端 Grid 3 列，移动端垂直堆叠

## 设计要求（待确认）

### 视觉设计
- [ ] 区域标题："活动与讲座" / "Events & Seminars"（待确认）
- [ ] 标题样式：字体大小、颜色、对齐方式（待确认）
- [ ] 布局方案：Grid 3 列 / Grid 2 列 / 列表布局（待确认）
- [ ] 卡片样式：白色背景、边框、圆角、阴影（待确认）
- [ ] 卡片尺寸：固定高度 / 自适应高度（待确认）
- [ ] 卡片间距：24px / 16px（桌面/移动）（待确认）
- [ ] 日期显示：大号字体、突出位置（左上角/卡片顶部）（待确认）
- [ ] 状态标签：颜色区分（即将开始-绿色/进行中-蓝色/已结束-灰色）（待确认）
- [ ] 报名按钮样式：主色按钮 / 次要按钮（待确认）

### 内容策略
- [ ] 活动数量：首页显示 3-4 个（待确认）
- [ ] 活动类型：
  - 专业研讨会
  - 法律培训课程
  - 行业交流会
  - 公开讲座
  - 网络研讨会（Webinar）
- [ ] 显示规则：
  - 优先显示即将开始的活动
  - 其次显示进行中的活动
  - 最后显示近期结束的活动
- [ ] 时间范围：显示未来 3 个月内的活动
- [ ] 更新频率：实时更新活动状态

### 交互设计
- [ ] 点击行为：跳转到活动详情页
- [ ] 报名按钮：跳转到报名页面或打开报名表单（待确认）
- [ ] 悬停效果：卡片上浮、阴影加深（待确认）
- [ ] 状态标签：颜色区分不同状态
- [ ] 加载状态：骨架屏 / 占位图（待确认）
- [ ] 过期活动：是否显示 / 灰色显示 / 不显示（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/+page.svelte` - 首页主文件（修改）
- `src/lib/data/upcoming-events.ts` - 活动数据（新建）
- `ui-kit/domain/EventCard.svelte` - 活动卡片组件（新建或复用 Card）

### 2. 实现步骤

#### 步骤1：准备活动数据
创建 `src/lib/data/upcoming-events.ts`：
```typescript
export interface Event {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  event_type_zh: string;  // 研讨会、培训、讲座等
  event_type_en: string;
  start_date: string;  // ISO 8601 格式
  end_date?: string;
  location_zh: string;
  location_en: string;
  is_online: boolean;
  capacity?: number;  // 活动容量
  registered?: number;  // 已报名人数
  registration_url?: string;  // 报名链接
  status: 'upcoming' | 'ongoing' | 'completed';  // 活动状态
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title_zh: '2024跨境并购法律实务研讨会',
    title_en: 'Cross-border M&A Legal Practice Seminar 2024',
    description_zh: '深入探讨跨境并购交易中的法律风险防控、尽职调查要点及合规策略，邀请行业专家分享实战经验。',
    description_en: 'In-depth discussion on legal risk control, due diligence...',
    event_type_zh: '专业研讨会',
    event_type_en: 'Seminar',
    start_date: '2024-11-20T14:00:00+08:00',
    end_date: '2024-11-20T17:00:00+08:00',
    location_zh: '上海国际会议中心',
    location_en: 'Shanghai International Convention Center',
    is_online: false,
    capacity: 200,
    registered: 150,
    registration_url: '/events/1/register',
    status: 'upcoming'
  },
  {
    id: '2',
    title_zh: '知识产权保护实务在线讲座',
    title_en: 'IP Protection Webinar',
    description_zh: '针对企业知识产权保护的常见问题，提供系统化的解决方案和实操建议。',
    description_en: 'Systematic solutions for common IP protection issues...',
    event_type_zh: '在线讲座',
    event_type_en: 'Webinar',
    start_date: '2024-11-15T19:00:00+08:00',
    end_date: '2024-11-15T20:30:00+08:00',
    location_zh: '线上',
    location_en: 'Online',
    is_online: true,
    capacity: 500,
    registered: 320,
    registration_url: 'https://zoom.us/webinar/xxxxx',
    status: 'upcoming'
  },
  {
    id: '3',
    title_zh: '企业合规管理培训课程',
    title_en: 'Corporate Compliance Training',
    description_zh: '系统化的企业合规管理培训，涵盖数据合规、劳动法合规、反贿赂合规等多个领域。',
    description_en: 'Systematic compliance training covering data, labor...',
    event_type_zh: '培训课程',
    event_type_en: 'Training',
    start_date: '2024-12-05T09:00:00+08:00',
    end_date: '2024-12-06T17:00:00+08:00',
    location_zh: '北京华诚律所培训中心',
    location_en: 'Beijing Watson & Band Training Center',
    is_online: false,
    capacity: 50,
    registered: 30,
    registration_url: '/events/3/register',
    status: 'upcoming'
  },
  {
    id: '4',
    title_zh: '金融科技法律问题交流会',
    title_en: 'Fintech Legal Issues Forum',
    description_zh: '探讨金融科技领域的最新法律问题，包括数字货币、区块链、P2P 等相关法规。',
    description_en: 'Discussion on latest legal issues in fintech...',
    event_type_zh: '行业交流会',
    event_type_en: 'Forum',
    start_date: '2024-10-30T14:00:00+08:00',
    end_date: '2024-10-30T16:00:00+08:00',
    location_zh: '深圳金融科技中心',
    location_en: 'Shenzhen Fintech Center',
    is_online: false,
    capacity: 100,
    registered: 100,
    status: 'completed'
  }
];

// 工具函数：获取活动状态
export function getEventStatus(event: Event): Event['status'] {
  const now = new Date();
  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : startDate;

  if (now < startDate) return 'upcoming';
  if (now >= startDate && now <= endDate) return 'ongoing';
  return 'completed';
}

// 工具函数：格式化日期
export function formatEventDate(dateStr: string, locale: 'zh' | 'en' = 'zh'): string {
  const date = new Date(dateStr);
  if (locale === 'zh') {
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  }
}

// 工具函数：格式化时间
export function formatEventTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
```

#### 步骤2：集成到首页
在 `src/routes/+page.svelte` 中：
```svelte
<script lang=\"ts\">
import { Card, Badge, Button } from '$ui/components';
import { upcomingEvents, formatEventDate, formatEventTime } from '$lib/data/upcoming-events';

// 筛选并排序：优先显示即将开始的活动
$: displayEvents = upcomingEvents
  .filter(e => e.status !== 'completed' || new Date(e.start_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
  .slice(0, 3);

function getStatusBadge(status: string) {
  switch (status) {
    case 'upcoming': return { text: '即将开始', variant: 'success' };
    case 'ongoing': return { text: '进行中', variant: 'primary' };
    case 'completed': return { text: '已结束', variant: 'secondary' };
    default: return { text: status, variant: 'default' };
  }
}
</script>

<!-- 活动讲座区 -->
<section class=\"events\">
  <div class=\"container\">
    <div class=\"events__header\">
      <h2 class=\"events__title\">活动与讲座</h2>
      <p class=\"events__subtitle\">与我们一起探讨法律前沿</p>
    </div>

    <div class=\"events__grid\">
      {#each displayEvents as event}
        <article class=\"event-card\">
          <a href=\"/events/{event.id}\" class=\"event-card__link\">
            <!-- 日期显示 -->
            <div class=\"event-card__date\">
              <span class=\"event-card__date-day\">{new Date(event.start_date).getDate()}</span>
              <span class=\"event-card__date-month\">
                {new Date(event.start_date).toLocaleDateString('zh-CN', { month: 'short' })}
              </span>
            </div>

            <div class=\"event-card__content\">
              <!-- 状态和类型 -->
              <div class=\"event-card__meta\">
                <Badge variant={getStatusBadge(event.status).variant}>
                  {getStatusBadge(event.status).text}
                </Badge>
                <span class=\"event-card__type\">{event.event_type_zh}</span>
              </div>

              <!-- 标题 -->
              <h3 class=\"event-card__title\">{event.title_zh}</h3>

              <!-- 描述 -->
              <p class=\"event-card__description\">{event.description_zh}</p>

              <!-- 时间和地点 -->
              <div class=\"event-card__info\">
                <div class=\"event-card__info-item\">
                  <span class=\"event-card__info-icon\">🕒</span>
                  <span class=\"event-card__info-text\">
                    {formatEventTime(event.start_date)}
                    {#if event.end_date}
                      - {formatEventTime(event.end_date)}
                    {/if}
                  </span>
                </div>

                <div class=\"event-card__info-item\">
                  <span class=\"event-card__info-icon\">{event.is_online ? '💻' : '📍'}</span>
                  <span class=\"event-card__info-text\">{event.location_zh}</span>
                </div>

                {#if event.capacity}
                  <div class=\"event-card__info-item\">
                    <span class=\"event-card__info-icon\">👥</span>
                    <span class=\"event-card__info-text\">
                      {event.registered || 0} / {event.capacity} 人
                    </span>
                  </div>
                {/if}
              </div>

              <!-- 报名按钮 -->
              {#if event.status === 'upcoming' && event.registration_url}
                <div class=\"event-card__action\">
                  <Button
                    variant=\"primary\"
                    href={event.registration_url}
                    on:click|stopPropagation
                  >
                    立即报名
                  </Button>
                </div>
              {/if}
            </div>
          </a>
        </article>
      {/each}
    </div>

    <div class=\"events__footer\">
      <a href=\"/events\" class=\"btn btn--secondary\">查看全部活动</a>
    </div>
  </div>
</section>
```

#### 步骤3：活动卡片样式
```scss
.events {
  padding: 80px 0;
  background: white;

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

  // Grid 3 列布局
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;

    @include respond-to('tablet') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('mobile') {
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 32px;
    }
  }

  &__footer {
    text-align: center;
  }
}

// 活动卡片
.event-card {
  background: white;
  border: 1px solid $color-border;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
    border-color: $color-primary;
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  // 日期显示（顶部大号）
  &__date {
    background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
    color: white;
    padding: 16px 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include respond-to('mobile') {
      padding: 12px 20px;
    }
  }

  &__date-day {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;

    @include respond-to('mobile') {
      font-size: 32px;
    }
  }

  &__date-month {
    font-size: 14px;
    font-weight: 500;
    margin-top: 4px;
    text-transform: uppercase;

    @include respond-to('mobile') {
      font-size: 13px;
    }
  }

  // 内容区域
  &__content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @include respond-to('mobile') {
      padding: 20px;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    @include respond-to('mobile') {
      margin-bottom: 12px;
    }
  }

  &__type {
    font-size: 14px;
    color: $color-text-tertiary;

    @include respond-to('mobile') {
      font-size: 13px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: 12px;
    line-height: 1.4;

    // 限制 2 行
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @include respond-to('mobile') {
      font-size: 18px;
    }

    &:hover {
      color: $color-primary;
    }
  }

  &__description {
    font-size: 15px;
    color: $color-text-secondary;
    line-height: 1.6;
    margin-bottom: 16px;

    // 限制 3 行
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @include respond-to('mobile') {
      font-size: 14px;
    }
  }

  // 时间和地点信息
  &__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    margin-top: auto;
  }

  &__info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: $color-text-secondary;

    @include respond-to('mobile') {
      font-size: 13px;
    }
  }

  &__info-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  &__info-text {
    line-height: 1.4;
  }

  // 报名按钮
  &__action {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid $color-border;

    @include respond-to('mobile') {
      margin-top: 12px;
      padding-top: 12px;
    }

    :global(.btn) {
      width: 100%;
    }
  }
}
```

## 验收标准

### 功能验收（待设计确认后）
- [ ] 首页活动区正确显示 3-4 个活动
- [ ] 优先显示即将开始的活动
- [ ] 每个活动卡片显示完整信息（标题、时间、地点、状态）
- [ ] 日期格式正确显示
- [ ] 状态标签颜色正确区分
- [ ] 点击活动卡片跳转到活动详情页
- [ ] 报名按钮正确显示（仅对即将开始的活动）
- [ ] 点击"查看全部活动"跳转到活动列表页
- [ ] 响应式布局正确切换

### 视觉验收（待设计稿确认）
- [ ] 区域标题样式符合设计规范
- [ ] 卡片尺寸、间距、圆角正确
- [ ] 日期显示样式突出、易读
- [ ] 状态标签颜色正确（即将开始/进行中/已结束）
- [ ] 卡片悬停效果正确
- [ ] 报名按钮样式符合规范
- [ ] 桌面/平板/移动端布局正确

### 内容验收
- [ ] 活动标题准确、吸引人（15-30 字）
- [ ] 活动描述信息完整（80-150 字）
- [ ] 时间和地点信息准确
- [ ] 活动类型分类准确
- [ ] 报名人数和容量数据准确（如显示）
- [ ] 活动状态自动更新

## 设计资源需求

### 活动内容
- [ ] 3-4 个近期或即将举办的活动信息：
  - 活动标题（中英文）
  - 活动描述（80-150 字）
  - 活动类型（研讨会/培训/讲座等）
  - 开始时间和结束时间
  - 地点（线上/线下）
  - 活动容量和已报名人数（可选）
  - 报名链接（可选）
- [ ] 活动详情页完整内容（后续任务）

### 设计规范
- [ ] 区域标题字体、大小、颜色
- [ ] 布局方案确认（Grid 3 列 / Grid 2 列 / 列表）
- [ ] 卡片样式规范（背景、边框、圆角、阴影）
- [ ] 日期显示样式（大号字体、渐变背景）
- [ ] 状态标签颜色规范
- [ ] 报名按钮样式
- [ ] 悬停效果动画参数
- [ ] 响应式布局规则

### 活动管理
- [ ] 活动数据来源（CMS / API / 静态数据）
- [ ] 活动状态自动更新机制
- [ ] 首页显示规则（优先级、数量、时间范围）
- [ ] 报名系统对接（如需要）
- [ ] 活动结束后是否继续显示

## 依赖关系
- 前置任务: 无（可复用 Card、Badge、Button 组件）
- 依赖资源: 活动信息、设计稿
- 后续任务: TASK-602（活动详情页）、TASK-603（活动列表页）、TASK-604（活动报名表单）

## 文件变更清单
- [ ] `src/routes/+page.svelte` - 集成活动讲座区
- [ ] `src/lib/data/upcoming-events.ts` - 新建活动数据文件
- [ ] `ui-kit/domain/EventCard.svelte` - 新建活动卡片组件（可选）

## 备注
- 等待设计稿确认后再开始开发
- 需要确认布局方案（Grid 3 列 / Grid 2 列）
- 需要律所提供活动信息（标题、时间、地点）
- 需要确认活动管理方式（CMS / API / 静态数据）
- 需要确认是否需要报名系统对接
- 活动状态需要根据当前时间自动更新
- 考虑添加日历订阅功能（.ics 文件）（后期优化）
- 考虑添加活动提醒功能（邮件/短信）（后期优化）
- 考虑添加活动回顾（已结束活动的总结和照片）（后期优化）
