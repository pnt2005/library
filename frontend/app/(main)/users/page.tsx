"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api/api";

type Reader = {
  id: string;
  username: string;
  email: string;
  birthday: string;
  phoneNumber: string;
  address: string;
};

export default function ReaderListPage() {
  const router = useRouter();
  const [readers, setReaders] = useState<Reader[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const res = await api.get<Reader[]>("/readers");
        setReaders(res.data);
      } catch (err) {
        console.error("Error fetching readers:", err);
      }
    };
    fetchReaders();
  }, []);

  const filteredReaders = readers.filter((r) =>
    r.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="p-6 max-w-6xl mx-auto">

      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-center border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Birthday</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredReaders.map((reader) => (
              <tr
                key={reader.id}
                onClick={() => router.push(`/profile?id=${reader.id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2 border">{reader.id}</td>
                <td className="px-4 py-2 border">{reader.username}</td>
                <td className="px-4 py-2 border">{reader.email}</td>
                <td className="px-4 py-2 border">{reader.birthday}</td>
                <td className="px-4 py-2 border">{reader.phoneNumber}</td>
                <td className="px-4 py-2 border">{reader.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
