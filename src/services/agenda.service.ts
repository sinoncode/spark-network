// src/api/services/agenda.service.ts

import apiClient from "@/api/axios"

// ==============================
// Types
// ==============================

export interface AgendaUser {
  id: number
  name: string
  email: string
}

export interface AgendaApiEvent {
  id: number
  title: string
  description: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  category: string
  location: string
  members: number[]
  user_id: number
  created_at: string
  updated_at: string
}

export interface AgendaPayload {
  title: string
  description?: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  category?: string
  location?: string
  members: number[]
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// ==============================
// Agenda Service
// ==============================

export const AgendaService = {
  /**
   * Get all agenda events
   */
  async getAll() {
    return apiClient.get<ApiResponse<AgendaApiEvent[]>>(
      "/admin/agenda"
    )
  },

  /**
   * Get single event
   */
  async getById(id: number | string) {
    return apiClient.get<ApiResponse<AgendaApiEvent>>(
      `/admin/agenda/${id}`
    )
  },

  /**
   * Create event
   */
  async create(payload: AgendaPayload) {
    return apiClient.post<ApiResponse<AgendaApiEvent>>(
      "/admin/agenda",
      payload
    )
  },

  /**
   * Update event
   */
  async update(
    id: number | string,
    payload: AgendaPayload
  ) {
    return apiClient.put<ApiResponse<AgendaApiEvent>>(
      `/admin/agenda/${id}`,
      payload
    )
  },

  /**
   * Delete event
   */
  async delete(id: number | string) {
    return apiClient.delete<ApiResponse<null>>(
      `/admin/agenda/${id}`
    )
  },

  /**
   * Search users
   */
  async searchUsers(search?: string) {
    return apiClient.get<{
      success: boolean
      data: AgendaUser[]
    }>("/admin/users/search", {
      params: search
        ? {
          search,
        }
        : undefined,
    })
  },
}