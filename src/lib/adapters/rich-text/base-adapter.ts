/**
 * 富文本编辑器基础适配器
 *
 * 提供编辑器适配器的基础实现
 * 具体的编辑器适配器应继承此类并实现抽象方法
 */

import type {
  IRichTextEditor,
  EditorConfig,
  EditorSelection,
  EditorCommands,
  ContentFormat
} from './types';

/**
 * 基础编辑器适配器抽象类
 */
export abstract class BaseEditorAdapter implements IRichTextEditor {
  /** 编辑器实例ID */
  public readonly id: string;

  /** 编辑器配置 */
  public readonly config: EditorConfig;

  /** 编辑器是否已初始化 */
  protected _isInitialized: boolean = false;

  /** 编辑器容器元素 */
  protected container: HTMLElement | null = null;

  /** 事件监听器映射 */
  protected eventListeners: Map<string, Set<(...args: any[]) => void>> = new Map();

  constructor(config: EditorConfig = {}) {
    this.id = config.id || this.generateId();
    this.config = this.normalizeConfig(config);
  }

  /** 编辑器是否已初始化 */
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  /** 编辑器是否可编辑 */
  abstract get editable(): boolean;
  abstract set editable(value: boolean);

  /**
   * 初始化编辑器
   * 子类需要实现具体的初始化逻辑
   */
  abstract initialize(container: HTMLElement, config: EditorConfig): Promise<void>;

  /**
   * 销毁编辑器
   * 子类需要实现具体的销毁逻辑
   */
  abstract destroy(): void;

  /**
   * 获取内容
   * 子类需要实现具体的内容获取逻辑
   */
  abstract getContent(format?: ContentFormat): string;

  /**
   * 设置内容
   * 子类需要实现具体的内容设置逻辑
   */
  abstract setContent(content: string, format?: ContentFormat): void;

  /**
   * 清空内容
   */
  clearContent(): void {
    this.setContent('', this.config.format || 'html');
  }

  /**
   * 聚焦编辑器
   * 子类需要实现具体的聚焦逻辑
   */
  abstract focus(): void;

  /**
   * 失焦编辑器
   * 子类需要实现具体的失焦逻辑
   */
  abstract blur(): void;

  /**
   * 获取选择区域
   * 子类需要实现具体的选择区域获取逻辑
   */
  abstract getSelection(): EditorSelection | null;

  /**
   * 设置选择区域
   * 子类需要实现具体的选择区域设置逻辑
   */
  abstract setSelection(from: number, to: number): void;

  /**
   * 获取编辑器命令
   * 子类需要实现具体的命令对象
   */
  abstract getCommands(): EditorCommands;

  /**
   * 执行命令
   * 子类需要实现具体的命令执行逻辑
   */
  abstract executeCommand(command: string, ...params: any[]): void;

  /**
   * 检查命令是否激活
   * 子类需要实现具体的命令激活状态检查逻辑
   */
  abstract isCommandActive(command: string): boolean;

  /**
   * 检查命令是否可用
   * 子类需要实现具体的命令可用性检查逻辑
   */
  abstract isCommandAvailable(command: string): boolean;

  /**
   * 获取原始编辑器实例
   * 子类需要返回具体的编辑器实例
   */
  abstract getRawEditor(): any;

  /**
   * 注册事件监听
   */
  on(event: string, handler: (...args: any[]) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(handler);
  }

  /**
   * 取消事件监听
   */
  off(event: string, handler: (...args: any[]) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(handler);
    }
  }

  /**
   * 触发事件
   */
  protected emit(event: string, ...args: any[]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(handler => handler(...args));
    }
  }

  /**
   * 生成唯一ID
   */
  protected generateId(): string {
    return `editor-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 规范化配置
   */
  protected normalizeConfig(config: EditorConfig): EditorConfig {
    return {
      format: 'html',
      editable: true,
      readonly: false,
      placeholder: '',
      toolbar: {
        visible: true,
        position: 'top',
        tools: [
          'bold', 'italic', 'underline', 'strike',
          'heading1', 'heading2', 'heading3',
          'bulletList', 'orderedList',
          'link', 'image',
          'undo', 'redo'
        ]
      },
      extensions: [],
      ...config
    };
  }

  /**
   * 验证容器元素
   */
  protected validateContainer(container: HTMLElement): void {
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error('Invalid container element');
    }
  }

  /**
   * 验证初始化状态
   */
  protected ensureInitialized(): void {
    if (!this._isInitialized) {
      throw new Error('Editor is not initialized');
    }
  }
}
