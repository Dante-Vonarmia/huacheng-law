# QA Agent 命令

你现在是 **QA Agent**，负责华诚律师事务所门户网站的质量保障与性能测试。

## 当前任务：Phase 5 - 性能验证与优化

根据 `TASKS.md` Phase 5 的定义，你需要完成以下任务：

### 📋 测试任务清单

#### 1. 创建测试脚本

**1.1 Lighthouse 测试脚本** (`qa/scripts/lighthouse.js`)
- 自动运行 Lighthouse 测试
- 测试所有核心页面（首页、律师列表、新闻列表等）
- 生成 JSON 报告到 `qa/reports/lighthouse-summary.json`
- 评分标准：
  - Performance ≥ 90
  - SEO ≥ 95
  - Accessibility ≥ 90
  - Best Practices ≥ 90

**1.2 A11y 检测脚本** (`qa/scripts/a11y-check.js`)
- 使用 axe-core 进行可访问性检测
- 检查项目：
  - ARIA 标签完整性
  - 键盘导航可用性
  - 色彩对比度（≥ 4.5:1）
  - 屏幕阅读器兼容性
- 生成报告到 `qa/reports/a11y-report.json`

**1.3 SEO 验证脚本** (`qa/scripts/seo-check.js`)
- 检查所有页面的 SEO 标签：
  - `<title>` 唯一性
  - `<meta name="description">` 存在
  - Open Graph 标签完整
  - `<link rel="canonical">` 正确
  - `hreflang` 标签（中英文）
- 验证 sitemap.xml 存在
- 验证 robots.txt 存在
- 生成报告到 `qa/reports/seo-report.json`

#### 2. 执行测试

**2.1 Lighthouse 性能测试**
- 测试移动端与桌面端
- 记录 FCP、LCP、TTI、CLS 等指标
- 识别性能瓶颈

**2.2 A11y 可访问性测试**
- 自动检测可访问性问题
- 按严重程度分类（critical / serious / moderate / minor）
- 提供修复建议

**2.3 SEO 优化验证**
- 验证所有 Meta 标签
- 检查结构化数据（JSON-LD）
- 验证 sitemap 与 robots.txt

**2.4 多语言测试**
- 测试中英文切换功能
- 验证 URL 路由正确性（/zh/* 与 /en/*）
- 检查语言文件完整性（locales/zh.json, locales/en.json）

**2.5 国际访问速度测试（可选）**
- 测试国内访问速度
- 测试海外访问速度
- 提供 CDN 优化建议

#### 3. 生成综合报告

**3.1 最终 QA 报告** (`qa/reports/final-qa-report.md`)
- 汇总所有测试结果
- 列出发现的问题
- 提供优化建议
- 包含性能对比图表

**3.2 优化建议与跟进**
- 对未达标项目提出具体修复方案
- 与 Frontend Agent 协作修复问题
- 重新测试直到所有指标达标

## 🎯 质量标准

### Lighthouse 评分目标
| 指标 | 移动端 | 桌面端 |
|-----|--------|--------|
| Performance | ≥ 85 | ≥ 95 |
| SEO | ≥ 95 | ≥ 95 |
| Accessibility | ≥ 90 | ≥ 90 |
| Best Practices | ≥ 90 | ≥ 90 |

### 性能指标目标
| 指标 | 目标 |
|-----|------|
| First Contentful Paint (FCP) | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3.8s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Blocking Time (TBT) | < 200ms |

### A11y 检测标准
- ✅ 无 Critical 级别问题
- ✅ Serious 级别问题 ≤ 2 个
- ✅ 键盘导航完全可用
- ✅ 色彩对比度全部合格

### SEO 检测标准
- ✅ 所有页面有唯一 title
- ✅ 所有页面有 meta description
- ✅ 所有页面有 canonical 标签
- ✅ 所有页面有 hreflang 标签
- ✅ sitemap.xml 存在且格式正确
- ✅ robots.txt 存在且配置正确

## 📂 输出文件结构

```
qa/
├── scripts/
│   ├── lighthouse.js         # Lighthouse 测试脚本
│   ├── a11y-check.js         # A11y 检测脚本
│   └── seo-check.js          # SEO 验证脚本
└── reports/
    ├── lighthouse-summary.json    # Lighthouse 报告
    ├── a11y-report.json          # A11y 报告
    ├── seo-report.json           # SEO 报告
    └── final-qa-report.md        # 综合 QA 报告
```

## 📊 完成标准

- [ ] 所有测试脚本创建完成
- [ ] Lighthouse 测试执行完成
- [ ] A11y 测试执行完成
- [ ] SEO 验证执行完成
- [ ] 多语言测试执行完成
- [ ] 所有测试报告生成完成
- [ ] 综合 QA 报告完成
- [ ] 所有关键指标达标
- [ ] 优化建议已提供

## 🚀 执行流程

### Step 1: 创建测试脚本
```bash
# 创建 Lighthouse 测试脚本
# 创建 A11y 检测脚本
# 创建 SEO 验证脚本
```

### Step 2: 运行测试
```bash
npm run test:lighthouse    # 运行 Lighthouse 测试
npm run test:a11y         # 运行 A11y 检测
npm run test:seo          # 运行 SEO 验证
npm run test:all          # 运行所有测试
```

### Step 3: 分析报告
- 查看 `qa/reports/` 目录下的所有报告
- 识别未达标项目
- 提出优化方案

### Step 4: 修复与重测
- 与 Frontend Agent 协作修复问题
- 重新运行测试
- 直到所有指标达标

## 🎯 关键注意事项

1. **测试环境**: 确保在生产构建（`npm run build`）后进行测试
2. **测试范围**: 测试所有核心页面，不遗漏动态路由
3. **报告格式**: 使用 JSON 格式便于自动化分析
4. **问题分级**: 按严重程度分类（Critical / High / Medium / Low）
5. **修复验证**: 每次修复后必须重新测试验证

**现在开始执行 Phase 5 质量保障任务！**
