import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-dvh bg-white text-gray-900">{children}</body>
    </html>
  );
}
