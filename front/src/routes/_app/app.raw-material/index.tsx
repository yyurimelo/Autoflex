import { useRawMaterialPaginationQuery } from '@/http/hooks/raw-material.hooks';
import { createFileRoute } from '@tanstack/react-router';
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './-columns';
import { DataTable } from '@/components/ui/data-table';
import { RawMaterialCreate } from './-create';
import { useGlobalPageSize } from '@/hooks/use-global-page-size';
import { RawMaterialFilters } from './-filters';
import { useScopedFilters } from '@/hooks/use-scoped-filters';
import { RawMaterialFiltersTag } from './-filters-tag';

export const Route = createFileRoute('/_app/app/raw-material/')({
  component: RawMaterial,
})

function RawMaterial() {
  const { pageSize, setSize } = useGlobalPageSize();

  const { filters, setPage } = useScopedFilters("raw-materials");
  const page = filters.page ?? 0;

  const { data: result, isLoading } =
    useRawMaterialPaginationQuery(filters, page, pageSize);

  const table = useReactTable({
    data: result?.content ?? [],
    columns,
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
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Matérias-primas</h1>
          <span className="text-base text-muted-foreground">
            Segue abaixo a lista de matérias-primas.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <RawMaterialFilters />
          <RawMaterialCreate />
        </div>
      </header>

      <RawMaterialFiltersTag />

      <div className="grid grid-cols-1 mt-6">
        <DataTable
          columns={columns}
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
