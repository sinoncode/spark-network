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
        bg-[#EFF4FF]
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

        hover:bg-[#E8F0FF]
        hover:shadow-md

        focus:border-blue-500/30
        focus:bg-white
        focus:ring-4
        focus:ring-blue-500/10

        disabled:cursor-not-allowed
        disabled:bg-slate-100
        disabled:text-slate-400
        disabled:opacity-70

        file:mr-4
        file:rounded-lg
        file:border-0
        file:bg-blue-600
        file:px-3
        file:py-1.5
        file:text-xs
        file:font-semibold
        file:text-white
        file:transition-colors
        hover:file:bg-blue-700

        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:opacity-60
        hover:[&::-webkit-calendar-picker-indicator]:opacity-100

        dark:border-slate-800
        dark:bg-[#1B2638]
        dark:text-slate-100
        dark:shadow-black/10

        dark:placeholder:text-slate-500

        dark:hover:bg-[#223149]
        dark:hover:shadow-black/20

        dark:focus:border-blue-400/40
        dark:focus:bg-[#202D42]
        dark:focus:ring-blue-400/10

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