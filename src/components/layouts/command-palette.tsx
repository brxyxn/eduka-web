"use client"

import * as React from "react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { Search } from "lucide-react"
import { SidebarData } from "./types"

interface NavHeaderProps {
  data: SidebarData
}

export function CommandPalette({ data }: NavHeaderProps) {
  const [open, setOpen] = React.useState(false)

  // Handle Cmd or Ctrl key to display shortcut in Kbd component
  const [modifierKey, setModifierKey] = React.useState("⌘")

  useEffect(() => {
    const modifierKeyPrefix =
      navigator.platform.startsWith("Mac") || navigator.platform === "iPhone"
        ? "⌘" // command key
        : "Ctrl" // control key
    console.log("modifierKeyPrefix", { platform: navigator.platform })
    setModifierKey(modifierKeyPrefix)
  }, [])

  // Toggle command palette with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div
        className="flex items-center justify-between px-2 cursor-pointer border rounded-md py-1 bg-white"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center flex-1 gap-3 w-28">
          <Search className={cn("size-5 text-muted-foreground")} />
          <span className="text-sm text-muted-foreground font-normal">
            {"Search"}
          </span>
        </div>
        <Kbd>{modifierKey} + K</Kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search everything..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {data.mainNav.map((item) => (
              <CommandItem
                className="py-2!"
                key={item.url}
                onSelect={() => {
                  setOpen(false)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator className="my-2" />
        </CommandList>
      </CommandDialog>
    </>
  )
}
