import { useProductPaginationQuery } from '@/http/hooks/product.hooks';
import { createFileRoute } from '@tanstack/react-router';
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './-columns';
import { DataTable } from '@/components/ui/data-table';
import { ProductCreate } from './-create';
import { useGlobalPageSize } from '@/hooks/use-global-page-size';
import { ProductFilters } from './-filters';
import { useScopedFilters } from '@/hooks/use-scoped-filters';
import { ProductFiltersTag } from './-filters-tag';

export const Route = createFileRoute('/_app/app/product/')({
  component: Product,
})

export function Product() {
  const { pageSize, setSize } = useGlobalPageSize();

  const { filters, setPage } = useScopedFilters("products");
  const page = filters.page ?? 0;

  const { data: result, isLoading } =
    useProductPaginationQuery(filters, page, pageSize);

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
          <h1 className="text-xl font-bold">Produtos</h1>
          <span className="text-base text-muted-foreground">
            Segue abaixo a lista de produtos.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ProductFilters />
          <ProductCreate />
        </div>
      </header>

      <ProductFiltersTag />

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
