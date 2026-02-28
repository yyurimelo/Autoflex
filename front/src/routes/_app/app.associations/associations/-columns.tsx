import type { AssociationDataModel } from "@/@types/association/AssociationDataModel";
import type { ColumnDef } from "@tanstack/react-table";
import { AssociationActions } from "./-actions";

export const associationColumns: ColumnDef<AssociationDataModel>[] = [
  {
    accessorKey: "product.id",
    header: "Produto",
    cell: ({ row }) => row.original.product.name || "-",
  },
  {
    accessorKey: "requiredQuantity",
    header: "Quantidade Requerida",
    cell: ({ row }) => row.original.requiredQuantity || "-",
  },
  {
    accessorKey: "rawMaterial.id",
    header: "Matéria Prima",
    cell: ({ row }) => row.original.rawMaterial.name || "-",
  },
  {
    accessorKey: "rawMaterial.stockQuantity",
    header: "Estoque Disponível",
    cell: ({ row }) => row.original.rawMaterial.stockQuantity || "-",
  },
  {
    id: "actions",
    cell: ({ row }) => <AssociationActions item={row.original} />,
  },
];