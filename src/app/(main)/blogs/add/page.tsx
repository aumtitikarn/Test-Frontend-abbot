"use client"

import Link from "next/link"
import BlogFormLocal from "@/components/blog/BlogForm"

export default function BlogCreatePage() {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-semibold text-primary">เพิ่ม Blog</h1>
        <Link href="/blogs" className="text-sm text-gray-500 hover:underline">
          กลับไปหน้า Blogs
        </Link>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <BlogFormLocal mode="create" />
      </div>
    </>
  )
}
