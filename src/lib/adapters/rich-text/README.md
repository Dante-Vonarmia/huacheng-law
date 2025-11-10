# 富文本编辑器 Adapter 层

本模块提供了统一的富文本编辑器适配器接口，用于集成和管理不同的富文本编辑器库。

## 架构设计

### 核心组件

1. **类型定义 (types.ts)**
   - `IRichTextEditor`: 编辑器核心接口
   - `EditorConfig`: 编辑器配置类型
   - `EditorCommands`: 编辑器命令接口
   - `ContentFormat`: 内容格式类型

2. **基础适配器 (base-adapter.ts)**
   - `BaseEditorAdapter`: 抽象基类，提供通用功能实现
   - 事件管理
   - 配置规范化
   - 状态验证

3. **适配器工厂 (factory.ts)**
   - `EditorAdapterFactory`: 单例工厂类
   - 适配器注册和创建
   - 类型管理

4. **内容转换器 (converter.ts)**
   - `ContentConverter`: 格式转换工具
   - HTML/Markdown/JSON/Text 互转
   - HTML 清理和安全处理

## 使用方式

### 1. 创建具体的编辑器适配器

```typescript
import { BaseEditorAdapter, type EditorConfig, type EditorCommands } from '$lib/adapters/rich-text';

// 示例：TipTap 适配器
class TipTapAdapter extends BaseEditorAdapter {
  private editor: Editor | null = null;

  get editable(): boolean {
    return this.editor?.isEditable ?? false;
  }

  set editable(value: boolean) {
    this.editor?.setEditable(value);
  }

  async initialize(container: HTMLElement, config: EditorConfig): Promise<void> {
    this.validateContainer(container);
    this.container = container;

    // 初始化 TipTap 编辑器
    this.editor = new Editor({
      element: container,
      content: config.content || '',
      editable: config.editable,
      // ... 其他配置
    });

    this._isInitialized = true;
    this.emit('ready', this);
  }

  destroy(): void {
    this.editor?.destroy();
    this.editor = null;
    this._isInitialized = false;
  }

  getContent(format = 'html'): string {
    if (format === 'html') {
      return this.editor?.getHTML() ?? '';
    } else if (format === 'json') {
      return JSON.stringify(this.editor?.getJSON());
    }
    return '';
  }

  setContent(content: string, format = 'html'): void {
    if (format === 'html') {
      this.editor?.commands.setContent(content);
    }
  }

  // 实现其他抽象方法...
}
```

### 2. 注册适配器

```typescript
import { registerEditorAdapter } from '$lib/adapters/rich-text';
import { TipTapAdapter } from './adapters/tiptap-adapter';

// 注册 TipTap 适配器
registerEditorAdapter('tiptap', TipTapAdapter);
```

### 3. 创建和使用编辑器

```typescript
import { createEditor } from '$lib/adapters/rich-text';

// 创建编辑器实例
const editor = createEditor('tiptap', {
  content: '<p>Hello World</p>',
  editable: true,
  placeholder: '请输入内容...',
  toolbar: {
    visible: true,
    tools: ['bold', 'italic', 'link']
  }
});

// 初始化编辑器
await editor.initialize(containerElement, editor.config);

// 监听事件
editor.on('update', (content) => {
  console.log('Content updated:', content);
});

// 执行命令
editor.getCommands().setBold();

// 获取内容
const html = editor.getContent('html');
const markdown = editor.getContent('markdown');

// 销毁编辑器
editor.destroy();
```

### 4. 在 Svelte 组件中使用

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createEditor, type IRichTextEditor } from '$lib/adapters/rich-text';

  let container: HTMLElement;
  let editor: IRichTextEditor;

  export let content = '';
  export let editable = true;

  onMount(async () => {
    editor = createEditor('tiptap', {
      content,
      editable,
      toolbar: { visible: true }
    });

    await editor.initialize(container, editor.config);

    editor.on('update', (newContent) => {
      content = newContent;
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });
</script>

<div bind:this={container} class="rich-text-editor"></div>
```

## 支持的编辑器类型

目前架构支持以下编辑器类型（需要实现对应的适配器）：

- `tiptap`: TipTap (推荐，基于 ProseMirror)
- `quill`: Quill (轻量级，易用)
- `lexical`: Lexical (Facebook 开发，现代化)
- `prosemirror`: ProseMirror (强大但底层)
- `slate`: Slate (React 生态)

## 内容格式转换

```typescript
import { toMarkdown, toHtml, toText, sanitize } from '$lib/adapters/rich-text';

// HTML to Markdown
const markdown = toMarkdown('<h1>Title</h1><p>Content</p>');

// Markdown to HTML
const html = toHtml('# Title\n\nContent');

// HTML to plain text
const text = toText('<p>Hello <strong>World</strong></p>');

// Sanitize HTML (防止 XSS)
const safe = sanitize(userInputHtml);
```

## 待实现功能

以下功能已定义接口，但需要后续实现：

### 1. 具体编辑器适配器
- [ ] TipTap 适配器
- [ ] Quill 适配器
- [ ] Lexical 适配器

### 2. 内容转换器
- [ ] HTML to Markdown 转换
- [ ] Markdown to HTML 转换
- [ ] HTML 清理和安全处理 (使用 DOMPurify)
- [ ] JSON 格式支持

### 3. Svelte 组件
- [ ] `<RichTextEditor>` - 主编辑器组件
- [ ] `<Toolbar>` - 工具栏组件
- [ ] `<ToolbarButton>` - 工具按钮组件

### 4. 扩展功能
- [ ] 图片上传和管理
- [ ] 表格编辑
- [ ] 协同编辑支持
- [ ] 撤销/重做历史管理
- [ ] 内容搜索和替换

## 设计原则

1. **解耦**: 业务代码与具体编辑器库解耦，通过适配器接口交互
2. **可扩展**: 易于添加新的编辑器适配器
3. **类型安全**: 完整的 TypeScript 类型定义
4. **单一职责**: 每个模块职责明确
5. **依赖注入**: 通过工厂模式管理依赖

## 目录结构

```
src/lib/adapters/rich-text/
├── types.ts              # 类型定义
├── base-adapter.ts       # 基础适配器抽象类
├── factory.ts            # 适配器工厂
├── converter.ts          # 内容转换器
├── index.ts              # 入口文件
├── README.md             # 文档
└── adapters/             # 具体适配器实现（待创建）
    ├── tiptap.ts
    ├── quill.ts
    └── lexical.ts
```

## 贡献指南

实现新的编辑器适配器时，请遵循以下步骤：

1. 继承 `BaseEditorAdapter` 抽象类
2. 实现所有抽象方法
3. 确保事件正确触发
4. 添加适当的错误处理
5. 编写单元测试
6. 更新文档

## 注意事项

- 所有适配器必须正确实现 `IRichTextEditor` 接口
- 事件处理应使用基类提供的 `emit` 方法
- 内容获取和设置应支持多种格式
- 确保编辑器销毁时清理所有资源
- HTML 内容应经过清理以防止 XSS 攻击
