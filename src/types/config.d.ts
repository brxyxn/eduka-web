// import { IconName } from "lucide-react/dynamic"

type NavItem = {
  title: string
  url: string
  icon: ElementType
  description?: string
  tooltip?: string
}

type User = {
  id: string
  name: string
  email: string
  avatar: string
}

type UserConfigData = {
  user: User
  navMain: NavItem[]
  reports: NavItem[]
  engineCareSettings: NavItem[]
}

type Team = {
  name: string
  logo: ElementType
  plan: string
}

type NotificationItem = {
  id: string
  avatar: string
  fallback: string
  text: string
  description?: string
  time?: string
}

type Route = {
  id: string
  title: string
  icon?: ReactNode
  link: string
  subs?: {
    title: string
    link: string
    icon?: ReactNode
  }[]
}
