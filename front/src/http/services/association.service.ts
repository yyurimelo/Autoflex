import type { CreateAssociationFormModel } from "@/@types/association/CreateAssociationFormModel";
import { http, isAxiosError } from "@/config/axios-config";
import { API_ENDPOINTS } from "../constants";
import type { AssociationFilterModel } from "@/@types/association/AssociationFilterModel";
import type { PaginationDataModel } from "@/@types/pagination";
import type { AssociationDataModel } from "@/@types/association/AssociationDataModel";
import type { UpdateAssociationFormModel } from "@/@types/association/UpdateAssociationFormModel";

export async function createAssociation({
  productId,
  rawMaterialId,
  requiredQuantity
}: CreateAssociationFormModel) {
  let response: any;

  try {
    response = await http.post(API_ENDPOINTS.ASSOCIATION.CREATE, {
      productId,
      rawMaterialId,
      requiredQuantity
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }

  return response.data;
}

export async function getAssociationsPaginated({
  productId,
  rawMaterialId,
  page,
  size,
}: AssociationFilterModel & { page: number; size: number }): Promise<PaginationDataModel<AssociationDataModel>> {
  let response: any;

  try {
    response = await http.post(
      API_ENDPOINTS.ASSOCIATION.GET_ALL_PAGINATED,
      {
        productId: productId ? parseInt(productId) : undefined,
        rawMaterialId: rawMaterialId ? parseInt(rawMaterialId) : undefined,
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

export async function getAssociation(id: string): Promise<AssociationDataModel> {
  const response = await http.get(API_ENDPOINTS.ASSOCIATION.GET(id));
  return response.data;
}

export async function removeAssociation(id: string) {
  const response = await http.delete(API_ENDPOINTS.ASSOCIATION.DELETE, {
    params: {
      id,
    },
  });

  return response.data;
}

export async function updateAssociation({
  id,
  productId,
  rawMaterialId,
  requiredQuantity
}: UpdateAssociationFormModel) {
  let response: any;

  try {
    response = await http.put(
      API_ENDPOINTS.ASSOCIATION.UPDATE(id),
      {
        productId: parseInt(productId),
        rawMaterialId: parseInt(rawMaterialId),
        requiredQuantity
      },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }

  return response.data;
}