import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  rounded-xl
  text-sm
  font-semibold
  outline-none
  transition-all
  duration-300
  ease-out

  focus-visible:outline-none
  focus-visible:ring-4
  focus-visible:ring-[#FC8D0E]/20

  disabled:pointer-events-none
  disabled:cursor-not-allowed
  disabled:opacity-50

  active:scale-[0.98]

  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        default: `
  bg-[#FC8D0E]
  text-white
  shadow-[0_8px_20px_rgba(227,50,16,0.24)]

  hover:-translate-y-0.5
  hover:bg-[#E33210]
  hover:shadow-[0_12px_28px_rgba(252,141,14,0.34)]

  focus-visible:bg-[#E33210]
  focus-visible:ring-[#FC8D0E]/25

  dark:bg-[#FC8D0E]
  dark:text-white
  dark:shadow-[0_8px_22px_rgba(227,50,16,0.30)]

  dark:hover:bg-[#E33210]
  dark:hover:shadow-[0_12px_30px_rgba(252,141,14,0.42)]

  dark:focus-visible:bg-[#E33210]
  dark:focus-visible:ring-[#FC8D0E]/30
`,


        destructive: `
          bg-red-600
          text-white
          shadow-[0_8px_20px_rgba(220,38,38,0.18)]

          hover:-translate-y-0.5
          hover:bg-red-700
          hover:shadow-[0_12px_28px_rgba(220,38,38,0.28)]

          focus-visible:ring-red-500/20

          dark:bg-red-600
          dark:text-white
          dark:hover:bg-red-500
          dark:focus-visible:ring-red-400/20
        `,

        outline: `
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-sm

          hover:-translate-y-0.5
          hover:border-[#FC8D0E]/30
          hover:bg-[#FC8D0E]/5
          hover:text-[#FC8D0E]
          hover:shadow-md

          focus-visible:border-[#FC8D0E]/40
          focus-visible:ring-[#FC8D0E]/15

          dark:border-slate-700
          dark:bg-[#E33210]
          dark:text-slate-200
          dark:shadow-black/10

          dark:hover:border-[#FC8D0E]/50
          dark:hover:bg-[#FC8D0E]/10
          dark:hover:text-[#ffffff]
          dark:hover:shadow-black/20

          dark:focus-visible:border-[#FC8D0E]/60
          dark:focus-visible:ring-[#FC8D0E]/20
        `,

        secondary: `
          bg-[#FC8D0E]/10
          text-[#E33210]
          shadow-sm

          hover:-translate-y-0.5
          hover:bg-[#FC8D0E]/15
          hover:shadow-md

          focus-visible:ring-[#FC8D0E]/15

          dark:bg-[#FC8D0E]/15
          dark:text-[#E33210]

          dark:hover:bg-[#FC8D0E]/25
          dark:hover:text-[#E33210]

          dark:focus-visible:ring-[#FC8D0E]/20
        `,

        ghost: `
          bg-transparent
          text-slate-600

          hover:bg-[#FC8D0E]/8
          hover:text-[#1E6FAE]

          focus-visible:bg-[#FC8D0E]/8
          focus-visible:text-[#1E6FAE]

          dark:text-slate-300

          dark:hover:bg-[#FC8D0E]/15
          dark:hover:text-[#E33210]

          dark:focus-visible:bg-[#FC8D0E]/15
          dark:focus-visible:text-[#E33210]
        `,

        link: `
          h-auto
          bg-transparent
          px-0
          py-0
          text-[#FC8D0E]
          underline-offset-4

          hover:text-[#1E6FAE]
          hover:underline

          dark:text-[#FC8D0E]
          dark:hover:text-[#E33210]
        `,
      },

      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        icon: "h-11 w-11 p-0",
        "icon-sm": "h-9 w-9 rounded-lg p-0",
        "icon-lg": "h-12 w-12 rounded-xl p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }