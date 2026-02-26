import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product_raw_materials/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product_raw_materials/"!</div>
}
