// app/components/Chatbot.tsx
'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
  ]);
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
    <div className="mt-6 bg-white border rounded-md p-3 h-80 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2 pr-1">
        {messages.slice(1).map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <p className={`p-2 rounded text-sm ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex mt-auto">
        <input
          className="flex-1 border p-1 text-sm rounded-l-md"
          placeholder="Nhập câu hỏi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-gray-500 text-white text-sm px-3 rounded-r-md"
          onClick={sendMessage}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
