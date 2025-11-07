import { cookies } from "next/headers"

export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies()
  const auth = c.get("auth")?.value
  return auth === "1"
}

export async function getAuthCookie() {
  const c = await cookies()
  return c.get("auth") // => { name: "auth", value: "1", ... } | undefined
}
