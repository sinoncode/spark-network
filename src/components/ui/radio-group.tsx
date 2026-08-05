import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        `
        group
        flex
        w-5
        items-center
        gap-4
        rounded-xl
        border
        border-slate-300
        bg-white
        p-0
        text-left
        text-slate-900
        shadow-sm
        outline-none
        transition-all
        duration-300
        ease-out

        hover:-translate-y-[1px]
        hover:border-[#2780C3]/60
        hover:bg-[#F4FAFF]
        hover:shadow-md

        focus-visible:border-[#2780C3]
        focus-visible:ring-4
        focus-visible:ring-[#2780C3]/20

        data-[state=checked]:border-[#2780C3]
        data-[state=checked]:bg-[#EAF5FD]
        data-[state=checked]:shadow-[0_8px_20px_rgba(39,128,195,0.16)]

        disabled:cursor-not-allowed
        disabled:opacity-50

        dark:border-slate-600
        dark:bg-[#1B2638]
        dark:text-slate-100
        dark:shadow-black/20

        dark:hover:border-[#70B8ED]/70
        dark:hover:bg-[#223149]
        dark:hover:shadow-black/30

        dark:focus-visible:border-[#70B8ED]
        dark:focus-visible:ring-[#2780C3]/30

        dark:data-[state=checked]:border-[#2780C3]
        dark:data-[state=checked]:bg-[#2780C3]/20
        dark:data-[state=checked]:shadow-[0_8px_24px_rgba(39,128,195,0.25)]
        `,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          `
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-slate-500
          bg-white
          shadow-sm
          transition-all
          duration-300

          group-hover:border-[#2780C3]
          group-data-[state=checked]:scale-105
          group-data-[state=checked]:border-[#2780C3]
          group-data-[state=checked]:bg-[#2780C3]

          dark:border-slate-400
          dark:bg-[#111827]
          dark:group-hover:border-[#70B8ED]
          dark:group-data-[state=checked]:border-[#2780C3]
          dark:group-data-[state=checked]:bg-[#2780C3]
          `
        )}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
        </RadioGroupPrimitive.Indicator>
      </span>

      <span
        className="
          flex
          w-full
          flex-col
          gap-1
          text-left
          text-primary
          transition-colors
          duration-300

          group-data-[state=checked]:text-[#155789]

          dark:text-white
          dark:group-data-[state=checked]:text-[#A9D8FA]
        "
      >
        {children}
      </span>
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }