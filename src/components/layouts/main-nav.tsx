"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export type MainNavProps = {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {Icon && (
                    <Icon
                      className={cn("!size-5", isCollapsed ? "mr-0" : "mr-2")}
                    />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
