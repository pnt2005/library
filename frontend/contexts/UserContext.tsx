'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { api } from '@/utils/api/api'

type User = {
  id: string
  username: string
  password: string
  role: 'ROLE_ADMIN' | 'ROLE_READER'
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const protectedRoutes = ['/profile', '/drafts', '/posts/new', '/me']

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      setUser(null)
      return
    }

    const needsAuth = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )
    if (!needsAuth) return

    api
      .get('/me')
      .then((res) => setUser(res.data as User))
      .catch(() => setUser(null))
  }, [pathname])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
