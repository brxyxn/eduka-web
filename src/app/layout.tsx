import { ReactNode } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { DashboardLayout } from "@/components/layouts/dashboard"
import Providers from "@/providers"
import "@/styles/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Eduka App",
  description:
    "An educational platform for managing academies, schools, and universities.",
}

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
      </body>
    </html>
  )
}
