"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type Table as ReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableSkeleton } from "./data-table-skeleton"

// ---------------------------------------------------------------

type PaginationLike<T> = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data?: T[];
};

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[] | PaginationLike<TData> | ReactTable<TData>;
  isLoading?: boolean;
  hasPagination?: boolean;
  onPageChange?: (pageNumber: number) => void | Promise<void>;
  onPageSizeChange?: (pageSize: string) => void | Promise<void>;
  className?: string;
};

// ---------------------------------------------------------------

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  hasPagination = true,
  onPageChange,
  onPageSizeChange,
  className,
}: Props<TData>) {
  const isPaginated = (r: any): r is PaginationLike<TData> =>
    r && typeof r === "object" && "pageNumber" in r && "totalPages" in r;

  const isReactTable = (t: any): t is ReactTable<TData> =>
    t && typeof t === "object" && "getRowModel" in t;

  let table: ReactTable<TData>;
  let isPaginatedData = false;

  if (isReactTable(data)) {
    // Se for um objeto de tabela do React Table, use diretamente
    table = data;
  } else if (isPaginated(data)) {
    // Se for dados paginados, crie uma nova tabela
    isPaginatedData = true;
    table = useReactTable({
      data: data.data || [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
      manualPagination: true,
    });
  } else {
    // Se for array de dados, crie uma nova tabela
    table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
      manualPagination: false,
    });
  }

  // ---------------------------------------------------------------------------

  if (isLoading) {
    return (
      <DataTableSkeleton
        columns={columns.length}
        showPagination={hasPagination}
      />
    );
  }

  const TableMarkup = (
    <div className={`overflow-x-auto rounded border ${className}`}>
      <Table className="min-w-full">
        <TableHeader className="bg-muted/50 sticky top-0 z-30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const PaginationComponent = isPaginatedData ? (
    <DataTablePagination
      pageNumber={(data as PaginationLike<TData>).pageNumber}
      pageSize={(data as PaginationLike<TData>).pageSize}
      totalRecords={(data as PaginationLike<TData>).totalRecords}
      totalPages={(data as PaginationLike<TData>).totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      showPageSizeSelector={!!onPageSizeChange}
    />
  ) : (
    <DataTablePagination
      pageNumber={table.getState().pagination.pageIndex + 1}
      pageSize={table.getState().pagination.pageSize}
      totalPages={table.getPageCount()}
      totalRecords={table.getRowCount()}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      showPageSizeSelector={!!onPageSizeChange}
    />
  );

  return (
    <>
      {TableMarkup}
      {hasPagination && PaginationComponent}
    </>
  );
}