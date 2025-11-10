<script lang="ts">
  import { Button, Card, Badge, Input, Textarea, Typography } from '$ui/components';
  import { Section } from '$ui/layouts';

  let activeTab = 'all';
  let showModal = false;
  let inputValue = '';
  let textareaValue = '';
  let checkboxValue = false;
  let radioValue = 'option1';
  let switchValue = false;

  const categories = [
    { id: 'all', name: '全部组件' },
    { id: 'basic', name: '基础组件' },
    { id: 'layout', name: '布局组件' },
    { id: 'form', name: '表单组件' },
    { id: 'feedback', name: '反馈组件' }
  ];
</script>

<svelte:head>
  <title>UI Kit Showcase - Watson & Band</title>
</svelte:head>

<div class="showcase">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="logo">W&B UI Kit</h1>
      <p class="version">v1.0.0</p>
    </div>

    <nav class="sidebar-nav">
      {#each categories as category}
        <button
          class="nav-item"
          class:active={activeTab === category.id}
          on:click={() => activeTab = category.id}
        >
          {category.name}
        </button>
      {/each}
    </nav>

    <div class="sidebar-footer">
      <p class="stats">22 Components</p>
      <p class="copyright">© 2024 Watson & Band</p>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="content">
    <div class="content-header">
      <h1>组件展示</h1>
      <p class="subtitle">UI Kit Component Showcase</p>
    </div>

    <div class="components">
      <!-- Buttons Section -->
      {#if activeTab === 'all' || activeTab === 'basic'}
        <section class="component-section">
          <h2 class="section-title">Button 按钮</h2>
          <p class="section-desc">用于触发操作的按钮组件，支持多种样式和尺寸。</p>

          <div class="demo-box">
            <div class="demo-row">
              <span class="demo-label">变体:</span>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>

            <div class="demo-row">
              <span class="demo-label">尺寸:</span>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>

            <div class="demo-row">
              <span class="demo-label">状态:</span>
              <Button disabled>Disabled</Button>
              <Button variant="primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
                  <path d="M8 0L10 6L16 7L11 11L13 16L8 13L3 16L5 11L0 7L6 6L8 0Z"/>
                </svg>
                With Icon
              </Button>
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Button variant="primary"&gt;Primary Button&lt;/Button&gt;
&lt;Button variant="outline" size="lg"&gt;Large Outline&lt;/Button&gt;
&lt;Button disabled&gt;Disabled Button&lt;/Button&gt;</code></pre>
          </div>
        </section>
      {/if}

      <!-- Badge Section -->
      {#if activeTab === 'all' || activeTab === 'basic'}
        <section class="component-section">
          <h2 class="section-title">Badge 徽章</h2>
          <p class="section-desc">用于标记和分类的小标签组件。</p>

          <div class="demo-box">
            <div class="demo-row">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Badge variant="primary"&gt;Primary&lt;/Badge&gt;
&lt;Badge variant="success"&gt;Success&lt;/Badge&gt;</code></pre>
          </div>
        </section>
      {/if}

      <!-- Card Section -->
      {#if activeTab === 'all' || activeTab === 'basic'}
        <section class="component-section">
          <h2 class="section-title">Card 卡片</h2>
          <p class="section-desc">用于内容展示的卡片容器组件。</p>

          <div class="demo-box">
            <div class="demo-grid">
              <Card variant="default">
                <div style="padding: 24px;">
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 12px;">
                    Default Card
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    这是一个默认样式的卡片组件
                  </Typography>
                </div>
              </Card>

              <Card variant="elevated" hoverable={true}>
                <div style="padding: 24px;">
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 12px;">
                    Elevated Card
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    带阴影的卡片，支持悬停效果
                  </Typography>
                </div>
              </Card>

              <Card variant="outline">
                <div style="padding: 24px;">
                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 12px;">
                    Outline Card
                  </Typography>
                  <Typography tag="p" variant="sm" color="secondary">
                    带边框的卡片样式
                  </Typography>
                </div>
              </Card>
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Card variant="elevated" hoverable={true}&gt;
  &lt;div style="padding: 24px;"&gt;
    Card Content
  &lt;/div&gt;
&lt;/Card&gt;</code></pre>
          </div>
        </section>
      {/if}

      <!-- Typography Section -->
      {#if activeTab === 'all' || activeTab === 'basic'}
        <section class="component-section">
          <h2 class="section-title">Typography 排版</h2>
          <p class="section-desc">统一的文本排版组件。</p>

          <div class="demo-box">
            <div class="demo-column">
              <Typography tag="h1" variant="4xl" weight="500">
                Heading 1 (4xl)
              </Typography>
              <Typography tag="h2" variant="3xl" weight="500">
                Heading 2 (3xl)
              </Typography>
              <Typography tag="h3" variant="2xl" weight="500">
                Heading 3 (2xl)
              </Typography>
              <Typography tag="h4" variant="xl" weight="500">
                Heading 4 (xl)
              </Typography>
              <Typography tag="p" variant="base">
                Body text (base) - 这是正文文本的默认样式
              </Typography>
              <Typography tag="p" variant="sm" color="secondary">
                Small text (sm) - 这是较小的辅助文本
              </Typography>
              <Typography tag="p" variant="xs" color="light">
                Extra small text (xs) - 这是最小的文本
              </Typography>
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Typography tag="h1" variant="4xl" weight="500"&gt;
  Heading 1
&lt;/Typography&gt;
&lt;Typography tag="p" variant="base" color="secondary"&gt;
  Body text
&lt;/Typography&gt;</code></pre>
          </div>
        </section>
      {/if}

      <!-- Input Section -->
      {#if activeTab === 'all' || activeTab === 'form'}
        <section class="component-section">
          <h2 class="section-title">Input 输入框</h2>
          <p class="section-desc">表单输入组件。</p>

          <div class="demo-box">
            <div class="demo-column" style="max-width: 500px;">
              <Input
                type="text"
                placeholder="普通文本输入"
                bind:value={inputValue}
              />
              <Input
                type="email"
                placeholder="邮箱输入"
              />
              <Input
                type="password"
                placeholder="密码输入"
              />
              <Input
                type="text"
                placeholder="禁用状态"
                disabled
              />
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Input
  type="text"
  placeholder="请输入内容"
  bind:value={inputValue}
/&gt;</code></pre>
          </div>
        </section>
      {/if}

      <!-- Textarea Section -->
      {#if activeTab === 'all' || activeTab === 'form'}
        <section class="component-section">
          <h2 class="section-title">Textarea 文本域</h2>
          <p class="section-desc">多行文本输入组件。</p>

          <div class="demo-box">
            <div class="demo-column" style="max-width: 500px;">
              <Textarea
                placeholder="请输入多行文本..."
                bind:value={textareaValue}
                rows={4}
              />
              <Textarea
                placeholder="禁用状态"
                disabled
                rows={3}
              />
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Textarea
  placeholder="请输入内容"
  bind:value={textareaValue}
  rows={4}
/&gt;</code></pre>
          </div>
        </section>
      {/if}


      <!-- Section Component -->
      {#if activeTab === 'all' || activeTab === 'layout'}
        <section class="component-section">
          <h2 class="section-title">Section 区块</h2>
          <p class="section-desc">页面区块容器组件，支持不同的背景和内边距。</p>

          <div class="demo-box">
            <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <Section variant="white" padding="md">
                <Typography tag="p" variant="sm" align="center">
                  White Section (Medium Padding)
                </Typography>
              </Section>
              <Section variant="light" padding="sm">
                <Typography tag="p" variant="sm" align="center">
                  Light Section (Small Padding)
                </Typography>
              </Section>
              <Section variant="primary" padding="lg">
                <Typography tag="p" variant="sm" align="center" color="white">
                  Primary Section (Large Padding)
                </Typography>
              </Section>
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Section variant="white" padding="xl"&gt;
  Section Content
&lt;/Section&gt;
&lt;Section variant="primary" padding="lg"&gt;
  Primary Section
&lt;/Section&gt;</code></pre>
          </div>
        </section>
      {/if}

      <!-- Color Palette -->
      {#if activeTab === 'all'}
        <section class="component-section">
          <h2 class="section-title">颜色系统</h2>
          <p class="section-desc">UI Kit 使用的主题颜色。</p>

          <div class="demo-box">
            <div class="color-grid">
              <div class="color-item">
                <div class="color-swatch" style="background: #1a5f3f;"></div>
                <div class="color-info">
                  <p class="color-name">Primary</p>
                  <p class="color-value">#1a5f3f</p>
                </div>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #c9a858;"></div>
                <div class="color-info">
                  <p class="color-name">Accent</p>
                  <p class="color-value">#c9a858</p>
                </div>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #4a8a6f;"></div>
                <div class="color-info">
                  <p class="color-name">Secondary</p>
                  <p class="color-value">#4a8a6f</p>
                </div>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #10b981;"></div>
                <div class="color-info">
                  <p class="color-name">Success</p>
                  <p class="color-value">#10b981</p>
                </div>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #ef4444;"></div>
                <div class="color-info">
                  <p class="color-name">Error</p>
                  <p class="color-value">#ef4444</p>
                </div>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #f59e0b;"></div>
                <div class="color-info">
                  <p class="color-name">Warning</p>
                  <p class="color-value">#f59e0b</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      {/if}

      <!-- Component Stats -->
      {#if activeTab === 'all'}
        <section class="component-section">
          <h2 class="section-title">组件统计</h2>

          <div class="demo-box">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value">14</div>
                <div class="stat-label">基础组件</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">4</div>
                <div class="stat-label">布局组件</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">4</div>
                <div class="stat-label">领域组件</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">22</div>
                <div class="stat-label">总计</div>
              </div>
            </div>
          </div>
        </section>
      {/if}
    </div>
  </main>
</div>

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  :global(body) {
    margin: 0;
    overflow-x: hidden;
  }

  .showcase {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
    }
  }

  // Sidebar
  .sidebar {
    background: #1e293b;
    color: white;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 280px;
    height: 100vh;
    overflow-y: auto;

    @include respond-to(tablet) {
      position: static;
      width: 100%;
      height: auto;
    }
  }

  .sidebar-header {
    margin-bottom: 48px;
  }

  .logo {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px;
    color: $color-accent;
  }

  .version {
    font-size: 12px;
    color: #94a3b8;
    margin: 0;
  }

  .sidebar-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    padding: 12px 16px;
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 14px;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    &.active {
      background: $color-primary;
      color: white;
    }
  }

  .sidebar-footer {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .stats {
      font-size: 14px;
      color: #94a3b8;
      margin: 0 0 8px;
    }

    .copyright {
      font-size: 12px;
      color: #64748b;
      margin: 0;
    }
  }

  // Main Content
  .content {
    margin-left: 280px;
    padding: 48px;
    background: #f8fafc;

    @include respond-to(tablet) {
      margin-left: 0;
      padding: 32px 20px;
    }
  }

  .content-header {
    margin-bottom: 48px;

    h1 {
      font-size: 48px;
      font-weight: 300;
      color: $color-primary;
      margin: 0 0 12px;
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-size: 18px;
      color: #64748b;
      margin: 0;
    }

    @include respond-to(mobile) {
      h1 {
        font-size: 36px;
      }
    }
  }

  .components {
    max-width: 1200px;
  }

  .component-section {
    background: white;
    border-radius: 12px;
    padding: 40px;
    margin-bottom: 32px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    @include respond-to(mobile) {
      padding: 24px;
    }
  }

  .section-title {
    font-size: 28px;
    font-weight: 500;
    color: $color-primary;
    margin: 0 0 12px;
  }

  .section-desc {
    font-size: 15px;
    color: #64748b;
    margin: 0 0 32px;
    line-height: 1.6;
  }

  .demo-box {
    padding: 32px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 24px;
  }

  .demo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .demo-label {
    font-size: 14px;
    color: #64748b;
    min-width: 60px;
    font-weight: 500;
  }

  .demo-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  .code-block {
    background: #1e293b;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.6;

      code {
        color: inherit;
      }
    }
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  .color-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .color-swatch {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .color-info {
    flex: 1;

    .color-name {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .color-value {
      font-size: 12px;
      color: #64748b;
      font-family: 'Monaco', monospace;
      margin: 0;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .stat-card {
    text-align: center;
    padding: 32px;
    background: $color-background;
    border-radius: 8px;

    .stat-value {
      font-size: 48px;
      font-weight: 300;
      color: $color-primary;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: #64748b;
    }
  }
</style>
