<script lang="ts" context="module">
  // 辅助函数：应用筛选条件到数据集
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
</script>

<script lang="ts">
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  // Props接口定义
  export let filters: FilterConfig[] = [];

  // 类型定义
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

  export type FilterValues = Record<string, string | string[]>;

  // 事件派发
  const dispatch = createEventDispatcher<{
    change: FilterValues;
  }>();

  // 状态管理
  const filterValues = writable<FilterValues>({});

  // 处理单个筛选项变化
  function handleFilterChange(filterId: string, value: string) {
    filterValues.update(values => {
      const newValues = { ...values };
      if (value === '') {
        delete newValues[filterId];
      } else {
        newValues[filterId] = value;
      }
      dispatch('change', newValues);
      return newValues;
    });
  }

  // 处理多选筛选项变化
  function handleMultiselectChange(filterId: string, optionValue: string, checked: boolean) {
    filterValues.update(values => {
      const newValues = { ...values };
      const currentValues = (newValues[filterId] as string[]) || [];

      if (checked) {
        newValues[filterId] = [...currentValues, optionValue];
      } else {
        const filtered = currentValues.filter(v => v !== optionValue);
        if (filtered.length === 0) {
          delete newValues[filterId];
        } else {
          newValues[filterId] = filtered;
        }
      }

      dispatch('change', newValues);
      return newValues;
    });
  }

  // 重置所有筛选条件
  function resetFilters() {
    filterValues.set({});
    dispatch('change', {});

    // 清除所有表单元素的值
    const form = document.querySelector('.filter-bar') as HTMLElement;
    if (form) {
      const inputs = form.querySelectorAll('input, select');
      inputs.forEach(input => {
        if (input instanceof HTMLInputElement) {
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
          } else {
            input.value = '';
          }
        } else if (input instanceof HTMLSelectElement) {
          input.value = '';
        }
      });
    }
  }

  // 检查多选项是否被选中
  function isChecked(filterId: string, value: string, $filterValues: FilterValues): boolean {
    const values = $filterValues[filterId];
    if (Array.isArray(values)) {
      return values.includes(value);
    }
    return false;
  }
</script>

<div class="filter-bar">
  <div class="filter-bar__header">
    <h3 class="filter-bar__title">筛选条件</h3>
    <button class="filter-bar__reset" on:click={resetFilters}>
      重置
    </button>
  </div>

  <div class="filter-bar__filters">
    {#each filters as filter (filter.id)}
      <div class="filter-bar__filter">
        <label class="filter-bar__label">{filter.label_zh}</label>

        {#if filter.type === 'select'}
          <!-- 下拉单选 -->
          <select
            class="filter-bar__select"
            on:change={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
          >
            <option value="">全部</option>
            {#if filter.options}
              {#each filter.options as option (option.value)}
                <option value={option.value}>
                  {option.label_zh}
                  {#if option.count !== undefined}
                    ({option.count})
                  {/if}
                </option>
              {/each}
            {/if}
          </select>

        {:else if filter.type === 'multiselect'}
          <!-- 复选框多选 -->
          <div class="filter-bar__multiselect">
            {#if filter.options}
              {#each filter.options as option (option.value)}
                <label
                  class="filter-bar__checkbox"
                  class:filter-bar__checkbox--checked={isChecked(filter.id, option.value, $filterValues)}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked(filter.id, option.value, $filterValues)}
                    on:change={(e) => handleMultiselectChange(filter.id, option.value, e.currentTarget.checked)}
                  />
                  <span class="filter-bar__checkbox-text">{option.label_zh}</span>
                  {#if option.count !== undefined}
                    <span class="filter-bar__checkbox-count">({option.count})</span>
                  {/if}
                </label>
              {/each}
            {/if}
          </div>

        {:else if filter.type === 'search'}
          <!-- 关键词搜索 -->
          <input
            type="text"
            class="filter-bar__input"
            placeholder={filter.placeholder_zh || '请输入关键词...'}
            on:input={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
          />

        {:else if filter.type === 'radio'}
          <!-- 单选按钮 -->
          <div class="filter-bar__radio-group">
            {#if filter.options}
              {#each filter.options as option (option.value)}
                <label class="filter-bar__radio">
                  <input
                    type="radio"
                    name={filter.id}
                    value={option.value}
                    on:change={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
                  />
                  <span>{option.label_zh}</span>
                  {#if option.count !== undefined}
                    <span class="count">({option.count})</span>
                  {/if}
                </label>
              {/each}
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .filter-bar {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 32px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: $color-text-primary;
    }

    &__reset {
      background: none;
      border: none;
      color: $color-primary;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: underline;
      padding: 4px 8px;
      transition: color 0.2s;

      &:hover {
        color: $color-accent;
      }
    }

    &__filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      @include respond-to('mobile') {
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
      margin-bottom: 4px;
    }

    // Select 下拉框样式
    &__select {
      padding: 10px 14px;
      border: 1px solid $color-border;
      border-radius: 4px;
      font-size: 15px;
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

    // Input 输入框样式
    &__input {
      padding: 10px 14px;
      border: 1px solid $color-border;
      border-radius: 4px;
      font-size: 15px;
      color: $color-text-primary;
      transition: border-color 0.3s;

      &::placeholder {
        color: $color-text-tertiary;
      }

      &:focus {
        outline: none;
        border-color: $color-primary;
      }
    }

    // Multiselect 复选框样式
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
      font-size: 14px;
      user-select: none;

      input[type="checkbox"] {
        cursor: pointer;
        width: 16px;
        height: 16px;
      }

      &:hover {
        border-color: $color-primary;
        background: rgba($color-primary, 0.05);
      }

      &--checked {
        border-color: $color-primary;
        background: rgba($color-primary, 0.1);
      }

      &-text {
        color: $color-text-primary;
      }

      &-count {
        color: $color-text-secondary;
        font-size: 13px;
      }
    }

    // Radio 单选按钮样式
    &__radio-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__radio {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      cursor: pointer;
      font-size: 14px;
      user-select: none;

      input[type="radio"] {
        cursor: pointer;
        width: 16px;
        height: 16px;
      }

      span.count {
        color: $color-text-secondary;
        font-size: 13px;
        margin-left: 4px;
      }

      &:hover {
        color: $color-primary;
      }
    }
  }
</style>
