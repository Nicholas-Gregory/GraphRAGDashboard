import { createFileRoute } from '@tanstack/react-router'
import React from 'react';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth"!</div>
}
