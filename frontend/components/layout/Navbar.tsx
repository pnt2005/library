'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useUser } from '@/contexts/UserContext'
import toast from 'react-hot-toast'

export default function Navbar() {
  const router = useRouter()
  const { user, setUser } = useUser()

  const handleLogout = () => {
    toast.success('Logout successful')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    setUser(null)
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 whitespace-nowrap">
          DevShare Lite
        </Link>

        {/* Avatar / Login */}
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 truncate max-w-[120px]">
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="text-sm truncate">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}