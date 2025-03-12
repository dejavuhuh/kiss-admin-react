import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/settings/department/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/settings/department/"!</div>
}
