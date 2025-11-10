/**
 * 富文本编辑器 Adapter 层入口
 *
 * 导出所有公共接口、类型和工具函数
 */

// 导出类型定义
export type {
  IRichTextEditor,
  IEditorAdapterFactory,
  IContentConverter,
  EditorConfig,
  EditorEvents,
  EditorSelection,
  EditorCommands,
  ToolbarConfig,
  ToolbarTool,
  CustomTool,
  ContentFormat,
  EditorType,
  EditorAdapterConstructor
} from './types';

// 导出基础适配器
export { BaseEditorAdapter } from './base-adapter';

// 导出工厂
export {
  editorFactory,
  createEditor,
  registerEditorAdapter,
  hasEditorAdapter
} from './factory';

// 导出转换器
export {
  contentConverter,
  toMarkdown,
  toHtml,
  toText,
  sanitize
} from './converter';
