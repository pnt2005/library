'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ChatBox from './ChatBox'

export default function FLoatingButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-50">
  {/* Nút toggle */}
  <button
    onClick={() => setOpen(!open)}
    className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center shadow-lg hover:bg-gray-700 transition"
  >
    <MessageCircle size={22} />
  </button>

  {/* Khung chatbot */}
  <div
    className={`absolute bottom-16 left-0 w-80 h-96 bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden transition-transform duration-300 ${
      open
        ? 'translate-y-0 opacity-100'
        : 'translate-y-4 opacity-0 pointer-events-none'
    }`}
    style={{ transformOrigin: 'bottom left' }} // bung sang phải
  >
    {/* Header */}
    <div className="shrink-0 flex justify-between items-center p-2 bg-gray-600 text-white">
      <span className="font-semibold text-sm">Chatbot</span>
      <button
        onClick={() => setOpen(false)}
        className="px-2 py-1 text-xs rounded hover:bg-gray-500"
      >
        ✕
      </button>
    </div>

    {/* Nội dung Chatbot */}
    <div className="flex-1">
      <ChatBox />
    </div>
  </div>
</div>

  )
}
