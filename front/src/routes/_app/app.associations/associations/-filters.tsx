import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// hooks
import { useIsMobile } from "@/hooks/use-mobile";
import { useAllProductsQuery } from "@/http/hooks/product.hooks";
import { useAllRawMaterialsQuery } from "@/http/hooks/raw-material.hooks";

// components
import { Button } from "@/components/ui/button";
import { Combo } from "@/components/ui/combo";
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

const filterAssociationForm = z.object({
  productId: z.string().optional(),
  rawMaterialId: z.string().optional(),
});

type FilterAssociationForm = z.infer<typeof filterAssociationForm>;

// -----------------------------------------------------------------------------

export function AssociationFilters() {
  const id = useId();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { setFilter, clearFilters } = useScopedFilters("associations");

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery();
  const { data: rawMaterials, isLoading: isLoadingRawMaterials } = useAllRawMaterialsQuery();

  const form = useForm<FilterAssociationForm>({
    resolver: zodResolver(filterAssociationForm),
    defaultValues: {
      productId: "",
      rawMaterialId: "",
    },
  });


  async function handleSubmit(data: FilterAssociationForm) {
    clearFilters();

    if (data.productId) {
      setFilter("productId", data.productId);
    }

    if (data.rawMaterialId) {
      setFilter("rawMaterialId", data.rawMaterialId);
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
            name="productId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Produto</FieldLabel>
                <Combo
                  className="w-full"
                  onSelect={field.onChange}
                  value={field.value}
                  loading={isLoadingProducts}
                  itens={products?.map((product) => ({
                    label: product.name,
                    value: String(product.id),
                  }))}
                  placeholder="Selecione um produto"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="rawMaterialId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Matéria Prima</FieldLabel>
                <Combo
                  className="w-full"
                  onSelect={field.onChange}
                  value={field.value}
                  loading={isLoadingRawMaterials}
                  itens={rawMaterials?.map((rawMaterial) => ({
                    label: rawMaterial.name,
                    value: String(rawMaterial.id),
                  }))}
                  placeholder="Selecione uma matéria prima"
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