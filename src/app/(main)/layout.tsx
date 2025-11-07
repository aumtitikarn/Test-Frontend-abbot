import MainNavbar from "@/components/layout/MainNavbar"
import MainSidebar from "@/components/layout/MainSidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-secondary text-gray-900">
      <MainSidebar />
      <div className="flex w-full flex-col">
        <MainNavbar />
        <main className="flex-1 bg-white p-6">{children}</main>
      </div>
    </div>
  )
}
