import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Funnel, X } from "lucide-react";

export type FilterTagItem = {
  text: string;
  alias: string | string[];
  value?: string | number | null;
  fixed?: boolean;
};

type Props = {
  filters: FilterTagItem[];
  onRemove: (alias: string | string[]) => void;
  isTop?: boolean;
};

export function FiltersTags({ filters, onRemove, isTop }: Props) {
  const visibleFilters = filters.filter(
    (f) => f.value !== undefined && f.value !== null && f.value !== ""
  );

  if (!visibleFilters.length) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2",
        !isTop && "border-t my-3 pt-3"
      )}
    >
      <div className="flex items-center gap-1">
        <Funnel className="size-4 text-primary" />
        <h3 className="font-semibold text-sm">Filtro(s):</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleFilters.map((filter) => (
          <Badge
            key={`${filter.alias}-${filter.value}`}
            variant="secondary"
            className="gap-2 rounded-md border-muted border px-2 py-1 text-xs bg-sidebar"
          >
            <span className="text-muted-foreground font-medium">
              {filter.text}:
            </span>

            <span>{filter.value}</span>

            {!filter.fixed && (
              <button
                type="button"
                onClick={() => onRemove(filter.alias)}
                className="text-foreground/60 hover:text-foreground flex items-center justify-center"
                aria-label="Remover filtro"
              >
                <X size={14} />
              </button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
}