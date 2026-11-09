import { useParams, Link, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { Eye, Heart, MessageCircle, Trash2 } from 'lucide-react'
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

  useEffect(() => {
    if (article && !sessionStorage.getItem(`viewed-${article.id}`)) {
      incrementViews(article.id)
      sessionStorage.setItem(`viewed-${article.id}`, '1')
    }
  }, [article?.id])

  const html = useMemo(() => (article ? marked.parse(article.content) : ''), [article])

  if (!article) {
    return <p>文章不存在</p>
  }

  const liked = article.likedBy?.includes(user?.username)

  const handleComment = () => {
    if (!commentText.trim()) return
    if (!user) { alert('请先登录再评论'); navigate('/login'); return }
    addComment(article.id, commentText.trim())
    setCommentText('')
  }

  const handleDelete = () => {
    if (!confirm('确定要删除这篇文章吗？')) return
    deleteArticle(article.id)
    navigate('/', { replace: true })
  }

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>

      {/* 时间、分类、阅读量 */}
      <div className="text-gray-500 text-sm flex items-center border-b pb-4">
        <span>{article.publishedAt} | 分类：{article.category}</span>
        <span className="ml-4 flex items-center gap-1">
          <Eye size={13} /> {article.views || 0} 阅读
        </span>
      </div>

      {/* 正文 */}
      <div className="prose-blog mt-4" dangerouslySetInnerHTML={{ __html: html }} />

      {/* 点赞 */}
      <button
        onClick={() => toggleLike(article.id)}
        className={`flex items-center gap-2 mt-4 px-4 py-2 rounded ${
          liked ? 'bg-pink-100 text-pink-600 border border-pink-200' : 'border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> 点赞 {article.likes || 0}
      </button>

      {/* 评论区 */}
      <div className="pt-8 mt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4">评论 ({articleComments.length})</h3>

        <ul className="space-y-3 mb-6">
          {articleComments.length === 0 && (
            <p className="text-gray-400 text-sm">还没有评论，来说两句吧。</p>
          )}
          {articleComments.map((c) => (
            <li key={c.id} className="bg-gray-50 p-3 rounded border border-gray-100">
              <div className="text-sm font-bold text-blue-600">
                {c.username}
                <span className="text-gray-400 font-normal ml-2">{c.createdAt}</span>
              </div>
              <p className="mt-1 text-gray-800">{c.content}</p>
            </li>
          ))}
        </ul>

        {/* 发表评论 */}
        <div className="space-y-2 max-w-md">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={user ? '写下你的评论...' : '登录后才能评论'}
            rows={3}
            className="border p-2 w-full rounded h-20"
          />
          <button
            onClick={handleComment}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700"
          >发表评论</button>
        </div>
      </div>

      {/* 删除按钮 */}
      {user?.username === article.author && (
        <div className="pt-8 mt-8 border-t border-red-100">
          <button onClick={handleDelete} className="flex items-center gap-1 text-red-600 cursor-pointer hover:underline text-sm">
            <Trash2 size={13} /> 删除本文
          </button>
        </div>
      )}

      <div className="pt-4">
        <Link to="/" className="text-blue-600 text-sm hover:underline">← 返回首页</Link>
      </div>
    </article>
  )
}
