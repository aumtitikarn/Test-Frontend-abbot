// src/app/(main)/blogs/page.tsx
import { BlogProvider } from "@/components/blog/BlogProvider"
import BlogTable from "@/components/blog/BlogTable"

export default function BlogsPage() {
  return (
    <BlogProvider>
      <div className="space-y-4">
        <BlogTable />
      </div>
    </BlogProvider>
  )
}
