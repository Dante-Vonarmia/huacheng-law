<script lang="ts">
  /**
   * Textarea 组件 - 多行文本输入
   */

  export let value: string = '';
  export let placeholder: string = '';
  export let label: string = '';
  export let name: string = '';
  export let id: string = name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let error: string = '';
  export let helperText: string = '';
  export let rows: number = 4;
  export let maxlength: number | undefined = undefined;
  export let className: string = '';

  $: hasError = !!error;
  $: classes = [
    'textarea-wrapper',
    hasError && 'textarea-wrapper--error',
    disabled && 'textarea-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');
</script>

<div class={classes}>
  {#if label}
    <label for={id} class="textarea__label">
      {label}
      {#if required}
        <span class="textarea__required" aria-label="必填">*</span>
      {/if}
    </label>
  {/if}

  <textarea
    {id}
    {name}
    {placeholder}
    {required}
    {disabled}
    {rows}
    {maxlength}
    class="textarea__field"
    bind:value
    on:input
    on:blur
    on:focus
    on:change
    aria-invalid={hasError}
    aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
  />

  {#if hasError}
    <p class="textarea__error" id="{id}-error" role="alert">
      {error}
    </p>
  {:else if helperText}
    <p class="textarea__helper" id="{id}-helper">
      {helperText}
    </p>
  {/if}
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .textarea-wrapper {
    width: 100%;
    margin-bottom: $spacing-md;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .textarea__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-primary;
    margin-bottom: $spacing-xs;
  }

  .textarea__required {
    color: $color-error;
    margin-left: 2px;
  }

  .textarea__field {
    @include input-base;
    resize: vertical;
    min-height: 100px;
    font-family: $font-family-cn;

    // 错误状态
    .textarea-wrapper--error & {
      border-color: $color-error;

      &:focus {
        border-color: $color-error;
        box-shadow: 0 0 0 3px rgba($color-error, 0.1);
      }
    }

    // 禁用状态
    .textarea-wrapper--disabled & {
      background: $color-background;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .textarea__error {
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

  .textarea__helper {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-text-light;
  }
</style>
