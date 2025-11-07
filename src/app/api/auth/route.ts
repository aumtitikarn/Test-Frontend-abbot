import { NextResponse } from "next/server"

// ✅ mock credentials
const ADMIN_EMAIL = "admin@gmail.com"
const ADMIN_PASSWORD = "admin"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // ตรวจสอบอีเมลและรหัสผ่าน
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true, message: "Login success" })
    res.cookies.set("auth", "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    })
    return res
  }

  // ❌ ถ้าไม่ตรง
  return NextResponse.json(
    { ok: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
    { status: 401 }
  )
}

// ✅ logout (DELETE)
export async function DELETE() {
  const res = NextResponse.json({ ok: true, message: "Logout success" })
  res.cookies.set("auth", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
  })
  return res
}
