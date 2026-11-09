export const INITIAL_ARTICLES = [
  {
    id: 1, slug: 'hello-react',
    title: '我的第一篇博客：从 create-vite 到 create-next-app',
    summary: '脚手架的变迁史——从 React SPA 到 Next.js App Router，再回头看 Vite 还是那个少年。',
    content: `# 我的第一篇博客

从 **create-vite** 到 **create-next-app**，脚手架的故事从来不是工具之争，而是渲染模式的选择。

## 三种渲染

- **CSR**：浏览器下载 JS 再渲染（Vite + React）
- **SSR**：服务端拼好 HTML 返回（Next.js /pages）
- **RSC**：服务端组件不进浏览器包（Next.js /app）

\`\`\`bash
npm create vite@latest my-app -- --template react
npm create next-app@latest my-app -- --ts --tailwind
\`\`\`

## 为什么写这个博客

> 好记性不如烂键盘。把学习过程写下来，既是复盘，也是和同路人交流的方式。

- 记录踩坑
- 梳理知识脉络
- 练表达`,
    category: '技术', tags: ['React', 'Vite'], author: '陈正杰',
    views: 47, likes: 12, likedBy: [],
    createdAt: '2026-10-01'
  },
  {
    id: 2, slug: 'fullstack-feel',
    title: '全栈是什么感觉：后厨直接端菜',
    summary: '前端后端一把梭，什么都自己上的那种痛并快乐着。',
    content: `# 全栈是什么感觉

前端切图、后端写接口、数据库建模、部署上线——一个人干一个团队的活。

## 快乐

- 想法到上线最快
- 不用等人
- 理解整个系统

## 痛苦

- 每个点都浅尝辄止
- 容易出事故
- 加班是常态

\`\`\`text
Frontend  ─── API ─── Backend ─── DB
  ↑                                  ↑
  └──────── 一个人 ──────────────────┘
\`\`\`

生活就是这样。`,
    category: '随笔', tags: ['全栈', '杂谈'], author: '陈正杰',
    views: 32, likes: 8, likedBy: [],
    createdAt: '2026-10-02'
  },
  {
    id: 3, slug: 'rsc-notes',
    title: 'RSC 学习笔记：服务端组件省掉了多少浏览器 JS',
    summary: 'Server Components 的威力——marked 这种大库留在服务端，浏览器只收 HTML。',
    content: `# RSC 学习笔记

## 默认服务端组件

Next.js /app 目录下的 \`page.tsx\` **默认就是服务端组件**。

好处：
- 代码不下发到浏览器
- 直接在服务端读数据库
- 首屏快，SEO 好

代价：需要交互的组件得加 "use client"。

## 必须加 use client 的情况

- 用 React Hooks（useState / useEffect）
- 绑定事件（onClick）
- 访问浏览器 API（window / localStorage）

## 对比 CSR

| | CSR | RSC |
|---|---|---|
| 首屏 | 空壳 | 有内容 |
| SEO | 差 | 好 |
| JS 体积 | 大 | 小 |
| 交互 | 天然支持 | 需加 client |`,
    category: '技术', tags: ['Next.js', 'RSC'], author: '陈正杰',
    views: 63, likes: 19, likedBy: [],
    createdAt: '2026-09-28'
  },
  {
    id: 4, slug: 'tailwind-editorial',
    title: '用 Tailwind 做编辑风网站：黑白灰的克制美学',
    summary: '原子化 CSS 不止能做五颜六色的站，也能做极简的编辑风。',
    content: `# 编辑风与 Tailwind

## 配色约束

全站只允许：
- 近黑 \`#0a0a0a\`
- 近白 \`#fafafa\`
- 五个等级的灰

> 约束带来风格。

## 字体搭配

- 标题：衬线体（Noto Serif SC）
- 正文：无衬线（Noto Sans SC）
- 代码：等宽（mono）

## 关键样式技巧

\`\`\`css
/* 段落首行缩进 */
text-indent: 2em;
/* 下划线风格链接 */
text-decoration: underline;
text-underline-offset: 4px;
\`\`\`

就这些小细节，凑在一起就是"编辑风"。`,
    category: '技术', tags: ['Tailwind', 'UI'], author: '陈正杰',
    views: 28, likes: 11, likedBy: [],
    createdAt: '2026-10-05'
  },
  {
    id: 5, slug: 'zustand-is-cool',
    title: 'Zustand 为什么比 Redux 香',
    summary: '1KB、零 boilerplate、按需订阅——小项目用它准没错。',
    content: `# Zustand vs Redux

## 样板代码

Redux：action → reducer → dispatch → Provider → useSelector

Zustand：\`create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count+1 })) }))\`

## 按需订阅

\`useStore((s) => s.count)\` —— 只订阅 count 变化，别的字段变了不重渲染。

## persist 中间件

\`persist\` 自动把 store 写进 localStorage，刷新恢复。

一行配置解决持久化。`,
    category: '技术', tags: ['React', '状态管理'], author: '陈正杰',
    views: 22, likes: 7, likedBy: [],
    createdAt: '2026-10-08'
  },
  {
    id: 6, slug: 'pagination-basics',
    title: '前端分页怎么做才地道',
    summary: 'page、pageSize、totalPages 三个变量就够，别搞复杂。',
    content: `# 分页三件套

## 核心变量

- \`page\`：当前页（从 1 开始）
- \`pageSize\`：每页条数
- \`totalPages\`：总页数 = ceil(total / pageSize)

## 切片

\`\`\`js
const start = (page - 1) * pageSize
const list = all.slice(start, start + pageSize)
\`\`\`

## URL 状态

分页参数放 query string 里：\`?page=2&category=技术\`

好处：
- 可分享
- 刷新不丢状态
- 前进后退都支持`,
    category: '技术', tags: ['前端', '算法'], author: '陈正杰',
    views: 15, likes: 3, likedBy: [],
    createdAt: '2026-10-10'
  },
  {
    id: 7, slug: 'cloudflare-workers-deploy',
    title: 'Cloudflare Workers 部署 SPA 实战',
    summary: 'Vite 构建产物 + Wrangler + GitHub Actions，5 分钟搞定全球加速。',
    content: `# 部署 SPA 到 Cloudflare Workers

## 前提

- Wrangler v4
- Vite ≥ 6.0.0（不然报错）
- Workers 账户

## 一条命令

\`\`\`bash
npx wrangler deploy
\`\`\`

Workers 自动识别 Vite 项目，读取 \`dist/\` 目录。

## SPA 注意事项

需要在 \`wrangler.toml\` 里配置：

\`\`\`toml
routes = [
  { pattern = "/assets/*", target = "static" },
  { pattern = "/*", target = "static" }
]
\`\`\`

这样刷新子路由不会 404。`,
    category: '技术', tags: ['部署', 'Cloudflare'], author: '陈正杰',
    views: 19, likes: 5, likedBy: [],
    createdAt: '2026-10-12'
  }
]

export const ALL_CATEGORIES = ['全部', '技术', '随笔']
export const PAGE_SIZE = 5
