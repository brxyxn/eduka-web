"use client"

import { MainNav } from "@/components/layouts/main-nav"
import { TeamSwitcher } from "@/components/layouts/team-switcher"
import { SidebarData } from "@/components/layouts/types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { IconSchool } from "@tabler/icons-react"
import {
  CalendarClock,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  NotebookText,
  Presentation,
  UsersRound,
} from "lucide-react"

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

// todo: replace this with real data, retrieved from supabase
const teams: Team[] = [
  { name: "Alpha Inc.", logo: IconSchool, plan: "Free" },
  { name: "English Academy", logo: IconSchool, plan: "Academy" },
  { name: "Owl School", logo: IconSchool, plan: "School" },
]

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible={"icon"}
      variant={"inset"}
      className={"h-full absolute"}
    >
      <SidebarHeader>
        {/*// todo: add applications item to open the list of the apps in our suite*/}
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={sidebarData.mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <TeamSwitcher teams={teams} />
      </SidebarFooter>
    </Sidebar>
  )
}
