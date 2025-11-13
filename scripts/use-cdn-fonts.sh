#!/bin/bash

# 使用 CDN 字体作为替代方案
# jsDelivr 提供了霞鹜文楷的 CDN 服务

echo "🔧 切换到 CDN 字体源..."

cat > ui-kit/styles/_fonts-cdn.scss << 'EOF'
// ========== 霞鹜文楷 CDN 版本 ==========
// 使用 jsDelivr CDN 提供更快、更稳定的字体加载

/* 霞鹜文楷 - Regular (CDN) */
@font-face {
  font-family: 'LXGW WenKai';
  src:
    local('LXGW WenKai'),
    local('LXGWWenKai-Regular'),
    url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.woff') format('woff'),
    url('/fonts/LXGWWenKai-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+4E00-9FFF, U+3000-303F, U+FF00-FFEF;
}

/* 霞鹜文楷 - Bold (CDN) */
@font-face {
  font-family: 'LXGW WenKai';
  src:
    local('LXGW WenKai Bold'),
    local('LXGWWenKai-Bold'),
    url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-bold.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-bold.woff') format('woff'),
    url('/fonts/LXGWWenKai-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+4E00-9FFF, U+3000-303F, U+FF00-FFEF;
}
EOF

echo "✨ CDN 字体配置已创建："
echo "   ui-kit/styles/_fonts-cdn.scss"
echo ""
echo "📝 使用方法："
echo "   在 global.scss 中导入: @use './fonts-cdn' as *;"
