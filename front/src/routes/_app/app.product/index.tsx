import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/app/product/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/product"!</div>
}
