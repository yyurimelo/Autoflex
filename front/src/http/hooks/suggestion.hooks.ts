import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getSuggestionsPaginated } from "../services/suggestion.service";

export const useSuggestionPaginationQuery = (filters: Record<string, any>,
  page: number,
  size: number
) =>
  useQuery({
    queryKey: ["suggestions", filters, page, size],
    queryFn: () =>
      getSuggestionsPaginated({
        productId: filters.productId || undefined,
        productName: filters.productName || undefined,
        minProducibleQuantity: filters.minProducibleQuantity ? parseInt(filters.minProducibleQuantity) : undefined,
        maxProducibleQuantity: filters.maxProducibleQuantity ? parseInt(filters.maxProducibleQuantity) : undefined,
        sortBy: filters.sortBy || "producibleQuantity",
        sortDirection: filters.sortDirection || "desc",
        page,
        size,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });