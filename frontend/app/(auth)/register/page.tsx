'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main>
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-black-600">
            Library
          </Link>
        </div>
        <RegisterForm />
    </main>
  )
}