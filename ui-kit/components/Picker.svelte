<script lang="ts">
  /**
   * Picker Component - iOS风格的滚轮选择器
   * 支持水平和垂直方向，带淡化和缩放效果
   */

  interface PickerItem {
    id: string;
    label: string;
    [key: string]: any;
  }

  interface Props {
    items: PickerItem[];
    activeIndex?: number;
    orientation?: 'horizontal' | 'vertical';
    visibleCount?: number;
    onSelect?: (index: number) => void;
  }

  let {
    items = [],
    activeIndex = 0,
    orientation = 'horizontal',
    visibleCount = 5,
    onSelect
  }: Props = $props();

  let currentIndex = $state(activeIndex);

  // 同步外部传入的activeIndex
  $effect(() => {
    currentIndex = activeIndex;
  });

  let containerRef: HTMLDivElement;
  let isDragging = $state(false);
  let startPos = $state(0);
  let currentTranslate = $state(0);

  // iOS滚轮效果 - 控制可见范围，中心高亮
  const itemStyles = $derived.by(() => {
    return items.map((_, index) => {
      const offset = index - currentIndex;
      const absOffset = Math.abs(offset);

      // 垂直Picker：可见范围±2（共5个可见）
      const visibleRange = orientation === 'vertical' ? 2 : 3;
      const isVisible = absOffset <= visibleRange;

      // 垂直Picker：不做opacity淡化，使用CSS颜色控制
      const opacity = orientation === 'vertical'
        ? 1
        : Math.max(0.2, 1 - absOffset * 0.2);

      const scale = orientation === 'vertical'
        ? 1
        : Math.max(0.65, 1 - absOffset * 0.12);

      // 判断是否是active状态
      const isActive = index === currentIndex;

      return {
        opacity,
        scale,
        isVisible,
        offset,
        isActive
      };
    });
  });

  function handleItemClick(index: number) {
    currentIndex = index;
    // 只有点击时才触发回调
    onSelect?.(index);
  }

  // 滚轮交互 - 垂直方向滚动切换
  let accumulatedDelta = 0;
  let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleWheel(e: WheelEvent) {
    if (orientation !== 'vertical') return;

    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY;
    accumulatedDelta += delta;

    if (wheelTimeout) {
      clearTimeout(wheelTimeout);
    }

    const threshold = 30;

    if (Math.abs(accumulatedDelta) >= threshold) {
      if (accumulatedDelta > 0 && currentIndex < items.length - 1) {
        currentIndex++;
      } else if (accumulatedDelta < 0 && currentIndex > 0) {
        currentIndex--;
      }
      accumulatedDelta = 0;
    }

    wheelTimeout = setTimeout(() => {
      accumulatedDelta = 0;
      wheelTimeout = null;
    }, 150);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        // 键盘导航触发onSelect
        onSelect?.(currentIndex);
      } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        currentIndex++;
        onSelect?.(currentIndex);
      }
    } else {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        currentIndex--;
        onSelect?.(currentIndex);
      } else if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
        currentIndex++;
        onSelect?.(currentIndex);
      }
    }
  }
</script>

<div
  class="picker"
  class:picker--horizontal={orientation === 'horizontal'}
  class:picker--vertical={orientation === 'vertical'}
  bind:this={containerRef}
  onwheel={handleWheel}
  onkeydown={handleKeydown}
  role="listbox"
  tabindex="0"
  aria-activedescendant={items[currentIndex]?.id}
>
  <div class="picker__track">
    {#each items as item, index}
      {@const style = itemStyles[index]}
      {#if style.isVisible}
        <button
          class="picker__item"
          class:picker__item--active={style.isActive}
          style="opacity: {style.opacity}; transform: scale({style.scale});"
          onclick={() => handleItemClick(index)}
          id={item.id}
          role="option"
          aria-selected={style.isActive}
        >
          <span class="picker__label">{item.label}</span>
        </button>
      {/if}
    {/each}
  </div>

  <!-- 中间高亮指示器 -->
  <div class="picker__indicator"></div>
</div>

<style lang="scss">
  @use '../styles/variables.scss' as *;

  .picker {
    position: relative;
    overflow: hidden;
    user-select: none;
    cursor: grab;

    &:focus {
      outline: none;
    }

    &:active {
      cursor: grabbing;
    }

    &--horizontal {
      width: 100%;
      height: 80px;
    }

    &--vertical {
      width: 200px;
      height: 300px;
      overflow: hidden;
    }
  }

  .picker__track {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: none;
    will-change: transform;

    .picker--horizontal & {
      flex-direction: row;
      gap: 3rem;
    }

    .picker--vertical & {
      flex-direction: column;
      gap: 2rem; // Must match About page: 2rem
      align-items: flex-start;
    }
  }

  .picker__item {
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    white-space: nowrap;
    flex-shrink: 0;
    will-change: transform, opacity;

    .picker--horizontal & {
      padding: 0.5rem 0;
      color: rgba(255, 255, 255, 0.5);
    }

    .picker--vertical & {
      padding: 0;
      width: 100%;
      text-align: left;
      position: relative;
      color: #cbd5e1;
    }

    &--active {
      position: relative;

      .picker--horizontal & {
        color: white;
      }

      .picker--vertical & {
        color: $color-primary;

        &::before {
          width: 0.75rem;
        }
      }

      // 添加底部下划线（仅水平方向）
      .picker--horizontal &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: white;
      }
    }

    &:hover:not(&--active) {
      .picker--horizontal & {
        color: rgba(255, 255, 255, 0.8);
      }

      .picker--vertical & {
        color: #94a3b8;

        &::before {
          width: 0.75rem;
        }
      }
    }

    // 垂直方向的左侧指示线
    .picker--vertical &::before {
      content: '';
      position: absolute;
      left: -1.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0.0625rem;
      background: $color-primary;
      transition: width 0.3s ease;
    }
  }

  .picker__label {
    display: block;
    transition: font-size 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                font-weight 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    .picker--horizontal & {
      font-size: 0.9rem;
      font-weight: 400;
      letter-spacing: 0.02em;
    }

    .picker--vertical & {
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.15em;
    }

    .picker__item--active & {
      .picker--horizontal & {
        font-size: 1.1rem;
        font-weight: 500;
        letter-spacing: 0.01em;
      }

      .picker--vertical & {
        font-weight: 600;
      }
    }
  }

  .picker__indicator {
    // 移除指示器样式
    display: none;
  }

  // 移除所有渐变遮罩 - 保持简洁
  .picker--horizontal::before,
  .picker--horizontal::after,
  .picker--vertical::before,
  .picker--vertical::after {
    display: none;
  }
</style>
