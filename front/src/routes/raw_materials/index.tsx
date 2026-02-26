import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/raw_materials/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/raw_materials/"!</div>
}
