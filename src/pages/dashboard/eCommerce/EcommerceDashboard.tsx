"use client"

import React, { Suspense, lazy } from "react"
import { cn } from "@/lib/utils"
interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

// Clean default-based lazy imports
const TottalOrdersCard = lazy(() => import("./TotalOrdersCard"))
const TotalRevenueCard = lazy(() => import("./TotalRevenueCard"))
const VisitorsCard = lazy(() => import("./VisitorsCard"))
const ConversionRateCard = lazy(() => import("./ConversionRateCard"))
const SalesAnalysisCard = lazy(() => import("./SalesAnalysisCard"))
const RecentOrdersCard = lazy(() => import("./RecentOrdersCard"))
const SalesByCountriesCard = lazy(() => import("./SalesByCountriesCard"))
const OrderStatus = lazy(() => import("./OrderStatus"))
// const RecentOrdersTable = lazy(() => import("./RecentOrdersTable"))
// const PopularProductsCard = lazy(() => import("./PopularProductsCard"))
export function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        `
        relative
        overflow-hidden
        rounded-3xl

        border
        border-white/10

        bg-white/[0.05]

        backdrop-blur-2xl
        backdrop-saturate-[180%]

        shadow-[0_15px_45px_rgba(0,0,0,0.35),0_0_35px_rgba(252,141,14,0.06)]

        ring-1
        ring-inset
        ring-white/[0.06]

        transition-all
        duration-500
        ease-out

        hover:border-[#FC8D0E]/20
        hover:bg-white/[0.07]

        hover:shadow-[0_20px_55px_rgba(0,0,0,0.45),0_0_45px_rgba(252,141,14,0.12)]

        hover:-translate-y-1
        `,
        className
      )}
    >
      {/* Glass Reflection */}
      <div
        className="
        pointer-events-none
        absolute
        inset-0

        bg-gradient-to-br
        from-white/[0.08]
        via-transparent
        to-transparent
        "
      />

      {/* Top Highlight */}
      <div
        className="
        absolute
        top-0
        left-0
        right-0

        h-px

        bg-gradient-to-r
        from-transparent
        via-white/50
        to-transparent
        "
      />

      {/* Orange Ambient Glow */}
      <div
        className="
        absolute
        -right-16
        -top-16

        h-44
        w-44

        rounded-full

        bg-[#FC8D0E]/10

        blur-[90px]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Reusable Skeleton
function CardSkeleton({ height = 250 }: { height?: number }) {
  return (
    <div
      className="
      w-full

      rounded-3xl

      border
      border-white/10

      bg-white/[0.05]

      backdrop-blur-xl

      animate-pulse

      shadow-[0_10px_35px_rgba(0,0,0,.25)]
      "
      style={{ height }}
    />
  )
}

export default function EcommerceDashboard() {
  return (
    <div className="ecommerce-dashboard">

      {/* Top Stats */}
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

      {/* Main Section */}
      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12">
          <Suspense fallback={<CardSkeleton height={350} />}>
            <GlassCard>
    <SalesAnalysisCard />
</GlassCard>
          </Suspense>
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <Suspense fallback={<CardSkeleton height={260} />}>
            <GlassCard>
    <RecentOrdersCard />
</GlassCard>
          </Suspense>
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <Suspense fallback={<CardSkeleton height={260} />}>
            <GlassCard>
    <OrderStatus />
</GlassCard>
          </Suspense>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <Suspense fallback={<CardSkeleton height={260} />}>
            <GlassCard>
    <SalesByCountriesCard />
</GlassCard>
          </Suspense>
        </div>

        {/* <div className="col-span-12 xl:col-span-8">
          <Suspense fallback={<CardSkeleton height={400} />}>
            <RecentOrdersTable />
          </Suspense>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <Suspense fallback={<CardSkeleton height={300} />}>
            <PopularProductsCard />
          </Suspense>
        </div> */}

      </div>

    </div>
  )
}