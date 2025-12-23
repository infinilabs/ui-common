import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { Search as SearchIcon, Bot } from "lucide-react"

export type ModeSwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>

export function ModeSwitch({ className, ...props }: ModeSwitchProps) {
  const checked = !!props.checked
  return (
    <SwitchPrimitive.Root
      data-slot="mode-switch"
      className={cn(
        "inline-flex h-6 w-10 shrink-0 items-center rounded-full border shadow-inner transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-linear-to-r data-[state=checked]:from-violet-500 data-[state=checked]:to-fuchsia-500",
        "data-[state=unchecked]:bg-muted",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="mode-switch-thumb"
        className={cn(
          "pointer-events-none inline-flex items-center justify-center size-5 rounded-full bg-background ring-0 shadow-md transition-transform",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-[calc(100%-2px)]"
        )}
      >
        {checked ? (
          <Bot className="size-3 text-foreground/90" />
        ) : (
          <SearchIcon className="size-3 text-foreground/90" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )}

export default ModeSwitch
