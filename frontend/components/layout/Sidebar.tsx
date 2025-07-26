// app/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, FileEdit, Pencil, Tag, Book, Receipt, User, ShoppingCart, ReceiptText } from 'lucide-react';
import Chatbot from '../ChatBot';


const links = [
  { href: '/books', label: 'Books', icon: <Book size={18} /> },
  { href: '/receipts', label: 'Receipts', icon: <ReceiptText size={18} /> },
  { href: '/users', label: 'Users', icon: <User size={18} /> },
  { href: '/carts', label: 'Cart', icon: <ShoppingCart size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 fixed left-0 h-[calc(100vh-80px)] bg-gray-100 p-4 border-r overflow-y-auto z-40 flex flex-col">
      <nav className="flex flex-col gap-3 mb-4">
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

      <Chatbot />
    </aside>
  );
}
