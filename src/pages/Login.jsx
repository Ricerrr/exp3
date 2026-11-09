import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBlogStore } from '../store/blogStore.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const login = useBlogStore((s) => s.login)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) { setErr('用户名密码不能为空'); return }
    login(username.trim())
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded">
        <div>
          <label className="block text-sm mb-1 text-gray-600">用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        {err && <p className="text-sm text-red-500">{err}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">登录</button>
        <p className="text-xs text-gray-400 text-center">演示模式，任意用户名密码即可 · <Link to="/" className="hover:underline">返回首页</Link></p>
      </form>
    </div>
  )
}
