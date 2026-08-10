import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        `
        flex
        h-12
        w-full
        rounded-xl
        border
        border-transparent
        bg-[#FFF7ED]
        px-4
        py-2.5
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
        disabled:bg-slate-100
        disabled:text-slate-400
        disabled:opacity-70

        file:mr-4
        file:rounded-lg
        file:border-0
        file:bg-[#FC8D0E]
        file:px-3
        file:py-1.5
        file:text-xs
        file:font-semibold
        file:text-white
        file:transition-colors
        hover:file:bg-[#E33210]

        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:opacity-60
        hover:[&::-webkit-calendar-picker-indicator]:opacity-100

       

        dark:border-white/10
        dark:bg-white/[0.06]
        dark:text-white
        dark:shadow-black/10


       dark:placeholder:text-white/40

        dark:hover:bg-white/[0.09]
        dark:hover:shadow-black/20

        dark:focus:border-[#FC8D0E]/50
        dark:focus:bg-white/[0.08]
        dark:focus:ring-[#FC8D0E]/15

        dark:disabled:bg-slate-800
        dark:disabled:text-slate-600

        dark:[&::-webkit-calendar-picker-indicator]:invert
        `,
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }