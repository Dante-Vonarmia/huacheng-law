<script lang="ts">
  /**
   * Input 组件 - 国际律所专业表单输入
   * 支持多种输入类型和验证状态
   */

  export let type: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url' | 'search' = 'text';
  export let value: string = '';
  export let placeholder: string = '';
  export let label: string = '';
  export let name: string = '';
  export let id: string = name || `input-${Math.random().toString(36).substr(2, 9)}`;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let error: string = '';
  export let helperText: string = '';
  export let maxlength: number | undefined = undefined;
  export let className: string = '';

  $: hasError = !!error;
  $: classes = [
    'input-wrapper',
    hasError && 'input-wrapper--error',
    disabled && 'input-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');
</script>

<div class={classes}>
  {#if label}
    <label for={id} class="input__label">
      {label}
      {#if required}
        <span class="input__required" aria-label="必填">*</span>
      {/if}
    </label>
  {/if}

  <input
    {type}
    {id}
    {name}
    {placeholder}
    {required}
    {disabled}
    {maxlength}
    class="input__field"
    bind:value
    on:input
    on:blur
    on:focus
    on:change
    aria-invalid={hasError}
    aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
  />

  {#if hasError}
    <p class="input__error" id="{id}-error" role="alert">
      {error}
    </p>
  {:else if helperText}
    <p class="input__helper" id="{id}-helper">
      {helperText}
    </p>
  {/if}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .input-wrapper {
    width: 100%;
    margin-bottom: $spacing-md;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .input__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-primary;
    margin-bottom: $spacing-xs;
  }

  .input__required {
    color: $color-error;
    margin-left: 2px;
  }

  .input__field {
    @include input-base;

    // 错误状态
    .input-wrapper--error & {
      border-color: $color-error;

      &:focus {
        border-color: $color-error;
        box-shadow: 0 0 0 3px rgba($color-error, 0.1);
      }
    }

    // 禁用状态
    .input-wrapper--disabled & {
      background: $color-background;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .input__error {
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

  .input__helper {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-text-light;
  }
</style>
