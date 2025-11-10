/**
 * 富文本编辑器适配器工厂
 *
 * 负责创建和管理不同类型的编辑器适配器实例
 */

import type {
  IEditorAdapterFactory,
  IRichTextEditor,
  EditorType,
  EditorAdapterConstructor,
  EditorConfig
} from './types';

/**
 * 编辑器适配器工厂实现
 */
class EditorAdapterFactory implements IEditorAdapterFactory {
  /** 适配器注册表 */
  private adapters: Map<EditorType, EditorAdapterConstructor> = new Map();

  /** 单例实例 */
  private static instance: EditorAdapterFactory | null = null;

  /**
   * 私有构造函数，确保单例模式
   */
  private constructor() {}

  /**
   * 获取工厂单例实例
   */
  static getInstance(): EditorAdapterFactory {
    if (!EditorAdapterFactory.instance) {
      EditorAdapterFactory.instance = new EditorAdapterFactory();
    }
    return EditorAdapterFactory.instance;
  }

  /**
   * 创建编辑器实例
   */
  create(type: EditorType, config?: EditorConfig): IRichTextEditor {
    const AdapterConstructor = this.adapters.get(type);

    if (!AdapterConstructor) {
      throw new Error(`Editor adapter for type "${type}" is not registered`);
    }

    try {
      return new AdapterConstructor(config);
    } catch (error) {
      throw new Error(`Failed to create editor adapter for type "${type}": ${error}`);
    }
  }

  /**
   * 注册编辑器适配器
   */
  register(type: EditorType, adapter: EditorAdapterConstructor): void {
    if (this.adapters.has(type)) {
      console.warn(`Editor adapter for type "${type}" is already registered. Overwriting...`);
    }

    this.adapters.set(type, adapter);
  }

  /**
   * 检查编辑器类型是否已注册
   */
  hasAdapter(type: EditorType): boolean {
    return this.adapters.has(type);
  }

  /**
   * 获取所有已注册的编辑器类型
   */
  getRegisteredTypes(): EditorType[] {
    return Array.from(this.adapters.keys());
  }

  /**
   * 取消注册编辑器适配器
   */
  unregister(type: EditorType): boolean {
    return this.adapters.delete(type);
  }

  /**
   * 清空所有注册的适配器
   */
  clear(): void {
    this.adapters.clear();
  }
}

/**
 * 导出工厂单例
 */
export const editorFactory = EditorAdapterFactory.getInstance();

/**
 * 便捷方法：创建编辑器
 */
export function createEditor(type: EditorType, config?: EditorConfig): IRichTextEditor {
  return editorFactory.create(type, config);
}

/**
 * 便捷方法：注册适配器
 */
export function registerEditorAdapter(
  type: EditorType,
  adapter: EditorAdapterConstructor
): void {
  editorFactory.register(type, adapter);
}

/**
 * 便捷方法：检查适配器是否存在
 */
export function hasEditorAdapter(type: EditorType): boolean {
  return editorFactory.hasAdapter(type);
}
