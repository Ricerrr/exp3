import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-gray-500 mb-4">页面不存在</p>
      <Link to="/" className="text-blue-600 hover:underline">← 回到首页</Link>
    </div>
  )
}
