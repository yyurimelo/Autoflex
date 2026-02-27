import { useProductPaginationQuery } from '@/http/hooks/product.hooks';
import { createFileRoute } from '@tanstack/react-router'
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ProductCreate } from './create';

export const Route = createFileRoute('/_app/app/product/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: result, isLoading } = useProductPaginationQuery();

  const table = useReactTable({
    data: result?.content ?? [],
    columns,
    manualPagination: true,
    enableRowSelection: true,
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

        <ProductCreate />
      </header>

      <div className="grid grid-cols-1 mt-6">
        <DataTable
          data={table}
          columns={columns}
          pagination
        />
      </div>
    </>
  )
}
