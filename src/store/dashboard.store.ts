"use client"

import { create } from "zustand"
import api from "@/api/axios" // adjust path accordingly

// ==================== API TYPES ====================

export interface Lead {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  source: string
  status: string
  agent_id: number
  notes: string
  created_at: string
  updated_at: string
}

export interface RequestItem {
  id: number
  uuid: string
  reference: string
  first_name: string
  last_name: string
  phones: string
  emails: string
  language: string
  memo: string
  status: string
  transaction: string
  category: string
  budget_min: string
  budget_max: string
  currency: string
  notes: string
  zip: string
  city: string
  country: string
  radius: number
  rooms_min: string
  rooms_max: string
  livable_space_min: string
  livable_space_max: string
  surface_land_min: string
  surface_land_max: string
  person_id: number
  assigned_agent_id: number
  deleted_at: string | null
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
}

export interface Activity {
  id: number
  title: string
  type: string
  status: string
  start_time: string
  end_time: string
  agent_id: number
  contact_id: number
  request_id: number
  property_id: number
  notes: string
  created_at: string
  updated_at: string
}

export interface DashboardCounts {
  users: number
  agents: number
  properties: number
  contacts: number
  leads: number
  requests: number
  activities: number
  emails: number
}

export interface DashboardStatus {
  active_properties: number
  completed_activities: number
  open_requests: number
}

export interface DashboardLatest {
  leads: Lead[]
  requests: RequestItem[]
  activities: Activity[]
}

export interface DashboardData {
  counts: DashboardCounts
  status: DashboardStatus
  latest: DashboardLatest
}

export interface DashboardResponse {
  success: boolean
  message: string
  data: DashboardData
}

// ==================== DERIVED CHART DATA TYPES ====================

export interface WeeklyDataPoint {
  label: string
  sales: number
  rentals: number
}

export interface MonthlyDataPoint {
  label: string
  new_leads: number
  returning: number
}

export interface SourceDataPoint {
  source: string
  count: number
  percentage: number
}

// ==================== STORE STATE ====================

export interface DashboardState {
  dashboard: DashboardData | null
  loading: boolean
  error: string | null

  // Chart data (computed from API or separate endpoints)
  weeklyTransactions: WeeklyDataPoint[]
  monthlyLeads: MonthlyDataPoint[]
  leadSources: SourceDataPoint[]
  activityCompletionRate: number

  fetchDashboard: () => Promise<void>
  fetchChartData: () => Promise<void>
}

// ==================== MOCK CHART DATA ====================

const mockWeeklyTransactions: WeeklyDataPoint[] = [
  { label: "Mon", sales: 12, rentals: 4 },
  { label: "Tue", sales: 18, rentals: 6 },
  { label: "Wed", sales: 15, rentals: 3 },
  { label: "Thu", sales: 22, rentals: 8 },
  { label: "Fri", sales: 28, rentals: 5 },
  { label: "Sat", sales: 20, rentals: 7 },
  { label: "Sun", sales: 16, rentals: 4 },
]

const mockMonthlyLeads: MonthlyDataPoint[] = [
  { label: "Jan", new_leads: 45, returning: 12 },
  { label: "Feb", new_leads: 52, returning: 18 },
  { label: "Mar", new_leads: 38, returning: 15 },
  { label: "Apr", new_leads: 65, returning: 22 },
  { label: "May", new_leads: 58, returning: 20 },
  { label: "Jun", new_leads: 72, returning: 28 },
  { label: "Jul", new_leads: 68, returning: 25 },
  { label: "Aug", new_leads: 80, returning: 30 },
  { label: "Sep", new_leads: 62, returning: 24 },
  { label: "Oct", new_leads: 90, returning: 35 },
  { label: "Nov", new_leads: 75, returning: 28 },
  { label: "Dec", new_leads: 95, returning: 40 },
]

const mockLeadSources: SourceDataPoint[] = [
  { source: "Website", count: 342, percentage: 35 },
  { source: "Referral", count: 218, percentage: 22 },
  { source: "Portal", count: 185, percentage: 19 },
  { source: "Walk-in", count: 128, percentage: 13 },
  { source: "Social Media", count: 95, percentage: 10 },
  { source: "Other", count: 32, percentage: 3 },
]

// ==================== MOCK DASHBOARD DATA ====================

const mockDashboardData: DashboardData = {
  counts: {
    users: 124,
    agents: 18,
    properties: 342,
    contacts: 856,
    leads: 67,
    requests: 43,
    activities: 215,
    emails: 1234,
  },
  status: {
    active_properties: 289,
    completed_activities: 178,
    open_requests: 12,
  },
  latest: {
    leads: [
      {
        id: 1,
        first_name: "Sophie",
        last_name: "Müller",
        email: "sophie.mueller@email.ch",
        phone: "+41 79 123 4567",
        source: "website",
        status: "new",
        agent_id: 3,
        notes: "Looking for a penthouse in Geneva",
        created_at: "2026-07-28T10:30:00Z",
        updated_at: "2026-07-28T10:30:00Z",
      },
      {
        id: 2,
        first_name: "Jean",
        last_name: "Dupont",
        email: "jean.dupont@email.ch",
        phone: "+41 78 987 6543",
        source: "referral",
        status: "contacted",
        agent_id: 5,
        notes: "Interested in Verbier land plot",
        created_at: "2026-07-27T14:15:00Z",
        updated_at: "2026-07-28T09:00:00Z",
      },
      {
        id: 3,
        first_name: "Marco",
        last_name: "Rossi",
        email: "marco.rossi@email.it",
        phone: "+39 333 456 7890",
        source: "portal",
        status: "qualified",
        agent_id: 2,
        notes: "Budget up to CHF 5M, lake view preferred",
        created_at: "2026-07-26T11:00:00Z",
        updated_at: "2026-07-27T16:30:00Z",
      },
      {
        id: 4,
        first_name: "Emma",
        last_name: "Johnson",
        email: "emma.j@email.com",
        phone: "+44 7700 900123",
        source: "social_media",
        status: "new",
        agent_id: 7,
        notes: "Relocating from London, needs villa in Vaud",
        created_at: "2026-07-25T08:45:00Z",
        updated_at: "2026-07-25T08:45:00Z",
      },
      {
        id: 5,
        first_name: "Hans",
        last_name: "Weber",
        email: "hans.weber@email.de",
        phone: "+49 170 123 4567",
        source: "walk_in",
        status: "contacted",
        agent_id: 1,
        notes: "German investor, looking for commercial property",
        created_at: "2026-07-24T16:20:00Z",
        updated_at: "2026-07-26T10:00:00Z",
      },
    ],
    requests: [
      {
        id: 1,
        uuid: "req-001-uuid",
        reference: "REQ-2026-001",
        first_name: "Claire",
        last_name: "Bernard",
        phones: "+41 79 555 1234",
        emails: "claire.bernard@email.ch",
        language: "fr",
        memo: "Urgent request for family relocation",
        status: "open",
        transaction: "sale",
        category: "residential",
        budget_min: "2000000",
        budget_max: "4500000",
        currency: "CHF",
        notes: "Needs 4+ bedrooms, garden, parking",
        zip: "1201",
        city: "Geneva",
        country: "CH",
        radius: 15,
        rooms_min: "4",
        rooms_max: "6",
        livable_space_min: "150",
        livable_space_max: "300",
        surface_land_min: "",
        surface_land_max: "",
        person_id: 12,
        assigned_agent_id: 3,
        deleted_at: null,
        created_at: "2026-07-29T09:00:00Z",
        updated_at: "2026-07-29T09:00:00Z",
        created_by: 1,
        updated_by: 1,
      },
      {
        id: 2,
        uuid: "req-002-uuid",
        reference: "REQ-2026-002",
        first_name: "Thomas",
        last_name: "Schmidt",
        phones: "+41 78 444 5678",
        emails: "thomas.schmidt@email.ch",
        language: "de",
        memo: "Looking for investment property",
        status: "in_progress",
        transaction: "sale",
        category: "land",
        budget_min: "500000",
        budget_max: "1500000",
        currency: "CHF",
        notes: "Interested in building plots in Valais",
        zip: "1936",
        city: "Verbier",
        country: "CH",
        radius: 25,
        rooms_min: "",
        rooms_max: "",
        livable_space_min: "",
        livable_space_max: "",
        surface_land_min: "800",
        surface_land_max: "2000",
        person_id: 15,
        assigned_agent_id: 5,
        deleted_at: null,
        created_at: "2026-07-28T11:30:00Z",
        updated_at: "2026-07-29T14:00:00Z",
        created_by: 1,
        updated_by: 2,
      },
      {
        id: 3,
        uuid: "req-003-uuid",
        reference: "REQ-2026-003",
        first_name: "Isabella",
        last_name: "Ferrari",
        phones: "+39 340 888 9999",
        emails: "isabella.f@email.it",
        language: "it",
        memo: "Luxury property search",
        status: "open",
        transaction: "sale",
        category: "residential",
        budget_min: "5000000",
        budget_max: "10000000",
        currency: "CHF",
        notes: "Villa with lake view, pool, high-end finishes",
        zip: "1095",
        city: "Lutry",
        country: "CH",
        radius: 20,
        rooms_min: "6",
        rooms_max: "10",
        livable_space_min: "300",
        livable_space_max: "600",
        surface_land_min: "1000",
        surface_land_max: "3000",
        person_id: 22,
        assigned_agent_id: 2,
        deleted_at: null,
        created_at: "2026-07-27T13:15:00Z",
        updated_at: "2026-07-27T13:15:00Z",
        created_by: 1,
        updated_by: 1,
      },
      {
        id: 4,
        uuid: "req-004-uuid",
        reference: "REQ-2026-004",
        first_name: "Pierre",
        last_name: "Lefevre",
        phones: "+41 79 777 8888",
        emails: "pierre.l@email.ch",
        language: "fr",
        memo: "First-time buyer",
        status: "closed",
        transaction: "sale",
        category: "residential",
        budget_min: "800000",
        budget_max: "1500000",
        currency: "CHF",
        notes: "Apartment in Geneva, 2-3 bedrooms",
        zip: "1201",
        city: "Geneva",
        country: "CH",
        radius: 10,
        rooms_min: "2",
        rooms_max: "3",
        livable_space_min: "70",
        livable_space_max: "120",
        surface_land_min: "",
        surface_land_max: "",
        person_id: 8,
        assigned_agent_id: 4,
        deleted_at: null,
        created_at: "2026-07-25T10:00:00Z",
        updated_at: "2026-07-26T16:00:00Z",
        created_by: 1,
        updated_by: 3,
      },
    ],
    activities: [
      {
        id: 1,
        title: "Property Viewing - Geneva Penthouse",
        type: "viewing",
        status: "scheduled",
        start_time: "2026-07-30T14:00:00Z",
        end_time: "2026-07-30T15:30:00Z",
        agent_id: 3,
        contact_id: 12,
        request_id: 1,
        property_id: 8,
        notes: "Client wants to see the lake view terrace",
        created_at: "2026-07-29T10:00:00Z",
        updated_at: "2026-07-29T10:00:00Z",
      },
      {
        id: 2,
        title: "Follow-up Call - Verbier Plot",
        type: "call",
        status: "completed",
        start_time: "2026-07-29T09:00:00Z",
        end_time: "2026-07-29T09:30:00Z",
        agent_id: 5,
        contact_id: 15,
        request_id: 2,
        property_id: 9,
        notes: "Discussed building permit details",
        created_at: "2026-07-28T16:00:00Z",
        updated_at: "2026-07-29T09:35:00Z",
      },
      {
        id: 3,
        title: "Contract Signing - Lutry Villa",
        type: "meeting",
        status: "completed",
        start_time: "2026-07-28T10:00:00Z",
        end_time: "2026-07-28T12:00:00Z",
        agent_id: 2,
        contact_id: 22,
        request_id: 3,
        property_id: 1,
        notes: "Final contract signed, notary appointment scheduled",
        created_at: "2026-07-27T14:00:00Z",
        updated_at: "2026-07-28T12:30:00Z",
      },
      {
        id: 4,
        title: "Market Analysis Presentation",
        type: "presentation",
        status: "scheduled",
        start_time: "2026-07-31T11:00:00Z",
        end_time: "2026-07-31T12:00:00Z",
        agent_id: 1,
        contact_id: 0,
        request_id: 0,
        property_id: 0,
        notes: "Monthly market update for VIP clients",
        created_at: "2026-07-29T08:00:00Z",
        updated_at: "2026-07-29T08:00:00Z",
      },
      {
        id: 5,
        title: "Site Visit - New Development",
        type: "viewing",
        status: "pending",
        start_time: "2026-08-01T09:00:00Z",
        end_time: "2026-08-01T11:00:00Z",
        agent_id: 7,
        contact_id: 8,
        request_id: 4,
        property_id: 0,
        notes: "Group viewing for 3 potential buyers",
        created_at: "2026-07-29T15:00:00Z",
        updated_at: "2026-07-29T15:00:00Z",
      },
    ],
  },
}

// ==================== STORE ====================

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboard: null,
  loading: false,
  error: null,
  weeklyTransactions: [],
  monthlyLeads: [],
  leadSources: [],
  activityCompletionRate: 0,

 fetchDashboard: async () => {
  set({
    loading: true,
    error: null,
  })

  try {
    const { data } = await api.get<DashboardResponse>(
      "/admin/dashboard"
    )

    if (data.success) {
      set({
        dashboard: data.data,
        loading: false,
      })
    } else {
      set({
        error: data.message,
        loading: false,
      })
    }
  } catch (err: any) {
    set({
      error:
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch dashboard",
      loading: false,
    })
  }
},

  fetchChartData: async () => {
    // In production, this would fetch from separate chart endpoints
    // For now, populate with mock data
    set({
      weeklyTransactions: mockWeeklyTransactions,
      monthlyLeads: mockMonthlyLeads,
      leadSources: mockLeadSources,
      activityCompletionRate: 82,
    })
  },
}))
