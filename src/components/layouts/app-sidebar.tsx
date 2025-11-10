"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/layouts/logo"
import { MainNav } from "@/components/layouts/main-nav"
import { NavHeader } from "@/components/layouts/nav-header"
import { NotificationsPopover } from "@/components/layouts/notifications"
import { TeamSwitcher } from "@/components/layouts/team-switcher"
import { SidebarData } from "@/components/layouts/types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {
  IconCalendar,
  IconChalkboard,
  IconCheckupList,
  IconLayoutDashboard,
  IconNotebook,
  IconSchool,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react"

// for now all our users will have access to everything in the sidebar
// this will be changed later when we implement the subscription plans and roles
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
      icon: IconLayoutDashboard,
    },
    {
      title: "Students",
      url: "/students",
      icon: IconUsers,
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: IconUsers,
    },
    {
      title: "Classrooms",
      url: "/classrooms",
      icon: IconChalkboard,
    },
    {
      title: "Subjects",
      url: "/subjects",
      icon: IconNotebook,
    },
    {
      title: "Routine",
      url: "/routine",
      icon: IconCalendar,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: IconCheckupList,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: IconWallet,
    },
  ],
}

// todo: replace this with real data, retrieved from supabase
const teams: Team[] = [
  { name: "Alpha Inc.", logo: IconSchool, plan: "Free" },
  { name: "English Academy", logo: IconSchool, plan: "Academy" },
  { name: "Owl School", logo: IconSchool, plan: "School" },
]

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

export default function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible={"icon"} variant={"inset"}>
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Eduka
            </span>
          )}
        </a>
        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <NotificationsPopover notifications={sampleNotifications} />
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <NavHeader data={sidebarData} />
        {/*<Navigation routes={dashboardRoutes} />*/}
        <MainNav items={sidebarData.mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <TeamSwitcher teams={teams} />
      </SidebarFooter>
    </Sidebar>
  )
}
