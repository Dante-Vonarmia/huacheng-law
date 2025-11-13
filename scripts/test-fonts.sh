#!/bin/bash

# 测试字体加载是否正常

echo "🧪 测试字体加载..."
echo ""

# 测试 CDN 可达性
echo "1️⃣ 测试 jsDelivr CDN..."
if curl -I -s "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.woff2" | grep -q "200 OK"; then
  echo "   ✅ CDN Regular 字体可访问"
else
  echo "   ❌ CDN Regular 字体不可访问"
fi

if curl -I -s "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-bold.woff2" | grep -q "200 OK"; then
  echo "   ✅ CDN Bold 字体可访问"
else
  echo "   ❌ CDN Bold 字体不可访问"
fi

echo ""
echo "2️⃣ 测试本地字体文件..."
if [ -f "static/fonts/LXGWWenKai-Regular.ttf" ]; then
  SIZE=$(du -h "static/fonts/LXGWWenKai-Regular.ttf" | cut -f1)
  echo "   ✅ 本地 Regular TTF: $SIZE"
else
  echo "   ⚠️  本地 Regular TTF 不存在"
fi

if [ -f "static/fonts/LXGWWenKai-Bold.ttf" ]; then
  SIZE=$(du -h "static/fonts/LXGWWenKai-Bold.ttf" | cut -f1)
  echo "   ✅ 本地 Bold TTF: $SIZE"
else
  echo "   ⚠️  本地 Bold TTF 不存在"
fi

echo ""
echo "3️⃣ 检查本地开发服务器..."
if curl -I -s "http://localhost:9000/" | grep -q "200 OK"; then
  echo "   ✅ 开发服务器运行中"

  if curl -I -s "http://localhost:9000/fonts/LXGWWenKai-Regular.ttf" | grep -q "200 OK"; then
    echo "   ✅ 本地字体可通过服务器访问"
  else
    echo "   ⚠️  本地字体无法通过服务器访问"
  fi
else
  echo "   ⚠️  开发服务器未运行（npm run dev）"
fi

echo ""
echo "4️⃣ 检查字体配置..."
if grep -q "cdn.jsdelivr.net" ui-kit/styles/global.scss; then
  echo "   ✅ global.scss 包含 CDN 配置"
else
  echo "   ❌ global.scss 未配置 CDN"
fi

if grep -q "cdn.jsdelivr.net" src/app.html; then
  echo "   ✅ app.html 包含 CDN 预加载"
else
  echo "   ❌ app.html 未配置 CDN 预加载"
fi

echo ""
echo "✨ 测试完成！"
echo ""
echo "📝 下一步："
echo "   1. 清除浏览器缓存"
echo "   2. 重启开发服务器: npm run dev"
echo "   3. 打开浏览器并检查 Network 标签"
echo "   4. 应该看到 .woff2 文件加载，而不是 .ttf"
