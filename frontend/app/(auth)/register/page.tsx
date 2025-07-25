'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main>
        <div className="mb-6 text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            DevShare Lite
          </Link>
        </div>
        <RegisterForm />
    </main>
  )
}