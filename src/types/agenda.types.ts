// src/api/types/agenda.types.ts

// ==========================================
// Generic API Response
// ==========================================

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiErrorResponse {
  success: boolean
  message: string
  errors: Record<string, string[]>
}

// ==========================================
// User
// ==========================================

export interface AgendaUser {
  id: number
  name: string
  email: string
}

// ==========================================
// Backend Event Model
// ==========================================
export interface AgendaApiMember {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}


export interface AgendaApiEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  category: string;
  location: string;

  members: AgendaApiMember[];
}

// ==========================================
// UI Event Model
// ==========================================

export interface AgendaAttachment {
  id?: number | string
  name: string
  url: string
  type?: string
  size?: number
}

export interface AgendaEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  color: string
  category?: string
  location?: string
  latitude?: number | null
  longitude?: number | null
  members: AgendaUser[]
  attachments?: AgendaAttachment[]
}

// ==========================================
// Create / Update Payload
// ==========================================

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

  latitude?: number | null
  longitude?: number | null

  // New files selected in frontend
  attachments?: File[]
}

// ==========================================
// Calendar Filter
// ==========================================

export interface AgendaFilters {
  search: string

  category: string

  from?: string

  to?: string
}

// ==========================================
// Calendar Statistics
// ==========================================

export interface AgendaStatistics {
  total: number

  meetings: number

  completed: number

  upcoming: number
}

// ==========================================
// Categories
// ==========================================

export type AgendaCategory =
  | "Meeting"
  | "Development"
  | "Client"
  | "Marketing"
  | "Design"
  | "Planning"
  | "Testing"
  | "Deployment"
  | "Support"
  | "Personal"
  | "Other"

// ==========================================
// Store State
// ==========================================

export interface AgendaState {
  events: AgendaEvent[]

  users: AgendaUser[]

  selectedEvent: AgendaEvent | null

  loading: boolean

  submitting: boolean

  deleting: boolean

  searchingUsers: boolean

  error: string | null

  filters: AgendaFilters
}

// ==========================================
// Store Actions
// ==========================================

export interface AgendaActions {
  fetchEvents: () => Promise<void>

  fetchEvent: (id: number | string) => Promise<void>

  createEvent: (
    payload: AgendaPayload
  ) => Promise<boolean>

  updateEvent: (
    id: number | string,
    payload: AgendaPayload
  ) => Promise<boolean>

  deleteEvent: (
    id: number | string
  ) => Promise<boolean>

  searchUsers: (
    keyword?: string
  ) => Promise<void>

  setSelectedEvent: (
    event: AgendaEvent | null
  ) => void

  setFilters: (
    filters: Partial<AgendaFilters>
  ) => void

  clearError: () => void

  reset: () => void
}

// ==========================================
// Zustand Store Type
// ==========================================

export type AgendaStore = AgendaState &
  AgendaActions

// ==========================================
// Default Filters
// ==========================================

export const defaultAgendaFilters: AgendaFilters = {
  search: "",

  category: "all",
}

// ==========================================
// Category Colors
// ==========================================

export const CATEGORY_COLORS: Record<
  string,
  string
> = {
  Meeting: "#3B82F6",

  Development: "#8B5CF6",

  Client: "#F59E0B",

  Marketing: "#EC4899",

  Design: "#06B6D4",

  Planning: "#10B981",

  Testing: "#EF4444",

  Deployment: "#6366F1",

  Support: "#14B8A6",

  Personal: "#F97316",

  Other: "#94A3B8",
}

// ==========================================
// Helpers
// ==========================================

export const getCategoryColor = (
  category?: string
): string => {
  if (!category) return CATEGORY_COLORS.Other

  return (
    CATEGORY_COLORS[category] ??
    CATEGORY_COLORS.Other
  )
}