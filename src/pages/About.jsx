export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">关于本站</h1>

      <div className="space-y-3 text-gray-700 leading-7">
        <p>这是一个使用 React + Vite + Tailwind CSS 搭建的博客实验项目（se3306 实验三）。</p>

        <h2 className="text-lg font-bold mt-6">技术栈</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>React 19 + Vite 6</li>
          <li>Tailwind CSS 3</li>
          <li>React Router v6</li>
          <li>Zustand 状态管理 + localStorage 持久化</li>
          <li>marked Markdown 渲染</li>
        </ul>

        <h2 className="text-lg font-bold mt-6">功能</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>首页分类筛选 + 搜索 + 分页（每页 5 条）</li>
          <li>文章详情（浏览量、点赞、评论、删除）</li>
          <li>登录 / 写文章（Markdown + 实时预览）</li>
          <li>所有数据持久化到浏览器 localStorage</li>
        </ul>

        <h2 className="text-lg font-bold mt-6">启动</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto"><code>npm install
npm run dev        # http://localhost:5174
npm run build      # 构建到 dist/
npx wrangler deploy  # Cloudflare Workers 部署</code></pre>
      </div>
    </div>
  )
}
