import { useState } from "react"

import { Button } from "@/components/button"
import { AuthInput } from "@/components/ui/authinput"
import { forgotPassword } from "@/api/services/auth.service"

type ForgotPasswordFormProps = {
  onBack: () => void
}

export default function ForgotPasswordForm({
  onBack,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">
          Forgot Password
        </h2>

        <p className="mt-2 text-sm text-gray-300">
          Enter your registered email address and we'll send you a
          password reset link.
        </p>
      </div>

      <AuthInput
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button
        type="submit"
        className="w-full bg-gradient-to-b from-[#FC8D0E] to-[#E33210] text-white border-0 hover:from-[#FF9A1A] hover:to-[#F03A18] transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>

      <div className="flex justify-start">
  <Button
    type="button"
    variant="link"
    onClick={onBack}
    className="p-0 text-white transition-colors duration-300 hover:text-[#FC8D0E]"
  >
    ← Back to Login
  </Button>
</div>
    </form>
  )
}