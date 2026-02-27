import type { PaginationFilterModel } from "../pagination";

export type ProductFilterModel = PaginationFilterModel & {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  minProducibleQuantity?: string;
  maxProducibleQuantity?: string;
}