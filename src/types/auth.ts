export interface LoginPayload {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
  }
}