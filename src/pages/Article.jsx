import { useParams, Link, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { ArrowLeft, Eye, Heart, MessageCircle, Trash2 } from 'lucide-react'
import { useBlogStore } from '../store/blogStore.js'
import { useEffect, useMemo, useState } from 'react'

marked.setOptions({ breaks: true, gfm: true })

export default function Article() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, articles, incrementViews, toggleLike, comments, addComment, deleteArticle } = useBlogStore()
  const [commentText, setCommentText] = useState('')

  const article = articles.find((a) => String(a.id) === id)
  const articleComments = comments[article?.id] || []

  // 首次访问 +1 浏览量
  useEffect(() => {
    if (article && !sessionStorage.getItem(`viewed-${article.id}`)) {
      incrementViews(article.id)
      sessionStorage.setItem(`viewed-${article.id}`, '1')
    }
  }, [article?.id])

  const html = useMemo(() => (article ? marked.parse(article.content) : ''), [article])

  if (!article) {
    return (
      <div className="text-center py-24">
        <p className="text-ink-500 mb-6">文章不存在或已被删除</p>
        <Link to="/" className="underline underline-offset-4">← 返回首页</Link>
      </div>
    )
  }

  const liked = article.likedBy?.includes(user?.username)

  const handleComment = () => {
    if (!commentText.trim()) return
    if (!user) { alert('请先登录再评论'); navigate('/login'); return }
    addComment(article.id, commentText.trim())
    setCommentText('')
  }

  const handleDelete = () => {
    if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) return
    deleteArticle(article.id)
    navigate('/', { replace: true })
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* 面包屑 */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-900 mb-8 tracking-wide">
        <ArrowLeft size={12} /> 返回索引
      </button>

      {/* 标题区 */}
      <header className="mb-10">
        <div className="text-xs tracking-[0.3em] uppercase text-ink-500 mb-4">
          {article.category} · {article.createdAt}
        </div>
        <h1 className="font-serif font-black text-4xl md:text-5xl leading-tight tracking-tight mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-ink-500 border-b border-ink-200 pb-6">
          <span className="font-medium">{article.author}</span>
          <span className="opacity-30">·</span>
          <span className="flex items-center gap-1"><Eye size={13} /> {article.views || 0} 阅读</span>
          <span className="opacity-30">·</span>
          {article.tags?.map((t) => (
            <span key={t} className="text-xs">#{t}</span>
          ))}
        </div>
      </header>

      {/* 正文 */}
      <div className="prose-editorial dark:text-ink-200" dangerouslySetInnerHTML={{ __html: html }} />

      {/* 互动栏 */}
      <div className="mt-12 pt-8 border-t border-ink-200 flex items-center justify-between">
        <button
          onClick={() => toggleLike(article.id)}
          className={`flex items-center gap-2 px-5 py-2 border text-sm tracking-wide transition ${
            liked ? 'border-ink-900 bg-ink-900 text-ink-50' : 'border-ink-300 hover:border-ink-900'
          }`}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} /> {article.likes || 0}
        </button>

        {user?.username === article.author && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-red-600"
          >
            <Trash2 size={13} /> 删除本文
          </button>
        )}

        <div className="flex items-center gap-1 text-ink-500 text-sm">
          <MessageCircle size={13} /> {articleComments.length} 评论
        </div>
      </div>

      {/* 评论区 */}
      <section className="mt-12">
        <h2 className="font-serif font-bold text-xl mb-6 border-b-2 border-ink-900 pb-2 inline-block">
          评 论
        </h2>

        {/* 发表 */}
        <div className="border border-ink-200 p-5 mb-8">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            placeholder={user ? '说点什么...' : '登录后才能参与评论'}
            className="w-full bg-transparent resize-none focus:outline-none text-base leading-relaxed placeholder:text-ink-300"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleComment}
              className="px-5 py-1.5 bg-ink-900 text-ink-50 text-sm tracking-wide hover:opacity-90"
            >发 表</button>
          </div>
        </div>

        {/* 列表 */}
        <ul className="space-y-4">
          {articleComments.length === 0 && (
            <li className="text-center text-ink-400 py-10 text-sm">还没有评论，来说两句吧</li>
          )}
          {articleComments.map((c) => (
            <li key={c.id} className="border-l-2 border-ink-900 pl-5 py-2">
              <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
                <span className="font-semibold text-ink-900">{c.username}</span>
                <span>{c.createdAt}</span>
              </div>
              <p className="text-ink-700 text-base">{c.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
