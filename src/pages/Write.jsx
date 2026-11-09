import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { Eye, EyeOff } from 'lucide-react'
import { useBlogStore } from '../store/blogStore.js'

marked.setOptions({ breaks: true, gfm: true })

const CATEGORIES = ['技术', '随笔']

export default function Write() {
  const user = useBlogStore((s) => s.user)
  const addArticle = useBlogStore((s) => s.addArticle)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('技术')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('# 开始你的文章\n\n支持 **Markdown** 格式')
  const [preview, setPreview] = useState(false)

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-500 mb-6">请先登录再撰稿</p>
        <button onClick={() => navigate('/login')} className="border border-ink-900 px-6 py-2 tracking-wider hover:bg-ink-900 hover:text-ink-50">
          去登录
        </button>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) { alert('标题和内容不能为空'); return }
    addArticle({
      title: title.trim(),
      summary: summary.trim() || content.trim().slice(0, 60) + '...',
      content,
      category,
      tags: tags.split(/[,，\s]+/).filter(Boolean),
      author: user.username
    })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-serif font-black text-3xl tracking-tight border-b-2 border-ink-900 pb-3">
        撰 稿
      </h1>

      <div className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="标题"
          className="w-full font-serif font-bold text-3xl bg-transparent border-b-2 border-ink-200 focus:border-ink-900 py-3 focus:outline-none tracking-tight"
        />
        <div className="grid grid-cols-2 gap-6">
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="摘要（可选）"
            className="w-full border-b border-ink-300 focus:border-ink-900 bg-transparent py-2 focus:outline-none text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-b border-ink-300 focus:border-ink-900 bg-transparent py-2 focus:outline-none text-sm"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="标签，逗号分隔"
          className="w-full border-b border-ink-300 focus:border-ink-900 bg-transparent py-2 focus:outline-none text-sm"
        />
      </div>

      {/* 编辑器 */}
      <div className="border border-ink-300">
        <div className="flex items-center justify-between px-4 py-2 border-b border-ink-300 bg-ink-100 text-xs tracking-wider">
          <span>MARKDOWN</span>
          <button type="button" onClick={() => setPreview(!preview)} className="flex items-center gap-1 hover:opacity-60">
            {preview ? <EyeOff size={13} /> : <Eye size={13} />} {preview ? '编辑' : '预览'}
          </button>
        </div>
        {preview ? (
          <div className="prose-editorial p-6 min-h-[300px]" dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-7"
          />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-ink-300 hover:border-ink-900 text-sm tracking-wider">
          取 消
        </button>
        <button type="submit" className="px-8 py-2 bg-ink-900 text-ink-50 text-sm tracking-wider hover:opacity-90">
          发 布
        </button>
      </div>
    </form>
  )
}
