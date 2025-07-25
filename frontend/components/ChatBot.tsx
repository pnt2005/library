// app/components/Chatbot.tsx
'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Xin chào! Tôi có thể giúp gì cho bạn?' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl w-80 p-4">
      <div className="h-64 overflow-y-auto mb-2">
        {messages.slice(1).map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <p className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l-md"
          placeholder="Nhập câu hỏi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="bg-blue-500 text-white px-4 rounded-r-md" onClick={sendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
}
