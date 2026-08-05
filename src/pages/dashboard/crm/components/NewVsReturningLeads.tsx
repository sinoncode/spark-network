"use client"

import { useState, useEffect } from "react"
import {
  EllipsisVertical,
  LogOutIcon,
  SettingsIcon,
  CreditCardIcon,
  UserIcon,
  Users,
  UserPlus,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
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

const monthlyData = [
  { month: "Jan", new_leads: 45, returning: 12 },
  { month: "Feb", new_leads: 52, returning: 18 },
  { month: "Mar", new_leads: 38, returning: 15 },
  { month: "Apr", new_leads: 65, returning: 22 },
  { month: "May", new_leads: 58, returning: 20 },
  { month: "Jun", new_leads: 72, returning: 28 },
  { month: "Jul", new_leads: 68, returning: 25 },
  { month: "Aug", new_leads: 80, returning: 30 },
  { month: "Sep", new_leads: 62, returning: 24 },
  { month: "Oct", new_leads: 90, returning: 35 },
  { month: "Nov", new_leads: 75, returning: 28 },
  { month: "Dec", new_leads: 95, returning: 40 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-neutral-600 dark:text-neutral-300">
              {entry.name}:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function NewVsReturningLeads() {
  const { dashboard, loading, fetchDashboard } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const newLeadsTotal = monthlyData.reduce((acc, curr) => acc + curr.new_leads, 0)
  const returningTotal = monthlyData.reduce((acc, curr) => acc + curr.returning, 0)
  const newLeadsGrowth = 12.5
  const returningGrowth = 8.3

  if (loading) {
    return (
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-[280px] w-full rounded-xl" />
          <div className="space-y-4 border rounded-xl p-4">
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
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-500" />
              New vs Returning Leads
            </CardTitle>
            <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Monthly comparison of lead acquisition
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
            <DropdownMenuContent align="end" className="w-48">
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

        <CardContent className="space-y-4">
          {/* Chart */}
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  dataKey="new_leads"
                  type="monotone"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2, fill: "#8b5cf6" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="New Leads"
                  animationDuration={1000}
                />
                <Line
                  dataKey="returning"
                  type="monotone"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2, fill: "#06b6d4" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Returning"
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-violet-500" />
              <span className="text-neutral-600 dark:text-neutral-300">New Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-500" />
              <span className="text-neutral-600 dark:text-neutral-300">Returning</span>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3 border border-gray-100 dark:border-neutral-800 rounded-xl p-4 bg-gray-50/30 dark:bg-neutral-800/20">
            {/* New Leads */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New Leads</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">This year</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-xs font-medium text-violet-600 border-violet-200 dark:border-violet-500/30 dark:text-violet-400 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{newLeadsGrowth}%
                </Badge>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{newLeadsTotal.toLocaleString()}</p>
              </div>
            </div>

            {/* Returning */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Returning Leads</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">This year</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-xs font-medium text-cyan-600 border-cyan-200 dark:border-cyan-500/30 dark:text-cyan-400 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{returningGrowth}%
                </Badge>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{returningTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
