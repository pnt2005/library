'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Book, User, ShoppingCart, ReceiptText } from 'lucide-react';
import Chatbot from '../ChatBot';
import { useCartStore } from '@/store/cartStore';
import { useUser } from '@/contexts/UserContext';
import toast from 'react-hot-toast';

const links = [
  { href: '/books', label: 'Books', icon: <Book size={18} /> },
  { href: '/receipts/borrow', label: 'Borrow Receipts', icon: <ReceiptText size={18} />, needAuth: true },
  { href: '/receipts/purchase', label: 'Purchase Receipts', icon: <ReceiptText size={18} />, needAuth: true },
  { href: '/users', label: 'Users', icon: <User size={18} /> },
  { href: '/cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleNav = (href: string, needAuth?: boolean) => {
    if (needAuth && !user) {
      toast.error("Need to login");
      return;
    }
    router.push(href);
  };

  return (
    <aside className="w-80 fixed left-0 h-[calc(100vh-80px)] bg-gray-100 p-4 border-r overflow-y-auto z-40 flex flex-col">
      <nav className="flex flex-col gap-3 mb-4">
        {links.map(({ href, label, icon, needAuth }) => {
          const isActive = pathname === href;
          const isCart = href === '/cart';
          return (
            <button
              key={href}
              onClick={() => handleNav(href, needAuth)}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 transition text-left ${
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
            </button>
          );
        })}
      </nav>
      <Chatbot />
    </aside>
  );
}
