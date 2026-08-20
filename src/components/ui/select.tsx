import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
  ref={ref}
  className={cn(
    `
    group
    flex
    h-12
    w-full
    items-center
    justify-between
    gap-3
    whitespace-nowrap
    rounded-xl
    border
    border-transparent

    bg-[#FFF7ED]

    px-4
    py-2

    text-sm
    font-medium
    text-slate-800

    shadow-sm
    outline-none

    transition-all
    duration-300
    ease-out

    hover:bg-[#FFF3E3]
    hover:border-[#FC8D0E]/30
    hover:shadow-md

    focus:border-[#FC8D0E]/50
    focus:bg-white
    focus:ring-4
    focus:ring-[#FC8D0E]/10

    disabled:cursor-not-allowed
    disabled:opacity-50

    data-[placeholder]:text-slate-400

    dark:border-white/10
    dark:bg-white/[0.05]
    dark:text-slate-100
    dark:shadow-black/10

    dark:hover:bg-white/[0.08]
    dark:hover:border-[#FC8D0E]/30
    dark:hover:shadow-[0_0_15px_rgba(252,141,14,0.08)]

    dark:focus:border-[#FC8D0E]/50
    dark:focus:bg-white/[0.08]
    dark:focus:ring-[#FC8D0E]/15

    dark:data-[placeholder]:text-white/40
    `,
    className
  )}
  {...props}
>
    {children}

    <SelectPrimitive.Icon asChild>
  <ChevronDown
    className="
      h-4
      w-4
      shrink-0

      text-[#FC8D0E]

      transition-all
      duration-300

      group-data-[state=open]:rotate-180
      group-data-[state=open]:text-[#E33210]

      dark:text-[#FC8D0E]
      dark:group-data-[state=open]:text-[#E33210]
    "
  />
</SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
  ref={ref}
  className={cn(
    `
    flex
    cursor-default
    items-center
    justify-center
    py-2

    text-[#FC8D0E]

    transition-colors
    duration-200

    hover:text-[#E33210]

    dark:text-[#FC8D0E]
    dark:hover:text-[#E33210]
    `,
    className
  )}
  {...props}
>
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
  ref={ref}
  className={cn(
    `
    flex
    cursor-default
    items-center
    justify-center
    py-2

    text-[#FC8D0E]

    transition-colors
    duration-200

    hover:text-[#E33210]

    dark:text-[#FC8D0E]
    dark:hover:text-[#E33210]
    `,
    className
  )}
  {...props}
>
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
  ref={ref}
  position={position}
  className={cn(
    `
    relative
    z-[100]

    max-h-[--radix-select-content-available-height]
    min-w-[10rem]

    overflow-hidden

    rounded-2xl

    border
    border-[#FC8D0E]/20

    bg-white/[0.92]

    p-1.5

    text-slate-800

    shadow-[0_18px_45px_rgba(252,141,14,0.12)]

    backdrop-blur-xl
    backdrop-saturate-150

    data-[state=open]:animate-in
    data-[state=closed]:animate-out

    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0

    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95

    data-[state=closed]:slide-out-to-top-1
    data-[state=open]:slide-in-from-top-2

    duration-200

    dark:border-[#FC8D0E]/20
    dark:bg-[#111111]/95
    dark:text-slate-100

    dark:shadow-[0_20px_50px_rgba(252,141,14,0.10)]
    dark:backdrop-blur-2xl
    `,
    position === "popper" &&
      `
      data-[side=bottom]:translate-y-2
      data-[side=top]:-translate-y-2
      data-[side=left]:-translate-x-2
      data-[side=right]:translate-x-2
      `,
    className
  )}
  {...props}
>
      <SelectScrollUpButton />

      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
          `
            h-[var(--radix-select-trigger-height)]
            w-full
            min-w-[var(--radix-select-trigger-width)]
            `
        )}
      >
        {children}
      </SelectPrimitive.Viewport>

      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
  ref={ref}
  className={cn(
    `
    px-3
    pb-2
    pt-2.5

    text-[10px]
    font-bold
    uppercase
    tracking-[0.14em]

    text-[#E33210]

    dark:text-[#FC8D0E]
    `,
    className
  )}
  {...props}
/>
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
  ref={ref}
  className={cn(
    `
    relative
    flex
    w-full
    cursor-pointer
    select-none
    items-center
    rounded-xl
    py-3
    pl-3.5
    pr-10
    text-sm
    font-medium
    text-slate-700
    outline-none
    transition-all
    duration-200

    focus:bg-[#FC8D0E]/10
    focus:text-[#FC8D0E]

    data-[state=checked]:bg-[#FC8D0E]/10
    data-[state=checked]:font-semibold
    data-[state=checked]:text-[#FC8D0E]

    data-[disabled]:pointer-events-none
    data-[disabled]:opacity-40

    dark:text-slate-200

    dark:focus:bg-[#FC8D0E]/10
    dark:focus:text-[#FC8D0E]

    dark:data-[state=checked]:bg-[#FC8D0E]/10
    dark:data-[state=checked]:text-[#FC8D0E]
    `,
    className
  )}
  {...props}
>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <span
  className="
    absolute
    right-3.5
    flex
    h-5
    w-5
    items-center
    justify-center
    rounded-full
    bg-[#FC8D0E]
    text-white
    opacity-0
    scale-75
    transition-all
    duration-200
    data-[state=checked]:opacity-100
    data-[state=checked]:scale-100
    dark:bg-[#E33210]
  "
>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5 stroke-[3]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      `
      -mx-1
      my-1.5
      h-px
      bg-slate-100
      dark:bg-slate-700/70
      `,
      className
    )}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}