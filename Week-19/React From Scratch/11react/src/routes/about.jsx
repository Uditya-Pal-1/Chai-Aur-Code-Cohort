import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  defaultPreload:"Intent",
})

function RouteComponent() {
  return <div className="p-2">Hello from About!</div>
}