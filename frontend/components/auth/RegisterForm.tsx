'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api/api'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState<{ [key: string]: string[] }>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.post('/auth/register', {
        email,
        password,
        username,
        birthday,
        phonenumber,
        address,
      })
      toast.success('Register successful')
      router.push('/login')
    } catch (err: any) {
      const data = err.response?.data
      if (typeof data === 'object') {
        setError(data)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error.error && <p className="text-red-500">{error.error}</p>}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mt-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {error.name && <p className="text-red-500">{error.name[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded-md mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error.email && <p className="text-red-500">{error.email[0]}</p>}
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
        {error.password && <p className="text-red-500">{error.password[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Birthday</label>
        <input
          type="date"
          className="w-full border p-2 rounded-md mt-1"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        {error.birthday && <p className="text-red-500">{error.birthday[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          className="w-full border p-2 rounded-md mt-1"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
        {error.phonenumber && <p className="text-red-500">{error.phonenumber[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mt-1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {error.address && <p className="text-red-500">{error.address[0]}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
      >
        Register
      </button>

      <p className="text-sm text-center">
        Already had account?{' '}
        <a href="/login" className="text-gray-600 hover:underline">
          Login
        </a>
      </p>
    </form>
  )
}
