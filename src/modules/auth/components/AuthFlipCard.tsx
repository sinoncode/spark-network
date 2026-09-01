import { useState } from "react"
import { motion } from "framer-motion"

import { LoginForm } from "./login-form"
import ForgotPasswordForm from "./ForgotPasswordForm"

export function AuthFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1], // Smooth, elegant deceleration
        }}
      >
        {/* ===== FRONT: Login ===== */}
        <div
          className="relative w-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)", // Forces GPU layer, prevents bleed
          }}
        >
          <LoginForm onForgotPassword={() => setIsFlipped(true)} />
        </div>

        {/* ===== BACK: Forgot Password ===== */}
        <div
          className="absolute inset-0 w-full"
          style={{
            transform: "rotateY(180deg) translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <ForgotPasswordForm onBack={() => setIsFlipped(false)} />
        </div>
      </motion.div>
    </div>
  )
}