import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface DataTablePaginationProps {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (value: string) => void;
  showPageSizeSelector?: boolean;
}

export function DataTablePagination({
  pageNumber,
  pageSize,
  totalRecords,
  totalPages,
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = false,
}: DataTablePaginationProps) {
  const disablePrev = onPageChange ? pageNumber === 1 : false;
  const disableNext = onPageChange ? pageNumber >= totalPages : false;

  return (
    <div className="mt-3">
      <div className="flex items-end justify-between">
        <div className="flex flex-col text-sm">
          <p className="text-muted-foreground">{totalRecords} registro(s)</p>
          <p>
            Página <strong>{pageNumber}</strong> de <strong>{totalPages}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange?.(1)}
            disabled={disablePrev}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange?.(pageNumber - 1)}
            disabled={disablePrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange?.(pageNumber + 1)}
            disabled={disableNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange?.(totalPages)}
            disabled={disableNext}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>

        {showPageSizeSelector && (
          <div className="flex items-center sm:space-x-2">
            <Select value={`${pageSize}`} onValueChange={onPageSizeChange}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 25, 50, 75, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
