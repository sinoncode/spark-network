import api from "../axios"
import { LoginPayload } from "@/types/auth"



export interface ResetPasswordPayload {
  email: string
  token: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export const AuthService = {
  login(data: LoginPayload) {
    return api.post("/auth/login", data)
  },

  logout() {
    return api.post("/logout")
  },
}

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post("/auth/forgot-password", payload)
  return data
}

export const resetPassword = async (
  payload: ResetPasswordPayload
) => {
  const { data } = await api.post(
    "/auth/reset-password",
    payload
  )

  return data
}