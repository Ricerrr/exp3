import { Link } from 'react-router-dom'
import { Eye, Heart } from 'lucide-react'

export default function ArticleCard({ article, rank }) {
  return (
    <article className="group">
      {/* 序号 */}
      {rank !== undefined && (
        <div className="font-serif font-black text-6xl text-ink-900/10 leading-none mb-2">
          {String(rank).padStart(2, '0')}
        </div>
      )}

      <Link to={`/article/${article.id}`}>
        <h2 className="font-serif font-bold text-2xl md:text-3xl leading-snug mb-3 group-hover:underline decoration-2 underline-offset-4">
          {article.title}
        </h2>
      </Link>

      <p className="text-ink-600 text-base leading-relaxed mb-4 line-clamp-2">
        {article.summary}
      </p>

      {/* 元信息线 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500 tracking-wide">
        <span className="font-medium uppercase">{article.category}</span>
        <span className="opacity-30">·</span>
        <span>{article.author}</span>
        <span className="opacity-30">·</span>
        <span>{article.createdAt}</span>
        <span className="opacity-30">·</span>
        <span className="flex items-center gap-1"><Eye size={12} /> {article.views || 0}</span>
        <span className="opacity-30">·</span>
        <span className="flex items-center gap-1"><Heart size={12} /> {article.likes || 0}</span>
      </div>

      {/* 标签 */}
      {article.tags?.length > 0 && (
        <div className="mt-3 flex gap-2 text-xs">
          {article.tags.map((t) => (
            <span key={t} className="text-ink-400">#{t}</span>
          ))}
        </div>
      )}
    </article>
  )
}
