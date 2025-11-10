# 组件清单

Watson & Band UI Kit 完整组件清单

## 📦 基础组件 (Components)

共 14 个基础组件

### 文本和排版
- **Typography** - 排版组件
  - 支持标题、段落、列表等文本元素
  - 预设多种字体大小和样式

### 表单组件
- **Input** - 输入框组件
  - 文本输入
  - 密码输入
  - 邮箱输入
  - 多种验证状态

- **Textarea** - 文本域组件
  - 多行文本输入
  - 自动高度调整
  - 字符计数

### 交互组件
- **Button** - 按钮组件
  - 5种变体: primary, secondary, outline, outline-light, text
  - 3种尺寸: sm, md, lg
  - 加载状态、禁用状态

- **Link** - 链接组件
  - 内部链接
  - 外部链接
  - 下载链接

- **Badge** - 徽章组件
  - 状态标识
  - 数字徽章
  - 颜色变体

- **Modal** - 模态框组件
  - 居中显示
  - 遮罩层
  - 关闭动画

- **Accordion** - 手风琴组件
  - 可展开/折叠
  - 单个或多个展开
  - 平滑动画

- **Tabs** - 标签页组件
  - 水平/垂直布局
  - 激活状态
  - 内容切换

### 展示组件
- **Card** - 卡片组件
  - 3种变体: default, bordered, elevated
  - 支持header/footer插槽
  - 响应式布局

- **Stats** - 统计数据组件
  - 数字展示
  - 标签说明
  - 图标支持

- **Timeline** - 时间线组件
  - 垂直时间线
  - 节点样式
  - 连接线

- **Testimonial** - 客户评价组件
  - 头像
  - 评价内容
  - 客户信息

- **LogoCloud** - Logo墙组件
  - 多列布局
  - 灰度效果
  - Hover高亮

## 🏗️ 布局组件 (Layouts)

共 4 个布局组件

- **Navigation** - 导航栏组件
  - Sticky定位
  - 透明/实色背景
  - 移动端菜单
  - 滚动监听

- **Footer** - 页脚组件
  - 多列布局
  - 社交媒体链接
  - 版权信息
  - 导航链接

- **Hero** - 英雄区块组件
  - 大标题
  - 副标题
  - CTA按钮
  - 背景图片/渐变

- **Section** - 区块容器组件
  - 统一间距
  - 背景色变体
  - 最大宽度控制

## 🎯 业务组件 (Domain Components)

共 4 个业务组件

- **LawyerCard** - 律师卡片
  - 照片展示
  - 基本信息（姓名、职位）
  - 专业领域
  - 教育背景
  - 执业经验
  - 语言能力
  - 联系方式

- **NewsCard** - 新闻卡片
  - 封面图片
  - 标题
  - 摘要
  - 发布日期
  - 分类标签
  - 阅读时间
  - 作者信息

- **PracticeCard** - 业务领域卡片
  - 图标/图片
  - 领域名称
  - 描述
  - 服务列表
  - 案例统计
  - CTA按钮

- **ContactForm** - 联系表单
  - 姓名输入
  - 邮箱输入
  - 电话输入
  - 咨询主题
  - 消息内容
  - 提交按钮
  - 表单验证

## 📊 组件统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 基础组件 | 14 | 通用UI组件 |
| 布局组件 | 4 | 页面布局组件 |
| 业务组件 | 4 | 法律行业专用组件 |
| **总计** | **22** | **完整组件库** |

## 🎨 组件特性

### 共同特性

所有组件都支持：

1. **TypeScript**: 完整的类型定义
2. **响应式**: 支持移动端、平板、桌面
3. **可访问性**: 遵循WCAG 2.1标准
4. **主题化**: 支持颜色和样式定制
5. **国际化**: 支持中英文切换（部分组件）
6. **性能优化**: 懒加载、按需加载

### 高级特性

- **Slots**: 灵活的插槽系统
- **Events**: 自定义事件
- **Props**: 丰富的配置选项
- **Variants**: 多种视觉变体
- **Sizes**: 多种尺寸选项
- **States**: 状态管理（hover, active, disabled等）

## 📝 使用统计

### 最常用组件 (Top 10)

1. Button - 按钮
2. Card - 卡片
3. Navigation - 导航栏
4. Footer - 页脚
5. Input - 输入框
6. Link - 链接
7. Typography - 排版
8. LawyerCard - 律师卡片
9. NewsCard - 新闻卡片
10. PracticeCard - 业务卡片

## 🔄 组件依赖关系

```
基础组件
  ├── Button (独立)
  ├── Card (独立)
  ├── Input (独立)
  └── ...

布局组件
  ├── Navigation
  │   ├── Button
  │   └── Link
  ├── Footer
  │   └── Link
  └── ...

业务组件
  ├── LawyerCard
  │   ├── Card
  │   └── Badge
  ├── NewsCard
  │   ├── Card
  │   ├── Badge
  │   └── Button
  └── ...
```

## 🚀 即将推出

计划添加的新组件：

- [ ] **Table** - 表格组件
- [ ] **Pagination** - 分页组件
- [ ] **Dropdown** - 下拉菜单
- [ ] **DatePicker** - 日期选择器
- [ ] **FileUpload** - 文件上传
- [ ] **Breadcrumb** - 面包屑导航
- [ ] **Alert** - 提示框
- [ ] **Toast** - 通知消息
- [ ] **Tooltip** - 工具提示
- [ ] **Progress** - 进度条

---

**更新日期**: 2024-11-04
**维护者**: Watson & Band Development Team
