import BarSpark from "@/components/charts/BarSpark"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* หัวข้อ */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40">
            <option>7 วันล่าสุด</option>
            <option>30 วันล่าสุด</option>
            <option>ปีนี้</option>
          </select>
        </div>
      </div>

      {/* KPI เล็ก ๆ */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-xs text-gray-500">ผู้ใช้ใหม่</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">1,284</p>
          <p className="mt-2 text-xs text-green-700">+8.2% vs ที่แล้ว</p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-xs text-gray-500">ยอดเข้าชม</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">12,930</p>
          <p className="mt-2 text-xs text-green-700">+3.5% vs ที่แล้ว</p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-xs text-gray-500">Conversion</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">2.9%</p>
          <p className="mt-2 text-xs text-red-700">-0.4% vs ที่แล้ว</p>
        </div>
      </div>

      {/* การ์ดกราฟ */}
      <div className="grid gap-4 md:grid-cols-2">
        <BarSpark title="ยอดเข้าใช้งานต่อวัน" />
        <BarSpark
          title="การสร้างบล็อกต่อวัน"
          data={[12, 26, 18, 34, 20, 22, 15]}
          labels={["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."]}
        />
      </div>
    </div>
  )
}
