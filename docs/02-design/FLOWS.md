# 华诚律师事务所门户改版 - 页面流程与交互设计

**版本**: v2.0
**创建时间**: 2025-11-06

---

## 1. 页面关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                          首页 (Home)                             │
│  Banner → 新闻动态 → 精选视频 → 案例分析 → 出版物 → 活动讲座   │
└─────────────────────────────────────────────────────────────────┘
         │
         ├──→ 关于华诚 (About)
         │    ├─ 华诚简介
         │    ├─ 华诚历程 (时间轴)
         │    ├─ 业务结构 (组织图)
         │    ├─ 公益活动
         │    ├─ 荣誉奖项
         │    └─ 办公室信息
         │
         ├──→ 业务领域 (Practices)
         │    ├─ 业务列表页
         │    └─ 业务详情页 [slug]
         │        ├─ 服务概述
         │        ├─ 详细服务内容
         │        ├─ 专业团队
         │        └─ 成功案例
         │
         ├──→ 律师团队 (Team)
         │    ├─ 律师列表页 (筛选、分页)
         │    └─ 律师详情页 [id]
         │        ├─ 个人简介
         │        ├─ 教育背景
         │        ├─ 专业成就
         │        ├─ 代表案例
         │        └─ 出版物
         │
         ├──→ 新闻与出版物
         │    ├─ 新闻列表页
         │    ├─ 新闻详情页 [id]
         │    ├─ 出版物列表页
         │    └─ 出版物详情页 [id]
         │
         ├──→ 活动与讲座 (Events)
         │    ├─ 活动列表页
         │    ├─ 活动详情页 [id]
         │    └─ 报名表单 (Modal)
         │
         ├──→ 招聘 (Careers)
         │    ├─ 招聘列表页
         │    ├─ 招聘详情页 [id]
         │    └─ 在线投递表单 (Modal)
         │
         ├──→ 联系我们 (Contact)
         │    ├─ 办公室信息
         │    ├─ 地图展示
         │    └─ 联系表单
         │
         └──→ 搜索结果页 (Search)
              ├─ 搜索输入框
              ├─ 结果列表
              └─ 筛选器
```

---

## 2. 关键交互流程

### 2.1 首页交互流程

#### 2.1.1 Banner 轮播

```
用户进入首页
    ↓
自动播放轮播图 (5s/张)
    ↓
用户点击指示器 → 切换到指定图片
    ↓
用户悬停轮播图 → 暂停自动播放
    ↓
用户移开鼠标 → 恢复自动播放
```

**事件监听**:
- `mouseenter` → 暂停轮播
- `mouseleave` → 恢复轮播
- `click` (指示器) → 切换图片

**状态管理**:
```typescript
{
  currentSlide: number,      // 当前显示的图片索引
  autoplay: boolean,         // 是否自动播放
  interval: number,          // 播放间隔 (ms)
  slides: BannerSlide[]      // 轮播图数据
}
```

---

#### 2.1.2 精选视频区

```
用户浏览首页
    ↓
看到视频封面卡片
    ↓
用户点击播放按钮
    ↓
[成功] 弹出视频播放器 (Modal) → 开始播放
    ↓
用户点击全屏按钮 → 全屏播放
    ↓
用户点击关闭按钮 → 关闭播放器

[失败] 视频加载失败 → 显示错误提示
```

**事件监听**:
- `click` (播放按钮) → 打开播放器
- `click` (全屏按钮) → 切换全屏
- `click` (关闭按钮) → 关闭播放器
- `error` (视频标签) → 显示错误

**状态管理**:
```typescript
{
  isPlaying: boolean,        // 是否正在播放
  currentVideo: Video | null,// 当前播放的视频
  isFullscreen: boolean,     // 是否全屏
  error: string | null       // 错误信息
}
```

---

### 2.2 关于华诚交互流程

#### 2.2.1 左侧导航锚点跳转

```
用户访问关于华诚页面
    ↓
看到左侧导航菜单
    ↓
用户点击菜单项 (如"华诚简介")
    ↓
页面平滑滚动到对应区域
    ↓
高亮当前菜单项
    ↓
用户滚动页面
    ↓
自动更新高亮菜单项 (Scroll Spy)
```

**事件监听**:
- `click` (菜单项) → 滚动到对应区域
- `scroll` (页面) → 更新高亮菜单项

**滚动逻辑**:
```typescript
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  let current = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2) {
      current = section.id;
    }
  });

  activeSection = current;
}
```

---

#### 2.2.2 时间轴滚动动画

```
用户滚动到时间轴区域
    ↓
触发 Intersection Observer
    ↓
时间节点依次淡入显示
    ↓
年份标签从左侧滑入
    ↓
内容文字从右侧滑入
    ↓
动画完成,显示完整时间轴
```

**动画参数**:
- 延迟: 每个节点延迟 100ms
- 持续时间: 300ms
- 缓动函数: ease-out

**实现方式**:
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, index * 100);
    }
  });
}, { threshold: 0.2 });

timelineNodes.forEach(node => observer.observe(node));
```

---

### 2.3 业务领域交互流程

#### 2.3.1 分类导航切换

```
用户访问业务领域页面
    ↓
看到顶部 6 个业务标签
    ↓
用户点击标签 (如"知识产权")
    ↓
底部滑块滑动到对应位置
    ↓
页面平滑滚动到对应业务区域
    ↓
高亮当前标签
```

**事件监听**:
- `click` (标签) → 切换业务领域

**状态管理**:
```typescript
{
  activeTab: string,         // 当前激活的标签
  tabs: Tab[],               // 标签列表
  sliderPosition: number,    // 滑块位置
  sliderWidth: number        // 滑块宽度
}
```

**滑块动画**:
```scss
.slider {
  transition: transform 300ms ease, width 300ms ease;
  transform: translateX(var(--slider-position));
  width: var(--slider-width);
}
```

---

#### 2.3.2 折叠内容展开/收起

```
用户点击"展开更多"按钮
    ↓
[已折叠] 内容区域高度从 0 变为 auto
         ↓
         按钮文字变为"收起"
         ↓
         图标旋转 180 度

[已展开] 内容区域高度从 auto 变为 0
         ↓
         按钮文字变为"展开更多"
         ↓
         图标旋转 -180 度
```

**事件监听**:
- `click` (展开按钮) → 切换展开/收起状态

**动画实现**:
```scss
.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease;

  &.expanded {
    max-height: 1000px; // 足够大的值
  }
}

.icon {
  transition: transform 300ms ease;

  &.rotated {
    transform: rotate(180deg);
  }
}
```

---

### 2.4 律师团队交互流程

#### 2.4.1 筛选与搜索

```
用户访问律师团队页面
    ↓
看到筛选器 (业务领域、职称)
    ↓
用户选择"知识产权" + "合伙人"
    ↓
律师列表动态过滤,显示符合条件的律师
    ↓
用户输入关键词"张"
    ↓
列表进一步过滤,高亮关键词
    ↓
显示结果数量 (如"找到 3 位律师")
```

**事件监听**:
- `change` (下拉框) → 更新筛选条件
- `input` (搜索框) → 更新关键词

**筛选逻辑**:
```typescript
function filterLawyers() {
  let filtered = lawyers;

  // 按业务领域筛选
  if (selectedPractice) {
    filtered = filtered.filter(lawyer =>
      lawyer.practice_areas.includes(selectedPractice)
    );
  }

  // 按职称筛选
  if (selectedTitle) {
    filtered = filtered.filter(lawyer =>
      lawyer.title === selectedTitle
    );
  }

  // 按关键词搜索
  if (keyword) {
    filtered = filtered.filter(lawyer =>
      lawyer.name.includes(keyword)
    );
  }

  return filtered;
}
```

---

#### 2.4.2 律师卡片 Hover 交互

```
用户悬停律师卡片
    ↓
卡片阴影增强
    ↓
头像图片放大 1.05 倍
    ↓
弹出摘要信息
    ├─ 业务领域 (3个徽章)
    ├─ 教育背景 (学校 + 学位)
    └─ 执业年限 (如"10年经验")
    ↓
用户移开鼠标
    ↓
卡片恢复原样,摘要消失
```

**事件监听**:
- `mouseenter` → 显示摘要
- `mouseleave` → 隐藏摘要

**动画实现**:
```scss
.lawyer-card {
  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    .photo {
      transform: scale(1.05);
    }

    .summary {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.summary {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 300ms ease, transform 300ms ease;
}
```

---

### 2.5 新闻与出版物交互流程

#### 2.5.1 新闻列表分页

```
用户访问新闻列表页
    ↓
默认显示第 1 页 (9篇新闻)
    ↓
用户滚动到底部
    ↓
看到分页器 (1 2 3 ... 10)
    ↓
用户点击"下一页"
    ↓
[成功] 加载第 2 页内容
         ↓
         页面滚动到顶部
         ↓
         更新 URL (?page=2)

[失败] 显示加载错误提示
```

**事件监听**:
- `click` (分页器) → 加载对应页

**分页逻辑**:
```typescript
function loadPage(page: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  currentNews = allNews.slice(start, end);
  currentPage = page;

  // 更新 URL
  window.history.pushState({}, '', `?page=${page}`);

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

---

#### 2.5.2 出版物筛选

```
用户访问出版物列表页
    ↓
看到筛选器 (类别、年份)
    ↓
用户选择"专著" + "2024年"
    ↓
出版物列表动态过滤
    ↓
显示符合条件的出版物
    ↓
用户点击"重置"按钮
    ↓
清空筛选条件,显示全部
```

**事件监听**:
- `change` (筛选器) → 更新筛选条件
- `click` (重置按钮) → 清空筛选

**筛选逻辑**:
```typescript
function filterPublications() {
  let filtered = publications;

  if (selectedCategory) {
    filtered = filtered.filter(pub =>
      pub.category === selectedCategory
    );
  }

  if (selectedYear) {
    filtered = filtered.filter(pub =>
      pub.year === selectedYear
    );
  }

  return filtered;
}
```

---

### 2.6 活动与讲座交互流程

#### 2.6.1 活动报名

```
用户访问活动列表页
    ↓
看到即将举办的活动
    ↓
用户点击"立即报名"按钮
    ↓
弹出报名表单 (Modal)
    ↓
用户填写信息
    ├─ 姓名 (必填)
    ├─ 公司 (必填)
    ├─ 职位 (必填)
    ├─ 邮箱 (必填,格式校验)
    ├─ 电话 (必填,格式校验)
    └─ 备注 (可选)
    ↓
用户点击"提交"
    ↓
[成功] 显示成功提示 → 关闭表单
    ↓
[失败] 显示错误信息,保留表单数据
```

**表单验证**:
```typescript
const schema = {
  name: Yup.string().required('请输入姓名'),
  company: Yup.string().required('请输入公司名称'),
  position: Yup.string().required('请输入职位'),
  email: Yup.string()
    .email('邮箱格式不正确')
    .required('请输入邮箱'),
  phone: Yup.string()
    .matches(/^1[3-9]\d{9}$/, '手机号格式不正确')
    .required('请输入手机号'),
  note: Yup.string()
};
```

---

### 2.7 联系我们交互流程

#### 2.7.1 联系表单提交

```
用户访问联系我们页面
    ↓
看到联系表单
    ↓
用户填写信息
    ├─ 姓名 (必填)
    ├─ 邮箱 (必填,格式校验)
    ├─ 电话 (必填,格式校验)
    └─ 留言 (必填,最少 10 字)
    ↓
用户点击"提交"
    ↓
前端校验
    ↓
[校验失败] 显示错误提示,标红错误字段
    ↓
[校验成功] 提交到后端 (Demo: console.log)
    ↓
[成功] 显示成功提示,清空表单
    ↓
[失败] 显示网络错误,保留表单数据
```

---

### 2.8 搜索结果页交互流程

#### 2.8.1 全局搜索

```
用户在任意页面输入搜索词 (如"知识产权")
    ↓
点击搜索按钮 或 按下 Enter
    ↓
跳转到搜索结果页 (?q=知识产权)
    ↓
后台搜索多个数据源
    ├─ 律师 (姓名、业务领域)
    ├─ 新闻 (标题、摘要)
    ├─ 业务领域 (名称、描述)
    ├─ 出版物 (标题、作者)
    └─ 活动 (标题、描述)
    ↓
显示搜索结果
    ├─ 按类型分组
    ├─ 高亮关键词
    └─ 显示结果数量
    ↓
用户点击类型筛选器 (如"仅显示律师")
    ↓
过滤结果,仅显示该类型
```

**搜索逻辑**:
```typescript
function search(keyword: string) {
  const results = [];

  // 搜索律师
  const lawyers = lawyersData.filter(lawyer =>
    lawyer.name.includes(keyword) ||
    lawyer.practice_areas.some(area => area.includes(keyword))
  );
  results.push(...lawyers.map(l => ({ type: 'lawyer', data: l })));

  // 搜索新闻
  const news = newsData.filter(article =>
    article.title.includes(keyword) ||
    article.summary.includes(keyword)
  );
  results.push(...news.map(n => ({ type: 'news', data: n })));

  // ... 其他数据源

  return results;
}
```

---

## 3. 数据流

### 3.1 首页数据流

```
用户访问首页
    ↓
SSR: 服务端预渲染
    ↓
获取首页数据
    ├─ Banner 数据 (API: /api/banners)
    ├─ 新闻数据 (API: /api/news?limit=3)
    ├─ 视频数据 (API: /api/videos?featured=true)
    ├─ 案例数据 (API: /api/cases?limit=6)
    ├─ 出版物数据 (API: /api/publications?limit=6)
    └─ 活动数据 (API: /api/events?upcoming=true&limit=3)
    ↓
渲染 HTML 返回客户端
    ↓
客户端激活 (Hydration)
    ↓
初始化交互逻辑
    ├─ Banner 轮播定时器
    ├─ 视频播放器事件
    └─ 卡片 Hover 动效
```

---

### 3.2 律师团队数据流

```
用户访问律师列表页
    ↓
SSR: 获取律师列表 (API: /api/lawyers)
    ↓
返回 HTML
    ↓
客户端激活
    ↓
用户选择筛选条件
    ↓
[客户端筛选] 过滤已加载的数据
    ↓
更新 UI
    ↓
用户点击律师卡片
    ↓
跳转到律师详情页 (/team/[id])
    ↓
SSR: 获取律师详情 (API: /api/lawyers/[id])
    ├─ 个人信息
    ├─ 教育背景
    ├─ 成就与案例
    └─ 出版物
    ↓
返回 HTML
```

---

### 3.3 表单提交数据流

```
用户填写表单
    ↓
前端校验 (Yup)
    ↓
[校验失败] 显示错误,中断提交
    ↓
[校验成功] 序列化表单数据
    ↓
发送 POST 请求
    ├─ URL: /api/contact (联系表单)
    ├─ URL: /api/event-registrations (活动报名)
    └─ URL: /api/job-applications (招聘申请)
    ↓
后端处理
    ├─ 数据校验
    ├─ 存储到数据库
    └─ 发送确认邮件
    ↓
返回响应
    ↓
[成功] 显示成功提示,清空表单
    ↓
[失败] 显示错误信息,保留数据
```

---

## 4. 空态与异常处理

### 4.1 空态

| 页面 | 空态场景 | 处理方式 |
|------|---------|----------|
| 律师列表 | 筛选后无结果 | 显示"未找到符合条件的律师,请调整筛选条件" |
| 新闻列表 | 暂无新闻 | 显示"暂无新闻动态,敬请期待" |
| 搜索结果 | 无搜索结果 | 显示"未找到相关内容,请尝试其他关键词" |
| 活动列表 | 暂无活动 | 显示"暂无即将举办的活动,敬请期待" |

### 4.2 异常处理

| 异常场景 | 处理方式 |
|---------|----------|
| API 请求失败 | 显示错误提示"网络错误,请稍后重试",保留重试按钮 |
| 视频加载失败 | 显示错误提示"视频加载失败",提供刷新按钮 |
| 图片加载失败 | 显示占位图,alt 文字 |
| 表单提交失败 | 显示错误信息,保留表单数据,提供重新提交按钮 |
| 路由不存在 | 跳转到 404 页面,提供返回首页按钮 |
| 权限不足 | 显示"暂无权限访问该内容" |

---

## 5. 移动端特殊交互

### 5.1 导航菜单

```
移动端用户访问页面
    ↓
看到汉堡菜单按钮 (三条横线)
    ↓
用户点击汉堡菜单
    ↓
侧边栏从右侧滑入
    ├─ 菜单项垂直排列
    ├─ 支持二级菜单展开/收起
    └─ 支持语言切换按钮
    ↓
用户点击菜单项
    ↓
侧边栏收起,跳转到对应页面
    ↓
用户点击遮罩层
    ↓
侧边栏收起
```

### 5.2 横向滑动

```
移动端用户访问公益活动区域
    ↓
看到横向滑动卡片
    ↓
用户左右滑动
    ↓
卡片平滑滚动
    ↓
显示滑动指示器 (点)
```

---

**下一步**: 交接给 Frontend Agent,开始实现交互逻辑
