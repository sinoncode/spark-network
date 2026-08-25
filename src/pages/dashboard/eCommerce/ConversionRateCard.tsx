"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useDashboardStore } from "@/store/Dashboard/dashboard.store";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  value: { label: "Conversion Rate", color: "#ee0979" },
} satisfies ChartConfig;

function generateChartData(baseValue: number) {
  const months = ["January", "February", "March", "April", "May", "June", "July"];
  return months.map((month) => ({
    month,
    value: Math.max(0, Math.round(baseValue * (0.3 + Math.random() * 1.5) * 10) / 10),
  }));
}

export default function ConversionRateCard() {
  const { stats, isLoading } = useDashboardStore();
  const value = stats?.pendingModeration ?? null;
  const chartData = value !== null ? generateChartData(value) : [];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-3">
          <p className="text-md text-muted-foreground">Conversion Rate</p>
          {isLoading ? <Skeleton className="h-9 w-20 mt-1" /> : (
            <h2 className="text-3xl font-semibold">{value !== null ? `${value}%` : "—"}</h2>
          )}
        </div>

        {isLoading ? <Skeleton className="h-5 w-32 mb-5" /> : (
          <p className="text-sm flex gap-2 mb-5">
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />+0.4%
            </span>
            from last month
          </p>
        )}

        {isLoading ? <Skeleton className="h-14 w-full" /> : (
          <ChartContainer config={chartConfig} className="h-14 w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis hide dataKey="month" />
              <defs>
                <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ee0979" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ff6a00" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Bar dataKey="value" fill="url(#conversionGradient)" radius={6} maxBarSize={15} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}