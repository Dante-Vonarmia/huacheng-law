<script lang="ts">
  /**
   * ContactForm 组件 - 联系表单
   * 包含姓名、邮箱、电话、留言字段，支持验证
   */

  import { createEventDispatcher } from 'svelte';
  import * as yup from 'yup';
  import Input from '$ui/components/Input.svelte';
  import Textarea from '$ui/components/Textarea.svelte';
  import Button from '$ui/components/Button.svelte';
  import { _ } from 'svelte-i18n';

  export let className: string = '';

  const dispatch = createEventDispatcher();

  let formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let submitSuccess = false;

  const schema = yup.object({
    name: yup.string().min(2, '姓名至少需要2个字符').max(50, '姓名不能超过50个字符').required('请输入姓名'),
    email: yup.string().email('请输入有效的邮箱地址').required('请输入邮箱'),
    phone: yup.string().matches(/^1[3-9]\d{9}$/, '请输入有效的手机号码').optional(),
    message: yup.string().min(10, '留言至少需要10个字符').required('请输入留言内容')
  });

  async function validateField(field: keyof typeof formData) {
    try {
      await schema.validateAt(field, formData);
      errors = { ...errors, [field]: '' };
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        errors = { ...errors, [field]: err.message };
      }
    }
  }

  async function handleSubmit() {
    // 重置状态
    errors = {};
    submitSuccess = false;

    try {
      // 验证表单
      await schema.validate(formData, { abortEarly: false });

      // 提交表单
      isSubmitting = true;

      // 模拟API调用 (实际项目中替换为真实API)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 提交成功
      submitSuccess = true;
      dispatch('submit', formData);

      // 重置表单
      formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };

      // 3秒后隐藏成功消息
      setTimeout(() => {
        submitSuccess = false;
      }, 3000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // 收集所有验证错误
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        errors = { ...errors }; // 触发响应式更新
      }
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form class="contact-form {className}" on:submit|preventDefault={handleSubmit}>
  <div class="contact-form__fields">
    <Input
      type="text"
      name="name"
      label={$_('contact.name')}
      placeholder="请输入您的姓名"
      required
      bind:value={formData.name}
      error={errors.name}
      on:blur={() => validateField('name')}
    />

    <Input
      type="email"
      name="email"
      label={$_('contact.email')}
      placeholder="your@email.com"
      required
      bind:value={formData.email}
      error={errors.email}
      on:blur={() => validateField('email')}
    />

    <Input
      type="tel"
      name="phone"
      label={$_('contact.phone')}
      placeholder="13800138000"
      bind:value={formData.phone}
      error={errors.phone}
      helperText="选填"
      on:blur={() => validateField('phone')}
    />

    <Textarea
      name="message"
      label={$_('contact.message')}
      placeholder="请告诉我们您的法律咨询需求..."
      required
      rows={6}
      bind:value={formData.message}
      error={errors.message}
      on:blur={() => validateField('message')}
    />
  </div>

  {#if submitSuccess}
    <div class="contact-form__success" role="alert">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {$_('contact.success')}
    </div>
  {/if}

  <div class="contact-form__actions">
    <Button
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      loading={isSubmitting}
      disabled={isSubmitting}
    >
      {$_('contact.submit')}
    </Button>
  </div>

  <p class="contact-form__privacy">
    提交即表示您同意我们的隐私政策。我们会妥善保管您的个人信息，仅用于回复您的咨询。
  </p>
</form>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .contact-form {
    width: 100%;
    max-width: 600px;

    &__fields {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      margin-bottom: $spacing-lg;
    }

    &__success {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      padding: $spacing-md;
      background: rgba($color-success, 0.1);
      color: $color-success;
      border: 1px solid $color-success;
      border-radius: $radius-base;
      margin-bottom: $spacing-lg;
      font-weight: 500;
      animation: slideInDown $transition-base $transition-ease;

      svg {
        flex-shrink: 0;
      }
    }

    &__actions {
      margin-bottom: $spacing-md;
    }

    &__privacy {
      @include caption;
      text-align: center;
      color: $color-text-light;
      line-height: $line-height-relaxed;
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
