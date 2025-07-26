'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api/api'
import Cookies from 'js-cookie'
import { useUser } from '@/contexts/UserContext'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await api.post('/auth/login', { username, password })
      const { accessToken, refreshToken } = res.data

      Cookies.set('access_token', accessToken)
      Cookies.set('refresh_token', refreshToken, { expires: 30 })
      toast.success('Login successful')

      const response = await api.get('/auth/me')
      setUser(response.data)

      router.push('/')
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Login fail')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mt-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded-md mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don't have an account yet?{' '}
        <a href="/register" className="text-gray-600 hover:underline">
          Register
        </a>
      </p>
    </form>
  )
}
