import { Input } from "@/components/ui/input"

export const AppBar = () => {
  return (
    <div className={"w-full p-4 rounded-lg"}>
      <Input type="text" placeholder={"Search anything"} />
    </div>
  )
}
