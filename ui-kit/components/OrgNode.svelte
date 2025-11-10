<script lang="ts">
  import type { OrgNodeData } from './OrgChart.svelte';

  // Props接口定义
  let { node, level = 0, variant = 'tree' }: {
    node: OrgNodeData;
    level?: number;
    variant?: 'tree' | 'list';
  } = $props();

  // 折叠状态管理
  let isCollapsed = $state(false);

  // 切换折叠状态
  function toggleCollapse() {
    if (node.children && node.children.length > 0) {
      isCollapsed = !isCollapsed;
    }
  }

  // 判断是否有子节点
  let hasChildren = $derived(node.children && node.children.length > 0);
</script>

<div class="org-node org-node--level-{level}">
  <button
    class="org-node__card org-node__card--{node.type}"
    on:click={toggleCollapse}
    disabled={!hasChildren}
    type="button"
  >
    <div class="org-node__name">{node.name_zh}</div>
    {#if node.leader}
      <div class="org-node__leader">负责人: {node.leader}</div>
    {/if}
    {#if node.employees}
      <div class="org-node__employees">{node.employees} 人</div>
    {/if}
    {#if hasChildren}
      <div class="org-node__toggle">
        {isCollapsed ? '+' : '-'}
      </div>
    {/if}
  </button>

  {#if hasChildren && !isCollapsed}
    <div class="org-node__children">
      {#each node.children as child (child.id)}
        <svelte:self node={child} level={level + 1} {variant} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .org-node {
    position: relative;

    // Tree 模式下的子节点容器
    :global(.org-chart--tree) & {
      &__children {
        display: flex;
        gap: 24px;
        justify-content: center;
        margin-top: 40px;
        flex-wrap: wrap;
        position: relative;

        // 连接线（顶部）
        &::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 50%;
          width: 2px;
          height: 20px;
          background: $color-border;
        }

        @include respond-to('mobile') {
          gap: 16px;
          margin-top: 24px;

          &::before {
            height: 12px;
            top: -12px;
          }
        }
      }
    }

    // List 模式下的子节点容器
    :global(.org-chart--list) & {
      &__children {
        margin-left: 32px;
        margin-top: 16px;
        border-left: 2px solid $color-border;
        padding-left: 16px;

        @include respond-to('mobile') {
          margin-left: 16px;
          padding-left: 12px;
        }
      }
    }

    // 节点卡片
    &__card {
      position: relative;
      background: white;
      border: 2px solid $color-border;
      border-radius: 8px;
      padding: 16px 24px;
      min-width: 200px;
      max-width: 280px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      display: block;
      width: 100%;

      @include respond-to('mobile') {
        min-width: 160px;
        max-width: 240px;
        padding: 12px 16px;
      }

      &:not(:disabled):hover {
        border-color: $color-primary;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      &:disabled {
        cursor: default;
      }

      // 总部样式（绿色渐变）
      &--headquarters {
        border-color: $color-primary;
        background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
        color: white;

        .org-node__leader,
        .org-node__employees {
          color: rgba(255, 255, 255, 0.9);
        }

        .org-node__toggle {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
      }

      // 分支样式
      &--branch {
        border-color: $color-accent;
        background: $color-background-light;
      }

      // 部门样式
      &--department {
        border-color: $color-border;
        background: white;
      }

      // 团队样式
      &--team {
        border-color: $color-text-tertiary;
        background: white;
        font-size: 14px;
        min-width: 160px;

        @include respond-to('mobile') {
          min-width: 140px;
          font-size: 13px;
        }
      }
    }

    // 节点名称
    &__name {
      font-size: 16px;
      font-weight: 600;
      color: inherit;
      margin-bottom: 4px;
      line-height: 1.4;

      .org-node__card--team & {
        font-size: 14px;
      }

      @include respond-to('mobile') {
        font-size: 14px;

        .org-node__card--team & {
          font-size: 13px;
        }
      }
    }

    // 负责人
    &__leader {
      font-size: 14px;
      color: $color-text-secondary;
      margin-bottom: 4px;

      @include respond-to('mobile') {
        font-size: 12px;
      }
    }

    // 员工数量
    &__employees {
      font-size: 13px;
      color: $color-text-tertiary;

      @include respond-to('mobile') {
        font-size: 12px;
      }
    }

    // 折叠按钮
    &__toggle {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      color: $color-text-primary;
      pointer-events: none;

      @include respond-to('mobile') {
        width: 20px;
        height: 20px;
        font-size: 16px;
        top: 6px;
        right: 6px;
      }
    }
  }
</style>
