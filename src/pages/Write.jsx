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
        <p className="text-gray-500 mb-4">请先登录再写文章</p>
        <button onClick={() => navigate('/login')} className="border px-4 py-2 rounded hover:bg-gray-50">去登录</button>
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">写新文章</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="文章标题"
        className="w-full border p-2 rounded text-lg font-semibold"
      />
      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="摘要（可选）"
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="标签（逗号分隔）"
          className="flex-1 border p-2 rounded"
        />
      </div>

      {/* 编辑器 */}
      <div className="border rounded overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-b text-sm">
          <span className="text-gray-500">Markdown 编辑器</span>
          <button type="button" onClick={() => setPreview(!preview)} className="flex items-center gap-1 text-blue-600 hover:underline">
            {preview ? <EyeOff size={13} /> : <Eye size={13} />} {preview ? '编辑' : '预览'}
          </button>
        </div>
        {preview ? (
          <div className="prose-blog p-4 min-h-[300px]" dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full p-4 resize-none focus:outline-none font-mono text-sm"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded hover:bg-gray-50">取消</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">发布文章</button>
      </div>
    </form>
  )
}
