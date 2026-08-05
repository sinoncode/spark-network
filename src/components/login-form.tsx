import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Apple from "@/assets/auth-images/apple_logo.svg"
import Google from "@/assets/auth-images/google_logo.webp"
import { Link } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  return (
   <div className="w-full">
  <h1 className="mb-8 text-4xl font-bold">
    Login
  </h1>

  <form>
    <div className="space-y-5">
      <Input
        type="email"
        placeholder="Email id"
        className="h-12"
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="h-12 pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
        to="{/login}"
          type="button"
          className="text-primary text-sm underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        className="h-12 w-full"
        type="submit"
      >
        Login
      </Button>

      <div className="pt-2 text-center">
        <p className="mb-4 text-sm ">
          Sign in with
        </p>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="p-2 w-15 h-15"
          >
            <img src={Google} alt="" className="w-5"/>
          </Button>

          <Button
            variant="outline"
            size="icon"
              className="p-2 w-15 h-15"
          >
            <img src={Apple} alt="" className="w-5"/>
          </Button>
        </div>
      </div>
    </div>
  </form>
</div>
  )
}
