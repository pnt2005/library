'use client'

import { useEffect, useRef, useState } from 'react'
import { sendMessageToAgent } from '@/utils/api/agent'
import { useBookStore } from '@/store/bookStore'
import { useRouter } from 'next/navigation'

export default function ChatBox() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const setBooks = useBookStore((s) => s.setBooks)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [...prev, `🧑‍💬: ${input}`])

    const res = await sendMessageToAgent(input)
    setInput('')
    setMessages((prev) => [...prev, `🤖: ${res.response}`])

    if (res.books?.length === 1) {
      router.push(`/books/${res.books[0].id}`)
    } else {
      setBooks(res.books || [])
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-1 rounded bg-gray-100 text-sm">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input dính dưới */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 flex border-t p-2 bg-white"
      >
        <input
          className="flex-1 border p-1 text-sm rounded-l-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-500 text-white text-sm px-3 rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  )
}
