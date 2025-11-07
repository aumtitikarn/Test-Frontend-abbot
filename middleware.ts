// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const auth = req.cookies.get("auth")?.value === "1"

  const inAuth =
    pathname.startsWith("/sign-in") || pathname.startsWith("/(auth)")
  const inMain =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/blogs") ||
    pathname.startsWith("/(main)")

  // ✅ ถ้าอยู่หน้า / (home) และยังไม่ login → ไป /sign-in
  if (pathname === "/" && !auth) {
    const url = new URL("/sign-in", req.url)
    return NextResponse.redirect(url)
  }

  // ✅ ถ้าอยู่ใน main แต่ยังไม่ login → ไป /sign-in
  if (inMain && !auth) {
    const url = new URL("/sign-in", req.url)
    return NextResponse.redirect(url)
  }

  // ✅ ถ้าอยู่ใน auth แต่ login แล้ว → ไป /dashboard
  if (inAuth && auth) {
    const url = new URL("/dashboard", req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)).*)"],
}
