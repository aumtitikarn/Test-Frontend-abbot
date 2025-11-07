"use client"
import { useRouter } from "next/navigation"

export default function MainNavbar() {
  const router = useRouter()

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" })
    router.push("/sign-in")
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-primary px-6 text-white shadow-md">
      <div className="font-semibold text-lg">Admin Panel</div>
      <button
        onClick={logout}
        className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 transition"
      >
        ออกจากระบบ
      </button>
    </header>
  )
}
