import { LoginForm } from "./components/login-form"
import { LoginCarousel } from "./components/login-carousel"
import logo from "@/assets/logo/2morrow-complete-logo-high-quality.png"
import bg from "@/assets/auth-images/auth-bg.png"

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

            <LoginForm />
          </div>

          {/* Right Side */}
          <div className="hidden lg:block border-l bg-white">
            <LoginCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}