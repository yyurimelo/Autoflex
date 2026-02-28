import type { SuggestionDataModel } from "@/@types/suggestion/SuggestionDataModel";
import type { ColumnDef } from "@tanstack/react-table";

function formatPrice(value: number | undefined) {
  if (value === undefined) return "-";
  
  const formatted = value.toFixed(2).replace(".", ",");
  return `R$ ${formatted}`;
}

function formatQuantity(value: number | undefined) {
  if (value === undefined) return "-";
  
  return value.toString();
}

export const suggestionColumns: ColumnDef<SuggestionDataModel>[] = [
  {
    accessorKey: "productName",
    header: "Produto",
    cell: ({ row }) => row.original.productName || "-",
  },
  {
    accessorKey: "producibleQuantity",
    header: "Qtd. Produzível",
    cell: ({ row }) => formatQuantity(row.original.producibleQuantity),
  },
  {
    accessorKey: "unitCost",
    header: "Custo Unitário",
    cell: ({ row }) => formatPrice(row.original.unitCost),
  },
  {
    accessorKey: "finalPrice",
    header: "Preço Final",
    cell: ({ row }) => formatPrice(row.original.finalPrice),
  },
  {
    accessorKey: "limitingMaterial",
    header: "Material Limitante",
    cell: ({ row }) => row.original.limitingMaterial || "-",
  },
];