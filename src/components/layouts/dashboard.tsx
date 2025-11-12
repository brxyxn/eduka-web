import { ReactNode } from "react"
import { AppBar } from "@/components/layouts/app-bar"
import AppSidebar from "@/components/layouts/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export type DashboardLayoutProps = {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full">
      <AppBar />
      <div className={"relative flex h-full w-full"}>
        <AppSidebar />
        <SidebarInset className={"p-4 overflow-y-auto"}>
          {children}
        </SidebarInset>
      </div>
    </div>
  )
}
