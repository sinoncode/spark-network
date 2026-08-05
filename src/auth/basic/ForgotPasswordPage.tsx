import { LoginForm } from "@/components/login-form"
import { LoginCarousel } from "@/components/login-carousel"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo/2morrow-complete-logo-high-quality.png"
import bg from "@/assets/auth-images/auth-bg.png"
import ForgotPassword from "@/assets/auth-images/reset-password.png"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 rounded-2xl
shadow-[0_20px_60px_rgba(0,0,0,0.08)]" style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
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
  <h1 className="mb-8 text-4xl font-bold">
    Reset Password
  </h1>
  <p className="pb-10">Forgotten your password? Just enter your email address below and we'll send you a link to reset it.</p>
  <form>
    <div className="space-y-5">
      <Input
        type="email"
        placeholder="Insert your Email"
        className="h-12"
      />

      <Button
        className="h-12 w-full"
        type="submit"
      >
        Submit
      </Button>

    </div>
  </form>
          </div></div>

          {/* Right Side */}
          <div className="hidden lg:block border-l bg-white">
             <div className="flex h-[650px] flex-col items-center justify-center px-12 text-center">
              <img
                src={ForgotPassword}
                alt="Forgot Password Image "
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