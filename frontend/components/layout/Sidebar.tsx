'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, FileEdit, Pencil, Tag } from 'lucide-react'

const links = [
  { href: '/posts', label: 'Posts', icon: <FileText size={18} /> },
  { href: '/drafts', label: 'Drafts', icon: <FileEdit size={18} /> },
  { href: '/posts/new', label: 'Write Post', icon: <Pencil size={18} /> },
  { href: '/tags', label: 'Tags', icon: <Tag size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 fixed left-0 h-[calc(100vh-64px)] bg-gray-100 p-4 border-r overflow-y-auto z-40">
      <nav className="flex flex-col gap-3">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 transition ${
              pathname === href ? 'bg-blue-200 text-blue-700 font-semibold' : 'text-gray-700'
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}