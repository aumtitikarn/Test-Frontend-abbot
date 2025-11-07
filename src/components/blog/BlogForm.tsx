"use client"

import { useMemo, useState, FormEvent } from "react"
import Swal from "sweetalert2"
import type { BlogStatus } from "@/types/blog"
import { slugify } from "@/lib/utils"

type FormState = {
  title: string
  slug: string
  status: BlogStatus
  excerpt: string
  content: string
}

export default function BlogForm({
  mode,
  initial,
}: {
  mode: "create" | "edit"
  initial?: Partial<FormState>
}) {
  // ✅ ใช้ lazy initializer (รันครั้งเดียวตอน mount)
  const [form, setForm] = useState<FormState>(() => ({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    status: (initial?.status as BlogStatus) ?? "unpublic",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
  }))

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)



  function validate(f: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!f.title.trim()) e.title = "กรุณากรอก Title"
    if (!f.slug.trim()) e.slug = "กรุณากรอก Slug"
    if (!/^[a-z0-9-]+$/.test(slugify(f.slug))) e.slug = "Slug ต้องเป็นตัวพิมพ์เล็ก/ขีดกลางเท่านั้น"
    if (f.status !== "public" && f.status !== "unpublic") e.status = "สถานะไม่ถูกต้อง"
    if (!f.content.trim()) e.content = "กรุณากรอก Content"
    return e
  }

  function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!))
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const next = { ...form, slug: slugify(form.slug) }
    const e = validate(next)
    setErrors(e)
    if (Object.keys(e).length) {
      await Swal.fire({
        icon: "error",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณาตรวจสอบข้อมูลที่จำเป็น",
        confirmButtonColor: "#3C5791",
      })
      return
    }

    setSubmitting(true)
    await Swal.fire({
      icon: "success",
      title: mode === "create" ? "ตรวจสอบข้อมูลก่อนเพิ่ม" : "ตรวจสอบข้อมูลก่อนแก้ไข",
      html: `
        <div style="text-align:left">
          <div><b>Title:</b> ${escapeHtml(next.title)}</div>
          <div><b>Slug:</b> ${escapeHtml(next.slug)}</div>
          <div><b>Status:</b> ${escapeHtml(next.status)}</div>
          ${next.excerpt ? `<div><b>Excerpt:</b> ${escapeHtml(next.excerpt)}</div>` : ""}
          <div style="margin-top:8px"><b>Content:</b></div>
          <pre style="white-space:pre-wrap; background:#f6f6f6; padding:8px; border-radius:8px; max-height:240px; overflow:auto;">${escapeHtml(next.content)}</pre>
        </div>
      `,
      confirmButtonText: "รับทราบ",
      confirmButtonColor: "#3C5791",
    })
    setSubmitting(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Title *</label>
          <input
            className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
            value={form.title}
            onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))}
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Slug *</label>
          <input
            className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
            value={form.slug}
            onChange={(e) => setForm(s => ({ ...s, slug: e.target.value }))}
          />
          {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status *</label>
          <div className="flex gap-2">
            <select
              className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
              value={form.status}
              onChange={(e) => setForm(s => ({ ...s, status: e.target.value as BlogStatus }))}
            >
              <option value="unpublic">unpublic</option>
              <option value="public">public</option>
            </select>
          </div>
          {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Excerpt</label>
          <input
            className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
            value={form.excerpt}
            onChange={(e) => setForm(s => ({ ...s, excerpt: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Content *</label>
        <textarea
          rows={10}
          className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-primary/40"
          value={form.content}
          onChange={(e) => setForm(s => ({ ...s, content: e.target.value }))}
        />
        {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={submitting}
          className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-60 transition"
        >
          {submitting ? "กำลังบันทึก..." : "บันทึก"}
        </button>

        <button
          type="button"
          onClick={() =>
            setForm({ title: "", slug: "", status: "unpublic", excerpt: "", content: "" })
          }
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          ล้างฟอร์ม
        </button>

        <button
          type="button"
          onClick={() => history.back()}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  )
}
