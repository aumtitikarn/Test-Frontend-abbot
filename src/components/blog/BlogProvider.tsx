"use client"

import { createContext, useContext, useMemo, useCallback, useState } from "react"
import type { Blog, BlogStatus } from "@/types/blog"
import initialJsonRaw from "@/data/blogs.json"
import { loadBlogsFromStorage, saveBlogsToStorage, slugify } from "@/lib/utils"

type BlogCtx = {
  blogs: Blog[]
  add: (payload: Omit<Blog, "id" | "createdAt" | "updatedAt">) => { ok: true } | { ok: false; message: string }
  update: (id: string, payload: Omit<Blog, "id" | "createdAt" | "updatedAt">) => { ok: true } | { ok: false; message: string }
  remove: (id: string) => void
  toggleStatus: (id: string) => void
  findById: (id: string) => Blog | undefined
}

const BlogContext = createContext<BlogCtx | null>(null)

// ทำให้ Type ของ JSON ชัด
const initialJson = initialJsonRaw as unknown as Blog[]

export function BlogProvider({ children }: { children: React.ReactNode }) {
  // ใช้ lazy initializer แทน useEffect เพื่อหลีกเลี่ยง setState ใน effect
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    // ฝั่ง SSR/Pre-render: ไม่แตะ window
    if (typeof window === "undefined") return initialJson
    const loaded = loadBlogsFromStorage<Blog[]>(initialJson)
    if (!localStorage.getItem("blogs")) {
      saveBlogsToStorage(loaded) // seed ครั้งแรก
    }
    return loaded
  })

  // persist เมื่อ blogs เปลี่ยน (ทำใน setter ทุกรอบ)
  const persist = useCallback((next: Blog[] | ((prev: Blog[]) => Blog[])) => {
    setBlogs(prev => {
      const resolved = typeof next === "function" ? (next as (p: Blog[]) => Blog[])(prev) : next
      // persist หลังคำนวณเสร็จ
      if (typeof window !== "undefined") saveBlogsToStorage(resolved)
      return resolved
    })
  }, [])

  const validateBase = useCallback((payload: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    if (!payload.title?.trim()) return "กรุณากรอก Title"
    if (!payload.slug?.trim()) return "กรุณากรอก Slug"
    if (!payload.content?.trim()) return "กรุณากรอก Content"
    if (!["public", "unpublic"].includes(payload.status)) return "สถานะไม่ถูกต้อง"
    return null
  }, [])

  const add = useCallback<BlogCtx["add"]>((payload) => {
    const err = validateBase(payload)
    if (err) return { ok: false as const, message: err }

    const desiredSlug = slugify(payload.slug)
    // ใช้ blogs ปัจจุบันตรวจ slug ซ้ำ
    if (blogs.some(b => b.slug === desiredSlug)) {
      return { ok: false as const, message: "Slug นี้ถูกใช้งานแล้ว" }
    }

    const now = new Date().toISOString()
    const record: Blog = {
      id: (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)),
      title: payload.title.trim(),
      slug: desiredSlug,
      status: payload.status,
      excerpt: payload.excerpt?.trim(),
      content: payload.content.trim(),
      createdAt: now,
      updatedAt: now,
    }
    persist(prev => [record, ...prev])
    return { ok: true as const }
  }, [blogs, persist, validateBase])

  const update = useCallback<BlogCtx["update"]>((id, payload) => {
    const err = validateBase(payload)
    if (err) return { ok: false as const, message: err }

    const desiredSlug = slugify(payload.slug)
    if (blogs.some(b => b.slug === desiredSlug && b.id !== id)) {
      return { ok: false as const, message: "Slug นี้ถูกใช้งานแล้ว" }
    }

    const now = new Date().toISOString()
    persist(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              ...payload,
              slug: desiredSlug,
              title: payload.title.trim(),
              excerpt: payload.excerpt?.trim(),
              content: payload.content.trim(),
              updatedAt: now,
            }
          : b
      )
    )
    return { ok: true as const }
  }, [blogs, persist, validateBase])

  const remove = useCallback<BlogCtx["remove"]>((id) => {
    persist(prev => prev.filter(b => b.id !== id))
  }, [persist])

  const toggleStatus = useCallback<BlogCtx["toggleStatus"]>((id) => {
    persist(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, status: (b.status === "public" ? "unpublic" : "public") as BlogStatus, updatedAt: new Date().toISOString() }
          : b
      )
    )
  }, [persist])

  const findById = useCallback<BlogCtx["findById"]>((id) => {
    return blogs.find(b => b.id === id)
  }, [blogs])

  // ใส่ deps ให้ครบทุกฟังก์ชัน เพื่อให้ React Compiler happy
  const value = useMemo<BlogCtx>(
    () => ({ blogs, add, update, remove, toggleStatus, findById }),
    [blogs, add, update, remove, toggleStatus, findById]
  )

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export function useBlogs() {
  const ctx = useContext(BlogContext)
  if (!ctx) throw new Error("useBlogs must be used within BlogProvider")
  return ctx
}
