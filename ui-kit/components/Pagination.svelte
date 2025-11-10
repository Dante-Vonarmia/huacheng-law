<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Props接口定义
  export let total: number = 0;
  export let pageSize: number = 12;
  export let currentPage: number = 1;
  export let pageSizeOptions: number[] = [12, 24, 48];
  export let showPageSize: boolean = true;
  export let showTotal: boolean = true;
  export let maxPageButtons: number = 7;

  // 事件派发
  const dispatch = createEventDispatcher<{
    pageChange: number;
    pageSizeChange: number;
  }>();

  // 计算属性
  $: totalPages = Math.ceil(total / pageSize);
  $: startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  $: endItem = Math.min(currentPage * pageSize, total);
  $: pageNumbers = generatePageNumbers(currentPage, totalPages, maxPageButtons);

  // 生成页码按钮数组（智能省略）
  function generatePageNumbers(current: number, total: number, max: number): (number | string)[] {
    if (total === 0) return [];

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

    if (total > 1) {
      pages.push(total); // 始终显示最后一页
    }

    return pages;
  }

  // 跳转到指定页
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch('pageChange', page);
    }
  }

  // 上一页
  function prevPage() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }

  // 下一页
  function nextPage() {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }

  // 切换每页条数
  function changePageSize(event: Event) {
    const target = event.target as HTMLSelectElement;
    const size = parseInt(target.value, 10);
    dispatch('pageSizeChange', size);
    // 切换每页条数时重置到第1页
    dispatch('pageChange', 1);
  }

  // 判断是否为省略号
  function isEllipsis(item: number | string): boolean {
    return item === '...';
  }
</script>

<div class="pagination">
  <!-- 总数信息 -->
  {#if showTotal}
    <div class="pagination__info">
      {#if total > 0}
        显示 {startItem}-{endItem} / 共 {total} 条
      {:else}
        暂无数据
      {/if}
    </div>
  {/if}

  <div class="pagination__right">
    <!-- 每页条数选择器 -->
    {#if showPageSize}
      <div class="pagination__size-selector">
        <span>每页</span>
        <select value={pageSize} on:change={changePageSize}>
          {#each pageSizeOptions as option}
            <option value={option}>{option} 条</option>
          {/each}
        </select>
      </div>
    {/if}

    <!-- 页码控制 -->
    {#if totalPages > 0}
      <div class="pagination__controls">
        <!-- 上一页 -->
        <button
          class="pagination__button"
          disabled={currentPage === 1}
          on:click={prevPage}
          aria-label="上一页"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="10 12 6 8 10 4"></polyline>
          </svg>
        </button>

        <!-- 页码按钮 -->
        {#each pageNumbers as page (page)}
          {#if isEllipsis(page)}
            <span class="pagination__button pagination__button--ellipsis">...</span>
          {:else}
            <button
              class="pagination__button"
              class:pagination__button--active={page === currentPage}
              on:click={() => goToPage(page as number)}
              aria-label="第 {page} 页"
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          {/if}
        {/each}

        <!-- 下一页 -->
        <button
          class="pagination__button"
          disabled={currentPage === totalPages}
          on:click={nextPage}
          aria-label="下一页"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 12 10 8 6 4"></polyline>
          </svg>
        </button>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    padding: 24px 0;

    @include respond-to('mobile') {
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
    }

    &__info {
      font-size: 14px;
      color: $color-text-secondary;

      @include respond-to('mobile') {
        text-align: center;
      }
    }

    &__right {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;

      @include respond-to('mobile') {
        flex-direction: column;
        gap: 12px;
      }
    }

    &__size-selector {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: $color-text-secondary;

      @include respond-to('mobile') {
        justify-content: center;
      }

      select {
        padding: 6px 10px;
        border: 1px solid $color-border;
        border-radius: 4px;
        font-size: 14px;
        color: $color-text-primary;
        background: white;
        cursor: pointer;
        transition: border-color 0.3s;

        &:focus {
          outline: none;
          border-color: $color-primary;
        }

        &:hover {
          border-color: color.scale($color-border, $lightness: -18.8191881919%);
        }
      }
    }

    &__controls {
      display: flex;
      align-items: center;
      gap: 8px;

      @include respond-to('mobile') {
        justify-content: center;
      }
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
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled):not(&--ellipsis) {
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
        font-weight: 500;

        &:hover {
          background: $color-accent;
          border-color: $color-accent;
        }
      }

      &--ellipsis {
        cursor: default;
        border: none;
        pointer-events: none;

        &:hover {
          border: none;
          color: $color-text-primary;
        }
      }

      svg {
        display: block;
      }
    }
  }
</style>
