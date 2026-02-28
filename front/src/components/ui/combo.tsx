import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

// icons
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Spinner } from "./spinner";
import type { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------

type ComboboxProps = React.HTMLAttributes<HTMLInputElement> & {
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onSelect: (...event: any[]) => void;
  value: string | undefined | null;
  itens: { label: string; value: string }[] | undefined;
  isPalette?: boolean;
  created?: boolean;
  onCreateComponent?: React.ReactNode;
  icon?: IconType;
  onSearchChange?: (search: string) => void;
  isSearchClient?: boolean
};

// -----------------------------------------------------------------------------

export function Combo({
  loading,
  placeholder,
  disabled,
  className,
  onSelect,
  value,
  itens,
  isPalette,
  created,
  onCreateComponent,
  onSearchChange,
  icon: Icon,
  isSearchClient,
  ...rest
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const [buttonWidth, setButtonWidth] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth); // Obtém a largura do Button
    }
  }, []);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!value) {
      setSearch("");
    }
  }, [value]);

  // Filtrar opções com base no texto digitado
  const filteredItens = itens?.filter((item) =>
    item.label
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        search
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      ),
  );

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen && !value) {
          setSearch("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("transition-colors justify-between px-3", className)}
          disabled={disabled || loading}
        >
          <div className="flex items-center gap-3 truncate">
            {loading ? <Spinner /> : Icon && <Icon className="size-4" />}
            <p className={cn("truncate", !value && "text-muted-foreground")}>
              {loading
                ? "Carregando..."
                : value
                  ? itens?.find((item) => item.value === value)?.label
                  : (placeholder ?? (isSearchClient ? "Pesquisar por nome" : "Escolha uma opção"))}
            </p>
          </div>

          <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("p-2")}
        style={{ width: `${buttonWidth}px` }}
      >
        <Command>
          <CommandInput
            placeholder={placeholder ?? (isSearchClient ? "Pesquisar por nome" : "Escolha uma opção")}
            onChange={(e: any) => {
              const val = e.target.value;
              setSearch(val);
              onSearchChange?.(val);
            }}
            {...rest}
          />
          <CommandList className="dark:[color-scheme:dark]">
            {filteredItens?.length ? (
              <CommandGroup>
                {filteredItens.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      onSelect(item.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value
                          ? "opacity-100 text-primary"
                          : "opacity-0",
                      )}
                    />

                    {isPalette ? (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-sm border"
                          style={{ backgroundColor: (item as any).hex }}
                        />
                        {item.label}
                      </div>
                    ) : (
                      item.label
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : created && filteredItens?.length === 0 ? (
              <CommandGroup>
                <CommandItem value={search}>{onCreateComponent}</CommandItem>
              </CommandGroup>
            ) : (
              <CommandEmpty>{isSearchClient ? "Pesquise o nome do cliente" : "Nenhum resultado encontrado."}</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
