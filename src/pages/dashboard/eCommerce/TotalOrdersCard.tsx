"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, XAxis } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { useDashboardStore } from "@/store/Dashboard/dashboard.store";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  value: {
    label: "Total Users",
    color: "#7928ca",
  },
} satisfies ChartConfig;

function generateChartData(baseValue: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return months.map((month) => ({
    month,
    value: Math.max(
      0,
      Math.round(baseValue * (0.5 + Math.random() * 0.8))
    ),
  }));
}

export default function TotalUsersCard() {
  const { stats, isLoading } = useDashboardStore();

  const value = stats?.totalUsers ?? null;

  const chartData =
    value !== null ? generateChartData(value) : [];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-3">
          <p className="text-md text-muted-foreground">
            Total Users
          </p>

          {isLoading ? (
            <Skeleton className="h-9 w-24 mt-1" />
          ) : (
            <h2 className="text-3xl font-semibold">
              {value ?? "—"}
            </h2>
          )}
        </div>

        {/* Growth */}
        {isLoading ? (
          <Skeleton className="h-5 w-32 mb-5" />
        ) : (
          <p className="text-sm flex gap-2 mb-5">
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.4%
            </span>

            from last month
          </p>
        )}

        {/* Chart */}
        {isLoading ? (
          <Skeleton className="h-14 w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-14 w-full"
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="fillUsers"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#7928ca"
                    stopOpacity={0.6}
                  />

                  <stop
                    offset="95%"
                    stopColor="#ff0080"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                hide
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                tickFormatter={(value) =>
                  value.slice(0, 3)
                }
              />

              <Area
                dataKey="value"
                type="monotone"
                fill="url(#fillUsers)"
                stroke="#7928ca"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}