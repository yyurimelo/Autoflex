import type { CreateProductFormModel } from "@/@types/product/CreateProductFormModel";
import { http, isAxiosError } from "@/config/axios-config";
import { API_ENDPOINTS } from "../constants";
import type { ProductFilterModel } from "@/@types/product/ProductFilterModel";
import type { PaginationDataModel } from "@/@types/pagination";
import type { ProductDataModel } from "@/@types/product/ProductDataModel";
import type { UpdateProductFormModel } from "@/@types/product/UpdateProductFormModel";

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
  let response: any;

  try {
    response = await http.post(
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
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }

  return response.data;
}

export async function getProduct(id: string): Promise<ProductDataModel> {
  const response = await http.get(API_ENDPOINTS.PRODUCT.GET(id));
  return response.data;
}

export async function removeProduct(id: string) {
  const response = await http.delete(API_ENDPOINTS.PRODUCT.DELETE, {
    params: {
      id,
    },
  });

  return response.data;
}

export async function updateProduct({
  id,
  name,
  price
}: UpdateProductFormModel) {
  let response: any;

  try {
    response = await http.put(
      API_ENDPOINTS.PRODUCT.UPDATE(id),
      {
        name,
        price
      },
      {
        params: {
          id,
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