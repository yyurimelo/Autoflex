import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, type Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";

// hooks
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
  SheetTitle
} from "@/components/ui/sheet";

import { LoaderCircle } from "lucide-react";
import { useUpdateAssociationMutation } from "@/http/hooks/association.hooks";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { AssociationDataModel } from "@/@types/association/AssociationDataModel";
import { Input } from "@/components/ui/input";

// -----------------------------------------------------------------------------

const updateAssociationForm = z.object({
  productId: z.string().min(1, "Campo obrigatório"),
  rawMaterialId: z.string().min(1, "Campo obrigatório"),
  requiredQuantity: z.number().min(1, "Quantidade mínima é 1"),
});

type UpdateAssociationForm = z.infer<typeof updateAssociationForm>;

// -----------------------------------------------------------------------------

type Props = {
  item?: AssociationDataModel
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function AssociationUpdate({ item, open, setOpen }: Props) {
  const id = useId();

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery();
  const { data: rawMaterials, isLoading: isLoadingRawMaterials } = useAllRawMaterialsQuery();

  const form = useForm<UpdateAssociationForm>({
    resolver: zodResolver(updateAssociationForm),
  });

  useEffect(() => {
    if (item) {
      form.reset({
        productId: String(item.product.id),
        rawMaterialId: String(item.rawMaterial.id),
        requiredQuantity: item.requiredQuantity,
      });
    }
  }, [open, form, item]);


  const { mutateAsync: updateAssociationFn, isPending } =
    useUpdateAssociationMutation(setOpen);

  async function handleSubmit(data: UpdateAssociationForm) {
    await updateAssociationFn({
      id: item?.id!,
      productId: data.productId,
      rawMaterialId: data.rawMaterialId,
      requiredQuantity: data.requiredQuantity,
    });
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Atualizar associação</SheetTitle>
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
          <Button variant="outline" type="button" onClick={() => form.reset({
            productId: "",
            rawMaterialId: "",
            requiredQuantity: 1
          })}>
            Limpar
          </Button>
          <Button disabled={isPending} form={id} type="submit">
            {isPending && (
              <LoaderCircle className="w-4 h-4 text-primary-foreground animate-spin mr-2" />
            )}
            {isPending ? "Atualizando" : "Confirmar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}