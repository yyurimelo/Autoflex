// icons
import type { RawMaterialDataModel } from "@/@types/raw-material/RawMaterialDataModel";
import type { ColumnDef } from "@tanstack/react-table";
import { RawMaterialActions } from "./-actions";

function formatQuantity(value: number | undefined) {
  if (value === undefined) return "-";

  return value.toLocaleString("pt-BR");
}

export const columns: ColumnDef<RawMaterialDataModel>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => row.original.name || "-",
  },
  {
    accessorKey: "stockQuantity",
    header: "Quantidade em Estoque",
    cell: ({ row }) => formatQuantity(row.original.stockQuantity) || "-",
  },
  {
    id: "actions",
    cell: ({ row }) => <RawMaterialActions item={row.original} />,
  },
];