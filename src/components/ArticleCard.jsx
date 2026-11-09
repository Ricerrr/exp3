import { Link } from 'react-router-dom'
import { Eye, Heart } from 'lucide-react'

export default function ArticleCard({ article }) {
  return (
    <li>
      <Link to={`/article/${article.id}`} className="text-blue-600 text-lg hover:underline">
        {article.title}
      </Link>
      <span className="text-gray-400 text-sm ml-4">{article.publishedAt}</span>
      <span className="text-gray-300 mx-2">|</span>
      <span className="text-gray-400 text-sm">{article.category}</span>
      <span className="text-gray-300 mx-2">|</span>
      <span className="text-gray-400 text-sm flex items-center gap-1 inline-flex align-middle">
        <Eye size={12} /> {article.views || 0}
      </span>
      <span className="text-gray-300 mx-2">|</span>
      <span className="text-gray-400 text-sm flex items-center gap-1 inline-flex align-middle">
        <Heart size={12} /> {article.likes || 0}
      </span>
    </li>
  )
}
