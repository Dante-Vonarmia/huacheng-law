# TASK-204: 关于华诚-业务结构组织图

## 状态
- [ ] 待设计确认
- 优先级: P1
- 预计工时: 6小时 (0.75天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: -

## 背景
在"关于华诚"页面的"业务结构"章节，需要展示律所的组织架构，包括总部、分支机构、业务部门等层级关系。通过可视化的组织架构图，帮助用户直观了解律所的组织体系和业务布局。

## 目标
在"业务结构"章节集成 OrgChart 组织架构图组件，具备以下特性：
1. **组织架构展示**：总部 → 分支机构 → 业务部门多层级结构
2. **节点信息**：显示机构/部门名称、负责人、员工数量
3. **可折叠节点**：点击节点可折叠/展开下级结构
4. **视图模式**：Tree（树形）和 List（列表）两种展示模式
5. **节点类型**：区分总部、分支、部门、团队四种类型
6. **响应式适配**：桌面端 Tree 模式，移动端 List 模式
7. **数据更新**：支持动态更新组织架构数据

## 设计要求（待确认）

### 视觉设计
- [ ] 默认展示模式：Tree（树形）/ List（列表）（待确认）
- [ ] 模式切换：是否提供切换按钮（待确认）
- [ ] 节点卡片样式：
  - 总部：绿色渐变背景、金色边框（待确认）
  - 分支：浅色背景、主色边框（待确认）
  - 部门：白色背景、灰色边框（待确认）
  - 团队：小尺寸卡片（待确认）
- [ ] 连接线样式：颜色、粗细（Tree 模式）（待确认）
- [ ] 卡片尺寸：200px / 240px 宽度（待确认）
- [ ] 节点间距：24px / 32px（待确认）
- [ ] 折叠按钮：位置（右上角）、图标（+/-）（待确认）

### 内容策略
- [ ] 组织架构层级：
  - 第1层：华诚律师事务所（总部）
  - 第2层：各地分支机构（上海、北京、深圳等）
  - 第3层：各分支的业务部门
  - 第4层：团队/小组（可选）
- [ ] 节点信息显示：
  - 机构/部门名称（中英文）
  - 负责人姓名
  - 员工数量
  - 其他信息（可选：联系方式、地址）
- [ ] 初始展开状态：展开到第2层 / 全部展开（待确认）
- [ ] 数据来源：静态数据 / CMS / API（待确认）

### 交互设计
- [ ] 节点点击：折叠/展开下级结构
- [ ] 折叠动画：淡入淡出 / 滑动（待确认）
- [ ] 无子节点：不显示折叠按钮
- [ ] 悬停效果：卡片上浮、边框高亮（待确认）
- [ ] 模式切换：按钮切换 Tree/List 模式（待确认）
- [ ] 移动端：自动切换为 List 模式（待确认）

## 技术实现

### 1. 涉及文件
- `src/routes/about/+page.svelte` - 关于华诚页面（修改）
- `src/lib/data/organization-structure.ts` - 组织架构数据（新建）
- `ui-kit/components/OrgChart.svelte` - 组织架构图组件（已存在，TASK-007）
- `ui-kit/components/OrgNode.svelte` - 递归节点组件（已存在，TASK-007）

### 2. 实现步骤

#### 步骤1：准备组织架构数据
创建 `src/lib/data/organization-structure.ts`：
```typescript
import type { OrgNodeData } from '$ui/components/OrgChart.svelte';

export const organizationStructure: OrgNodeData = {
  id: '1',
  name_zh: '华诚律师事务所',
  name_en: 'Watson & Band Law Firm',
  type: 'headquarters',
  employees: 350,
  leader: '张律师',
  children: [
    {
      id: '2',
      name_zh: '上海分所',
      name_en: 'Shanghai Branch',
      type: 'branch',
      employees: 150,
      leader: '李律师',
      children: [
        {
          id: '4',
          name_zh: '知识产权部',
          name_en: 'IP Department',
          type: 'department',
          employees: 35,
          leader: '王律师',
          children: [
            {
              id: '7',
              name_zh: '专利团队',
              name_en: 'Patent Team',
              type: 'team',
              employees: 15,
              leader: '周律师'
            },
            {
              id: '8',
              name_zh: '商标团队',
              name_en: 'Trademark Team',
              type: 'team',
              employees: 12,
              leader: '吴律师'
            }
          ]
        },
        {
          id: '5',
          name_zh: '公司法务部',
          name_en: 'Corporate Department',
          type: 'department',
          employees: 40,
          leader: '赵律师',
          children: [
            {
              id: '9',
              name_zh: '并购团队',
              name_en: 'M&A Team',
              type: 'team',
              employees: 20,
              leader: '钱律师'
            },
            {
              id: '10',
              name_zh: '合规团队',
              name_en: 'Compliance Team',
              type: 'team',
              employees: 15,
              leader: '孙律师'
            }
          ]
        },
        {
          id: '6',
          name_zh: '争议解决部',
          name_en: 'Dispute Resolution',
          type: 'department',
          employees: 30,
          leader: '刘律师'
        }
      ]
    },
    {
      id: '3',
      name_zh: '北京分所',
      name_en: 'Beijing Branch',
      type: 'branch',
      employees: 120,
      leader: '陈律师',
      children: [
        {
          id: '11',
          name_zh: '金融资产部',
          name_en: 'Financial Assets',
          type: 'department',
          employees: 40,
          leader: '郑律师'
        },
        {
          id: '12',
          name_zh: '劳动法务部',
          name_en: 'Labor Law',
          type: 'department',
          employees: 30,
          leader: '冯律师'
        },
        {
          id: '13',
          name_zh: '房地产部',
          name_en: 'Real Estate',
          type: 'department',
          employees: 25,
          leader: '韩律师'
        }
      ]
    },
    {
      id: '14',
      name_zh: '深圳分所',
      name_en: 'Shenzhen Branch',
      type: 'branch',
      employees: 80,
      leader: '杨律师',
      children: [
        {
          id: '15',
          name_zh: '科技法务部',
          name_en: 'Tech Law',
          type: 'department',
          employees: 35,
          leader: '蒋律师'
        },
        {
          id: '16',
          name_zh: '国际贸易部',
          name_en: 'International Trade',
          type: 'department',
          employees: 25,
          leader: '何律师'
        }
      ]
    }
  ]
};
```

#### 步骤2：集成到"关于华诚"页面
在 `src/routes/about/+page.svelte` 的"业务结构"章节中：
```svelte
<script lang=\"ts\">
import { OrgChart } from '$ui/components';
import { organizationStructure } from '$lib/data/organization-structure';

// 当前视图模式
let viewMode = $state<'tree' | 'list'>('tree');

// 响应式：移动端自动切换为 list 模式
import { onMount } from 'svelte';
onMount(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      viewMode = 'list';
    }
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
});
</script>

<!-- 业务结构章节 -->
<section id=\"section-structure\" class=\"about-section\">
  <h2 class=\"about-section__title\">业务结构</h2>

  <div class=\"about-section__content\">
    <div class=\"org-structure\">
      <!-- 视图切换按钮（可选） -->
      <div class=\"org-structure__toolbar\">
        <p class=\"org-structure__description\">
          华诚律师事务所在全国设有多个分支机构，业务覆盖知识产权、公司法务、争议解决、金融资产等多个领域。
        </p>

        <div class=\"org-structure__controls\">
          <button
            class=\"org-structure__btn\"
            class:active={viewMode === 'tree'}
            on:click={() => viewMode = 'tree'}
          >
            <span class=\"org-structure__btn-icon\">🌳</span>
            树形视图
          </button>
          <button
            class=\"org-structure__btn\"
            class:active={viewMode === 'list'}
            on:click={() => viewMode = 'list'}
          >
            <span class=\"org-structure__btn-icon\">📋</span>
            列表视图
          </button>
        </div>
      </div>

      <!-- 组织架构图 -->
      <div class=\"org-structure__chart\">
        <OrgChart
          data={organizationStructure}
          variant={viewMode}
        />
      </div>

      <!-- 说明文字 -->
      <div class=\"org-structure__note\">
        <p>* 点击节点可以展开或折叠下级机构</p>
        <p>* 数据截至 2024 年 10 月</p>
      </div>
    </div>
  </div>
</section>
```

#### 步骤3：组织架构图样式
```scss
.org-structure {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    gap: 24px;

    @include respond-to('tablet') {
      flex-direction: column;
      align-items: stretch;
    }

    @include respond-to('mobile') {
      margin-bottom: 24px;
    }
  }

  &__description {
    flex: 1;
    font-size: 16px;
    line-height: 1.8;
    color: $color-text-secondary;

    @include respond-to('mobile') {
      font-size: 15px;
    }
  }

  &__controls {
    display: flex;
    gap: 12px;
    flex-shrink: 0;

    @include respond-to('mobile') {
      width: 100%;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: 2px solid $color-border;
    border-radius: 8px;
    background: white;
    color: $color-text-secondary;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    @include respond-to('mobile') {
      flex: 1;
      justify-content: center;
      padding: 12px 16px;
    }

    &:hover {
      border-color: $color-primary;
      color: $color-primary;
      background: $color-bg-light;
    }

    &.active {
      border-color: $color-primary;
      color: white;
      background: $color-primary;
    }

    &-icon {
      font-size: 18px;
    }
  }

  // 组织架构图容器
  &__chart {
    background: white;
    border: 1px solid $color-border;
    border-radius: 12px;
    padding: 40px;
    overflow-x: auto;
    overflow-y: hidden;

    @include respond-to('mobile') {
      padding: 24px 16px;
      border-radius: 8px;
    }

    // Tree 模式：横向滚动
    :global(.org-chart--tree) {
      min-width: 100%;
      width: max-content;
    }

    // List 模式：垂直布局
    :global(.org-chart--list) {
      width: 100%;
    }
  }

  // 说明文字
  &__note {
    margin-top: 24px;
    padding: 16px 20px;
    background: $color-bg-light;
    border-radius: 8px;

    @include respond-to('mobile') {
      margin-top: 16px;
      padding: 12px 16px;
    }

    p {
      font-size: 14px;
      color: $color-text-tertiary;
      margin: 4px 0;

      @include respond-to('mobile') {
        font-size: 13px;
      }
    }
  }
}
```

#### 步骤4：使用已有 OrgChart 组件
根据 TASK-007，OrgChart 组件已经实现了以下功能：
- ✅ Tree 和 List 两种展示模式
- ✅ 可折叠节点（$state 管理）
- ✅ 递归渲染（<svelte:self>）
- ✅ 四种节点类型样式
- ✅ 响应式设计

只需在"业务结构"章节中正确使用即可。

## 验收标准

### 功能验收（待设计确认后）
- [ ] 组织架构图正确显示多层级结构
- [ ] Tree 模式横向展开，层级清晰
- [ ] List 模式垂直展开，缩进正确
- [ ] 点击节点可以折叠/展开下级结构
- [ ] 折叠状态正确管理（独立的 $state）
- [ ] 节点信息完整显示（名称、负责人、员工数）
- [ ] 视图模式切换正常（Tree ↔ List）
- [ ] 移动端自动切换为 List 模式（或按钮切换）
- [ ] 无子节点的节点不显示折叠按钮

### 视觉验收（待设计稿确认）
- [ ] 总部节点绿色渐变背景正确
- [ ] 分支节点浅色背景正确
- [ ] 部门节点白色背景正确
- [ ] 团队节点小尺寸正确
- [ ] Tree 模式连接线样式正确
- [ ] List 模式左侧边框正确
- [ ] 节点卡片尺寸、间距正确
- [ ] 折叠按钮位置、图标正确
- [ ] 悬停效果正确
- [ ] 视图切换按钮样式正确
- [ ] 桌面/平板/移动端布局正确

### 内容验收
- [ ] 组织架构数据准确
- [ ] 分支机构名称、位置准确
- [ ] 业务部门分类准确
- [ ] 负责人姓名准确
- [ ] 员工数量准确（或近似）
- [ ] 数据更新日期标注

## 设计资源需求

### 组织架构数据
- [ ] 总部信息：
  - 机构名称（中英文）
  - 总员工数
  - 总负责人
- [ ] 各分支机构信息：
  - 分支名称（中英文）
  - 分支地址
  - 分支员工数
  - 分支负责人
- [ ] 各业务部门信息：
  - 部门名称（中英文）
  - 部门员工数
  - 部门负责人
  - 所属分支
- [ ] 团队信息（可选）：
  - 团队名称
  - 团队员工数
  - 团队负责人
  - 所属部门

### 设计规范
- [ ] 节点卡片样式（四种类型）
- [ ] 连接线样式（Tree 模式）
- [ ] 节点尺寸、间距
- [ ] 折叠按钮样式
- [ ] 视图切换按钮样式
- [ ] 响应式布局规则
- [ ] 初始展开状态（展开到第几层）

### 数据管理
- [ ] 数据更新频率（季度/年度）
- [ ] 数据来源（静态数据 / CMS / API）
- [ ] 数据维护负责人
- [ ] 敏感信息处理（是否显示负责人、员工数）

## 依赖关系
- 前置任务: TASK-007（OrgChart 组件已完成）、TASK-201（左侧导航）
- 依赖资源: 组织架构数据、设计稿
- 后续任务: 无

## 文件变更清单
- [ ] `src/routes/about/+page.svelte` - 集成组织架构图
- [ ] `src/lib/data/organization-structure.ts` - 新建组织架构数据文件

## 备注
- 等待设计稿和组织架构数据确认后再开始开发
- OrgChart 组件已在 TASK-007 中完成，可直接复用
- 需要律所提供准确的组织架构数据
- 需要确认是否显示敏感信息（负责人姓名、员工数量）
- 需要确认视图模式切换方案（自动 / 按钮切换）
- 需要确认初始展开状态（全部展开 / 展开到第2层）
- Tree 模式适合层级较少（2-3层），List 模式适合层级较多（3+层）
- 考虑添加搜索功能（搜索部门/负责人）（后期优化）
- 考虑添加导出功能（导出为 PDF/图片）（后期优化）
