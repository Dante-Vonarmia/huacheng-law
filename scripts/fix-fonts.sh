#!/bin/bash

# 修复霞鹜文楷字体问题
# 从官方 GitHub 仓库重新下载字体文件

set -e

echo "🔧 正在修复字体文件..."

FONTS_DIR="static/fonts"
TEMP_DIR="/tmp/lxgw-fonts"

# 创建临时目录
mkdir -p "$TEMP_DIR"

# 下载字体文件
echo "📥 下载霞鹜文楷 Regular..."
curl -L "https://github.com/lxgw/LxgwWenKai/releases/download/v1.330/LXGWWenKai-Regular.ttf" \
  -o "$TEMP_DIR/LXGWWenKai-Regular.ttf"

echo "📥 下载霞鹜文楷 Bold..."
curl -L "https://github.com/lxgw/LxgwWenKai/releases/download/v1.330/LXGWWenKai-Bold.ttf" \
  -o "$TEMP_DIR/LXGWWenKai-Bold.ttf"

# 验证文件
echo "✅ 验证字体文件..."
file "$TEMP_DIR/LXGWWenKai-Regular.ttf"
file "$TEMP_DIR/LXGWWenKai-Bold.ttf"

# 备份旧文件
if [ -f "$FONTS_DIR/LXGWWenKai-Regular.ttf" ]; then
  echo "💾 备份旧字体文件..."
  mv "$FONTS_DIR/LXGWWenKai-Regular.ttf" "$FONTS_DIR/LXGWWenKai-Regular.ttf.bak"
  mv "$FONTS_DIR/LXGWWenKai-Bold.ttf" "$FONTS_DIR/LXGWWenKai-Bold.ttf.bak"
fi

# 复制新文件
echo "📦 安装新字体文件..."
cp "$TEMP_DIR/LXGWWenKai-Regular.ttf" "$FONTS_DIR/"
cp "$TEMP_DIR/LXGWWenKai-Bold.ttf" "$FONTS_DIR/"

# 清理
rm -rf "$TEMP_DIR"

echo "✨ 字体修复完成！"
echo ""
echo "文件位置："
ls -lh "$FONTS_DIR/"*.ttf

echo ""
echo "📝 请重启开发服务器以应用更改：npm run dev"
