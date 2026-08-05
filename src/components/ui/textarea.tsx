import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        `
        flex
        min-h-[140px]
        w-full
        rounded-xl
        border
        border-transparent
        bg-[#EFF4FF]
        px-4
        py-3
        text-sm
        font-medium
        text-slate-800
        shadow-sm
        outline-none
        transition-all
        duration-300
        ease-out

        placeholder:font-normal
        placeholder:text-slate-400

        hover:bg-[#E8F0FF]
        hover:shadow-md

        focus:border-[#2780C3]/30
        focus:bg-white
        focus:ring-4
        focus:ring-[#2780C3]/10

        disabled:cursor-not-allowed
        disabled:resize-none
        disabled:bg-slate-100
        disabled:text-slate-400
        disabled:opacity-70

        resize-y

        dark:border-slate-800
        dark:bg-[#1B2638]
        dark:text-slate-100
        dark:shadow-black/10

        dark:placeholder:text-slate-500

        dark:hover:bg-[#223149]
        dark:hover:shadow-black/20

        dark:focus:border-[#2780C3]/50
        dark:focus:bg-[#202D42]
        dark:focus:ring-[#2780C3]/20

        dark:disabled:bg-slate-800
        dark:disabled:text-slate-600
        `,
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export { Textarea }