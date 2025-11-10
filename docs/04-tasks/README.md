# 任务执行规范

> 华诚律师事务所网站改版项目
> 版本：v1.0
> 最后更新：2025-11-06

## 📋 任务工作流程

### 1️⃣ 开始任务

1. 在 `TASK-REGISTER.md` 中选择**待开始**的任务
2. 创建任务文件：`TASK-{编号}-{中文描述}.md`
3. 将 `TASK-REGISTER.md` 中该任务状态改为 **开发中**
4. 按照任务文件的「技术实现」章节执行开发

### 2️⃣ 自我验收

对照任务文件的「验收标准」章节逐项自检：
- [ ] 功能验收
- [ ] 视觉验收
- [ ] 技术验收

### 3️⃣ 提交代码

```bash
git add .
git commit -m "feat(frontend): TASK-001 Carousel轮播组件

- Add Carousel component with auto-play
- Add touch swipe support
- Add responsive design

Closes: TASK-001"
```

### 4️⃣ 标记完成

1. 将任务文件状态改为 `[x] 已完成`
2. 在 `TASK-REGISTER.md` 更新状态为 **已完成**
3. 提交文档更新：

```bash
git add docs/04-tasks/
git commit -m "docs: mark TASK-001 as completed"
```

## 📝 任务文档标准模板

创建新任务时，使用以下模板：

```markdown
# TASK-{编号}: {任务名称}

## 状态
- [ ] 待开始 / [x] 进行中 / [x] 已完成
- 优先级: P0 / P1 / P2
- 预计工时: X小时
- 负责Agent: Frontend / Backend / Charts / QA / DevOps
- 创建日期: YYYY-MM-DD
- 完成日期: YYYY-MM-DD

## 背景
{说明为什么需要这个任务，业务价值是什么}

## 目标
{清晰描述任务完成后的效果和验收场景}

## 技术实现

### 1. 涉及文件
- `ui-kit/components/ComponentName.svelte`
- `ui-kit/components/index.ts`
- `src/routes/page-name/+page.svelte`

### 2. 实现步骤
1. 创建组件文件
2. 定义Props接口
3. 实现核心功能
4. 编写样式
5. 导出组件
6. 集成到页面

### 3. 关键代码逻辑
{核心实现说明，可包含伪代码}

### 4. 数据结构
{如有需要，定义TypeScript接口}

## 验收标准

### 功能验收
- [ ] 功能正常运行
- [ ] Props参数生效
- [ ] 事件回调正确

### 视觉验收
- [ ] 样式符合设计规范
- [ ] 响应式布局正确（移动端/平板/桌面）
- [ ] 动画流畅自然

### 技术验收
- [ ] TypeScript无错误
- [ ] 无ESLint警告
- [ ] 组件已导出
- [ ] 在Showcase页面有演示

## 文件变更清单
- [ ] `ui-kit/components/ComponentName.svelte`
- [ ] `ui-kit/components/index.ts`
- [ ] `src/routes/showcase/+page.svelte` (如需演示)

## Git Commit信息

\```
feat(frontend): TASK-{编号} {简短描述}

- {变更点1}
- {变更点2}
- {变更点3}

Closes: TASK-{编号}
\```

## 测试步骤
1. 启动本地环境：`npm run dev`
2. 访问页面：`/showcase` 或 `/page-name`
3. 验证功能点1...
4. 验证功能点2...

## 依赖关系
- 前置任务: TASK-XXX（如有）
- 后续任务: TASK-XXX（如有）
- 被依赖: TASK-XXX, TASK-XXX（如有）

## 备注
{额外说明、注意事项、参考资料}
```

## 🚫 Agent工作约束

### 通用约束

1. **禁止自由发挥**
   - 只能按任务文件内容执行
   - 不得添加额外功能或字段
   - 不得修改未列出的文件

2. **禁止创建新文件**（除非任务明确要求）
   - 优先修改现有文件结构
   - 新文件必须列在「文件变更清单」中

3. **禁止自定义命名**
   - 使用统一命名规范
   - 组件、函数、变量命名需与项目保持一致

4. **必须完成验收标准**
   - 任务通过前必须自测
   - 不得跳过验收流程

5. **Commit信息标准化**
   - 必须包含 `Closes: TASK-XXX`
   - 信息中需明确scope（frontend/backend/charts）

### 🧭 PM Agent约束

1. 任务目标必须可量化验收
2. 技术实现必须可执行
3. 验收标准必须可测试
4. 一个任务 = 一个commit
5. 所有任务文件进入 `/docs/04-tasks/`

### 🧩 Frontend Agent约束

1. 阅读任务文件后方可开始开发
2. 严格遵守「技术实现」章节
3. 完成后对照验收标准自检
4. 提交前确认所有修改文件在「变更清单」中
5. 使用现有UI组件库，不重复造轮子
6. 遵循SCSS变量规范

### 🧪 QA Agent约束

1. 根据验收标准编写测试用例
2. 用例需覆盖所有功能点
3. 测试失败时提供详细报告
4. 测试报告存放在 `/docs/05-testing/reports/`

## 📊 Git Commit规范

### Commit Message格式

```
{type}({scope}): TASK-{编号} {简短描述}

- {具体变更点1}
- {具体变更点2}
- {具体变更点3}

Closes: TASK-{编号}
```

### Type类型

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 样式调整（不影响代码逻辑）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具变动

### Scope范围

- `frontend`: 前端相关
- `backend`: 后端相关
- `ui`: UI组件相关
- `qa`: 测试相关
- `docs`: 文档相关

### 示例

```
feat(ui): TASK-001 Carousel轮播组件

- Add Carousel.svelte component
- Add auto-play and manual control
- Add fade in/out transition
- Export component in index.ts

Closes: TASK-001
```

```
feat(frontend): TASK-102 首页Banner轮播集成

- Integrate Carousel component to homepage
- Add 3 demo slides with images
- Add responsive design for mobile/tablet
- Update homepage layout

Closes: TASK-102
```

## 📂 任务文件命名规范

| 任务类型 | 命名格式 | 示例 |
|----------|----------|------|
| UI组件 | TASK-{编号}-{组件名}组件.md | TASK-001-Carousel组件.md |
| 页面功能 | TASK-{编号}-{页面}{功能}.md | TASK-102-首页Banner轮播.md |
| 数据适配 | TASK-{编号}-{模块}适配层.md | TASK-1001-接口适配层设计.md |
| 性能优化 | TASK-{编号}-{范围}优化.md | TASK-1003-动效性能优化.md |

## 📈 任务进度追踪

### 日常更新（每日）

1. 打开 `TASK-REGISTER.md`
2. 更新正在进行的任务状态
3. 记录阻塞问题（如有）

### 周度回顾（每周五）

1. 统计本周完成任务数
2. 识别下周优先级
3. 更新文档（如有变更）

## 🔗 相关文档

- 任务登记表：`TASK-REGISTER.md`
- 项目规划：`../.ai/project-plan.md`
- 技术规格：`../.ai/technical-specs.md`
- 产品需求：`../.ai/prd.md`

## ⚠️ 注意事项

1. **一次只执行一个任务**
2. **完成一个任务后才能进入下一个**
3. **每个任务都必须独立commit**
4. **不得跳过验收流程**
5. **遇到问题优先查任务文件，不自行猜测**

---

遵守本规范，确保任务可追溯、代码可维护、进度可控制。
