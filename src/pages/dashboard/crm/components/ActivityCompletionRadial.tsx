"use client"

import { useEffect } from "react"
import {
  CircleCheckBig,
  ShieldHalf,
  Clock,
  EllipsisVertical,
  LogOutIcon,
  SettingsIcon,
  CreditCardIcon,
  UserIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardStore } from "@/store/dashboard.store"
import { motion } from "framer-motion"

export default function ActivityCompletionRadial() {
  const { dashboard, loading, fetchDashboard } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const completed = dashboard?.status?.completed_activities || 178
  const total = dashboard?.counts?.activities || 215
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  const remaining = total - completed

  const chartData = [
    { name: "completed", value: completionRate, fill: "#10b981" },
  ]

  if (loading) {
    return (
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full rounded-xl mx-auto" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CircleCheckBig className="w-5 h-5 text-emerald-500" />
              Activity Completion
            </CardTitle>
            <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Task completion rate this month
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <EllipsisVertical className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                View detailed report
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Download report
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Refresh data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent>
          {/* Radial Chart */}
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={chartData}
                endAngle={100}
                innerRadius={75}
                outerRadius={120}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-gray-100 dark:first:fill-neutral-800 last:fill-white dark:last:fill-neutral-900"
                  polarRadius={[80, 68]}
                />
                <RadialBar
                  dataKey="value"
                  background={{ fill: "rgba(148, 163, 184, 0.1)" }}
                  cornerRadius={10}
                  fill="#10b981"
                  animationDuration={1200}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-gray-900 dark:fill-white text-4xl font-bold"
                            >
                              {completionRate}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-neutral-500 dark:fill-neutral-400 text-sm"
                            >
                              Completed
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div className="mt-4 space-y-3">
            {/* Completed */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-800/20 hover:bg-gray-100 dark:hover:bg-neutral-800/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <CircleCheckBig className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Completed</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">This month</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{completed}</span>
              </div>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-800/20 hover:bg-gray-100 dark:hover:bg-neutral-800/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <ShieldHalf className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Pending</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Awaiting action</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{remaining}</span>
              </div>
            </div>

            {/* Avg Response Time */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-800/20 hover:bg-gray-100 dark:hover:bg-neutral-800/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Avg Response</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Per activity</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2.4 hrs</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
