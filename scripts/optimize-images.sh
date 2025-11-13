#!/bin/bash

# 图片优化脚本
# 使用 ImageMagick 和 mozjpeg 压缩图片

echo "🖼️  开始优化图片..."

# 检查是否安装了 ImageMagick
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick 未安装"
    echo "请运行: brew install imagemagick (Mac) 或 apt-get install imagemagick (Linux)"
    exit 1
fi

# 创建备份目录
BACKUP_DIR="static/images/backup-$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

echo "📦 备份原始图片到 $BACKUP_DIR"
cp -r static/images/*.{jpg,jpeg,png} "$BACKUP_DIR/" 2>/dev/null || true

# 优化 JPG 图片
echo "🔧 压缩 JPG 图片..."
find static/images -name "*.jpg" -o -name "*.jpeg" | while read file; do
    echo "   处理: $file"
    convert "$file" -quality 80 -strip "$file"
done

# 优化 PNG 图片
echo "🔧 压缩 PNG 图片..."
find static/images -name "*.png" | while read file; do
    echo "   处理: $file"
    convert "$file" -strip -quality 85 "$file"
done

echo "✅ 图片优化完成！"
echo ""
echo "📊 压缩对比："
du -sh static/images/
du -sh "$BACKUP_DIR/"
