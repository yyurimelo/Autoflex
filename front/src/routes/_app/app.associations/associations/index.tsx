import { useAssociationPaginationQuery } from '@/http/hooks/association.hooks';
import { createFileRoute } from '@tanstack/react-router';
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { associationColumns } from './-columns';
import { DataTable } from '@/components/ui/data-table';
import { useGlobalPageSize } from '@/hooks/use-global-page-size';
import { useScopedFilters } from '@/hooks/use-scoped-filters';
import { AssociationFiltersTag } from './-filters-tag';

export const Route = createFileRoute('/_app/app/associations/associations/')({
  component: AssociationsGrid,
})

export function AssociationsGrid() {
  const { pageSize, setSize } = useGlobalPageSize();

  const { filters, setPage } = useScopedFilters("associations");
  const page = filters.page ?? 0;

  const { data: result, isLoading } =
    useAssociationPaginationQuery(filters, page, pageSize);

  const table = useReactTable({
    data: result?.content ?? [],
    columns: associationColumns,
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
      <div className='mt-4'>
        <AssociationFiltersTag />
      </div>

      <div className="grid grid-cols-1 mt-6">
        <DataTable
          columns={associationColumns}
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
