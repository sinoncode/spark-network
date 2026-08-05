"use client"

import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  PhoneCall,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"
import { useDashboardStore } from "@/store/dashboard.store"
import { motion } from "framer-motion"

const contactsSparkData = [
  { value: 620 }, { value: 680 }, { value: 720 }, { value: 780 },
  { value: 810 }, { value: 840 }, { value: 856 },
]

const TrendBadge = ({ value, positive }: { value: string; positive: boolean }) => (
  <span className={`inline-flex items-center gap-1 text-xs font-medium ${
    positive
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-rose-600 dark:text-rose-400"
  }`}>
    {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
    {value}
  </span>
)

export default function ContactsCard() {
  const { dashboard, loading, fetchDashboard } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const count = dashboard?.counts?.contacts || 0

  if (loading) {
    return (
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-20 w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="group border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 hover:border-gray-300 dark:hover:border-neutral-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 text-white shadow-lg shadow-violet-500/25 dark:shadow-violet-500/15 transition-transform duration-200 group-hover:scale-110">
              <PhoneCall className="h-4 w-4" />
            </div>
            <span className="font-medium text-foreground">Total Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {count.toLocaleString()}
            </h2>
            <TrendBadge value="+7.8%" positive={true} />
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={contactsSparkData}>
                <defs>
                  <linearGradient id="contactsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#contactsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
