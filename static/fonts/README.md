# 字体说明 Font Documentation

## 霞鹜文楷 (LXGW WenKai)

### 基本信息

- **字体名称**: 霞鹜文楷
- **英文名称**: LXGW WenKai
- **版本**: v1.330
- **授权**: SIL Open Font License 1.1 (开源免费)
- **项目地址**: https://github.com/lxgw/LxgwWenKai

### 字体特点

1. **楷体风格**: 优雅的楷体书法风格，适合正式场合
2. **现代设计**: 在传统楷体基础上进行优化，更适合屏幕显示
3. **完整覆盖**: 支持简体中文、繁体中文和日文常用字
4. **双字重**: 提供 Regular (400) 和 Bold (700) 两种字重
5. **开源免费**: 可商用，无需授权费

### 使用场景

✅ **适合**:
- 标题文字
- 正文内容
- 法律文档
- 专业内容展示
- 需要正式优雅感的场景

⚠️ **注意**:
- 楷体相比黑体，在极小字号下可读性稍弱
- 建议正文字号不小于 14px
- 英文字母会回退到系统无衬线字体

### 字体文件

| 文件名 | 字重 | 大小 | 用途 |
|--------|------|------|------|
| LXGWWenKai-Regular.ttf | 400 | 18MB | 正文、标题 |
| LXGWWenKai-Bold.ttf | 700 | 18MB | 粗体强调 |

### 集成方式

字体已通过 `@font-face` 集成到全局样式中：

```scss
// ui-kit/styles/global.scss
@font-face {
  font-family: 'LXGW WenKai';
  src: url('/fonts/LXGWWenKai-Regular.ttf') format('truetype');
  font-weight: 400;
  font-display: swap;
}
```

### 字体栈配置

```scss
// ui-kit/styles/variables.scss

// 正文字体
$font-family-body: 'LXGW WenKai', -apple-system, BlinkMacSystemFont,
                   'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;

// 标题字体
$font-family-heading: 'LXGW WenKai', $font-family-en, $font-family-zh, sans-serif;
```

### 性能优化

- 使用 `font-display: swap` 确保文字立即显示
- 字体文件托管在本地，减少外部依赖
- 浏览器会缓存字体文件，首次加载后速度快

### 备用方案

如果字体文件加载失败，会自动回退到系统字体：
1. macOS: PingFang SC (苹方)
2. Windows: Microsoft YaHei (微软雅黑)
3. 其他: 系统默认无衬线字体

### 更新字体

如需更新字体版本：

1. 访问 https://github.com/lxgw/LxgwWenKai/releases
2. 下载最新版本的 TTF 文件
3. 替换 `static/fonts/` 目录中的文件
4. 清除浏览器缓存

---

**最后更新**: 2025-11-09
**集成人**: Claude Code
**项目**: 华诚律师事务所官网
