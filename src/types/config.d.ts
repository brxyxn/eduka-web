// Define types for user configuration and navigation items

// used in the application sidebar for navigation items
type NavItem = {
  title: string
  url: string
  icon: ElementType
  description?: string
  tooltip?: string
}

// used in the application sidebar for user info and settings
type User = {
  id: string
  name: string
  email: string
  avatar: string
}

// todo: remove this, update all references to use SidebarData instead
type UserConfigData = {
  user: User
  navMain: NavItem[]
  reports: NavItem[]
  engineCareSettings: NavItem[]
}

type Team = {
  name: string
  logo: ElementType
  plan: string // update this for more strict typing later
}

// This is used in the notification dropdown items
type NotificationItem = {
  id: string
  avatar: string
  fallback: string
  text: string
  description?: string
  time?: string
}
