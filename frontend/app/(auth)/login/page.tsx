'use client'

import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main>
        <div className="mb-6 text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            DevShare Lite
          </Link>
        </div>
        <LoginForm />
    </main>
  )
}