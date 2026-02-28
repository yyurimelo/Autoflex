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

import { LoaderCircle, Plus } from "lucide-react";
import { useCreateRawMaterialMutation } from "@/http/hooks/raw-material.hooks";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

// -----------------------------------------------------------------------------

const createRawMaterialForm = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  stockQuantity: z.number().min(1, "Informe uma quantidade válida"),
});

type CreateRawMaterialForm = z.infer<typeof createRawMaterialForm>;

// -----------------------------------------------------------------------------

export function RawMaterialCreate() {
  const id = useId();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateRawMaterialForm>({
    resolver: zodResolver(createRawMaterialForm),
    defaultValues: {
      name: "",
      stockQuantity: 0,
    },
  });

  const { mutateAsync: createRawMaterialFn, isPending } =
    useCreateRawMaterialMutation(setOpen);

  async function handleSubmit(data: CreateRawMaterialForm) {
    await createRawMaterialFn(data);
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
          <SheetTitle>Criar nova matéria-prima</SheetTitle>
          <SheetDescription>
            Preencha os dados abaixo:
          </SheetDescription>
        </SheetHeader>

        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
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