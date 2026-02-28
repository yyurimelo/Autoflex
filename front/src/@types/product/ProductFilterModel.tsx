import type { PaginationFilterModel } from "../pagination";

export type ProductFilterModel = PaginationFilterModel & {
  name?: string;
  price?: string;
}