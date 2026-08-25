"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useDashboardStore } from "@/store/Dashboard/dashboard.store";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown } from "lucide-react";

const chartConfig = {
  value: { label: "Revenue", color: "#17ad37" },
} satisfies ChartConfig;

function generateChartData(baseValue: number) {
  const months = ["January", "February", "March", "April", "May", "June", "July"];
  return months.map((month) => ({
    month,
    value: Math.max(0, Math.round(baseValue * (0.6 + Math.random() * 0.9))),
  }));
}

export default function TotalRevenueCard() {
  const { stats, isLoading } = useDashboardStore();
  const value = stats?.dau ?? null;
  const chartData = value !== null ? generateChartData(value) : [];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-3">
          <p className="text-md text-muted-foreground">Total Revenue</p>
          {isLoading ? <Skeleton className="h-9 w-28 mt-1" /> : (
            <h2 className="text-3xl font-semibold">${value ?? "—"}</h2>
          )}
        </div>

        {isLoading ? <Skeleton className="h-5 w-32 mb-5" /> : (
          <p className="text-sm flex gap-2 mb-5">
            <span className="text-red-600 font-semibold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />-18.2%
            </span>
            from last month
          </p>
        )}

        {isLoading ? <Skeleton className="h-14 w-full" /> : (
          <ChartContainer config={chartConfig} className="h-14 w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis hide dataKey="month" tickLine={false} axisLine={false} />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#98ec2d" stopOpacity={1} />
                  <stop offset="100%" stopColor="#17ad37" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Bar dataKey="value" fill="url(#revenueGradient)" radius={6} maxBarSize={15} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}