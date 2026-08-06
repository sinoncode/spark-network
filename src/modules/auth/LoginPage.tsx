import { AuthFlipCard } from "./components/AuthFlipCard"
import { LoginForm } from "./components/login-form"
import { LoginCarousel } from "./components/login-carousel"
import logo from "@/assets/logo/logo.png"
// import bg from "@/assets/auth-images/auth-bg.png"

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-4 py-6 sm:px-6 md:px-8 lg:px-10">

      {/* ================= BACKGROUND EFFECTS ================= */}

      {/* Top Left Orange Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#FC8D0E]/25
          blur-[100px]
          sm:h-[450px]
          sm:w-[450px]
          md:h-[600px]
          md:w-[600px]
          md:blur-[160px]
        "
      />

      {/* Bottom Right Orange Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-32
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#FC8D0E]/20
          blur-[100px]
          sm:h-[450px]
          sm:w-[450px]
          md:h-[600px]
          md:w-[600px]
          md:blur-[160px]
        "
      />

      {/* Center subtle glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[120px]
        "
      />

      {/* ================= GLASS CARD ================= */}

      <section
        className="
          relative
          z-10
          w-full
          max-w-6xl
          overflow-hidden
          rounded-[24px]

          border
          border-white/[0.15]

          bg-white/[0.07]

          shadow-[0_25px_80px_rgba(0,0,0,0.45)]

          backdrop-blur-[28px]
          backdrop-saturate-[160%]

          ring-1
          ring-inset
          ring-white/[0.08]

          transition-all
          duration-500
          ease-out
        "
      >

        {/* Top glass highlight */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-20
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
          "
        />

        <div className="grid min-h-[650px] lg:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}

          <div
            className="
              relative
              flex
              min-w-0
              flex-col
              justify-center

              bg-white/[0.025]

              px-5
              py-8

              sm:px-8
              sm:py-10

              md:px-10
              md:py-12

              lg:px-12
              lg:py-10
            "
          >
            {/* Left panel subtle glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-52
                w-52
                rounded-full
                bg-[#FC8D0E]/[0.06]
                blur-[80px]
              "
            />

            {/* Logo */}
            <img
              src={logo}
              alt="2Morrow"
              className="
                relative
                z-10
                mb-8
                w-[150px]
                object-contain
                sm:w-[170px]
                md:w-[190px]
                lg:w-[200px]
              "
            />

            {/* Login / Forgot Password Flip */}
            <div className="relative z-10 w-full">
              <AuthFlipCard />
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div
            className="
              relative
              hidden
              overflow-hidden
              border-l
              border-white/[0.12]
              bg-white/[0.035]
              lg:block
            "
          >
            {/* Right glass highlight */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                bg-gradient-to-br
                from-white/[0.08]
                via-transparent
                to-[#FC8D0E]/[0.04]
              "
            />

            <div className="relative z-10 h-full">
              <LoginCarousel />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}