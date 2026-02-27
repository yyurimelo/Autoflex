import { keepPreviousData, QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { createProduct, getProductsPaginated } from "../services/product.service";
import { toast } from "sonner";

const queryClient = new QueryClient()

export const useProductPaginationQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getProductsPaginated({
        name: undefined,
        page: 0,
        size: 10,
      }),
    placeholderData: keepPreviousData,
  });

export const useCreateProductMutation = (setOpen: (value: boolean) => void) =>
  useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto criado com sucesso!");
      if (setOpen) {
        setOpen(false)
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });