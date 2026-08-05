import { useState } from "react"

import { AuthInput } from "@/components/ui/authinput"
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"

import logo from "@/assets/logo/2morrow-complete-logo-high-quality.png"
import bg from "@/assets/auth-images/auth-bg.png"
import ForgotPassword from "@/assets/auth-images/reset-password.png"
import { forgotPassword } from "@/api/services/auth.service"

export default function LoginPage() {
  const [email, setEmail] = useState("")
const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  try {
    setLoading(true)

    const response = await forgotPassword({
      email,
    })

    console.log(response)

    alert("Password reset link has been sent to your email.")

    setEmail("")
  } catch (error: any) {
    console.error(error)

    alert(
      error?.response?.data?.message ||
      "Unable to send reset password email."
    )
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
              <h1 className="mb-8 text-4xl text-black font-bold">
                Reset Password
              </h1>

              <p className="pb-10  text-black/70">
                Forgotten your password? Just enter your email address below and we'll send you a link to reset it.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <AuthInput
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />

                  <Button
  className="h-12 w-full"
  type="submit"
  disabled={loading}
>
  {loading ? "Sending..." : "Send Reset Link"}
</Button>
                </div>
              </form>
      <div className="flex justify-end mt-4">
              <Link
              to="/auth/login"
              className="text-sm font-medium text-black text-right hover:text-blue/80 underline underline-offset-4 transition-colors"
            >
              Remember your password? Log in
            </Link>
            </div>
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