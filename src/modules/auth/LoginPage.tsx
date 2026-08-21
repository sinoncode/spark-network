import { AuthFlipCard } from "./components/AuthFlipCard"
import logo from "@/assets/logo/logo.png"
import bg from "@/assets/auth-images/auth-bg.png"

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 sm:px-6 lg:px-8">

      {/* ================= BACKGROUND ================= */}

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* ================= GLASS CARD (only this blurs) ================= */}

      <section
        className="
          relative
          z-10
          w-full
          max-w-[440px]
          overflow-hidden
          rounded-3xl
          border
          border-t-white/[0.22]
          border-x-white/[0.10]
          border-b-white/[0.04]
          bg-gradient-to-br
          from-white/[0.12]
          via-white/[0.05]
          to-white/[0.02]
          shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]
          backdrop-blur-[40px]
          backdrop-saturate-[180%]
          backdrop-brightness-110
          transition-all
          duration-500
          ease-out
          sm:max-w-xl
          md:max-w-xl
        "
      >

        {/* Glass top edge highlight */}
        <div className="pointer-events-none absolute inset-x-6 top-0 z-20 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        {/* Glass inner top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white/[0.07] to-transparent" />

        {/* Glass inner bottom reflection */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white/[0.03] to-transparent" />

        {/* ================= CONTENT (no blur here) ================= */}

        <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 md:px-12">
          
          {/* Logo — crisp, no blur */}
          <img
            src={logo}
            alt="2Morrow"
            className="mx-auto mb-8 w-[170px] object-contain sm:w-[190px] md:w-[250px]"
          />

          {/* Form container — subtle inner mat so inputs don't look blurred */}
          <div className="w-full rounded-2xl bg-black/[0.15] p-6 sm:p-8">
            <AuthFlipCard />
          </div>

        </div>
      </section>

    </main>
  )
}