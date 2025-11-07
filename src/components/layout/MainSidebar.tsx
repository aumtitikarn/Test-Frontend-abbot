import Link from "next/link"

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/blogs", label: "Blogs" },
]

export default function MainSidebar() {
  return (
    <aside className="hidden w-60 bg-primary text-white md:flex flex-col">
      <div className="p-4 font-semibold text-lg border-b border-white/20">
        เมนูหลัก
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="block rounded-md px-3 py-2 text-sm hover:bg-white/20 transition"
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
