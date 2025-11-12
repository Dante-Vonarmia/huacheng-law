<script lang="ts">
  /**
   * Select 组件 - 优雅的下拉选择框
   * 支持自定义样式、错误状态和完整的可访问性
   */

  let {
    value = $bindable(''),
    options = [],
    placeholder = '请选择...',
    label = '',
    name = '',
    id = name || `select-${Math.random().toString(36).substr(2, 9)}`,
    required = false,
    disabled = false,
    error = '',
    helperText = '',
    className = ''
  }: {
    value?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    label?: string;
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
  } = $props();

  let isOpen = $state(false);
  let selectedLabel = $derived(
    value ? options.find(opt => opt.value === value)?.label || placeholder : placeholder
  );

  $effect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.select-wrapper')) {
          isOpen = false;
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });

  function toggleDropdown() {
    if (!disabled) {
      isOpen = !isOpen;
    }
  }

  function selectOption(optionValue: string) {
    value = optionValue;
    isOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleDropdown();
        break;
      case 'Escape':
        isOpen = false;
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          isOpen = true;
        } else {
          // Focus next option
          const currentIndex = options.findIndex(opt => opt.value === value);
          if (currentIndex < options.length - 1) {
            value = options[currentIndex + 1].value;
          }
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const currentIndex = options.findIndex(opt => opt.value === value);
          if (currentIndex > 0) {
            value = options[currentIndex - 1].value;
          }
        }
        break;
    }
  }

  const hasError = $derived(!!error);
  const classes = $derived([
    'select-wrapper',
    hasError && 'select-wrapper--error',
    disabled && 'select-wrapper--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<div class={classes}>
  {#if label}
    <label for={id} class="select__label">
      {label}
      {#if required}
        <span class="select__required" aria-label="必填">*</span>
      {/if}
    </label>
  {/if}

  <div class="select-container">
    <button
      type="button"
      {id}
      class="select__trigger"
      class:select__trigger--open={isOpen}
      class:select__trigger--placeholder={!value}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby={label ? `${id}-label` : undefined}
      {disabled}
      onclick={toggleDropdown}
      onkeydown={handleKeydown}
    >
      <span class="select__value">{selectedLabel}</span>
      <svg
        class="select__arrow"
        class:select__arrow--open={isOpen}
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    {#if isOpen}
      <ul class="select__dropdown" role="listbox" aria-labelledby={id}>
        {#each options as option}
          <li
            role="option"
            aria-selected={value === option.value}
            class="select__option"
            class:select__option--selected={value === option.value}
            onclick={() => selectOption(option.value)}
          >
            {option.label}
            {#if value === option.value}
              <svg class="select__check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if hasError}
    <p class="select__error" id="{id}-error" role="alert">
      {error}
    </p>
  {:else if helperText}
    <p class="select__helper" id="{id}-helper">
      {helperText}
    </p>
  {/if}

  <!-- Hidden native select for form submission -->
  <select {name} bind:value class="select__native" tabindex="-1" aria-hidden="true">
    <option value="">{placeholder}</option>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;

  .select-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: $spacing-md;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .select__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-primary;
    margin-bottom: $spacing-xs;
  }

  .select__required {
    color: $color-error;
    margin-left: 2px;
  }

  .select-container {
    position: relative;
  }

  .select__trigger {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #1e293b;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    outline: none;
    font-family: inherit;

    &:hover:not(:disabled) {
      border-color: #94a3b8;
      background: #f8fafc;
    }

    &:focus:not(:disabled) {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }

    &--open {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }

    &--placeholder {
      color: #cbd5e1;
    }

    &:disabled {
      background: #f1f5f9;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .select-wrapper--error & {
      border-color: $color-error;

      &:focus {
        box-shadow: 0 0 0 3px rgba($color-error, 0.1);
      }
    }
  }

  .select__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select__arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    transition: transform 0.2s ease;
    pointer-events: none;

    &--open {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  .select__dropdown {
    position: absolute;
    top: calc(100% + 0.25rem);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                0 8px 10px -6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 16rem;
    overflow-y: auto;
    padding: 0.25rem;
    margin: 0;
    list-style: none;
    animation: slideDown 0.15s ease;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;

      &:hover {
        background: #94a3b8;
      }
    }
  }

  .select__option {
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    color: #475569;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 300;

    &:hover {
      background: #f8fafc;
      color: #1e293b;
    }

    &--selected {
      background: rgba($color-primary, 0.08);
      color: $color-primary;
      font-weight: 400;

      &:hover {
        background: rgba($color-primary, 0.12);
      }
    }
  }

  .select__check {
    color: $color-primary;
    flex-shrink: 0;
  }

  .select__error {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-error;
    display: flex;
    align-items: center;
    gap: $spacing-xs;

    &::before {
      content: '⚠';
      font-size: 14px;
    }
  }

  .select__helper {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-text-light;
  }

  .select__native {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Responsive
  @media (max-width: 768px) {
    .select__trigger {
      padding: 0.625rem 2.25rem 0.625rem 0.875rem;
      font-size: 0.8125rem;
    }

    .select__dropdown {
      max-height: 12rem;
    }

    .select__option {
      padding: 0.5rem 0.625rem;
      font-size: 0.8125rem;
    }
  }
</style>
