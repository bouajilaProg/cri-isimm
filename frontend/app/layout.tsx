import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { OrderProvider } from "@/context/order-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Robotics Club Borrowing Platform",
  description: "Borrow robotics equipment for your projects",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <OrderProvider>{children}</OrderProvider>
          </UserProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { UserProvider } from "@/context/user-context"

