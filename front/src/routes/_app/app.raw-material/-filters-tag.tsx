import { FiltersTags, type FilterTagItem } from "@/components/ui/data-filters-tag";
import { useScopedFilters } from "@/hooks/use-scoped-filters";

export function RawMaterialFiltersTag() {
  const { filters, removeFilter } = useScopedFilters("raw-materials");

  const filterTags: FilterTagItem[] = [
    {
      text: "Nome",
      alias: "name",
      value: filters.name,
    },
    {
      text: "Quantidade",
      alias: "stockQuantity",
      value: filters.stockQuantity,
    },
  ]

  return (
    <FiltersTags
      filters={filterTags}
      onRemove={removeFilter}
    />
  );
}