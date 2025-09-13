"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/api/api";
import { useUser } from "@/contexts/UserContext";
import toast from "react-hot-toast";
import { User, Mail, Phone, Home, Calendar } from "lucide-react";

type Reader = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday: string;
};

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [reader, setReader] = useState<Reader | null>(null);
  const [loading, setLoading] = useState(true);

  const targetId = searchParams.get("id") || user?.id; // nếu admin có id thì lấy, nếu không thì lấy id của user hiện tại

  useEffect(() => {
    if (!targetId) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get<Reader>(`/readers/${targetId}`);
        setReader(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Could not load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetId]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!reader) return <p className="p-6 text-center">No profile found.</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">

        <div className="space-y-5 text-lg">
          <p className="flex items-center gap-4">
            <User className="w-6 h-6 text-gray-600" />
            <span><span className="font-semibold">Name:</span> {reader.username}</span>
          </p>
          <p className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-gray-600" />
            <span><span className="font-semibold">Email:</span> {reader.email}</span>
          </p>
          <p className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-gray-600" />
            <span><span className="font-semibold">Phone:</span> {reader.phoneNumber}</span>
          </p>
          <p className="flex items-center gap-4">
            <Home className="w-6 h-6 text-gray-600" />
            <span><span className="font-semibold">Address:</span> {reader.address}</span>
          </p>
          <p className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-gray-600" />
            <span><span className="font-semibold">Birthday:</span> {reader.birthday}</span>
          </p>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => router.push(`/profile/edit?id=${reader.id}`)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl text-lg font-medium shadow-md transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
}
