"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) router.push("/dashboard");
    else setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">อีเมล</label>
        <input
          className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-black/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">รหัสผ่าน</label>
        <input
          className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-black/10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2 text-white font-medium hover:opacity-90 disabled:opacity-60 transition"
      >
        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
