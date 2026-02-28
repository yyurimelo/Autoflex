import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableSkeletonProps = {
  columns?: number;
  rows?: number;
  showPagination?: boolean;
};

export function DataTableSkeleton({
  columns = 5,
  rows = 10,
  showPagination = true,
}: DataTableSkeletonProps) {
  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i} className="h-10">
                  <Skeleton className="h-6 w-24 rounded-sm" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <TableCell key={colIdx} className="last:py-0">
                    <Skeleton className="h-6 w-full rounded-sm" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="mt-3">
          <div className="flex items-end justify-between">
            <div className="flex flex-col text-sm gap-0.5">
              <Skeleton className="h-4 w-28 mb-1 rounded-sm" />
              <Skeleton className="h-4 w-32 rounded-sm" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-sm" />
              <Skeleton className="size-8 rounded-sm" />
              <Skeleton className="size-8 rounded-sm" />
              <Skeleton className="size-8 rounded-sm" />
            </div>

            <div className="flex items-center sm:space-x-2">
              <Skeleton className="h-8 w-[70px] rounded-sm" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}