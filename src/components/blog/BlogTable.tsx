"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useBlogs } from "./BlogProvider"
import type { BlogStatus } from "@/types/blog"
import Swal from "sweetalert2" // ✅ เพิ่ม SweetAlert2

export default function BlogTable() {
  const { blogs, remove, toggleStatus } = useBlogs()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"" | BlogStatus>("")

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return blogs.filter(b => {
      const matchText =
        !s ||
        [b.title, b.slug, b.excerpt ?? "", b.content].some(v =>
          v.toLowerCase().includes(s)
        )
      const matchStatus = !status || b.status === status
      return matchText && matchStatus
    })
  }, [blogs, search, status])

  // ✅ ฟังก์ชัน confirm ก่อนเปลี่ยนสถานะ
  async function handleChangeStatus(id: string, title: string, newStatus: BlogStatus) {
    const result = await Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ?",
      html: `คุณต้องการเปลี่ยนสถานะของ <b>${title}</b><br/>เป็น <b>${newStatus}</b> ใช่หรือไม่?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่, เปลี่ยนเลย",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3C5791",
      cancelButtonColor: "#d33",
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      toggleStatus(id)
      Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ!",
        text: `บล็อก "${title}" ถูกเปลี่ยนเป็น ${newStatus}`,
        confirmButtonColor: "#3C5791",
        timer: 1500,
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* ฟอร์มกรอง */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          placeholder="ค้นหา (title/slug/เนื้อหา)"
          className="w-full max-w-sm rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full max-w-[200px] rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
          value={status}
          onChange={e => setStatus(e.target.value as "" | BlogStatus)}
        >
          <option value="">สถานะทั้งหมด</option>
          <option value="public">public</option>
          <option value="unpublic">unpublic</option>
        </select>

        <div className="md:ml-auto">
          <Link
            href="/blogs/add"
            className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
          >
            + เพิ่ม Blog
          </Link>
        </div>
      </div>

      {/* ตาราง */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-primary/5 text-primary">
            <tr className="text-left">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Updated</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2">{b.title}</td>
                <td className="px-4 py-2 text-gray-500">{b.slug}</td>
                <td className="px-4 py-2">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      handleChangeStatus(b.id, b.title, e.target.value as BlogStatus)
                    }
                    className={`rounded-md border px-2 py-1 text-xs focus:ring-2 focus:ring-primary/40 ${
                      b.status === "public"
                        ? "border-green-500 text-green-700 bg-green-50"
                        : "border-gray-400 text-gray-600 bg-gray-50"
                    }`}
                  >
                    <option value="public">public</option>
                    <option value="unpublic">unpublic</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(b.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/blogs/${b.id}`}
                      className="rounded-lg border border-primary text-primary px-3 py-1.5 text-xs hover:bg-primary hover:text-white transition"
                    >
                      แก้ไข
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`ลบ "${b.title}" ?`)) remove(b.id)
                      }}
                      className="rounded-lg border border-red-500 text-red-500 px-3 py-1.5 text-xs hover:bg-red-500 hover:text-white transition"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
