
// icons
import type { ProductDataModel } from "@/@types/product/ProductDataModel";
import type { ColumnDef } from "@tanstack/react-table";
import { AppWindow } from "lucide-react";

function formatPrice(value: string | number | undefined) {
  if (value === undefined) return "-";

  if (typeof value === "number") {
    // Formata para duas casas decimais e substitui ponto por vírgula
    const formatted = value.toFixed(2).replace(".", ",");
    return `R$ ${formatted}`;
  }

  if (typeof value === "string") {
    // Se for string, mostra sem R$
    return value;
  }

  return value;
}

export const columns: ColumnDef<ProductDataModel>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => row.original.name || "-",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => formatPrice(row.original.price) || "-",
  },
];
