import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogStore } from '../store/blogStore.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const login = useBlogStore((s) => s.login)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return
    login(username.trim())
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="font-serif font-black text-3xl mb-8 text-center tracking-tight">登录</h1>
      <form onSubmit={handleSubmit} className="space-y-6 border border-ink-300 p-10">
        <div>
          <label className="block text-xs tracking-wider uppercase text-ink-500 mb-2">用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b-2 border-ink-200 focus:border-ink-900 bg-transparent py-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-ink-500 mb-2">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-ink-200 focus:border-ink-900 bg-transparent py-2 focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-ink-900 text-ink-50 py-3 tracking-wider hover:opacity-90">
          登 录
        </button>
        <p className="text-xs text-center text-ink-400">
          演示模式，任意用户名密码即可
        </p>
      </form>
    </div>
  )
}
