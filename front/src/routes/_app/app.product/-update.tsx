import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, type Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";

// hooks

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import { LoaderCircle } from "lucide-react";
import { useUpdateProductMutation } from "@/http/hooks/product.hooks";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Monetary } from "@/components/ui/monetary";
import type { ProductDataModel } from "@/@types/product/ProductDataModel";

// -----------------------------------------------------------------------------

const updateProductForm = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  price: z.number().min(0.01, "Informe um valor válido"),
});

type UpdateProductForm = z.infer<typeof updateProductForm>;

// -----------------------------------------------------------------------------

type Props = {
  item?: ProductDataModel
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function ProductUpdate({ item, open, setOpen }: Props) {
  const id = useId();

  const form = useForm<UpdateProductForm>({
    resolver: zodResolver(updateProductForm),
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    }
  }, [open, form, item]);


  const { mutateAsync: updateProductFn, isPending } =
    useUpdateProductMutation(setOpen);

  async function handleSubmit(data: UpdateProductForm) {
    await updateProductFn({
      id: item?.id!,
      name: data.name,
      price: data.price,
    });
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Atualizar produto</SheetTitle>
          <SheetDescription>
            Preencha os dados abaixo:
          </SheetDescription>
        </SheetHeader>

        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nome *</FieldLabel>
                  <Input
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
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Preço *</FieldLabel>
                  <Monetary
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <SheetFooter className="lg:mt-4 flex flex-row justify-end">
          <Button variant="outline" type="button" onClick={() => form.reset({
            name: "",
            price: 0
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