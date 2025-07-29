'use client'
import { useState } from 'react'
import { sendMessageToAgent } from '@/utils/api/agent'
import { useBookStore } from '@/store/bookStore'

export default function ChatBox() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const setBooks = useBookStore((s) => s.setBooks)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [...prev, `🧑‍💬: ${input}`])

    const res = await sendMessageToAgent(input)
    setMessages((prev) => [...prev, `🤖: ${res.response}`])
    setBooks(res.books || [])
    setInput('')
  }

  return (
    <div className="mt-6 bg-white border rounded-md p-3 h-80 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2 pr-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-auto">
        <input
          className="flex-1 border p-1 text-sm rounded-l-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-gray-500 text-white text-sm px-3 rounded-r-md">
          Send
        </button>
      </form>
    </div>
  )
}
