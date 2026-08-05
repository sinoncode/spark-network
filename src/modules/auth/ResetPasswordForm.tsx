import { FormEvent, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

import { AuthInput } from "@/components/ui/authinput"
import { Button } from "@/components/ui/button"
import { resetPassword } from "@/api/services/auth.service"

import {Link} from "react-router-dom"

import { Eye, EyeOff } from "lucide-react"

import logo from "@/assets/logo/2morrow-complete-logo-high-quality.png"
import bg from "@/assets/auth-images/auth-bg.png"
import ForgotPassword from "@/assets/auth-images/reset.png"

export function ResetPasswordForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const email = searchParams.get("email") || ""
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  try {
    setLoading(true)

    await resetPassword({
      email,
      token,
      password,
    })

    alert("Password changed successfully")

    navigate("/auth/login")

  } catch (error) {
    console.error(error)
    alert("Unable to reset password")
  } finally {
    setLoading(false)
  }
}

  return (

     <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <img
              src={logo}
              alt="2Morrow"
              className="w-[280px] mb-8"
            />

            <div className="w-full">
              {/* <h1 className="mb-8 text-4xl text-black font-bold">
                Reset Password
              </h1> */}

              <p className="pb-10  text-black/70">
               Please enter the new password you’d link to use.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">

      <div className="relative">
  <AuthInput
    type={showPassword ? "text" : "password"}
    placeholder="New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
  >
    {showPassword ? (
      <EyeOff className="h-5 w-5" />
    ) : (
      <Eye className="h-5 w-5" />
    )}
  </button>
</div>

<div className="relative">
  <AuthInput
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    className="pr-12"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
  >
    {showConfirmPassword ? (
      <EyeOff className="h-5 w-5" />
    ) : (
      <Eye className="h-5 w-5" />
    )}
  </button>
</div>

      <Button
        type="submit"
        className="w-full h-12"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </Button>

    </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:block border-l bg-white">
            <div className="flex h-[650px] flex-col items-center justify-center px-12 text-center">
              <img
                src={ForgotPassword}
                alt="Forgot Password"
                className="mb-10 h-[300px] w-auto object-contain select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}