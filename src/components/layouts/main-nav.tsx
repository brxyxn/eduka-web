"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export type MainNavProps = {
  items: NavItem[]
  isCollapsed: boolean
}

export function MainNav({ items, isCollapsed }: MainNavProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                {Icon && (
                  <Icon
                    className={cn("!size-5", isCollapsed ? "mr-0" : "mr-2")}
                  />
                )}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
