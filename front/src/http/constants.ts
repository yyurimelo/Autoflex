export const API_ENDPOINTS = {
  PRODUCT: {
    GET_ALL_PAGINATED: "/api/v1/product/get/all/paginated",
    GET_ALL: "/api/v1/product/get/all",
    GET: (id: string) => `/api/v1/product/get/${id}`,
    CREATE: "/api/v1/product/create",
    UPDATE: (id: string) => `/api/v1/product/update/${id}`,
    DELETE: "/api/v1/product/delete"
  },
  RAW_MATERIAL: {
    GET_ALL_PAGINATED: "/api/v1/raw_material/get/all/paginated",
    GET_ALL: "/api/v1/raw_material/get/all",
    GET: (id: string) => `/api/v1/raw_material/get/by/${id}`,
    CREATE: "/api/v1/raw_material/create",
    UPDATE: (id: string) => `/api/v1/raw_material/update/${id}`,
    DELETE: "/api/v1/raw_material/delete"
  },
} as const;