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
    accessorKey: "rawMaterial.id",
    header: "Matéria-prima",
    cell: ({ row }) => row.original.rawMaterial.name || "-",
  },
  {
    accessorKey: "requiredQuantity",
    header: "Quantidade Requerida",
    cell: ({ row }) => row.original.requiredQuantity || "-",
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