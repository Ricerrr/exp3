export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-serif font-black text-4xl md:text-5xl tracking-tight mb-8 border-b-2 border-ink-900 pb-4">
        关于本刊
      </h1>

      <div className="prose-editorial text-ink-800">
        <p><strong>编辑室 · The Editorial</strong> 是一个极简风格的博客实验项目，全栈纯前端实现。</p>

        <h2>技术栈</h2>
        <ul>
          <li>Vite 6 + React 19</li>
          <li>Tailwind CSS 3（编辑风配色：黑白灰）</li>
          <li>React Router v6 客户端路由</li>
          <li>Zustand + persist 状态管理（localStorage 持久化）</li>
          <li>marked Markdown 渲染</li>
          <li>Cloudflare Workers 部署</li>
        </ul>

        <h2>功能</h2>
        <ul>
          <li>首页分类筛选 + 搜索 + 分页（每页 5 条）</li>
          <li>文章详情页（浏览量、点赞、评论、删除）</li>
          <li>登录 / 撰稿（Markdown + 实时预览）</li>
          <li>深色模式切换</li>
          <li>数据持久化：所有增删改存于浏览器 localStorage</li>
        </ul>

        <h2>运行</h2>
        <pre><code>npm install
npm run dev        # 开发 → http://localhost:5174
npm run build      # 构建 → dist/
npx wrangler deploy  # 部署到 Cloudflare Workers</code></pre>

        <h2>设计理念</h2>
        <p>
          参考传统报刊和杂志的排版：衬线字体做大标题、无衬线做正文、大量留白、细线分割、
          首行缩进、黑白灰配色。约束即风格。
        </p>
      </div>
    </div>
  )
}
