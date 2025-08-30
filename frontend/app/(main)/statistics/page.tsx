"use client"
import { useEffect, useState } from "react"
import { api } from "@/utils/api/api"
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function StatisticsDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [purchaseData, setPurchaseData] = useState<any[]>([])
  const [borrowData, setBorrowData] = useState<any[]>([])

  useEffect(() => {
    api.get("/statistics").then(res => setStats(res.data))
    api.get("/statistics/purchase").then(res => setPurchaseData(res.data))
    api.get("/statistics/borrow").then(res => setBorrowData(res.data))
  }, [])

  if (!stats) return <p>Loading...</p>

  return (
    <div className="p-4 space-y-6">
      {/* Tổng quan số liệu */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold">Total Books</h3>
          <p className="text-2xl">{stats.totalBooks}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold">Borrow Receipts</h3>
          <p className="text-2xl">{stats.totalBorrowReceipts}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold">Purchase Receipts</h3>
          <p className="text-2xl">{stats.totalPurchaseReceipts}</p>
        </div>
      </div>

      {/* Biểu đồ Purchase */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-2">Purchase Receipts per Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={purchaseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Receipts" />
            <Line yAxisId="right" type="monotone" dataKey="totalPrice" stroke="#82ca9d" strokeWidth={2} name="Total Price" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ Borrow */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-2">Borrow Receipts per Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={borrowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#ffc658" name="Receipts" />
            <Line yAxisId="right" type="monotone" dataKey="totalPrice" stroke="#ff7300" strokeWidth={2} name="Total Price" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
