import type { CreateProductFormModel } from "./CreateProductFormModel";

export type UpdateProductFormModel = CreateProductFormModel & {
  id: string;
}