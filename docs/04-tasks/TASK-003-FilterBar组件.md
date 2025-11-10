# TASK-003: FilterBar筛选条组件

## 状态
- [x] 已完成
- 优先级: P0
- 预计工时: 3.2小时 (0.4天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
在"律师团队"、"业务领域"等列表页面中，需要一个筛选条组件来帮助用户快速过滤和查找内容。筛选功能是提升用户体验的关键，可以显著减少用户查找信息的时间。

当前列表页面缺少筛选功能，用户需要手动浏览所有内容，体验不佳。需要一个支持多种筛选类型（单选、多选、搜索）、响应式设计的筛选条组件。

## 目标
创建一个功能完善的 FilterBar 筛选条组件，具备以下特性：
1. **多种筛选类型**：支持 select（下拉单选）、multiselect（复选框多选）、search（关键词搜索）、radio（单选按钮）
2. **实时筛选**：筛选条件变化时立即触发 change 事件
3. **重置功能**：一键清除所有筛选条件
4. **响应式设计**：桌面端网格布局，移动端单列布局
5. **可配置**：支持自定义筛选项配置、标签、占位符
6. **辅助函数**：提供 applyFilters 工具函数简化数据过滤逻辑

## 技术实现

### 1. 涉及文件
- `ui-kit/components/FilterBar.svelte` - 主组件文件（新建）
- `ui-kit/components/index.ts` - 导出配置（修改）
- `src/routes/team/+page.svelte` - 组件集成（后续任务）

### 2. 实现步骤

#### 步骤1：创建组件文件
创建 `ui-kit/components/FilterBar.svelte`，包含：
- TypeScript Props 接口定义
- 筛选值状态管理（使用 writable store）
- 四种筛选类型的渲染逻辑
- change 事件派发
- 重置功能
- applyFilters 辅助函数导出

#### 步骤2：实现核心功能

**状态管理**:
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
```

**辅助函数（导出供外部使用）**:
```typescript
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

#### 步骤3：实现四种筛选类型

**1. Select（下拉单选）**:
```svelte
{#if filter.type === 'select'}
  <select
    class="filter-bar__select"
    on:change={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
  >
    <option value="">全部</option>
    {#each filter.options as option}
      <option value={option.value}>{option.label_zh}</option>
    {/each}
  </select>
{/if}
```

**2. Multiselect（复选框多选）**:
```svelte
{#if filter.type === 'multiselect'}
  <div class="filter-bar__multiselect">
    {#each filter.options as option}
      <label class="filter-bar__checkbox">
        <input
          type="checkbox"
          value={option.value}
          on:change={(e) => handleMultiselectChange(filter.id, option.value, e.currentTarget.checked)}
        />
        <span>{option.label_zh}</span>
        {#if option.count}
          <span class="count">({option.count})</span>
        {/if}
      </label>
    {/each}
  </div>
{/if}
```

**3. Search（关键词搜索）**:
```svelte
{#if filter.type === 'search'}
  <input
    type="text"
    class="filter-bar__input"
    placeholder={filter.placeholder_zh}
    on:input={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
  />
{/if}
```

**4. Radio（单选按钮）**:
```svelte
{#if filter.type === 'radio'}
  <div class="filter-bar__radio-group">
    {#each filter.options as option}
      <label class="filter-bar__radio">
        <input
          type="radio"
          name={filter.id}
          value={option.value}
          on:change={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
        />
        <span>{option.label_zh}</span>
      </label>
    {/each}
  </div>
{/if}
```

#### 步骤4：实现样式
使用 SCSS 实现：
- 白色背景卡片样式
- 网格布局（auto-fit, minmax(250px, 1fr)）
- 移动端单列布局
- 复选框样式（边框、悬停、选中状态）
- 重置按钮样式

#### 步骤5：导出组件
在 `ui-kit/components/index.ts` 添加：
```typescript
export { default as FilterBar, applyFilters } from './FilterBar.svelte';
```

### 3. 关键代码逻辑

**Props接口**:
```typescript
interface FilterBarProps {
  filters: FilterConfig[];
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
  count?: number;  // 显示结果数量
}

type FilterValues = Record<string, string | string[]>;
```

**响应式设计**:
- 桌面端: Grid布局，每列最小 250px，自动适配
- 移动端 (≤768px): 单列布局

### 4. 数据结构

**Demo数据示例（律师团队筛选）**:
```typescript
const filters = [
  {
    id: 'practice',
    type: 'multiselect',
    label_zh: '业务领域',
    label_en: 'Practice Area',
    options: [
      { value: 'ip', label_zh: '知识产权', label_en: 'IP', count: 15 },
      { value: 'corporate', label_zh: '公司法务', label_en: 'Corporate', count: 20 },
      { value: 'finance', label_zh: '金融资产', label_en: 'Finance', count: 12 },
      { value: 'labor', label_zh: '劳动人事', label_en: 'Labor', count: 8 }
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
      { value: 'associate', label_zh: '律师', label_en: 'Associate' },
      { value: 'assistant', label_zh: '律师助理', label_en: 'Assistant' }
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
```

**使用示例**:
```svelte
<script>
import FilterBar, { applyFilters } from '$ui/components/FilterBar.svelte';

let allLawyers = [...]; // 原始数据
let filteredLawyers = allLawyers;

function handleFilterChange(event) {
  const filterValues = event.detail;

  filteredLawyers = applyFilters(allLawyers, filterValues, (lawyer, values) => {
    // Practice area filter (multiselect)
    if (values.practice && values.practice.length > 0) {
      if (!values.practice.some(p => lawyer.practice_areas.includes(p))) {
        return false;
      }
    }

    // Title filter (select)
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
```

## 验收标准

### 功能验收
- [ ] Select 下拉单选功能正常
- [ ] Multiselect 复选框多选功能正常
- [ ] Search 关键词搜索功能正常
- [ ] Radio 单选按钮功能正常
- [ ] 筛选条件变化时正确触发 change 事件
- [ ] 重置按钮可以清除所有筛选条件
- [ ] applyFilters 辅助函数可以正确过滤数据
- [ ] 显示选项数量（count）

### 视觉验收
- [ ] 白色背景卡片样式正确
- [ ] 筛选项网格布局合理
- [ ] 复选框悬停效果正确
- [ ] 复选框选中状态明显（绿色边框+浅绿背景）
- [ ] 重置按钮样式正确（下划线、绿色）
- [ ] 移动端单列布局正确
- [ ] 输入框聚焦时边框高亮

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] 使用 Svelte 5 的 runes ($state) 或 writable store
- [ ] 正确使用 createEventDispatcher
- [ ] 导出 applyFilters 辅助函数
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 响应式使用 mixins（@include respond-to）
- [ ] 组件已在 index.ts 导出

## 文件变更清单
- [ ] `ui-kit/components/FilterBar.svelte` - 新建
- [ ] `ui-kit/components/index.ts` - 添加导出

## Git Commit信息

```
feat(ui): TASK-003 FilterBar筛选条组件

- Add FilterBar.svelte component with TypeScript
- Support select/multiselect/search/radio filter types
- Provide applyFilters helper function for data filtering
- Add responsive design (desktop grid + mobile single column)
- Support reset all filters functionality
- Export component and helper in index.ts

Closes: TASK-003
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问测试页面（集成到 /team 或 /showcase）
3. 验证 select 下拉单选功能
4. 验证 multiselect 复选框多选功能
5. 验证 search 关键词搜索功能
6. 验证重置按钮功能
7. 调整浏览器窗口验证响应式
8. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-402（律师团队筛选区）、TASK-312（业务筛选与搜索）
- 被依赖: TASK-402, TASK-312

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.6节
- 律师团队页面实现: `docs/01-requirements/TECHNICAL_SPECS.md` 第3.1节
- 旧网站参考: http://www.watson-band.com/（查看现有筛选效果）

## 备注
- multiselect 类型支持多个值，返回数组格式
- select/radio 类型只支持单个值，返回字符串格式
- search 类型返回字符串，需要在父组件中实现具体的搜索逻辑
- count 字段是可选的，用于显示每个选项的结果数量
- applyFilters 是一个通用的辅助函数，具体的过滤逻辑由父组件通过 filterFn 回调提供
