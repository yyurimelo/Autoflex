export const API_ENDPOINTS = {
  PRODUCT: {
    GET_ALL_PAGINATED: "/api/v1/product/get/all/paginated",
    GET_ALL: "/api/v1/product/get/all",
    GET: (id: string) => `/api/v1/product/get/${id}`,
    CREATE: "/api/v1/product/create",
    UPDATE: (id: string) => `/api/v1/product/update/${id}`,
    DELETE: "/api/v1/product/delete"
  },
} as const;