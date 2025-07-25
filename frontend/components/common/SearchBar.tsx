// app/components/SearchBar.tsx
export const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) => (
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Tìm sách theo tên, tác giả..."
    className="w-full border p-2 rounded-md shadow-sm"
  />
);
