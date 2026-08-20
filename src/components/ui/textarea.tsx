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

    bg-[#FFF7ED]

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

    hover:bg-[#FFF3E3]
    hover:shadow-md

    focus:border-[#FC8D0E]/40
    focus:bg-white
    focus:ring-4
    focus:ring-[#FC8D0E]/10

    disabled:cursor-not-allowed
    disabled:resize-none
    disabled:bg-slate-100
    disabled:text-slate-400
    disabled:opacity-70

    resize-y

    dark:border-white/10
    dark:bg-white/[0.05]
    dark:text-white
    dark:shadow-black/10

    dark:placeholder:text-white/40

    dark:hover:bg-white/[0.08]
    dark:hover:shadow-black/20

    dark:focus:border-[#FC8D0E]/50
    dark:focus:bg-white/[0.08]
    dark:focus:ring-[#FC8D0E]/15

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