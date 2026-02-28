import type { CreateRawMaterialFormModel } from "@/@types/raw-material/CreateRawMaterialFormModel";
import { http, isAxiosError } from "@/config/axios-config";
import { API_ENDPOINTS } from "../constants";
import type { RawMaterialFilterModel } from "@/@types/raw-material/RawMaterialFilterModel";
import type { PaginationDataModel } from "@/@types/pagination";
import type { RawMaterialDataModel } from "@/@types/raw-material/RawMaterialDataModel";
import type { UpdateRawMaterialFormModel } from "@/@types/raw-material/UpdateRawMaterialFormModel";

export async function createRawMaterial({
  name,
  stockQuantity
}: CreateRawMaterialFormModel) {
  let response: any;

  try {
    response = await http.post(API_ENDPOINTS.RAW_MATERIAL.CREATE, {
      name,
      stockQuantity
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }

  return response.data;
}

export async function getRawMaterialsPaginated({
  name,
  stockQuantity,
  page,
  size,
}: RawMaterialFilterModel): Promise<PaginationDataModel<RawMaterialDataModel>> {
  let response: any;

  try {
    response = await http.post(
      API_ENDPOINTS.RAW_MATERIAL.GET_ALL_PAGINATED,
      {
        name,
        stockQuantity,
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

export async function getRawMaterial(id: string): Promise<RawMaterialDataModel> {
  const response = await http.get(API_ENDPOINTS.RAW_MATERIAL.GET(id));
  return response.data;
}

export async function getAllRawMaterials(): Promise<RawMaterialDataModel[]> {
  const response = await http.get(API_ENDPOINTS.RAW_MATERIAL.GET_ALL);
  return response.data;
}

export async function removeRawMaterial(id: string) {
  const response = await http.delete(API_ENDPOINTS.RAW_MATERIAL.DELETE, {
    params: {
      id,
    },
  });

  return response.data;
}

export async function updateRawMaterial({
  id,
  name,
  stockQuantity
}: UpdateRawMaterialFormModel) {
  let response: any;

  try {
    response = await http.put(
      API_ENDPOINTS.RAW_MATERIAL.UPDATE(id),
      {
        name,
        stockQuantity
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