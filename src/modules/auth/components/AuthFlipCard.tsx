import { useState } from "react"
import { motion } from "framer-motion"

import { LoginForm } from "./login-form"
import ForgotPasswordForm from "./ForgotPasswordForm"

export function AuthFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full min-h-[520px]"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Login */}

        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="absolute inset-0"
        >
          <LoginForm
            onForgotPassword={() => setIsFlipped(true)}
          />
        </div>

        {/* Forgot Password */}

        <div
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="absolute inset-0"
        >
          <ForgotPasswordForm
            onBack={() => setIsFlipped(false)}
          />
        </div>
      </motion.div>
    </div>
  )
}