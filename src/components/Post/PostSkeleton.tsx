"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { TableRow, TableCell } from "@/components/ui/table"

export function PostsTableSkeleton({ rows = 7 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="border-b border-border/50">
          <TableCell className="pl-4">
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>
          <TableCell className="text-right pr-4">
            <Skeleton className="h-7 w-7 rounded-md ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}