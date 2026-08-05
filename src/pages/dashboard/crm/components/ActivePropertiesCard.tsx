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
  HomeIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts"
import { useDashboardStore } from "@/store/dashboard.store"
import { motion } from "framer-motion"

const propertiesSparkData = [
  { value: 220 }, { value: 245 }, { value: 260 }, { value: 275 },
  { value: 290 }, { value: 310 }, { value: 289 },
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

export default function ActivePropertiesCard() {
  const { dashboard, loading, fetchDashboard } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const count = dashboard?.status?.active_properties || 0

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
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="group border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 hover:border-gray-300 dark:hover:border-neutral-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/15 transition-transform duration-200 group-hover:scale-110">
              <HomeIcon className="h-4 w-4" />
            </div>
            <span className="font-medium text-foreground">Active Properties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {count.toLocaleString()}
            </h2>
            <TrendBadge value="+3.2%" positive={true} />
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertiesSparkData}>
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  fill="#10b981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
