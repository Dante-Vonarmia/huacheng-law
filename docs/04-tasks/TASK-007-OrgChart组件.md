# TASK-007: OrgChart组织架构图组件

## 状态
- [x] 已完成
- 优先级: P1
- 预计工时: 4小时 (0.5天)
- 负责Agent: Frontend
- 创建日期: 2025-11-06
- 完成日期: 2025-11-06

## 背景
在"关于华诚"页面的"业务结构"章节需要展示律所的组织架构，包括总部、分支机构、业务部门等层级关系。组织架构图需要清晰展示层级结构，支持折叠/展开，方便用户理解律所的组织体系。

当前缺少专门的组织架构图组件，需要一个支持树形/列表两种展示模式、可折叠节点、递归渲染的组织架构图组件。

## 目标
创建一个功能完善的 OrgChart 组织架构图组件，具备以下特性：
1. **树形展示**：支持树形结构展示（tree 模式）
2. **列表展示**：支持列表结构展示（list 模式）
3. **可折叠节点**：支持点击节点折叠/展开子节点
4. **递归渲染**：使用递归组件渲染多层级结构
5. **节点类型**：支持 headquarters（总部）、branch（分支）、department（部门）、team（团队）四种类型
6. **节点信息**：显示名称、负责人、员工数量
7. **响应式设计**：移动端优先使用 list 模式

## 技术实现

### 1. 涉及文件
- `ui-kit/components/OrgChart.svelte` - 主组件文件（新建）
- `ui-kit/components/OrgNode.svelte` - 递归子组件（新建）
- `ui-kit/components/index.ts` - 导出配置（修改）
- `src/routes/about/+page.svelte` - 组件集成（后续任务）

### 2. 实现步骤

#### 步骤1：创建主组件文件
创建 `ui-kit/components/OrgChart.svelte`，包含：
- TypeScript Props 接口定义
- variant 控制（tree/list）
- 递归组件引用

#### 步骤2：创建递归子组件
创建 `ui-kit/components/OrgNode.svelte`，包含：
- 节点折叠状态管理
- 节点卡片样式
- 递归调用自身（<svelte:self>）
- 四种节点类型样式

#### 步骤3：实现核心功能

**主组件（OrgChart.svelte）**:
```svelte
<script lang="ts">
import OrgNode from './OrgNode.svelte';

export let data: OrgNode;
export let variant: 'tree' | 'list' = 'tree';
</script>

<div class="org-chart org-chart--{variant}">
  <OrgNode node={data} level={0} {variant} />
</div>
```

**递归子组件（OrgNode.svelte）**:
```svelte
<script lang="ts">
export let node: OrgNode;
export let level: number = 0;
export let variant: 'tree' | 'list' = 'tree';

let isCollapsed = $state(false);

function toggleCollapse() {
  if (node.children && node.children.length > 0) {
    isCollapsed = !isCollapsed;
  }
}
</script>

<div class="org-node" class:org-node--level-{level}>
  <button
    class="org-node__card org-node__card--{node.type}"
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

#### 步骤4：实现样式
使用 SCSS 实现：
- Tree 模式：Flexbox 横向布局，连接线
- List 模式：垂直布局，左侧边框
- 节点卡片样式（白色背景、边框、圆角）
- 四种节点类型样式（不同颜色）
- 折叠按钮样式

#### 步骤5：导出组件
在 `ui-kit/components/index.ts` 添加：
```typescript
export { default as OrgChart } from './OrgChart.svelte';
export { default as OrgNode } from './OrgNode.svelte';
```

### 3. 关键代码逻辑

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
}
```

**样式要点**:
```scss
.org-chart {
  padding: 40px 0;

  // Tree 模式
  &--tree {
    .org-node {
      &__children {
        display: flex;
        gap: 24px;
        justify-content: center;
        margin-top: 24px;
        flex-wrap: wrap;
      }
    }
  }

  // List 模式
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

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    // 总部样式（绿色渐变）
    &--headquarters {
      border-color: $color-primary;
      background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
      color: white;
    }

    // 分支样式
    &--branch {
      border-color: $color-accent;
      background: $color-bg-light;
    }

    // 部门样式
    &--department {
      border-color: $color-border;
    }

    // 团队样式
    &--team {
      border-color: $color-text-tertiary;
      font-size: 14px;
    }
  }

  &__toggle {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
}
```

### 4. 数据结构

**Demo数据示例**:
```typescript
const orgData: OrgNode = {
  id: '1',
  name_zh: '华诚律师事务所',
  name_en: 'Watson & Band Law Firm',
  type: 'headquarters',
  employees: 150,
  leader: '张律师',
  children: [
    {
      id: '2',
      name_zh: '上海分所',
      name_en: 'Shanghai Branch',
      type: 'branch',
      employees: 80,
      leader: '李律师',
      children: [
        {
          id: '4',
          name_zh: '知识产权部',
          name_en: 'IP Department',
          type: 'department',
          employees: 20,
          leader: '王律师'
        },
        {
          id: '5',
          name_zh: '公司法务部',
          name_en: 'Corporate Department',
          type: 'department',
          employees: 25,
          leader: '赵律师'
        }
      ]
    },
    {
      id: '3',
      name_zh: '北京分所',
      name_en: 'Beijing Branch',
      type: 'branch',
      employees: 50,
      leader: '刘律师',
      children: [
        {
          id: '6',
          name_zh: '金融资产部',
          name_en: 'Finance Department',
          type: 'department',
          employees: 18,
          leader: '陈律师'
        }
      ]
    },
    {
      id: '7',
      name_zh: '行政部',
      name_en: 'Administration',
      type: 'department',
      employees: 20,
      leader: '周经理'
    }
  ]
};
```

## 验收标准

### 功能验收
- [ ] Tree 模式正确显示树形结构
- [ ] List 模式正确显示列表结构
- [ ] 点击节点可以折叠/展开子节点
- [ ] 递归渲染多层级结构正常
- [ ] 四种节点类型样式正确显示
- [ ] 没有子节点的节点不显示折叠按钮
- [ ] 折叠按钮显示正确的图标（+ / -）

### 视觉验收
- [ ] 总部节点绿色渐变背景正确
- [ ] 分支节点浅色背景正确
- [ ] 部门节点白色背景正确
- [ ] Tree 模式节点居中对齐
- [ ] List 模式左侧边框正确显示
- [ ] 节点卡片悬停效果正确
- [ ] 响应式布局正确

### 技术验收
- [ ] TypeScript 接口定义完整，无 any 类型
- [ ] 使用 Svelte 5 的 runes ($state)
- [ ] 使用 <svelte:self> 实现递归
- [ ] 无 ESLint 警告
- [ ] 使用 SCSS 变量系统
- [ ] 响应式使用 mixins（@include respond-to）
- [ ] 组件已在 index.ts 导出

## 文件变更清单
- [ ] `ui-kit/components/OrgChart.svelte` - 新建
- [ ] `ui-kit/components/OrgNode.svelte` - 新建
- [ ] `ui-kit/components/index.ts` - 添加导出

## Git Commit信息

```
feat(ui): TASK-007 OrgChart组织架构图组件

- Add OrgChart.svelte main component
- Add OrgNode.svelte recursive sub-component
- Support tree/list two display modes
- Support collapsible nodes with state management
- Add 4 node types (headquarters/branch/department/team)
- Use <svelte:self> for recursive rendering
- Export components in index.ts

Closes: TASK-007
```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问测试页面（集成到 /about 或 /showcase）
3. 验证 tree 模式树形结构
4. 验证 list 模式列表结构
5. 验证节点折叠/展开功能
6. 验证四种节点类型样式
7. 调整浏览器窗口验证响应式
8. 检查控制台无错误

## 依赖关系
- 前置任务: 无
- 后续任务: TASK-204（关于华诚-业务结构组织图）
- 被依赖: TASK-204

## 参考资料
- 技术规格文档: `docs/01-requirements/TECHNICAL_SPECS.md` 第1.5节
- Svelte Recursive Components: https://svelte.dev/docs/special-elements#svelte-self
- Organization Chart Design: https://dribbble.com/tags/organization-chart

## 备注
- 使用 `<svelte:self>` 实现递归渲染
- Tree 模式适合层级较少的结构（2-3层）
- List 模式适合层级较多的结构（3+层）
- 移动端建议使用 list 模式
- 折叠状态使用组件内部 $state 管理，不需要全局状态
- 节点类型决定样式，总部用绿色渐变，分支用浅色背景
