# TASK-004: Pagination分页器组件

## 状态
- [x] 已完成
- 优先级: P1
- 预计工时: 2.4小时 (0.3天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
在"律师团队"、"新闻列表"、"出版物列表"等内容较多的列表页面中，需要一个分页器组件来分批展示内容。分页功能可以提升页面加载性能，改善用户浏览体验。

当前列表页面缺少分页功能，所有数据一次性展示可能导致页面过长，用户体验不佳。需要一个支持页码跳转、每页条数选择、总数显示的分页器组件。

## 目标
创建一个功能完善的 Pagination 分页器组件，具备以下特性：
1. **页码跳转**：支持点击页码、上一页、下一页按钮跳转
2. **智能省略**：当页数过多时使用省略号（...）显示
3. **每页条数选择**：支持切换每页显示条数（12/24/48）
4. **总数显示**：显示当前范围和总条数（如：显示 1-12 / 共 120 条）
5. **响应式设计**：移动端居中显示、PC端两端对齐
6. **可配置**：支持自定义每页条数选项、最大页码按钮数

## 技术实现

### 1. 涉及文件
- `ui-kit/components/Pagination.svelte` - 主组件文件（新建）
- `ui-kit/components/index.ts` - 导出配置（修改）
- `src/routes/team/+page.svelte` - 组件集成（后续任务）

### 2. 实现步骤

#### 步骤1：创建组件文件
创建 `ui-kit/components/Pagination.svelte`，包含：
- TypeScript Props 接口定义
- 页码生成逻辑（智能省略）
- 页码跳转事件派发
- 每页条数切换事件派发
- 总数和范围计算

#### 步骤2：实现核心功能

**页码生成逻辑（智能省略）**:
```typescript
function generatePageNumbers(current: number, total: number, max: number): (number | string)[] {
  // 如果总页数小于等于最大显示数，显示所有页码
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1]; // 始终显示第1页

  // 如果当前页离第1页较远，显示省略号
  if (current > 3) {
    pages.push('...');
  }

  // 显示当前页及其前后页码
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // 如果当前页离最后一页较远，显示省略号
  if (current < total - 2) {
    pages.push('...');
  }

  pages.push(total); // 始终显示最后一页

  return pages;
}
```

**事件派发**:
```typescript
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
  pageChange: number;
  pageSizeChange: number;
}>();

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    dispatch('pageChange', page);
  }
}

function changePageSize(size: number) {
  dispatch('pageSizeChange', size);
  // 切换每页条数时重置到第1页
  dispatch('pageChange', 1);
}
```

**计算属性**:
```typescript
$: totalPages = Math.ceil(total / pageSize);
$: startItem = (currentPage - 1) * pageSize + 1;
$: endItem = Math.min(currentPage * pageSize, total);
$: pageNumbers = generatePageNumbers(currentPage, totalPages, maxPageButtons);
```

#### 步骤3：实现样式
使用 SCSS 实现：
- 两端对齐布局（左侧总数信息、右侧页码控制）
- 页码按钮样式（边框、悬停、激活状态）
- 禁用状态样式（上一页/下一页）
- 每页条数选择器样式
- 移动端单列居中布局

#### 步骤4：导出组件
在 `ui-kit/components/index.ts` 添加：
```typescript
export { default as Pagination } from './Pagination.svelte';
```

### 3. 关键代码逻辑

**Props接口**:
```typescript
interface PaginationProps {
  total: number;              // 总条数
  pageSize: number;           // 每页条数
  currentPage: number;        // 当前页码（从1开始）
  pageSizeOptions?: number[]; // 每页条数选项，默认[12, 24, 48]
  showPageSize?: boolean;     // 是否显示每页条数选择器，默认true
  showTotal?: boolean;        // 是否显示总数，默认true
  maxPageButtons?: number;    // 最多显示页码按钮数，默认7
}
```

**响应式设计**:
- 桌面端: Flex 两端对齐，左侧总数、右侧控制
- 移动端 (≤768px): 单列布局，居中显示

### 4. 数据结构

**Demo数据示例**:
```svelte
<script>
import Pagination from '$ui/components/Pagination.svelte';

let allLawyers = [...]; // 120条数据
let currentPage = 1;
let pageSize = 12;

$: totalCount = allLawyers.length;
$: displayedLawyers = allLawyers.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);

function handlePageChange(event) {
  currentPage = event.detail;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handlePageSizeChange(event) {
  pageSize = event.detail;
  currentPage = 1; // 重置到第1页
}
</script>

<div class="lawyer-grid">
  {#each displayedLawyers as lawyer}
    <LawyerCard {lawyer} />
  {/each}
</div>

<Pagination
  total={totalCount}
  {pageSize}
  {currentPage}
  pageSizeOptions={[12, 24, 48]}
  showPageSize={true}
  showTotal={true}
  maxPageButtons={7}
  on:pageChange={handlePageChange}
  on:pageSizeChange={handlePageSizeChange}
/>
```

**页码生成示例**:
- 总页数 ≤ 7: `[1, 2, 3, 4, 5, 6, 7]`
- 当前页 = 1: `[1, 2, 3, ..., 20]`
- 当前页 = 5: `[1, ..., 4, 5, 6, ..., 20]`
- 当前页 = 10: `[1, ..., 9, 10, 11, ..., 20]`
- 当前页 = 20: `[1, ..., 18, 19, 20]`

## 验收标准

### 功能验收
- [ ] 点击页码可以正确跳转
- [ ] 上一页按钮在第1页时禁用
- [ ] 下一页按钮在最后一页时禁用
- [ ] 省略号（...）在合适的位置显示
- [ ] 当前页码按钮高亮显示
- [ ] 每页条数选择器可以切换
- [ ] 切换每页条数后自动跳转到第1页
- [ ] 总数信息正确显示（显示 1-12 / 共 120 条）

### 视觉验收
- [ ] 页码按钮样式正确（边框、圆角）
- [ ] 当前页码按钮高亮（绿色背景+白色文字）
- [ ] 悬停效果正确（绿色边框+绿色文字）
- [ ] 禁用按钮样式正确（透明度 0.4）
- [ ] 每页条数选择器样式正确
- [ ] 移动端单列居中布局正确

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] 正确使用 createEventDispatcher
- [ ] 使用响应式声明 ($:) 计算派生值
- [ ] 页码生成算法正确
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 响应式使用 mixins（@include respond-to）
- [ ] 组件已在 index.ts 导出

## 文件变更清单
- [ ] `ui-kit/components/Pagination.svelte` - 新建
- [ ] `ui-kit/components/index.ts` - 添加导出

## Git Commit信息

```
feat(ui): TASK-004 Pagination分页器组件

- Add Pagination.svelte component with TypeScript
- Support page navigation and page size selection
- Implement smart page number generation with ellipsis
- Add total count display (e.g., "1-12 / Total 120")
- Add responsive design (desktop flex + mobile column)
- Export component in index.ts

Closes: TASK-004
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问测试页面（集成到 /team 或 /showcase）
3. 验证页码跳转功能
4. 验证上一页/下一页按钮
5. 验证省略号显示逻辑
6. 验证每页条数切换功能
7. 调整浏览器窗口验证响应式
8. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-404（律师团队分页与搜索）
- 被依赖: TASK-404

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.7节
- Ant Design Pagination: https://ant.design/components/pagination-cn/
- Element Plus Pagination: https://element-plus.org/zh-CN/component/pagination.html

## 备注
- currentPage 从 1 开始计数（不是从 0）
- 切换每页条数时自动重置到第1页
- 省略号（...）是不可点击的
- maxPageButtons 默认为 7，包括第1页和最后一页
- 在移动端可以考虑隐藏每页条数选择器（后期优化）
- 跳转页面后建议滚动到顶部（由父组件实现）
