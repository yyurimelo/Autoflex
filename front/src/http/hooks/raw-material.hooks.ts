import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createRawMaterial, getRawMaterialsPaginated, removeRawMaterial, updateRawMaterial, getAllRawMaterials } from "../services/raw-material.service";
import { toast } from "sonner";

export const useRawMaterialPaginationQuery = (filters: Record<string, any>,
  page: number,
  size: number
) =>
  useQuery({
    queryKey: ["raw-materials", filters, page, size],
    queryFn: () =>
      getRawMaterialsPaginated({
        name: filters.name || undefined,
        stockQuantity: filters.stockQuantity || undefined,
        page,
        size,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateRawMaterialMutation = (
  setOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRawMaterial,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["raw-materials"] });
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });

      toast.success("Matéria-prima criada com sucesso!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteRawMaterialMutation = (
  id: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeRawMaterial(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["raw-materials"] });
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      await queryClient.invalidateQueries({ queryKey: ["associations"] });
      toast.success("Matéria-prima deletada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}

export const useUpdateRawMaterialMutation = (
  setOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRawMaterial,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["raw-materials"] });
      await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      toast.success("Matéria-prima atualizada com sucesso!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })
}

export const useAllRawMaterialsQuery = () =>
  useQuery({
    queryKey: ["raw-materials"],
    queryFn: getAllRawMaterials,
    staleTime: 1000 * 60 * 5,
  });