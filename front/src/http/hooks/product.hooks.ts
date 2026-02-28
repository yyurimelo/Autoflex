import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createProduct, getProductsPaginated, removeProduct, updateProduct, getAllProducts } from "../services/product.service";
import { toast } from "sonner";

export const useProductPaginationQuery = (filters: Record<string, any>,
  page: number,
  size: number
) =>
  useQuery({
    queryKey: ["products", filters, page, size],
    queryFn: () =>
      getProductsPaginated({
        name: filters.name || undefined,
        price: filters.price ? String(filters.price) : undefined,
        page,
        size,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateProductMutation = (
  setOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Produto criado com sucesso!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProductMutation = (
  id: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Produto deletado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}

export const useUpdateProductMutation = (
  setOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Produto atualizado com sucesso!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })
}

export const useAllProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
  });