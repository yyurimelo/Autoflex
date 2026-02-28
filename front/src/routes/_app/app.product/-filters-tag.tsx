import { FiltersTags, type FilterTagItem } from "@/components/ui/data-filters-tag";
import { useScopedFilters } from "@/hooks/use-scoped-filters";

export function ProductFiltersTag() {
  const { filters, removeFilter } = useScopedFilters("products");

const filterTags: FilterTagItem[] = [
    {
      text: "Nome",
      alias: "name",
      value: filters.name,
    },
    {
      text: "Preço",
      alias: "price",
      value: filters.price,
    },
  ]

  return (
    <FiltersTags
      filters={filterTags}
      onRemove={removeFilter}
    />
  );
}