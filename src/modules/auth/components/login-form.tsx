import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/components/ui/authinput"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Apple from "@/assets/auth-images/apple_logo.svg"
import Google from "@/assets/auth-images/google_logo.webp"
import { useAuthStore } from "@/store/auth.store"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate()
  const { login, loading, error } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) return

    const success = await login({ email: trimmedEmail, password })
    if (success) navigate("/dashboard", { replace: true })
  }

  return (
    <div className={cn("w-full max-w-full mx-auto", className)} {...props}>
      <div className=" text-card-foreground">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </Label>
           <div className="relative group">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-colors group-focus-within:text-blue-500" />
  <AuthInput
    id="email"
    type="email"
    placeholder="name@company.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    autoComplete="email"
    className="h-12 pl-11 pr-4 bg-white border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm hover:border-gray-300 transition-all duration-200"
    required
  />
</div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-black">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <AuthInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-12 pl-10 pr-12 white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-black" />
                ) : (
                  <Eye className="h-5 w-5 text-black" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer font-normal"
              >
                Remember me
              </Label>
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-black hover:text-blue/80 underline underline-offset-4 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-12 w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-black bg-white">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button
          variant="ghost"
            className="h-11 shadow-xl"
            onClick={() => {/* Google OAuth */}}
          >
            <img src={Google} alt="Google" className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline text-black">Google</span>
          </Button>
          <Button
            variant="ghost"
            className="h-11 shadow-xl"
            onClick={() => {/* Apple OAuth */}}
          >
            <img src={Apple} alt="Apple" className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline text-black">Apple</span>
          </Button>
        </div>

        {/* Sign Up Link */}
        {/* <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
          >
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  )
}