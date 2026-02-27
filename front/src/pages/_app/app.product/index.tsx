import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/app/product/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Produtos</h1>
        <span className="text-base text-muted-foreground hidden sm:block">
          Segue abaixo a lista de produtos.
        </span>
      </div>
    </header>
  )
}
