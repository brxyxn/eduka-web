"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { CommandPalette } from "@/components/layouts/command-palette"
import ProfileDropdown from "@/components/layouts/dropdown-profile"
import { Logo } from "@/components/layouts/logo"
import { NotificationsPopover } from "@/components/layouts/notifications"
import { SidebarData } from "@/components/layouts/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import {
  CalendarClock,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  NotebookText,
  Presentation,
  UsersRound,
} from "lucide-react"

// todo: replace this with real data, retrieved from supabase
const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    avatar: "",
    fallback: "OM",
    text: "Absent.",
    time: "10m ago",
  },
  {
    id: "2",
    avatar: "",
    fallback: "JL",
    text: "Server upgrade completed.",
    time: "1h ago",
  },
  {
    id: "3",
    avatar: "",
    fallback: "HH",
    text: "New user signed up.",
    time: "2h ago",
  },
]

const sidebarData: SidebarData = {
  user: {
    id: "00000-00000-00000...",
    name: "Olivia Martin",
    email: "user@eduka.app",
    avatar: "",
  },
  mainNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      url: "/students",
      icon: UsersRound,
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: UsersRound,
    },
    {
      title: "Classrooms",
      url: "/classrooms",
      icon: Presentation,
    },
    {
      title: "Subjects",
      url: "/subjects",
      icon: NotebookText,
    },
    {
      title: "Routine",
      url: "/routine",
      icon: CalendarClock,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: ClipboardList,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: HandCoins,
    },
  ],
}

export const AppBar = () => {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div
      className={cn("group peer flex items-center w-full p-4")}
      // className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={isCollapsed ? "icon" : ""}
      data-variant={"icon"}
      data-side={"left"}
      data-slot="sidebar"
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          "group-data-[collapsible=]:gap-0"
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 transition-[width] duration-200 ease-linear w-(--sidebar-width)",
            "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(12)))]"
          )}
        >
          <Logo className="!h-8 !w-8" />
          <span className="font-semibold text-black dark:text-white">
            Eduka
          </span>
        </Link>

        <div className={"flex gap-2 items-center"}>
          <SidebarTrigger />

          <CommandPalette data={sidebarData} isCollapsed={isCollapsed} />
        </div>
      </div>

      <div className={"flex-1 flex items-center justify-end gap-4"}>
        <NotificationsPopover notifications={sampleNotifications} />
        <ProfileDropdown
          trigger={
            <Button variant="ghost" size="icon" className="size-9.5">
              <Avatar className="size-9.5 rounded-md">
                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      </div>
    </div>
  )
}
