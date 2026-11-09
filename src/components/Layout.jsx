import { Outlet, Link } from 'react-router-dom'
import { Moon, Sun, User, LogOut, Feather } from 'lucide-react'
import { useBlogStore } from '../store/blogStore.js'
import { useEffect } from 'react'

export default function Layout() {
  const { user, logout, dark, toggleTheme } = useBlogStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className={`min-h-screen flex flex-col ${dark ? 'dark bg-ink-950 text-ink-100' : ''}`}>
      {/* 报头 Masthead */}
      <header className={`border-b-2 ${dark ? 'border-ink-700 bg-ink-900' : 'border-ink-900 bg-ink-50'}`}>
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-ink-500 mb-3">Volume 01 · Issue 01</div>
          <Link to="/" className="block">
            <h1 className="font-serif font-black text-4xl md:text-6xl tracking-tight">
              编辑室
            </h1>
            <div className={`mt-2 text-sm tracking-[0.3em] ${dark ? 'text-ink-400' : 'text-ink-500'}`}>
              THE EDITORIAL
            </div>
          </Link>
        </div>

        {/* 导航条 */}
        <nav className={`border-t ${dark ? 'border-ink-800' : 'border-ink-200'}`}>
          <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm tracking-wide">
              <Link to="/" className={`font-medium ${dark ? 'hover:text-ink-200' : 'hover:text-ink-700'}`}>首页</Link>
              <Link to="/about" className={`font-medium ${dark ? 'hover:text-ink-200' : 'hover:text-ink-700'}`}>关于</Link>
              <Link to="/write" className="flex items-center gap-1.5 font-medium">
                <Feather size={14} /> 撰稿
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <button onClick={toggleTheme} className="hover:opacity-60" title="切换主题">
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {user.username}
                  </span>
                  <button onClick={logout} className="hover:opacity-60" title="退出">
                    <LogOut size={12} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="border px-3 py-0.5 rounded text-xs hover:opacity-60">
                  登录
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* 内容 */}
      <main className={`flex-1 max-w-4xl w-full mx-auto px-6 py-12 ${dark ? 'bg-ink-950' : 'bg-ink-50'}`}>
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className={`border-t ${dark ? 'border-ink-800 bg-ink-900' : 'border-ink-200 bg-ink-50'}`}>
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-xs tracking-[0.2em] text-ink-500">
          © 2026 编辑室 · The Editorial · Se3306 Lab 3
        </div>
      </footer>
    </div>
  )
}
