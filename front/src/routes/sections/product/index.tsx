import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sections/product/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sections/product"!</div>
}
