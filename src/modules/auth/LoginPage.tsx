import { AuthFlipCard } from "./components/AuthFlipCard"
import { LoginForm } from "./components/login-form"
import { LoginCarousel } from "./components/login-carousel"
import logo from "@/assets/logo/new-logo.png"
// import bg from "@/assets/auth-images/auth-bg.png"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0B] p-4 md:p-8" >

      {/* Top Left Orange Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/30 blur-[180px]" />

      {/* Bottom Right Orange Glow */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-500/30 blur-[180px]" />

      <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-white/40
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    ring-1 ring-white/20">
        <div className="grid lg:grid-cols-2 bg-white/10
    backdrop-blur-2xl
    backdrop-saturate-200">

          {/* Left Side */}
          <div className="flex flex-col justify-center p-8 md:p-12 bg-white/10
">
            <img
              src={logo}
              alt="2Morrow"
              className="w-[200px] mb-8"
            />

            <AuthFlipCard />
          </div>

          {/* Right Side */}
          <div className="hidden lg:block border-l 
    backdrop-blur-2xl">
            <LoginCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}