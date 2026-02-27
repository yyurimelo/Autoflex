import type { CreateProductFormModel } from "@/@types/product/CreateProductFormModel";
import { http, isAxiosError } from "@/config/axios-config";
import { API_ENDPOINTS } from "../constants";
import type { ProductFilterModel } from "@/@types/product/ProductFilterModel";
import type { PaginationDataModel } from "@/@types/pagination";
import type { ProductDataModel } from "@/@types/product/ProductDataModel";

export async function createProduct({
  name,
  price
}: CreateProductFormModel) {
  let response: any;

  try {
    response = await http.post(API_ENDPOINTS.PRODUCT.CREATE, {
      name,
      price
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }

  return response.data;
}

export async function getProductsPaginated({
  name,
  page,
  size,
}: ProductFilterModel): Promise<PaginationDataModel<ProductDataModel>> {
  const response = await http.post(
    API_ENDPOINTS.PRODUCT.GET_ALL_PAGINATED,
    {
      name,
    },
    {
      params: {
        page,
        size,
      },
    },
  );

  return response.data;
}