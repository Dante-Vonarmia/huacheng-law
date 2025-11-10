# Pages.Revox.io 设计语言分析文档

> **学习目标**: 掌握 Pages Frontend Framework 的设计语言精髓，应用于律所门户网站改版项目
> **分析日期**: 2025-11-06
> **分析范围**: `/Users/dantevonalcatraz/Downloads/bundle/` 完整文档包

---

## 一、核心设计理念

### 1.1 设计定位
- **轻量级现代框架**: 38KB CSS + 1.8KB JS (minified & gzipped)
- **移动优先**: 硬件加速、触屏优化
- **模块化架构**: 按需加载的组件系统
- **内容驱动**: 强调内容展示而非装饰性设计

### 1.2 视觉风格关键词
- **Minimalist** (简约主义)
- **Clean & Crisp** (清晰利落)
- **Professional** (专业感)
- **Accessible** (易用性优先)
- **Content-First** (内容优先)

---

## 二、色彩系统 (Color System)

### 2.1 基础灰度色
```less
// 主灰色基准
@color-master: #626262;

// 自动生成的灰度梯度
@color-master-light:    mix(#626262, #fff, 16%)   // 浅灰
@color-master-lighter:  mix(#626262, #fff, 9.5%)  // 更浅灰
@color-master-lightest: mix(#626262, #fff, 3%)    // 最浅灰（背景色）

@color-master-dark:     mix(#626262, #000, 45%)   // 深灰（标题）
@color-master-darker:   mix(#626262, #000, 27%)   // 更深灰
@color-master-darkest:  mix(#626262, #000, 18%)   // 最深灰
```

**设计哲学**:
- 通过 LESS `mix()` 函数自动生成色阶，确保视觉和谐
- 避免硬编码，主题切换只需修改 `@color-master` 一个变量

### 2.2 语义色彩
```less
// 品牌色/功能色
@color-success:  #10cfbd  // 青绿色 - 成功/确认
@color-complete: #48b0f7  // 天蓝色 - 完成/主要行动
@color-primary:  #6d5cae  // 紫色   - 品牌主色
@color-warning:  #f8d053  // 黄色   - 警告
@color-danger:   #f55753  // 红色   - 危险/错误
@color-info:     #3b4752  // 深蓝灰 - 信息提示

// 同样自动生成浅色和深色变体
// 例如：@color-primary-light, @color-primary-lighter
//       @color-primary-dark, @color-primary-darker
```

### 2.3 色彩应用原则
1. **灰度为主**: 80% 内容使用灰度色
2. **语义色为辅**: 仅在需要引导注意力时使用（按钮、状态标识）
3. **高对比度**: 确保文字可读性（WCAG AA 标准）
4. **透明度技巧**: 用 `fade(@color, percentage)` 实现层次感

### 2.4 应用于律所项目的建议
```scss
// 华诚律所配色映射方案
$color-primary: #0E1B3A;    // 对应 Pages 的 @color-info（专业深蓝）
$color-secondary: #B5975A;  // 对应 Pages 的 @color-warning（尊贵金色）
$color-text: #2C3E50;       // 对应 Pages 的 @color-master-dark
$color-bg: #F5F7FA;         // 对应 Pages 的 @color-master-lightest
```

---

## 三、字体系统 (Typography)

### 3.1 字体栈
```less
// 主字体
@base-font-family: wf_segoe-ui_light, wf_segoe-ui_normal,
                   "Helvetica Neue", Helvetica, Arial, sans-serif;

// 强调标题
.block-title {
  font-family: 'Montserrat';  // Google Fonts 无衬线字体
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.03em;     // 增加字间距提升辨识度
}
```

**字体选择逻辑**:
- **正文**: Segoe UI (Windows 原生) / Helvetica Neue (macOS) → 系统级渲染性能
- **标题**: Montserrat → 几何感强、专业现代
- **后备**: Arial → 保证所有系统可用

### 3.2 字号层级
```less
// 标题层级（44px → 18px）
h1: 44px / 55px  (font-size / line-height)
h2: 31px / 42px
h3: 27px / 40px
h4: 22px / 31.88px
h5: 18px / 25.88px

// 特殊用途
h1.mega: 110px / 89px  // 超大标题（首屏 Hero）

// 正文
body: 14px / 21px
p:    16px / 25px      // 段落略大于基准字号
small: 12px / 18px
```

**行高比例**: 约 1.4-1.6 倍字号（提升阅读舒适度）

### 3.3 字重 (Font Weight)
```less
font-weight: 300  // Light - 正文和标题默认
font-weight: 400  // Regular - block-title
font-weight: 700  // Bold - 强调（Montserrat）
```

**设计原则**: 默认轻字重 (300)，通过字号区分层级而非字重

### 3.4 排版细节
```less
// 字母间距
letter-spacing: 0.01em    // 正文（微调）
letter-spacing: 0.03em    // 标题（增强气质）
letter-spacing: -0.009em  // 超大标题（视觉修正）

// 抗锯齿
-webkit-font-smoothing: antialiased;
-webkit-font-feature-settings: "kern" 1;  // 字距调整
```

### 3.5 应用于律所项目
```scss
// 中英文混排优化
$font-zh: "PingFang SC", "Microsoft YaHei", sans-serif;
$font-en: "Montserrat", "Helvetica Neue", sans-serif;
$font-body: $font-zh, $font-en, Arial;

// 标题使用 Montserrat（与 Pages 一致）
h1, h2, h3 { font-family: $font-en, $font-zh; }
```

---

## 四、间距系统 (Spacing System)

### 4.1 Padding 规范
```less
// 水平内边距（Horizontal Padding）
@padding-base-horizontal: 17px   // 基准
@padding-lg-horizontal:   28px   // 大尺寸
@padding-sm-horizontal:   16px   // 小尺寸
@padding-xs-horizontal:   9px    // 超小尺寸

// 垂直内边距（Vertical Padding）
@padding-xs-vertical: 2px
```

### 4.2 工具类命名规则
```less
// Margin 工具类
.m-t-5   { margin-top: 5px }
.m-b-20  { margin-bottom: 20px }
.m-l-35  { margin-left: 35px }
.m-r-40  { margin-right: 40px }

// Padding 工具类
.p-t-75  { padding-top: 75px }
.p-b-85  { padding-bottom: 85px }
.p-l-20  { padding-left: 20px }
.p-r-30  { padding-right: 30px }

// 响应式变体
.md-p-l-5   // 中等屏幕的 padding-left
.xs-no-padding  // 小屏幕取消内边距
```

**间距数值规律**:
- **5 的倍数**: 5, 10, 15, 20, 30, 40...
- **区块间距**: 75-85px（section 上下留白）
- **元素间距**: 10-30px（组件内部）
- **细微间距**: 3-5px（图标与文字）

### 4.3 布局容器
```less
// Bootstrap 基础上的定制
.container  // 响应式最大宽度
.container-fixed-lg { max-width: 1700px }  // 超大屏专用

// 内容遮罩（防止溢出）
.content-mask-md  // 中等屏幕内容限宽
```

### 4.4 垂直节奏 (Vertical Rhythm)
```less
// Section 标准间距
section {
  padding-top: 75px;
  padding-bottom: 85px;
}

// 紧凑版
section.compact {
  padding-top: 55px;
  padding-bottom: 65px;
}
```

---

## 五、布局网格 (Grid System)

### 5.1 响应式断点
```less
// Bootstrap 3 标准断点
xs: < 768px   // 手机
sm: ≥ 768px   // 平板
md: ≥ 992px   // 小桌面
lg: ≥ 1200px  // 大桌面

// Pages 自定义
container-fixed-lg: 1700px  // 超宽屏
```

### 5.2 Header 尺寸规范
```less
@header-default-height:   60px   // 默认导航栏
@header-big-height:       110px  // 首页大头图
@header-medium-height:    88px   // 中等尺寸
@header-small-height:     44px   // 紧凑版

// 移动端
@layout-mobile-header-height: 48px
```

### 5.3 常用布局模式

#### 5.3.1 左右分栏（5-7 分割）
```html
<!-- 标题左，内容右 -->
<div class="row">
  <div class="col-sm-5 col-md-4">
    <h1>标题区域</h1>
  </div>
  <div class="col-sm-7 col-md-8">
    <p>内容区域</p>
  </div>
</div>
```

#### 5.3.2 三等分卡片
```html
<div class="row">
  <div class="col-sm-4">卡片 1</div>
  <div class="col-sm-4">卡片 2</div>
  <div class="col-sm-4">卡片 3</div>
</div>
```

#### 5.3.3 全屏容器
```html
<section class="full-vh">  <!-- 100vh -->
  <div class="container-xs-height full-height">
    <div class="col-xs-height col-middle">
      <!-- 垂直居中内容 -->
    </div>
  </div>
</section>
```

---

## 六、组件设计模式

### 6.1 按钮 (Buttons)

#### 样式变体
```less
.btn              // 默认白底灰字
.btn-primary      // 紫色主按钮
.btn-success      // 青绿色成功
.btn-complete     // 天蓝色完成
.btn-danger       // 红色危险
.btn-warning      // 黄色警告
.btn-black        // 黑底白字
.btn-link         // 链接样式（无背景）
```

#### 尺寸变体
```less
.btn-lg   // padding: 28px (大)
.btn      // padding: 17px (默认)
.btn-sm   // padding: 16px (小)
.btn-xs   // padding: 9px (超小)
.btn-cons // min-width: 120px (固定宽度)
```

#### 视觉特性
- **圆角**: 3px (轻微圆角，避免过于锋利)
- **边框**: 1px solid (默认有边框，区分于纯色按钮)
- **过渡**: `0.1s linear` (快速响应)
- **无投影**: 扁平化设计

#### 律所项目应用
```scss
// 主要操作按钮
.btn-primary {
  background: $color-primary;  // #0E1B3A 深蓝
  color: white;
  border: none;
}

// 次要操作按钮
.btn-secondary {
  background: white;
  color: $color-primary;
  border: 1px solid $color-primary;
}
```

### 6.2 导航栏 (Header)

#### 核心特性
1. **固定定位**: `position: fixed; top: 0;`
2. **自动调整**: `data-pages="header"` 实现滚动收缩
3. **透明模式**: `.transparent-dark` / `.transparent-light`
4. **主题切换**: 滚动时从透明变为深色

#### 样式类组合
```html
<nav class="header bg-header transparent-dark"
     data-pages="header"
     data-pages-header="autoresize">
  <!-- 左侧 Logo -->
  <div class="pull-left">
    <img class="logo" src="logo_black.png">
    <img class="alt" src="logo_white.png">  <!-- 透明模式显示 -->
  </div>

  <!-- 右侧菜单 -->
  <div class="pull-right">
    <ul class="menu">
      <li><a href="#" class="active">Home</a></li>
      <li class="classic">
        <a href="#">Dropdown <i class="pg-arrow_minimize"></i></a>
        <nav class="classic"><!-- 下拉菜单 --></nav>
      </li>
    </ul>
  </div>
</nav>
```

#### 状态变化
```less
.header.minimized {
  height: 60px !important;  // 收缩高度
  .logo { display: none; }   // 切换到备用 Logo
  .alt { display: inline-block; }
}
```

### 6.3 轮播图 (Swiper)

#### 全屏视差轮播
```html
<section class="jumbotron full-vh" data-pages="parallax">
  <div class="swiper-container" id="hero">
    <div class="swiper-wrapper">
      <div class="swiper-slide fit">
        <!-- 背景视差层 -->
        <div class="background-wrapper" data-swiper-parallax="30%">
          <div class="background" data-pages-bg-image="hero.jpg"></div>
        </div>

        <!-- 内容层 -->
        <div class="content-layer">
          <div class="container">
            <h1 data-swiper-parallax="-15%">标题</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</section>
```

**视差参数**:
- 背景层: `30%` (移动较慢)
- 内容层: `-15%` (反向移动，产生深度)

### 6.4 卡片组件

#### 特征卡片 (Feature Card)
```html
<div class="col-sm-4 no-padding">
  <div class="p-r-40">
    <img src="icon.svg" class="m-b-20">
    <h6 class="block-title p-b-5">
      标题 <i class="pg-arrow_right m-l-10"></i>
    </h6>
    <p class="m-b-30">主要描述文字</p>
    <p class="muted font-arial small-text">副标题说明</p>
  </div>
</div>
```

**视觉元素**:
- SVG 图标 (可缩放)
- 大写标题 + 箭头图标
- 灰色小字注释（`.muted .small-text`）

### 6.5 表单元素

#### 输入框
```less
.form-control {
  border: 1px solid fade(@color-black, 7%);  // 浅色边框
  height: 54px;  // @form-group-height
  font-size: 14px;

  &:focus {
    border-color: @color-complete;  // 聚焦蓝色
    box-shadow: none;  // 无投影
  }
}
```

#### 布局
```html
<form class="form-horizontal">
  <div class="form-group">  <!-- 高度 54px -->
    <label class="col-sm-3">标签</label>
    <div class="col-sm-9">
      <input type="text" class="form-control">
    </div>
  </div>
</form>
```

---

## 七、动画与交互

### 7.1 过渡动画
```less
// 全局过渡
transition: color 0.1s linear,
            background-color 0.1s linear,
            opacity 0.2s linear;

// 导航栏过渡
.header {
  transition: background 0.4s ease,
              height 0.4s ease;
}
```

**时长规律**:
- **快速响应**: 0.1s (颜色变化)
- **自然过渡**: 0.2s (透明度)
- **结构变化**: 0.4s (尺寸、布局)

### 7.2 视差滚动
```javascript
// data-pages="parallax"
// data-swiper-parallax="30%"  // 背景层
// data-swiper-parallax="-15%" // 前景层
```

### 7.3 浮动效果
```html
<div data-pages="float"
     data-max-top-translate="40"
     data-max-bottom-translate="300"
     data-speed="-0.1"
     data-delay="1000"
     data-curve="ease">
  <!-- 浮动元素 -->
</div>
```

### 7.4 鼠标滚动提示
```html
<div class="mouse-wrapper">
  <div class="mouse">
    <div class="mouse-scroll"></div>  <!-- CSS 动画滚动 -->
  </div>
</div>
```

### 7.5 加载动画
```html
<body class="pace-dark">  <!-- 或 pace-primary, pace-success -->
  <!-- Pace.js 自动在页面顶部显示进度条 -->
</body>
```

---

## 八、响应式设计策略

### 8.1 移动端优先原则
```less
// 默认写移动端样式
.element {
  padding: 10px;
}

// 媒体查询增强桌面端
@media (min-width: 768px) {
  .element {
    padding: 20px;
  }
}
```

### 8.2 显示/隐藏工具类
```less
.visible-xs   // 仅手机可见
.visible-sm   // 仅平板可见
.visible-md   // 仅桌面可见
.hidden-xs    // 手机隐藏
.hidden-sm    // 平板隐藏
```

### 8.3 响应式间距
```less
.md-p-l-20   // 中等屏幕 padding-left: 20px
.xs-no-padding  // 小屏幕取消所有内边距
.sm-text-center // 小屏幕文字居中
```

### 8.4 图片响应式
```less
.image-responsive-width  { width: 100%; height: auto; }
.image-responsive-height { height: 100%; width: auto; }
.xs-image-responsive-height  // 小屏幕切换为高度自适应
```

### 8.5 移动端导航
```html
<!-- 汉堡菜单 -->
<div class="menu-toggler" data-pages="header-toggle">
  <div class="one"></div>  <!-- 三条线动画变为 X -->
  <div class="two"></div>
  <div class="three"></div>
</div>

<!-- 侧滑菜单 -->
<div class="menu-content mobile-dark"
     data-pages-direction="slideRight">
  <!-- 移动端菜单内容 -->
</div>
```

---

## 九、图标系统

### 9.1 图标库
```html
<!-- Pages 自有图标（14x14px 矢量） -->
<i class="pg-search"></i>
<i class="pg-close_line"></i>
<i class="pg-arrow_right"></i>
<i class="pg-arrow_minimize"></i>

<!-- Font Awesome 支持 -->
<i class="fa fa-user"></i>
<i class="fa fa-envelope"></i>
```

### 9.2 图标尺寸
```less
.fs-11  { font-size: 11px }
.fs-12  { font-size: 12px }
.fs-14  { font-size: 14px }
.fs-21  { font-size: 21px }
```

### 9.3 SVG 使用
```html
<!-- 装饰性图标优先用 SVG -->
<img src="Parachute.svg" alt="" class="m-b-20">
<img src="Prizemedalion.svg" alt="">
```

---

## 十、应用于华诚律所项目的设计决策

### 10.1 色彩映射
| Pages 原色 | 律所项目色 | 用途 |
|-----------|----------|-----|
| `@color-info` (#3b4752) | `$color-primary` (#0E1B3A) | 深蓝主色 |
| `@color-warning` (#f8d053) | `$color-secondary` (#B5975A) | 金色强调 |
| `@color-master-dark` | `$color-text` (#2C3E50) | 正文深灰 |
| `@color-master-lightest` | `$color-bg` (#F5F7FA) | 背景浅灰 |

### 10.2 字体系统
```scss
// 中文主字体：思源黑体/苹方
$font-zh: "Source Han Sans CN", "PingFang SC", "Microsoft YaHei";

// 英文主字体：Montserrat（保持与 Pages 一致）
$font-en: "Montserrat", "Helvetica Neue", Arial;

// 组合字体栈
$font-body: $font-zh, $font-en, sans-serif;
$font-heading: $font-en, $font-zh, sans-serif;  // 标题英文优先
```

### 10.3 布局策略
1. **首页**: 采用 Pages 的全屏 Hero + 轮播设计
2. **列表页**: 使用三栏卡片布局（律师、业务领域）
3. **详情页**: 左右分栏（侧边栏导航 + 主内容区）
4. **表单页**: 采用 Pages 的 54px 高度输入框

### 10.4 组件复用清单
- ✅ Header 透明导航栏（滚动变色）
- ✅ 全屏视差轮播图
- ✅ 三栏特征卡片
- ✅ Block Title 样式（大写 + 字间距）
- ✅ 按钮尺寸和状态系统
- ✅ 表单验证样式
- ✅ 响应式工具类

### 10.5 需要定制的部分
- ❌ 中文排版优化（行高、字间距调整）
- ❌ 律师头像圆形裁切（Pages 无此组件）
- ❌ 业务领域图标定制（Pages 用 SVG，我们需要律所特定图标）
- ❌ 双语切换组件（Pages 无国际化方案）

---

## 十一、技术实现要点

### 11.1 LESS 编译
```bash
# Pages 使用 Grunt/Gulp 编译 LESS
# 我们项目用 SCSS，需要手动转换变量语法

# LESS 变量
@color-primary: #6d5cae;

# SCSS 变量
$color-primary: #6d5cae;
```

### 11.2 关键 JavaScript 插件
```javascript
// Pages 依赖的库
- Swiper.js      // 轮播图
- Velocity.js    // 动画引擎
- Pace.js        // 页面加载进度
- jQuery Unveil  // 图片懒加载

// 我们项目的替代方案
- Swiper → 保留（轻量且强大）
- Velocity → 改用 CSS Transition
- Pace → 可选（加载速度足够快可不用）
- Unveil → 改用原生 Intersection Observer
```

### 11.3 性能优化
```html
<!-- 关键 CSS 内联 -->
<style>
  /* 首屏必需样式 */
</style>

<!-- 非关键 CSS 异步加载 -->
<link rel="preload" href="pages.css" as="style" onload="this.rel='stylesheet'">

<!-- 图片懒加载 -->
<img data-pages-bg-image="hero.jpg" class="lazy">
```

---

## 十二、设计交付检查清单

### 视觉还原度检查
- [ ] 色彩使用是否符合灰度为主、语义色为辅原则？
- [ ] 字号层级是否清晰（44px → 18px）？
- [ ] 间距是否遵循 5 的倍数规律？
- [ ] 按钮是否有 3px 圆角、无投影？
- [ ] 标题是否使用 Montserrat + 大写 + 字间距？

### 响应式检查
- [ ] 移动端导航是否变为汉堡菜单？
- [ ] 卡片是否在小屏幕堆叠？
- [ ] 间距是否在移动端减少（xs-no-padding）？
- [ ] 图片是否响应式缩放？

### 性能检查
- [ ] CSS 文件是否小于 50KB（gzipped）？
- [ ] 是否使用 CSS Transition 而非 JS 动画？
- [ ] 图片是否懒加载？
- [ ] 字体是否只加载需要的字重？

### 可访问性检查
- [ ] 色彩对比度是否 ≥ 4.5:1？
- [ ] 按钮是否有清晰的 hover/focus 状态？
- [ ] 表单是否有 label 关联？
- [ ] 图标是否有文字说明（aria-label）？

---

## 总结：设计语言核心要点

1. **轻量至上**: 追求极致的文件大小（38KB CSS）
2. **灰度主导**: 80% 灰度色 + 20% 语义色
3. **字重克制**: 默认 300，避免过度使用粗体
4. **间距规律**: 5 的倍数，section 间距 75-85px
5. **扁平设计**: 无投影、3px 圆角、清晰边界
6. **移动优先**: 先写手机样式，再用媒体查询增强
7. **内容驱动**: 装饰性元素极少，聚焦信息传达
8. **渐进增强**: 基础 HTML/CSS 可用，JS 锦上添花

---

**文档维护**: 本文档随项目推进持续更新
**最后更新**: 2025-11-06
**维护人**: Design Agent (Claude Code)
