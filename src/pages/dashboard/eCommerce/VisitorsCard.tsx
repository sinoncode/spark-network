"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useDashboardStore } from "@/store/Dashboard/dashboard.store";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  value: { label: "Visitors", color: "#ffc400" },
} satisfies ChartConfig;

function generateChartData(baseValue: number) {
  const months = ["January", "February", "March", "April", "May", "June", "July"];
  return months.map((month) => ({
    month,
    value: Math.max(0, Math.round(baseValue * (0.4 + Math.random() * 1.2))),
  }));
}

export default function VisitorsCard() {
  const { stats, isLoading } = useDashboardStore();
  const value = stats?.totalPosts ?? null;
  const chartData = value !== null ? generateChartData(value) : [];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-3">
          <p className="text-md text-muted-foreground">Visitors</p>
          {isLoading ? <Skeleton className="h-9 w-28 mt-1" /> : (
            <h2 className="text-3xl font-semibold">{value ?? "—"}</h2>
          )}
        </div>

        {isLoading ? <Skeleton className="h-5 w-32 mb-5" /> : (
          <p className="text-sm flex gap-2 mb-5">
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />+9.6%
            </span>
            from last month
          </p>
        )}

        {isLoading ? <Skeleton className="h-14 w-full" /> : (
          <ChartContainer config={chartConfig} className="h-14 w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f76e1e" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#ffc400" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis hide dataKey="month" />
              <Area type="monotone" dataKey="value" stroke="#ffc400" fill="url(#fillVisitors)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}