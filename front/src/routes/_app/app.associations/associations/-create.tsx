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

import { LoaderCircle, Plus } from "lucide-react";
import { useCreateAssociationMutation } from "@/http/hooks/association.hooks";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Combo } from "@/components/ui/combo";

// -----------------------------------------------------------------------------

const createAssociationForm = z.object({
  productId: z.string().min(1, "Campo obrigatório"),
  rawMaterialId: z.string().min(1, "Campo obrigatório"),
  requiredQuantity: z.number().min(1, "Quantidade mínima é 1"),
});

type CreateAssociationForm = z.infer<typeof createAssociationForm>;

// -----------------------------------------------------------------------------

export function AssociationCreate() {
  const id = useId();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery();
  const { data: rawMaterials, isLoading: isLoadingRawMaterials } = useAllRawMaterialsQuery();

  const form = useForm<CreateAssociationForm>({
    resolver: zodResolver(createAssociationForm),
    defaultValues: {
      productId: "",
      rawMaterialId: "",
      requiredQuantity: 1,
    },
  });

  const { mutateAsync: createAssociationFn, isPending } =
    useCreateAssociationMutation(setOpen);

  async function handleSubmit(data: CreateAssociationForm) {
    await createAssociationFn(data);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={isMobile ? "icon" : "default"}>
          <Plus className={`${!isMobile && "mr-2"} h-4 w-4`} />
          <p className={`hidden ${!isMobile && "sm:block"}`}>Criar Novo</p>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar nova associação</SheetTitle>
          <SheetDescription>
            Preencha os dados abaixo:
          </SheetDescription>
        </SheetHeader>

        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
          <Controller
            name="productId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Produto *</FieldLabel>
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
                <FieldLabel htmlFor={field.name}>Matéria Prima *</FieldLabel>
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

          <Controller
            name="requiredQuantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Quantidade Requerida *</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Limpar
          </Button>
          <Button disabled={isPending} form={id} type="submit">
            {isPending && (
              <LoaderCircle className="w-4 h-4 text-primary-foreground animate-spin mr-2" />
            )}
            {isPending ? "Criando" : "Confirmar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}