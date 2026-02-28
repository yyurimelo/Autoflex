import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getSuggestionsPaginated } from "../services/suggestion.service";

export const useSuggestionPaginationQuery = (page: number, size: number) =>
  useQuery({
    queryKey: ["suggestions", page, size],
    queryFn: () =>
      getSuggestionsPaginated({
        page,
        size,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });