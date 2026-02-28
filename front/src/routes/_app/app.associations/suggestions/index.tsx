import { useSuggestionPaginationQuery } from '@/http/hooks/suggestion.hooks';
import { createFileRoute } from '@tanstack/react-router';
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { suggestionColumns } from './-columns';
import { DataTable } from '@/components/ui/data-table';
import { useGlobalPageSize } from '@/hooks/use-global-page-size';
import { useState } from 'react';

export const Route = createFileRoute('/_app/app/associations/suggestions/')({
  component: Suggestions,
})

export function Suggestions() {
  const { pageSize, setSize } = useGlobalPageSize();
  const [page, setPage] = useState(0);

  const { data: result, isLoading } =
    useSuggestionPaginationQuery(page, pageSize);

  const table = useReactTable({
    data: result?.content ?? [],
    columns: suggestionColumns,
    manualPagination: true,
    enableRowSelection: true,
    pageCount: result?.totalPages ?? 0,
    state: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="grid grid-cols-1 mt-6">
        <DataTable
          columns={suggestionColumns}
          data={table}
          isLoading={isLoading}
          hasPagination={true}
          onPageChange={(newPage) => setPage(newPage - 1)}
          onPageSizeChange={(size) => setSize(Number(size))}
        />
      </div>
    </>
  )
}