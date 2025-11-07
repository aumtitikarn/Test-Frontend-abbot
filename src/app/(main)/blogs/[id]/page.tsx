"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import BlogForm from "@/components/blog/BlogForm"
import type { Blog, BlogStatus } from "@/types/blog"
import rawBlogs from "@/data/blogs.json"

export default function BlogEditPage() {
  const { id } = useParams<{ id: string }>()
  const blogs = rawBlogs as Blog[]
  const blog = blogs.find((b: Blog) => b.id === id)

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-semibold text-primary">แก้ไข Blog</h1>
        <Link href="/blogs" className="text-sm text-gray-500 hover:underline">
          กลับไปหน้า Blogs
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4">
        {blog ? (
          <BlogForm
            key={id} // ให้ remount เมื่อ id เปลี่ยน
            mode="edit"
            initial={{
              title: blog.title,
              slug: blog.slug,
              status: blog.status as BlogStatus,
              excerpt: blog.excerpt ?? "",
              content: blog.content,
            }}
          />
        ) : (
          <div className="text-sm text-red-600">
            ไม่พบบล็อกที่ต้องการแก้ไข (id: {id})
          </div>
        )}
      </div>
    </>
  )
}
