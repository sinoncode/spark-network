import {
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface UserTableSkeletonProps {
  rows?: number;
}

export function UserTableSkeleton({
  rows = 10,
}: UserTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="pl-4">
            <Skeleton className="h-4 w-24" />
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />

              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-36" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-16 rounded-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-7 w-7" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}