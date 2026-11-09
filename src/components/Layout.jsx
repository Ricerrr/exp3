import { Outlet, Link } from 'react-router-dom'
import { useBlogStore } from '../store/blogStore.js'
import { useEffect } from 'react'

export default function Layout() {
  const { user, logout, dark, toggleTheme } = useBlogStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 — 和参考仓库一样的灰色导航 */}
      <nav className="p-4 border-b flex gap-4 bg-gray-50">
        <Link to="/" className="font-bold text-blue-600 hover:underline">首页</Link>
        <Link to="/about" className="font-bold text-blue-600 hover:underline">关于</Link>
        <Link to="/write" className="font-bold text-blue-600 hover:underline">写文章</Link>

        <div className="flex-1" />

        <button onClick={toggleTheme} className="text-sm text-gray-500 hover:text-blue-600">
          {dark ? '☀️' : '🌙'}
        </button>

        {user ? (
          <>
            <span className="text-sm text-gray-600">{user.username}</span>
            <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500">退出</button>
          </>
        ) : (
          <Link to="/login" className="font-bold text-blue-600 hover:underline">登录</Link>
        )}
      </nav>

      {/* 主内容区 */}
      <main className="max-w-2xl mx-auto p-4 flex-grow w-full">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="text-center p-4 text-sm text-gray-500 border-t">
        © 2026 我的博客
      </footer>
    </div>
  )
}
