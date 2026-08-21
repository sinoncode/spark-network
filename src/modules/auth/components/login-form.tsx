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

type Props = {
  onForgotPassword: () => void
}
export function LoginForm({ onForgotPassword }: Props) {

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
    <div className="w-full max-w-full mx-auto">
      <div className=" text-card-foreground">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground text-white">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
<div className="space-y-2">
  <Label
    htmlFor="email"
    className="text-sm font-medium text-white/90"
  >
    Email address
  </Label>

  <div className="group relative">

    <Mail
      className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2

      h-5
      w-5

      text-white/40

      transition-all
      duration-300

      group-focus-within:text-[#FC8D0E]
      "
    />

    <AuthInput
      id="email"
      type="email"
      placeholder="name@company.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="
      h-14

      rounded-xl

      border
      border-white/10

      bg-white/5

      backdrop-blur-xl

      shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_30px_rgba(0,0,0,.12)]

      pl-12
      pr-4

      text-white

      placeholder:text-white/40

      transition-all
      duration-300

      hover:bg-white/[0.06]
      hover:border-white/20

      focus:bg-white/[0.08]
      focus:border-[#FC8D0E]/40
      focus:ring-2
      focus:ring-[#FC8D0E]/15
      "
    />

  </div>
</div>

          {/* Password */}
          <div className="space-y-2">

  <Label
    htmlFor="password"
    className="text-sm font-medium text-white/90"
  >
    Password
  </Label>

  <div className="group relative">

    <Lock
      className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2

      h-5
      w-5

      text-white/40

      transition-all
      duration-300

      group-focus-within:text-[#FC8D0E]
      "
    />

    <AuthInput
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="
      h-14

      rounded-xl

      border
      border-white/10

      bg-white/5

      backdrop-blur-xl

      shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_30px_rgba(0,0,0,.12)]

      pl-12
      pr-14

      text-white

      placeholder:text-white/40

      transition-all
      duration-300

      hover:bg-white/[0.06]
      hover:border-white/20

      focus:bg-white/[0.08]
      focus:border-[#FC8D0E]/40
      focus:ring-2
      focus:ring-[#FC8D0E]/15
      "
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2

      text-white/40

      transition-colors
      duration-300

      hover:text-white
      "
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
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
                className="
                  border-white/40
                  data-[state=checked]:bg-[#FC8D0E]
                  data-[state=checked]:border-[#FC8D0E]
                  data-[state=checked]:text-white
                "
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer font-normal text-white"
              >
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              onClick={onForgotPassword} 
              className="p-0 text-white transition-colors duration-300 hover:text-[#FC8D0E]"
            >
              Forgot Password?
            </Button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-12 w-full bg-gradient-to-b from-[#FC8D0E] to-[#E33210] text-white border-0 hover:from-[#FF9A1A] hover:to-[#F03A18] transition-all duration-300"
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
          {/* {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )} */}
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-white bg-transparent">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            className="
      group
      h-12
      rounded-2xl

      border
      border-white/10

      bg-white/[0.05]
      backdrop-blur-xl
      backdrop-saturate-150

      shadow-[0_8px_30px_rgba(0,0,0,0.18),0_0_18px_rgba(252,141,14,0.08)]

      transition-all
      duration-300
      ease-out

      hover:bg-white/[0.08]
      hover:border-[#FC8D0E]/40
      hover:shadow-[0_10px_35px_rgba(0,0,0,0.25),0_0_30px_rgba(252,141,14,0.25)]
      hover:-translate-y-1

      active:scale-[0.98]
    "
            onClick={() => {/* Google OAuth */ }}
          >
            <img src={Google} alt="Google" className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden text-white sm:inline group-hover:text-[#FC8D0E] transition-colors duration-300">Google</span>
          </Button>
          <Button
            variant="ghost"
            className="
      group
      h-12
      rounded-2xl

      border
      border-white/10

      bg-white/[0.05]
      backdrop-blur-xl
      backdrop-saturate-150

      shadow-[0_8px_30px_rgba(0,0,0,0.18),0_0_18px_rgba(252,141,14,0.08)]

      transition-all
      duration-300
      ease-out

      hover:bg-white/[0.08]
      hover:border-[#FC8D0E]/40
      hover:shadow-[0_10px_35px_rgba(0,0,0,0.25),0_0_30px_rgba(252,141,14,0.25)]
      hover:-translate-y-1

      active:scale-[0.98]
    "
            onClick={() => {/* Apple OAuth */ }}
          >
            <img src={Apple} alt="Apple" className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden text-white sm:inline group-hover:text-[#FC8D0E] transition-colors duration-300">Apple</span>
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