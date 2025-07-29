export const sendMessageToAgent = async (message: string) => {
  const res = await fetch('http://127.0.0.1:8000/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })

  return await res.json() // { reply: string, books: Book[] }
}
