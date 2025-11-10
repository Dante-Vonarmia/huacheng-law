# 华诚律师事务所网站改版 - 文档地图

> 📚 快速找到你需要的文档

## 🗺️ 文档结构总览

```
📁 项目根目录
│
├── 📄 PROJECT-PLAN-SUMMARY.md          ⭐ 从这里开始！
│   ├─ 项目现状一览
│   ├─ 本周核心待办
│   ├─ 10天开发计划
│   ├─ 快速开始指南
│   └─ 验收标准速查
│
└── 📁 .ai/ (详细规划文档)
    │
    ├── 📄 README.md                    📚 文档索引导航
    │   ├─ 文档导航
    │   ├─ 按角色查看
    │   ├─ 快速查找
    │   └─ 常见问题
    │
    ├── 📄 task-tracker.md              ✅ 每日必看
    │   ├─ 快速统计 (47%完成度)
    │   ├─ 详细任务列表 (45个任务)
    │   ├─ 本周计划 (Day 1-10)
    │   ├─ 阻塞问题追踪
    │   └─ 下一步行动
    │
    ├── 📄 project-plan.md              📋 完整规划
    │   ├─ 任务总览表 (45个任务)
    │   ├─ 任务详细拆分 (10个模块)
    │   ├─ 开发路线图 (4个阶段)
    │   ├─ 技术实现建议
    │   ├─ 验收标准 (3级DoD)
    │   └─ 交付清单
    │
    ├── 📄 technical-specs.md           🔧 开发参考
    │   ├─ 7个新组件完整代码
    │   │  ├─ Carousel 轮播
    │   │  ├─ VideoCard 视频卡片
    │   │  ├─ CaseCard 案例卡片
    │   │  ├─ SideNav 侧边导航
    │   │  ├─ OrgChart 组织架构图
    │   │  ├─ FilterBar 筛选条
    │   │  └─ Pagination 分页器
    │   ├─ 数据适配器层设计
    │   │  ├─ 类型定义 (20+ interfaces)
    │   │  ├─ 基础适配器类
    │   │  └─ 律师适配器示例
    │   ├─ 页面整合示例
    │   └─ 性能优化清单
    │
    ├── 📄 prd.md                       📄 产品需求
    │   ├─ 项目概述
    │   ├─ 核心功能
    │   ├─ 功能优先级
    │   └─ 非功能需求
    │
    ├── 📄 flows.md                     🔄 流程设计
    │   ├─ 页面关系与导航
    │   ├─ 用户交互流程
    │   ├─ 数据流设计
    │   └─ 异常处理流程
    │
    └── 📄 delivery-confirmation.md     📦 交付确认
        ├─ 交付清单
        ├─ 文档统计
        ├─ 质量指标
        └─ 使用建议
```

---

## 🎯 按需求快速查找

### 我想要...

#### 📊 了解项目进度

→ **[task-tracker.md](.ai/task-tracker.md)** 第一节"快速统计"
- 整体完成度：47% (21/45)
- 核心任务完成度：64% (18/28)
- 剩余工时：16人天

#### ⏰ 知道今天做什么

→ **[task-tracker.md](.ai/task-tracker.md)** 第三节"本周计划"
- Day 1-2: 核心组件开发
- Day 3-4: 业务领域详情页
- Day 5: 首页完善

#### 💻 获取代码示例

→ **[technical-specs.md](.ai/technical-specs.md)** 第一节
- Carousel 轮播组件（0.5天）
- SideNav 侧边导航（0.3天）
- FilterBar 筛选条（0.4天）

#### 📐 查看数据结构

→ **[technical-specs.md](.ai/technical-specs.md)** 第二节
- API响应格式
- 律师数据类型
- 业务领域数据类型
- 新闻数据类型

#### ✅ 了解验收标准

→ **[project-plan.md](.ai/project-plan.md)** 第五节
→ **[PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md)** 第九节
- 组件DoD
- 页面DoD
- 项目整体验收

#### 🎨 查看设计规范

→ **[PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md)** 第八节
- 颜色：#1a5f3f, #c9a858, #2d8659
- 间距：4px/8px/16px/24px/32px/48px/64px
- 断点：768px/1024px/1440px

#### 🗓️ 查看开发计划

→ **[project-plan.md](.ai/project-plan.md)** 第三节
→ **[PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md)** 第三节
- 第一阶段：基础组件（2天）
- 第二阶段：页面框架（3天）
- 第三阶段：模块功能（5天）
- 第四阶段：优化测试（4天）

#### 🔄 查看交互流程

→ **[flows.md](.ai/flows.md)**
- 页面导航流程
- 用户交互流程
- 数据流设计

#### 🐛 记录问题

→ **[task-tracker.md](.ai/task-tracker.md)** "阻塞问题追踪"表格

---

## 👥 按角色快速导航

### 🎯 项目经理

**每日必看**:
1. [task-tracker.md](.ai/task-tracker.md) - 更新任务状态
2. [PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md) - 关键指标

**每周审查**:
1. [project-plan.md](.ai/project-plan.md) - 里程碑检查

**遇到问题**:
1. [.ai/README.md](.ai/README.md) - FAQ

---

### 💻 前端开发工程师

**开始工作前**:
1. [task-tracker.md](.ai/task-tracker.md) - 领取任务
2. [PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md) - 快速上手

**开发时**:
1. [technical-specs.md](.ai/technical-specs.md) - 代码参考 ⭐
2. [project-plan.md](.ai/project-plan.md) - 验收标准

**完成后**:
1. [task-tracker.md](.ai/task-tracker.md) - 更新状态

---

### 🎨 UI/UX设计师

**设计规范**:
1. [PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md) - 设计规范速查

**交互流程**:
1. [flows.md](.ai/flows.md) - 流程设计

**产品需求**:
1. [prd.md](.ai/prd.md) - 需求文档

---

### 🧪 QA测试工程师

**测试标准**:
1. [project-plan.md](.ai/project-plan.md) - 第五节验收标准
2. [PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md) - 验收检查点

**待测试功能**:
1. [task-tracker.md](.ai/task-tracker.md) - 已完成任务列表

---

## 📊 文档统计

| 指标 | 数量 | 说明 |
|------|------|------|
| **文档总数** | 8份 | 含本地图 |
| **总大小** | ~150KB | 约130页 |
| **总任务数** | 45个 | 完整拆分 |
| **代码示例** | 15+个 | 可直接使用 |
| **数据结构** | 20+个 | TypeScript定义 |
| **组件规格** | 7个 | 完整技术规格 |

---

## 🚀 快速开始三步走

### 第一步：了解现状（5分钟）

阅读 **[PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md)** 的：
- 第一节：项目现状一览
- 第二节：本周核心待办
- 第三节：10天开发计划

### 第二步：领取任务（5分钟）

打开 **[task-tracker.md](.ai/task-tracker.md)**：
- 找到状态为"⏳ 待开始"的任务
- 选择一个适合的任务
- 标记为"🚧 进行中"

### 第三步：开始开发（立即）

参考 **[technical-specs.md](.ai/technical-specs.md)**：
- 找到对应组件的技术规格
- 复制代码示例
- 开始开发！

---

## 📝 文档更新日志

| 日期 | 文档 | 更新内容 | 版本 |
|------|------|----------|------|
| 2025-11-06 | 全部 | 初始创建 | v1.0 |
| - | - | - | - |

---

## 💡 使用技巧

### 技巧 1：善用搜索

在IDE中使用全局搜索（Cmd+Shift+F / Ctrl+Shift+F）：
- 搜索任务编号（如 "T1.2"）快速定位
- 搜索组件名（如 "Carousel"）查看相关内容
- 搜索关键词（如 "验收标准"）找到相关章节

### 技巧 2：使用书签

在编辑器中为常用文档添加书签：
- ⭐ PROJECT-PLAN-SUMMARY.md
- ⭐ task-tracker.md
- ⭐ technical-specs.md

### 技巧 3：并行查看

开发时同时打开两个文档：
- 左侧：technical-specs.md（代码参考）
- 右侧：正在编写的代码文件

### 技巧 4：定期同步

每天结束工作时：
1. 更新 task-tracker.md 中的任务状态
2. 记录遇到的问题
3. 规划明天的任务

---

## 🆘 遇到问题？

### 找不到需要的信息

1. 先查看 [.ai/README.md](.ai/README.md) 的"快速查找"章节
2. 再查看 [.ai/README.md](.ai/README.md) 的"常见问题"章节
3. 还是找不到？在团队会议中提出

### 文档内容有误

1. 直接修改文档并提交
2. 或在 [task-tracker.md](.ai/task-tracker.md) 的"阻塞问题追踪"中记录

### 不知道从哪开始

1. 阅读 [PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md)
2. 查看 [.ai/README.md](.ai/README.md) 的"快速开始"章节
3. 向项目经理寻求指导

---

## 🎯 核心文档推荐

### ⭐ 必读（所有成员）

1. **[PROJECT-PLAN-SUMMARY.md](PROJECT-PLAN-SUMMARY.md)** - 5分钟了解全局
2. **[task-tracker.md](.ai/task-tracker.md)** - 每日必看
3. **[.ai/README.md](.ai/README.md)** - 文档导航

### 📚 参考（开发成员）

1. **[technical-specs.md](.ai/technical-specs.md)** - 开发时查阅
2. **[project-plan.md](.ai/project-plan.md)** - 详细规划

### 📄 可选（特定场景）

1. **[prd.md](.ai/prd.md)** - 了解产品需求
2. **[flows.md](.ai/flows.md)** - 了解交互流程
3. **[delivery-confirmation.md](.ai/delivery-confirmation.md)** - 了解交付标准

---

**文档地图版本**: v1.0
**创建日期**: 2025-11-06
**维护者**: Product Manager Agent

**下次更新**: 根据项目进展随时更新

---

**开始你的开发之旅吧！** 🚀
