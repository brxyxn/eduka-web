import { ReactNode } from "react"
import AppSidebar from "@/components/layouts/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export type DashboardLayoutProps = {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex h-screen w-full">
      <AppSidebar />
      <SidebarInset className={"p-4 w-full rounded-xl"}>
        {children}
      </SidebarInset>
    </div>
  )
}
