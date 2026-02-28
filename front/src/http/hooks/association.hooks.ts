import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createAssociation, getAssociationsPaginated, removeAssociation, updateAssociation } from "../services/association.service";
import { toast } from "sonner";

export const useAssociationPaginationQuery = (filters: Record<string, any>,
  page: number,
  size: number
) =>
  useQuery({
    queryKey: ["associations", filters, page, size],
    queryFn: () =>
      getAssociationsPaginated({
        productId: filters.productId || undefined,
        rawMaterialId: filters.rawMaterialId || undefined,
        page,
        size,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateAssociationMutation = (
  setOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssociation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["associations"] });
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });

      toast.success("Associação criada com sucesso!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAssociationMutation = (
  id: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeAssociation(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["associations"] });
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      toast.success("Associação deletada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}

export const useUpdateAssociationMutation = (
  setOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssociation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["associations"] });
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      toast.success("Associação atualizada com sucesso!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })
}