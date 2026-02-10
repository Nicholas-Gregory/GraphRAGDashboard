import { createFileRoute } from '@tanstack/react-router'
import React from 'react';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app"!</div>
}
