import { useSuggestionPaginationQuery } from '@/http/hooks/suggestion.hooks';
import { createFileRoute } from '@tanstack/react-router';
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { suggestionColumns } from './-columns';
import { DataTable } from '@/components/ui/data-table';
import { useGlobalPageSize } from '@/hooks/use-global-page-size';
import { useScopedFilters } from '@/hooks/use-scoped-filters';

export const Route = createFileRoute('/_app/app/associations/suggestions/')({
  component: Suggestions,
})

function Suggestions() {
  const { pageSize, setSize } = useGlobalPageSize();

  const { filters, setPage } = useScopedFilters("suggestions");
  const page = filters.page ?? 0;

  const { data: result, isLoading } =
    useSuggestionPaginationQuery(filters, page, pageSize);

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
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
