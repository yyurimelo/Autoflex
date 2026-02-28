import type { ProductDataModel } from "@/@types/product/ProductDataModel";
import type { RawMaterialDataModel } from "@/@types/raw-material/RawMaterialDataModel";
import { FiltersTags, type FilterTagItem } from "@/components/ui/data-filters-tag";
import { resolveLabel } from "@/hooks/resolve-label-filters-tag";
import { useScopedFilters } from "@/hooks/use-scoped-filters";
import { useQueryClient } from "@tanstack/react-query";

export function AssociationFiltersTag() {
  const { filters, removeFilter } = useScopedFilters("associations");

  const queryClient = useQueryClient();

  const products = queryClient.getQueryData<ProductDataModel[]>([
    "products",
  ]);

  const rawMaterials = queryClient.getQueryData<RawMaterialDataModel[]>([
    "raw-materials",
  ]);

  const filterTags: FilterTagItem[] = [
    {
      text: "Produto",
      alias: "productId",
      value: resolveLabel(filters.productId, products)
    },
    {
      text: "Matéria Prima",
      alias: "rawMaterialId",
      value: resolveLabel(filters.rawMaterialId, rawMaterials)
    },
  ]


  return (
    <FiltersTags
      filters={filterTags}
      onRemove={removeFilter}
      isTop
    />
  );
}