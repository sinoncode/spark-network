"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { useDashboardStore } from "@/store/dashboard.store"
import { motion } from "framer-motion"
import {
  Building2,
  KeyRound,
  TrendingUp,
  Calendar,
} from "lucide-react"

type Range = "weekly" | "monthly" | "yearly"

const weeklyData = [
  { label: "Mon", sales: 12, rentals: 4 },
  { label: "Tue", sales: 18, rentals: 6 },
  { label: "Wed", sales: 15, rentals: 3 },
  { label: "Thu", sales: 22, rentals: 8 },
  { label: "Fri", sales: 28, rentals: 5 },
  { label: "Sat", sales: 20, rentals: 7 },
  { label: "Sun", sales: 16, rentals: 4 },
]

const monthlyData = [
  { label: "Jan", sales: 85, rentals: 32 },
  { label: "Feb", sales: 110, rentals: 45 },
  { label: "Mar", sales: 95, rentals: 38 },
  { label: "Apr", sales: 135, rentals: 52 },
  { label: "May", sales: 128, rentals: 48 },
  { label: "Jun", sales: 155, rentals: 60 },
  { label: "Jul", sales: 142, rentals: 55 },
  { label: "Aug", sales: 168, rentals: 68 },
  { label: "Sep", sales: 145, rentals: 58 },
  { label: "Oct", sales: 175, rentals: 72 },
  { label: "Nov", sales: 160, rentals: 65 },
  { label: "Dec", sales: 190, rentals: 78 },
]

const yearlyData = [
  { label: "2021", sales: 850, rentals: 320 },
  { label: "2022", sales: 1120, rentals: 450 },
  { label: "2023", sales: 1350, rentals: 580 },
  { label: "2024", sales: 1580, rentals: 720 },
  { label: "2025", sales: 1820, rentals: 890 },
]

const chartDataMap: Record<Range, typeof weeklyData> = {
  weekly: weeklyData,
  monthly: monthlyData,
  yearly: yearlyData,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-neutral-600 dark:text-neutral-300 capitalize">
              {entry.name}:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {entry.value}
            </span>
          </div>
        ))}
        <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-neutral-800">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Total: {payload.reduce((acc: number, curr: any) => acc + curr.value, 0)}
          </span>
        </div>
      </div>
    )
  }
  return null
}

export default function PropertyTransactionsChart() {
  const [range, setRange] = useState<Range>("monthly")
  const { dashboard, loading, fetchDashboard, fetchChartData } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
    fetchChartData()
  }, [fetchDashboard, fetchChartData])

  const data = chartDataMap[range]
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0)
  const totalRentals = data.reduce((acc, curr) => acc + curr.rentals, 0)
  const totalTransactions = totalSales + totalRentals
  const salesPercentage = totalTransactions > 0 ? Math.round((totalSales / totalTransactions) * 100) : 0

  if (loading) {
    return (
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row flex-wrap gap-3 items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-48 rounded-lg" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200 dark:border-neutral-700/50 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
        <CardHeader className="flex flex-row flex-wrap gap-3 items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Property Transactions
            </CardTitle>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +{salesPercentage}% sales vs rentals this {range.slice(0, -2)}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex gap-1 rounded-lg border border-gray-200 dark:border-neutral-700 p-1 bg-gray-50 dark:bg-neutral-800">
            {(["weekly", "monthly", "yearly"] as Range[]).map((item) => (
              <Button
                key={item}
                size="sm"
                variant="ghost"
                className={cn(
                  "capitalize text-xs font-medium rounded-md transition-all duration-200",
                  range === item
                    ? "bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                )}
                onClick={() => setRange(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                barGap={4}
                barSize={range === "yearly" ? 40 : 28}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickMargin={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.08)" }} />

                {/* Sales */}
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="#3b82f6"
                  radius={[0, 0, 6, 6]}
                  name="Sales"
                  animationDuration={800}
                />

                {/* Rentals */}
                <Bar
                  dataKey="rentals"
                  stackId="a"
                  fill="#f59e0b"
                  radius={[6, 6, 0, 0]}
                  name="Rentals"
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-blue-500" />
              <span className="text-neutral-600 dark:text-neutral-300">Property Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-amber-500" />
              <span className="text-neutral-600 dark:text-neutral-300">Property Rentals</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 space-y-3">
            {/* Total Sales */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 hover:bg-gray-100 dark:hover:bg-neutral-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Total Sales</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">This {range.slice(0, -2)}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{totalSales.toLocaleString()}</span>
            </div>

            {/* Total Rentals */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 hover:bg-gray-100 dark:hover:bg-neutral-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Total Rentals</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">This {range.slice(0, -2)}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{totalRentals.toLocaleString()}</span>
            </div>

            {/* Conversion Rate */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 hover:bg-gray-100 dark:hover:bg-neutral-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Sales Ratio</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Of all transactions</p>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{salesPercentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
