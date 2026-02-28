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
import { useCreateProductMutation } from "@/http/hooks/product.hooks";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Monetary } from "@/components/ui/monetary";

// -----------------------------------------------------------------------------

const createProductForm = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  price: z.number().min(0.01, "Informe um valor válido"),
});

type CreateProductForm = z.infer<typeof createProductForm>;

// -----------------------------------------------------------------------------

export function ProductCreate() {
  const id = useId();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateProductForm>({
    resolver: zodResolver(createProductForm),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const { mutateAsync: createProductFn, isPending } =
    useCreateProductMutation(setOpen);

  async function handleSubmit(data: CreateProductForm) {
    await createProductFn(data);
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
          <SheetTitle>Criar novo produto</SheetTitle>
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