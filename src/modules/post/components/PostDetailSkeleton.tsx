"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function PostDetailSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Media Skeleton */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <Skeleton className="aspect-video w-full" />
        <div className="flex gap-2 p-3 bg-slate-50">
          <Skeleton className="h-14 w-20 rounded-lg" />
          <Skeleton className="h-14 w-20 rounded-lg" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <Skeleton className="h-4 w-24 mb-4" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-slate-50 space-y-2">
              <Skeleton className="h-8 w-8 rounded-lg mx-auto" />
              <Skeleton className="h-5 w-8 mx-auto" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
