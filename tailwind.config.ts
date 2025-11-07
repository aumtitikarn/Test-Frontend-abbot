import type { Config } from "tailwindcss"

export default {
 darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",   // เผื่อมี
    "./src/**/*.{ts,tsx}"          // กันพลาด
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3C5791",
        secondary: "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config