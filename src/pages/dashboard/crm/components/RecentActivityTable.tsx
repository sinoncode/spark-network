"use client"

import { useEffect } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboardStore } from "@/store/dashboard.store"
import { motion, AnimatePresence } from "framer-motion"
import {
  UserPlus,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  BadgeCheck,
  AlertCircle,
  Hourglass,
  Building2,
  Banknote,
  BedDouble,
  ArrowUpRight,
} from "lucide-react"

// ==================== HELPERS ====================

const getLeadStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
    contacted: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
    qualified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    converted: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400 border-violet-200 dark:border-violet-500/30",
    lost: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/30",
  }
  return colors[status.toLowerCase()] || colors.new
}

const getRequestStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    open: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
    "in_progress": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
    closed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/30",
  }
  return colors[status.toLowerCase()] || colors.open
}

const getActivityStatusIcon = (status: string) => {
  const icons: Record<string, typeof BadgeCheck> = {
    completed: BadgeCheck,
    scheduled: Calendar,
    pending: Hourglass,
    cancelled: AlertCircle,
  }
  return icons[status.toLowerCase()] || Clock
}

const getActivityStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
    scheduled: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10",
    pending: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10",
    cancelled: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
  }
  return colors[status.toLowerCase()] || colors.pending
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

const formatCurrency = (min: string, max: string, currency: string) => {
  if (!min && !max) return "Budget not specified"
  const minVal = min ? parseInt(min).toLocaleString() : "0"
  const maxVal = max ? parseInt(max).toLocaleString() : "∞"
  return `${currency} ${minVal} – ${maxVal}`
}

// ==================== TABS ====================

const LeadsTab = () => {
  const { dashboard } = useDashboardStore()
  const leads = dashboard?.latest?.leads || []

  return (
    <div className="space-y-1">
      {leads.map((lead, index) => (
        <motion.div
          key={lead.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: index * 0.04 }}
          className="group flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
            {lead.first_name[0]}{lead.last_name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {lead.first_name} {lead.last_name}
              </p>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${getLeadStatusColor(lead.status)}`}>
                {lead.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {lead.email}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 capitalize">
                via {lead.source}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {formatDate(lead.created_at)}
            </span>
            <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 ml-auto mt-0.5 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const RequestsTab = () => {
  const { dashboard } = useDashboardStore()
  const requests = dashboard?.latest?.requests || []

  return (
    <div className="space-y-1">
      {requests.map((req, index) => (
        <motion.div
          key={req.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: index * 0.04 }}
          className="group flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {req.reference}
              </p>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${getRequestStatusColor(req.status)}`}>
                {req.status.replace("_", " ")}
              </Badge>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              {req.first_name} {req.last_name} · <span className="capitalize">{req.transaction}</span> · <span className="capitalize">{req.category}</span>
            </p>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Banknote className="w-3 h-3" />
                {formatCurrency(req.budget_min, req.budget_max, req.currency)}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {req.city}
              </span>
              {req.rooms_min && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                  <BedDouble className="w-3 h-3" />
                  {req.rooms_min}-{req.rooms_max} rooms
                </span>
              )}
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {formatDate(req.created_at)}
            </span>
            <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 ml-auto mt-0.5 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const ActivitiesTab = () => {
  const { dashboard } = useDashboardStore()
  const activities = dashboard?.latest?.activities || []

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const StatusIcon = getActivityStatusIcon(activity.status)
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="group flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getActivityStatusColor(activity.status)}`}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {activity.title}
                </p>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 capitalize ${getActivityStatusColor(activity.status)} border-current`}>
                  {activity.status}
                </Badge>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 capitalize">
                {activity.type} · Agent #{activity.agent_id}
                {activity.property_id > 0 && (
                  <span className="ml-1">· Property #{activity.property_id}</span>
                )}
              </p>
              {activity.notes && (
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-1">
                  {activity.notes}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(activity.start_time)}
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 ml-auto mt-0.5 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ==================== MAIN COMPONENT ====================

export default function RecentActivityTable() {
  const { dashboard, loading, fetchDashboard } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const counts = {
    leads: dashboard?.latest?.leads?.length || 0,
    requests: dashboard?.latest?.requests?.length || 0,
    activities: dashboard?.latest?.activities?.length || 0,
  }

  if (loading) {
    return (
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
        <CardContent className="p-0">
          <Tabs defaultValue="leads" className="w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-neutral-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h3>
              <TabsList className="bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg h-auto">
                <TabsTrigger
                  value="leads"
                  className="text-xs px-3 py-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                  Leads
                  <span className="ml-1.5 text-[10px] bg-gray-200 dark:bg-neutral-600 text-gray-600 dark:text-neutral-300 px-1.5 py-0.5 rounded-full">
                    {counts.leads}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="requests"
                  className="text-xs px-3 py-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-all"
                >
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  Requests
                  <span className="ml-1.5 text-[10px] bg-gray-200 dark:bg-neutral-600 text-gray-600 dark:text-neutral-300 px-1.5 py-0.5 rounded-full">
                    {counts.requests}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="text-xs px-3 py-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Tasks
                  <span className="ml-1.5 text-[10px] bg-gray-200 dark:bg-neutral-600 text-gray-600 dark:text-neutral-300 px-1.5 py-0.5 rounded-full">
                    {counts.activities}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-700 hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-neutral-600">
              <AnimatePresence mode="wait">
                <TabsContent value="leads" className="mt-0">
                  <LeadsTab />
                </TabsContent>
                <TabsContent value="requests" className="mt-0">
                  <RequestsTab />
                </TabsContent>
                <TabsContent value="activities" className="mt-0">
                  <ActivitiesTab />
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
