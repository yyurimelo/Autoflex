import type { PaginationFilterModel } from "../pagination";

export type RawMaterialFilterModel = PaginationFilterModel & {
  name?: string;
  stockQuantity?: string;
}