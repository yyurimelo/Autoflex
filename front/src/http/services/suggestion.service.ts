import type { SuggestionFilterModel } from "@/@types/suggestion/SuggestionFilterModel";
import { http, isAxiosError } from "@/config/axios-config";
import { API_ENDPOINTS } from "../constants";
import type { PaginationDataModel } from "@/@types/pagination";
import type { SuggestionDataModel } from "@/@types/suggestion/SuggestionDataModel";

export async function getSuggestionsPaginated({
  productId,
  productName,
  minProducibleQuantity,
  maxProducibleQuantity,
  page = 0,
  size = 10,
  sortBy = "producibleQuantity",
  sortDirection = "desc"
}: SuggestionFilterModel & { page: number; size: number }): Promise<PaginationDataModel<SuggestionDataModel>> {
  let response: any;

  try {
    response = await http.get(
      API_ENDPOINTS.SUGGESTION.GET_ALL_PAGINATED,
      {
        params: {
          productId: productId ? parseInt(productId) : undefined,
          productName,
          minProducibleQuantity,
          maxProducibleQuantity,
          page,
          size,
          sortBy,
          sortDirection
        },
      },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }

  return response.data;
}

