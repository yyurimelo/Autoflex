import { http, isAxiosError } from "@/config/axios-config";
import { API_ENDPOINTS } from "../constants";
import type { PaginationDataModel } from "@/@types/pagination";
import type { SuggestionDataModel } from "@/@types/suggestion/SuggestionDataModel";

export async function getSuggestionsPaginated({
  page = 0,
  size = 10
}: { page: number; size: number }): Promise<PaginationDataModel<SuggestionDataModel>> {
  let response: any;

  try {
    response = await http.get(
      API_ENDPOINTS.SUGGESTION.GET_ALL_PAGINATED,
      {
        params: {
          page,
          size
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

