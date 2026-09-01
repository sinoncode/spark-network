"use client";

import React, { Suspense, lazy, useEffect } from "react";
import { cn } from "@/lib/utils";

import { useDashboardStore } from "@/store/Dashboard/dashboard.store";
import TottalOrdersCard from "./TotalOrdersCard";
import TotalRevenueCard from "./TotalRevenueCard";
import VisitorsCard from "./VisitorsCard";
import ConversionRateCard from "./ConversionRateCard";

import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SalesAnalysisCard = lazy(() => import("./SalesAnalysisCard"));
const RecentOrdersCard = lazy(() => import("./RecentOrdersCard"));
const SalesByCountriesCard = lazy(() => import("./SalesByCountriesCard"));
const OrderStatus = lazy(() => import("./OrderStatus"));

// ───────────────────────────────────────────────
// GlassCard Component
// ───────────────────────────────────────────────
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        `relative overflow-hidden rounded-3xl
         border border-white/10
         bg-white/[0.05]
         backdrop-blur-2xl backdrop-saturate-[180%]
         shadow-[0_15px_45px_rgba(0,0,0,0.35),0_0_35px_rgba(252,141,14,0.06)]
         ring-1 ring-inset ring-white/[0.06]
         transition-all duration-500 ease-out
         hover:border-[#FC8D0E]/20 hover:bg-white/[0.07]
         hover:shadow-[0_20px_55px_rgba(0,0,0,0.45),0_0_45px_rgba(252,141,14,0.12)]
         hover:-translate-y-1`,
        className
      )}
    >
      {/* Glass Reflection */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

      {/* Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Orange Ambient Glow */}
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#FC8D0E]/10 blur-[90px]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Reusable Skeleton Loader
// ───────────────────────────────────────────────
function CardSkeleton({ height = 160 }: { height?: number }) {
  return (
    <div
      className="rounded-xl border bg-card text-card-foreground shadow  animate-pulse"
      style={{ height }}
    >
      <div className="p-6 space-y-4">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-8 w-20 bg-muted rounded" />
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-14 w-full bg-muted rounded" />
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Dashboard Header
// ───────────────────────────────────────────────
function DashboardHeader() {
  const { isLoading, error, lastUpdated, refreshStats, clearError } = useDashboardStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your platform metrics and performance
        </p>
      </div>

      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={refreshStats}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="sm:ml-4 flex-1 max-w-md">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <AlertTitle className="text-sm">Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-2 text-xs">
            <span className="truncate">{error}</span>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// Top Stats Grid (4 Cards)
// ───────────────────────────────────────────────
function TopStatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-6">
      <Suspense fallback={<CardSkeleton height={160} />}>
        <GlassCard>
          <TottalOrdersCard />
        </GlassCard>
      </Suspense>

      <Suspense fallback={<CardSkeleton height={160} />}>
        <GlassCard>
          <TotalRevenueCard />
        </GlassCard>
      </Suspense>

      <Suspense fallback={<CardSkeleton height={160} />}>
        <GlassCard>
          <VisitorsCard />
        </GlassCard>
      </Suspense>

      <Suspense fallback={<CardSkeleton height={160} />}>
        <GlassCard>
          <ConversionRateCard />
        </GlassCard>
      </Suspense>
    </div>
  );
}

// ───────────────────────────────────────────────
// Main Content Grid
// ───────────────────────────────────────────────
function MainContentGrid() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sales Analysis — Full Width */}
      <div className="col-span-12">
        <Suspense fallback={<CardSkeleton height={350} />}>
          <GlassCard>
            <SalesAnalysisCard />
          </GlassCard>
        </Suspense>
      </div>

      {/* Recent Orders — 4 cols on xl, 6 on lg */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Suspense fallback={<CardSkeleton height={260} />}>
          <GlassCard>
            <RecentOrdersCard />
          </GlassCard>
        </Suspense>
      </div>

      {/* Order Status — 4 cols on xl, 6 on lg */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Suspense fallback={<CardSkeleton height={260} />}>
          <GlassCard>
            <OrderStatus />
          </GlassCard>
        </Suspense>
      </div>

      {/* Sales By Countries — 4 cols on xl, full on smaller */}
      <div className="col-span-12 xl:col-span-4">
        <Suspense fallback={<CardSkeleton height={260} />}>
          <GlassCard>
            <SalesByCountriesCard />
          </GlassCard>
        </Suspense>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Main Dashboard Page
// ───────────────────────────────────────────────
export default function EcommerceDashboard() {
  const { fetchStats } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8 glass-card">
      <DashboardHeader />
      <TopStatsGrid />
      <MainContentGrid />
    </div>
  );
}