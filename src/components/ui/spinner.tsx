import { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

type IconProps = ComponentProps<typeof Loader2Icon> & ComponentProps<"svg">

function Spinner({ className, ...props }: IconProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
