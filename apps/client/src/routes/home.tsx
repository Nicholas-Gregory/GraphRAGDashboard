import { createFileRoute } from '@tanstack/react-router'
import React from 'react';

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/home"!</div>
}
