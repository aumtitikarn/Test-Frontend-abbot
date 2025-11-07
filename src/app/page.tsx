// src/app/page.tsx
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function Home() {
  const cookieStore = await cookies()
  const auth = cookieStore.get("auth")?.value === "1"

  if (!auth) {
    redirect("/sign-in")
  } else {
    redirect("/dashboard")
  }

  // return ไม่ถึง เพราะ redirect แล้ว
  return null
}
