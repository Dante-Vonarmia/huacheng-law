<script lang="ts">
  import OrgNode from './OrgNode.svelte';

  // Props接口定义
  export let data: OrgNodeData;
  export let variant: 'tree' | 'list' = 'tree';

  // 类型定义（导出供 OrgNode 使用）
  export interface OrgNodeData {
    id: string;
    name_zh: string;
    name_en: string;
    type: 'headquarters' | 'branch' | 'department' | 'team';
    employees?: number;
    leader?: string;
    children?: OrgNodeData[];
  }
</script>

<div class="org-chart org-chart--{variant}">
  <OrgNode node={data} level={0} {variant} />
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .org-chart {
    padding: 40px 0;
    width: 100%;

    @include respond-to('mobile') {
      padding: 24px 0;
    }

    // Tree 模式
    &--tree {
      display: flex;
      justify-content: center;
    }

    // List 模式
    &--list {
      // List 模式不需要特殊容器样式
    }
  }
</style>
