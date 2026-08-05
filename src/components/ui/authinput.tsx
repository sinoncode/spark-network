import * as React from "react"
import { cn } from "@/lib/utils"

interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon, rightIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "group relative flex h-14 w-full items-center rounded-2xl",
          "border border-gray-200",
          "bg-white",
          "shadow-sm",
          "transition-all duration-300",
          "hover:border-primary/40",
          "hover:shadow-md",
          "focus-within:border-primary",
          "focus-within:ring-4",
          "focus-within:ring-primary/10"
        )}
      >
        {icon && (
          <div className="pl-4 text-gray-400 transition-colors group-focus-within:text-primary">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            "h-full flex-1 bg-transparent",
            "px-3 text-sm text-gray-900",
            "placeholder:text-gray-400",
            "outline-none",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="pr-4 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)

AuthInput.displayName = "AuthInput"

export { AuthInput }