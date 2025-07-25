// app/components/BookCard.tsx
export const BookCard = ({ book }: { book: any }) => (
  <div className="bg-white shadow-md rounded-2xl p-4">
    <h2 className="text-xl font-semibold">{book.title}</h2>
    <p className="text-sm text-gray-600">{book.author}</p>
    <p className="text-sm mt-2">{book.description}</p>
    <p className="mt-2 text-xs text-gray-500">ISBN: {book.isbn}</p>
  </div>
);
