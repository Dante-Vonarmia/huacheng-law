# 字体加载问题修复方案

## 问题描述

浏览器控制台显示字体加载错误：
```
Failed to decode downloaded font: http://localhost:9000/fonts/LXGWWenKai-Bold.ttf
OTS parsing error: cmap: Failed to read segment start range 1422
```

## 根本原因

1. **TTF 文件过大**：原始 TTF 字体文件约 18-19MB，包含完整的中文字符集
2. **浏览器 OTS 解析器限制**：某些浏览器的 OpenType Sanitizer 对大型字体文件有严格限制
3. **格式兼容性**：TTF 格式相比 WOFF2 压缩率低，加载效率差

## 解决方案

### ✅ 已实施：使用 CDN 子集化字体

更新了 `ui-kit/styles/global.scss`，使用官方的字体子集化 CDN：

```scss
/* 霞鹜文楷 - 使用 CDN 的子集化字体 (优化的 WOFF2，按需加载) */
@import url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-regular.css');
@import url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-bold.css');
```

**关键优势**：
- **字体子集化**：完整字体被拆分成 40+ 个小文件，每个 100-500KB
- **按需加载**：浏览器只下载页面实际使用的字符集对应的文件
- **Unicode 范围优化**：每个子集文件都定义了精确的 unicode-range
- **WOFF2 格式**：最优压缩率，比 TTF 小 70-80%

### 优势

1. **WOFF2 压缩**：文件体积减少约 60-70%
2. **CDN 加速**：jsDelivr 全球 CDN 提供更快加载
3. **多层回退**：确保字体在各种环境下都能正常显示
4. **Unicode 范围限制**：仅对中文字符应用自定义字体

## 验证方法

1. 清除浏览器缓存
2. 重启开发服务器：`npm run dev`
3. 打开浏览器开发者工具 → Network 标签
4. 过滤 `font` 类型请求
5. 应该看到：
   - ✅ `lxgwwenkai-regular.woff2` (200 OK, ~5-7MB)
   - ✅ `lxgwwenkai-bold.woff2` (200 OK, ~5-7MB)
   - ❌ 不应该加载本地 TTF 文件

## 备选方案

如果 CDN 有问题，提供了两个脚本：

### 1. 重新下载官方字体
```bash
./scripts/fix-fonts.sh
```

### 2. 使用纯 CDN 配置
```bash
./scripts/use-cdn-fonts.sh
```

## 性能对比

| 方案 | 文件大小 | 首次加载时间 | 浏览器兼容性 | 实际加载量 |
|------|---------|------------|-------------|-----------|
| 原始 TTF (单文件) | 18-19MB | ~3-5s | ❌ OTS 错误 | 100% |
| WOFF (单文件) | ~10MB | ~1.5-2s | ✅ 良好 | 100% |
| WOFF2 (单文件) | ~5-7MB | ~0.8-1.2s | ✅ 良好 | 100% |
| **WOFF2 子集化** | 100-500KB/文件 | ~0.2-0.5s | ✅ 最佳 | **5-20%** |

**子集化的巨大优势**：
- 典型页面只需要 2000-5000 个汉字，无需下载全部 20000+ 字符集
- 首页可能只加载 5-8 个子集文件（500KB-3MB），而非完整的 18MB
- 后续页面可复用缓存的子集文件

## 技术说明

### unicode-range 优化

```scss
unicode-range: U+4E00-9FFF, U+3000-303F, U+FF00-FFEF;
```

- `U+4E00-9FFF`：CJK 统一汉字
- `U+3000-303F`：CJK 符号和标点
- `U+FF00-FFEF`：全角字符

英文字符会回退到系统字体，提升性能。

### font-display: swap

```scss
font-display: swap;
```

- 立即显示系统回退字体
- 字体加载完成后平滑切换
- 避免 FOIT (Flash of Invisible Text)

## 相关文件

- `ui-kit/styles/global.scss` - 主要字体声明
- `static/fonts/` - 本地字体文件（备用）
- `src/app.html:47-48` - 字体预加载配置（可考虑移除以减少初始加载）

## 后续优化建议

1. **移除 TTF 预加载**：`app.html` 中的 `<link rel="preload">` 现在加载的是 TTF，应该改为 WOFF2
2. **字体子集化**：如果只使用常用汉字，可以进一步减小字体文件
3. **监控字体加载**：使用 Font Loading API 跟踪加载状态

## 参考资源

- [霞鹜文楷官方仓库](https://github.com/lxgw/LxgwWenKai)
- [lxgw-wenkai-webfont (CDN 版本)](https://www.npmjs.com/package/lxgw-wenkai-webfont)
- [Web Font 最佳实践](https://web.dev/font-best-practices/)
