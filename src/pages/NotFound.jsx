import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-32">
      <div className="font-serif font-black text-[120px] leading-none text-ink-900/10 mb-4">404</div>
      <p className="text-ink-500 mb-8 tracking-wider">页面不存在</p>
      <Link to="/" className="underline underline-offset-4 text-sm tracking-wider">← 回到首页</Link>
    </div>
  )
}
