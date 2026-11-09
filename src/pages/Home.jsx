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
      const matchKw = !keyword || a.title.includes(keyword) || a.summary.includes(keyword)
      return matchCat && matchKw
    })
  }, [articles, category, keyword])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const pageArticles = filtered.slice(start, start + PAGE_SIZE)

  const handleSearch = () => setPage(1)

  return (
    <div>
      {/* 分类标签栏 */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        {ALL_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setPage(1) }}
            className={`px-4 py-1.5 text-sm tracking-wider border ${
              category === c
                ? 'bg-ink-900 text-ink-50 border-ink-900'
                : 'border-ink-300 text-ink-600 hover:border-ink-900'
            }`}
          >
            {c}
          </button>
        ))}
        <div className="flex-1" />
        {/* 搜索框 */}
        <div className="flex items-center gap-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="搜索标题..."
            className="border-b border-ink-300 bg-transparent focus:outline-none focus:border-ink-900 px-2 py-1 text-sm w-40"
          />
        </div>
      </div>

      {/* 文章列表 */}
      <div className="space-y-12">
        {pageArticles.length === 0 ? (
          <p className="text-center text-ink-400 py-20">没有找到相关文章</p>
        ) : (
          pageArticles.map((a, i) => (
            <div key={a.id}>
              <ArticleCard article={a} rank={start + i + 1} />
              {i < pageArticles.length - 1 && (
                <hr className="mt-12 border-ink-200" />
              )}
            </div>
          ))
        )}
      </div>

      {/* 分页 */}
      {filtered.length > PAGE_SIZE && (
        <div className="mt-16 flex items-center justify-center gap-8 text-sm border-t border-ink-200 pt-8">
          <button
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="hover:underline disabled:opacity-30 disabled:no-underline"
          >← 上一页</button>

          <span className="text-ink-500 tracking-wider">
            第 <span className="text-ink-900 font-bold">{currentPage}</span> / {totalPages} 页
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="hover:underline disabled:opacity-30 disabled:no-underline"
          >下一页 →</button>
        </div>
      )}

      {/* 统计 */}
      <div className="mt-8 text-center text-xs text-ink-400 tracking-wider">
        共 {filtered.length} 篇文章
      </div>
    </div>
  )
}
