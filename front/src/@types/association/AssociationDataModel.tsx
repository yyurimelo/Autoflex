export type AssociationDataModel = {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  rawMaterial: {
    id: string;
    name: string;
    stockQuantity: number;
  };
  requiredQuantity: number;
}