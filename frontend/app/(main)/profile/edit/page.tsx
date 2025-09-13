"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { api } from "@/utils/api/api";
import toast from "react-hot-toast";

type Reader = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday: string;
};

export default function EditProfilePage() {
  const {user} = useUser();    
  const router = useRouter();
  const searchParams = useSearchParams();

  const [reader, setReader] = useState<Reader | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const targetId = searchParams.get("id") || user?.id; // nếu admin có id thì lấy, nếu không thì lấy id của user hiện tại

  useEffect(() => {
    if (!targetId) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get<Reader>(`/readers/${targetId}`);
        setReader(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Can not load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!reader) return;
    const { name, value } = e.target;
    setReader({ ...reader, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reader) return;
    setSaving(true);
    try {
      await api.put(`/readers/${reader.id}`, reader);
      toast.success("Update profile successfully!");
      router.push(`/profile?id=${reader.id}`);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Update profile failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!reader) return <p className="p-6">No profile found.</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="username"
              value={reader.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={reader.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={reader.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={reader.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={reader.birthday}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.push(`/profile?id=${reader.id}`)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
