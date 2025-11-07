export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-gradient-to-b from-primary/10 to-white">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">Admin Portal</h1>
          <p className="text-sm text-gray-500">ลงชื่อเข้าใช้เพื่อจัดการระบบ</p>
        </div>
        {children}
      </div>
    </div>
  )
}
