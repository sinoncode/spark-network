"use client"

import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { useDashboardStore } from "@/store/dashboard.store"
import { motion } from "framer-motion"
import {
  Globe,
  UserCheck,
  MonitorSmartphone,
  DoorOpen,
  Share2,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SourceItem {
  id: string
  label: string
  count: number
  percentage: number
  icon: LucideIcon
  color: string
  bgColor: string
  progressColor: string
  trend: number
}

const sourceData: SourceItem[] = [
  {
    id: "website",
    label: "Website",
    count: 342,
    percentage: 35,
    icon: Globe,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-500/10",
    progressColor: "bg-emerald-500",
    trend: 12,
  },
  {
    id: "referral",
    label: "Referrals",
    count: 218,
    percentage: 22,
    icon: UserCheck,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-500/10",
    progressColor: "bg-blue-500",
    trend: 8,
  },
  {
    id: "portal",
    label: "Property Portals",
    count: 185,
    percentage: 19,
    icon: MonitorSmartphone,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-500/10",
    progressColor: "bg-violet-500",
    trend: 5,
  },
  {
    id: "walkin",
    label: "Walk-ins",
    count: 128,
    percentage: 13,
    icon: DoorOpen,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-500/10",
    progressColor: "bg-amber-500",
    trend: -2,
  },
  {
    id: "social",
    label: "Social Media",
    count: 95,
    percentage: 10,
    icon: Share2,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-500/10",
    progressColor: "bg-rose-500",
    trend: 15,
  },
  {
    id: "other",
    label: "Other Sources",
    count: 32,
    percentage: 3,
    icon: MoreHorizontal,
    color: "text-neutral-600 dark:text-neutral-400",
    bgColor: "bg-neutral-100 dark:bg-neutral-700/30",
    progressColor: "bg-neutral-500",
    trend: 0,
  },
]

const TrendIndicator = ({ value }: { value: number }) => {
  if (value > 0) {
    return (
      <span className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
        <TrendingUp className="mr-0.5 h-3 w-3" />
        {value}%
      </span>
    )
  }
  if (value < 0) {
    return (
      <span className="flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium">
        <TrendingDown className="mr-0.5 h-3 w-3" />
        {Math.abs(value)}%
      </span>
    )
  }
  return (
    <span className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 font-medium">
      <Minus className="mr-0.5 h-3 w-3" />
      0%
    </span>
  )
}

export default function LeadSourcesCard() {
  const { dashboard, loading, fetchDashboard } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const totalLeads = sourceData.reduce((acc, curr) => acc + curr.count, 0)

  if (loading) {
    return (
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Lead Sources
          </CardTitle>
          <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400">
            {totalLeads.toLocaleString()} total leads by acquisition channel
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {sourceData.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bgColor} ${item.color} transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700 dark:text-neutral-200">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.count.toLocaleString()}
                        </span>
                        <TrendIndicator value={item.trend} />
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${item.progressColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
