/**
 * 富文本编辑器 Adapter 层类型定义
 *
 * 本文件定义了富文本编辑器的核心接口和类型
 * 用于统一不同富文本编辑器（如 TipTap, Quill, Lexical 等）的API
 */

/**
 * 富文本内容格式类型
 */
export type ContentFormat = 'html' | 'markdown' | 'json' | 'text';

/**
 * 富文本编辑器配置
 */
export interface EditorConfig {
  /** 编辑器ID */
  id?: string;

  /** 初始内容 */
  content?: string;

  /** 内容格式 */
  format?: ContentFormat;

  /** 是否只读 */
  readonly?: boolean;

  /** 是否可编辑 */
  editable?: boolean;

  /** 占位符文本 */
  placeholder?: string;

  /** 工具栏配置 */
  toolbar?: ToolbarConfig;

  /** 扩展功能 */
  extensions?: string[];

  /** 自定义类名 */
  className?: string;

  /** 最大字符数 */
  maxLength?: number;

  /** 最小高度 */
  minHeight?: string;

  /** 最大高度 */
  maxHeight?: string;
}

/**
 * 工具栏配置
 */
export interface ToolbarConfig {
  /** 是否显示工具栏 */
  visible?: boolean;

  /** 工具栏位置 */
  position?: 'top' | 'bottom' | 'floating';

  /** 启用的工具按钮 */
  tools?: ToolbarTool[];

  /** 自定义工具按钮 */
  customTools?: CustomTool[];
}

/**
 * 工具栏工具类型
 */
export type ToolbarTool =
  // 文本格式
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'highlight'

  // 标题
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'

  // 对齐
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'

  // 列表
  | 'bulletList'
  | 'orderedList'
  | 'taskList'

  // 引用和代码
  | 'blockquote'
  | 'codeBlock'

  // 链接和媒体
  | 'link'
  | 'image'
  | 'video'
  | 'table'

  // 其他
  | 'horizontalRule'
  | 'undo'
  | 'redo'
  | 'clear';

/**
 * 自定义工具按钮
 */
export interface CustomTool {
  /** 工具ID */
  id: string;

  /** 工具名称 */
  name: string;

  /** 工具图标 */
  icon?: string;

  /** 工具提示 */
  tooltip?: string;

  /** 点击处理函数 */
  onClick: (editor: IRichTextEditor) => void;

  /** 是否激活状态检查 */
  isActive?: (editor: IRichTextEditor) => boolean;

  /** 是否禁用状态检查 */
  isDisabled?: (editor: IRichTextEditor) => boolean;
}

/**
 * 编辑器事件类型
 */
export interface EditorEvents {
  /** 内容更新事件 */
  onUpdate?: (content: string, format: ContentFormat) => void;

  /** 内容变化事件 */
  onChange?: (content: string, format: ContentFormat) => void;

  /** 焦点事件 */
  onFocus?: () => void;

  /** 失焦事件 */
  onBlur?: () => void;

  /** 选择变化事件 */
  onSelectionChange?: (selection: EditorSelection) => void;

  /** 准备就绪事件 */
  onReady?: (editor: IRichTextEditor) => void;

  /** 销毁事件 */
  onDestroy?: () => void;

  /** 错误事件 */
  onError?: (error: Error) => void;
}

/**
 * 编辑器选择区域
 */
export interface EditorSelection {
  /** 起始位置 */
  from: number;

  /** 结束位置 */
  to: number;

  /** 是否为空选择 */
  empty: boolean;

  /** 选中的文本 */
  text?: string;
}

/**
 * 编辑器命令接口
 */
export interface EditorCommands {
  /** 设置粗体 */
  setBold: () => void;

  /** 设置斜体 */
  setItalic: () => void;

  /** 设置下划线 */
  setUnderline: () => void;

  /** 设置删除线 */
  setStrike: () => void;

  /** 设置标题 */
  setHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => void;

  /** 设置段落 */
  setParagraph: () => void;

  /** 设置对齐方式 */
  setTextAlign: (align: 'left' | 'center' | 'right' | 'justify') => void;

  /** 设置无序列表 */
  setBulletList: () => void;

  /** 设置有序列表 */
  setOrderedList: () => void;

  /** 设置引用 */
  setBlockquote: () => void;

  /** 设置代码块 */
  setCodeBlock: () => void;

  /** 插入链接 */
  setLink: (url: string, text?: string) => void;

  /** 插入图片 */
  insertImage: (src: string, alt?: string) => void;

  /** 插入表格 */
  insertTable: (rows: number, cols: number) => void;

  /** 插入水平线 */
  insertHorizontalRule: () => void;

  /** 撤销 */
  undo: () => void;

  /** 重做 */
  redo: () => void;

  /** 清除格式 */
  clearFormat: () => void;

  /** 清除所有内容 */
  clearContent: () => void;
}

/**
 * 富文本编辑器核心接口
 *
 * 所有具体的编辑器适配器都需要实现此接口
 */
export interface IRichTextEditor {
  /** 编辑器实例ID */
  readonly id: string;

  /** 编辑器配置 */
  readonly config: EditorConfig;

  /** 编辑器是否已初始化 */
  readonly isInitialized: boolean;

  /** 编辑器是否可编辑 */
  editable: boolean;

  /**
   * 初始化编辑器
   * @param container 容器元素
   * @param config 编辑器配置
   */
  initialize(container: HTMLElement, config: EditorConfig): Promise<void>;

  /**
   * 销毁编辑器
   */
  destroy(): void;

  /**
   * 获取内容
   * @param format 内容格式
   */
  getContent(format?: ContentFormat): string;

  /**
   * 设置内容
   * @param content 内容
   * @param format 内容格式
   */
  setContent(content: string, format?: ContentFormat): void;

  /**
   * 清空内容
   */
  clearContent(): void;

  /**
   * 聚焦编辑器
   */
  focus(): void;

  /**
   * 失焦编辑器
   */
  blur(): void;

  /**
   * 获取选择区域
   */
  getSelection(): EditorSelection | null;

  /**
   * 设置选择区域
   * @param from 起始位置
   * @param to 结束位置
   */
  setSelection(from: number, to: number): void;

  /**
   * 获取编辑器命令
   */
  getCommands(): EditorCommands;

  /**
   * 执行命令
   * @param command 命令名称
   * @param params 命令参数
   */
  executeCommand(command: string, ...params: any[]): void;

  /**
   * 检查命令是否激活
   * @param command 命令名称
   */
  isCommandActive(command: string): boolean;

  /**
   * 检查命令是否可用
   * @param command 命令名称
   */
  isCommandAvailable(command: string): boolean;

  /**
   * 注册事件监听
   * @param event 事件名称
   * @param handler 事件处理函数
   */
  on(event: string, handler: (...args: any[]) => void): void;

  /**
   * 取消事件监听
   * @param event 事件名称
   * @param handler 事件处理函数
   */
  off(event: string, handler: (...args: any[]) => void): void;

  /**
   * 获取原始编辑器实例（用于高级定制）
   */
  getRawEditor(): any;
}

/**
 * 编辑器适配器工厂接口
 */
export interface IEditorAdapterFactory {
  /**
   * 创建编辑器实例
   * @param type 编辑器类型
   * @param config 编辑器配置
   */
  create(type: EditorType, config?: EditorConfig): IRichTextEditor;

  /**
   * 注册编辑器适配器
   * @param type 编辑器类型
   * @param adapter 适配器构造函数
   */
  register(type: EditorType, adapter: EditorAdapterConstructor): void;

  /**
   * 检查编辑器类型是否已注册
   * @param type 编辑器类型
   */
  hasAdapter(type: EditorType): boolean;
}

/**
 * 编辑器类型
 */
export type EditorType = 'tiptap' | 'quill' | 'lexical' | 'prosemirror' | 'slate';

/**
 * 编辑器适配器构造函数类型
 */
export type EditorAdapterConstructor = new (config?: EditorConfig) => IRichTextEditor;

/**
 * 内容转换器接口
 *
 * 用于在不同格式之间转换内容
 */
export interface IContentConverter {
  /**
   * HTML 转 Markdown
   */
  htmlToMarkdown(html: string): string;

  /**
   * Markdown 转 HTML
   */
  markdownToHtml(markdown: string): string;

  /**
   * HTML 转 纯文本
   */
  htmlToText(html: string): string;

  /**
   * JSON 转 HTML
   */
  jsonToHtml(json: any): string;

  /**
   * HTML 转 JSON
   */
  htmlToJson(html: string): any;

  /**
   * 清理 HTML
   */
  sanitizeHtml(html: string): string;
}
