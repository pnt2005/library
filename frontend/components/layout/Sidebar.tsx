// app/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, User, ShoppingCart, ReceiptText } from 'lucide-react';
import Chatbot from '../ChatBot';
import { useCartStore } from '@/store/cartStore';

const links = [
  { href: '/books', label: 'Books', icon: <Book size={18} /> },
  { href: '/receipts', label: 'Receipts', icon: <ReceiptText size={18} /> },
  { href: '/users', label: 'Users', icon: <User size={18} /> },
  { href: '/cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
];

export default function Sidebar() {
    const pathname = usePathname();
    const cartCount = useCartStore((state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0)
    )

  return (
    <aside className="w-80 fixed left-0 h-[calc(100vh-80px)] bg-gray-100 p-4 border-r overflow-y-auto z-40 flex flex-col">
      <nav className="flex flex-col gap-3 mb-4">
        {links.map(({ href, label, icon }) => {
          const isActive = pathname === href
          const isCart = href === '/cart'
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 transition ${
                isActive ? 'bg-blue-200 text-blue-700 font-semibold' : 'text-gray-700'
              }`}
            >
              {icon}
              {label}
              {isCart && cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <Chatbot />
    </aside>
  );
}
