import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/settings/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/settings/user/"!</div>
}
