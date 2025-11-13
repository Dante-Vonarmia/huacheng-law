#!/bin/bash

# 验证字体修复是否成功

echo "🔍 验证字体修复..."
echo ""

# 1. 检查 global.scss
echo "1️⃣ 检查 global.scss 配置"
if grep -q "lxgw-wenkai-webfont@1.7.0" ui-kit/styles/global.scss; then
  echo "   ✅ 已配置 CDN 子集化字体 (v1.7.0)"
else
  echo "   ❌ CDN 配置未找到"
  exit 1
fi

# 2. 测试 CDN 可用性
echo ""
echo "2️⃣ 测试 CDN 可访问性"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-regular.css")
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ CDN Regular CSS: HTTP $HTTP_CODE"
else
  echo "   ❌ CDN Regular CSS: HTTP $HTTP_CODE"
  exit 1
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-bold.css")
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ CDN Bold CSS: HTTP $HTTP_CODE"
else
  echo "   ❌ CDN Bold CSS: HTTP $HTTP_CODE"
  exit 1
fi

# 3. 测试子集文件
echo ""
echo "3️⃣ 测试子集字体文件"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/files/lxgwwenkai-regular-subset-4.woff2")
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ 子集文件可访问"
else
  echo "   ❌ 子集文件不可访问: HTTP $HTTP_CODE"
  exit 1
fi

# 4. 检查本地备份字体是否存在
echo ""
echo "4️⃣ 检查本地备份字体"
if [ -f "static/fonts/LXGWWenKai-Regular.ttf" ]; then
  SIZE=$(du -h "static/fonts/LXGWWenKai-Regular.ttf" | cut -f1)
  echo "   ℹ️  本地 TTF 备份存在: $SIZE (作为最后备份)"
else
  echo "   ⚠️  本地 TTF 不存在（可选，CDN 优先）"
fi

# 5. 检查 app.html
echo ""
echo "5️⃣ 检查 app.html 配置"
if grep -q "cdn.jsdelivr.net" src/app.html; then
  echo "   ✅ app.html 包含 CDN 预连接"
else
  echo "   ⚠️  app.html 未配置 CDN 预连接"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ 字体修复验证成功！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 修复摘要："
echo "   • 使用 lxgw-wenkai-webfont@1.7.0 CDN"
echo "   • 字体子集化：40+ 个 WOFF2 文件"
echo "   • 按需加载：只加载页面使用的字符集"
echo "   • 预计节省：80-95% 字体加载量"
echo ""
echo "🚀 下一步："
echo "   1. 重启开发服务器: npm run dev"
echo "   2. 清除浏览器缓存 (Cmd+Shift+Delete)"
echo "   3. 打开浏览器开发者工具 → Network"
echo "   4. 过滤 'font' 类型"
echo "   5. 应该看到多个 .woff2 子集文件加载"
echo "   6. 不应再有 OTS 错误！"
echo ""
