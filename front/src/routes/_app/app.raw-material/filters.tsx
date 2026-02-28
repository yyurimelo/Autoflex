import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// hooks
import { useIsMobile } from "@/hooks/use-mobile";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useScopedFilters } from "@/hooks/use-scoped-filters";

// -----------------------------------------------------------------------------

const filterRawMaterialForm = z.object({
  name: z.string().optional(),
  stockQuantity: z.string().optional(),
});

type FilterRawMaterialForm = z.infer<typeof filterRawMaterialForm>;

// -----------------------------------------------------------------------------

export function RawMaterialFilters() {
  const id = useId();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { setFilter, clearFilters } = useScopedFilters("raw-materials");

  const form = useForm<FilterRawMaterialForm>({
    resolver: zodResolver(filterRawMaterialForm),
    defaultValues: {
      name: "",
      stockQuantity: "",
    },
  });


  async function handleSubmit(data: FilterRawMaterialForm) {
    clearFilters();

    if (data.name) {
      setFilter("name", data.name);
    }

    if (data.stockQuantity) {
      setFilter("stockQuantity", data.stockQuantity);
    }

    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size={isMobile ? "icon" : "default"}>
          <Filter className={`${!isMobile && "mr-2"} h-4 w-4`} />
          <p className={`hidden ${!isMobile && "sm:block"}`}>Filtrar</p>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Por favor, selecione os filtros que sejam mais apropriados às suas
            preferências.
          </SheetDescription>
        </SheetHeader>

        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                <Input
                  className="w-full"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="stockQuantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Quantidade</FieldLabel>
                <Input
                  className="w-full"
                  type="number"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>

        <SheetFooter className="lg:mt-4 flex flex-row justify-end">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              form.reset();
              clearFilters();
            }}
          >
            Limpar
          </Button>
          <Button form={id} type="submit">
            {"Confirmar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}