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
import { useUpdateRawMaterialMutation } from "@/http/hooks/raw-material.hooks";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { RawMaterialDataModel } from "@/@types/raw-material/RawMaterialDataModel";

// -----------------------------------------------------------------------------

const updateRawMaterialForm = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  stockQuantity: z.number().min(1, "Informe uma quantidade válida"),
});

type UpdateRawMaterialForm = z.infer<typeof updateRawMaterialForm>;

// -----------------------------------------------------------------------------

type Props = {
  item?: RawMaterialDataModel
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function RawMaterialUpdate({ item, open, setOpen }: Props) {
  const id = useId();

  const form = useForm<UpdateRawMaterialForm>({
    resolver: zodResolver(updateRawMaterialForm),
    defaultValues: {
      name: "",
      stockQuantity: 0,
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    }
  }, [open, form, item]);


  const { mutateAsync: updateRawMaterialFn, isPending } =
    useUpdateRawMaterialMutation(setOpen);

  async function handleSubmit(data: UpdateRawMaterialForm) {
    await updateRawMaterialFn({
      id: item?.id!,
      name: data.name,
      stockQuantity: data.stockQuantity,
    });
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Atualizar matéria-prima</SheetTitle>
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
              name="stockQuantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Quantidade em Estoque *</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    id={field.name}
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
            stockQuantity: 0
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