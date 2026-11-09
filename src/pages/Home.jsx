import { useMemo, useState } from 'react'
import { useBlogStore } from '../store/blogStore.js'
import ArticleCard from '../components/ArticleCard.jsx'
import { ALL_CATEGORIES, PAGE_SIZE } from '../data/mock.js'

export default function Home() {
  const articles = useBlogStore((s) => s.articles)
  const [category, setCategory] = useState('全部')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = category === '全部' || a.category === category
      const matchKw = !keyword || a.title.includes(keyword)
      return matchCat && matchKw
    })
  }, [articles, category, keyword])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const pageArticles = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">我的博客</h1>

      {/* 分类标签栏 */}
      <div className="flex gap-2 mb-4">
        {ALL_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setPage(1) }}
            className={`px-3 py-1 rounded border cursor-pointer ${
              category === c ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >{c}</button>
        ))}
      </div>

      {/* 搜索框 */}
      <form
        onSubmit={(e) => { e.preventDefault(); setPage(1) }}
        className="mb-6 flex gap-2"
      >
        <input
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索文章标题..."
          className="border p-2 rounded w-64"
        />
        <input type="hidden" name="category" value={category} />
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer">搜索</button>
      </form>

      {/* 文章列表 */}
      <ul className="space-y-3 min-h-[300px]">
        {pageArticles.length === 0 && <p className="text-gray-500">没有找到相关文章。</p>}
        {pageArticles.map((a) => <ArticleCard key={a.id} article={a} />)}
      </ul>

      {/* 分页 */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex gap-2 mt-6 items-center">
          {currentPage > 1 && (
            <button onClick={() => setPage(currentPage - 1)} className="border px-3 py-1 rounded">上一页</button>
          )}
          <span className="px-3 py-1 text-gray-600">第 {currentPage} / {totalPages} 页</span>
          {currentPage < totalPages && (
            <button onClick={() => setPage(currentPage + 1)} className="border px-3 py-1 rounded">下一页</button>
          )}
        </div>
      )}
    </div>
  )
}
