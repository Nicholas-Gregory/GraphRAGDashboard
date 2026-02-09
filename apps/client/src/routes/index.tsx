import { createFileRoute, redirect } from '@tanstack/react-router'
import React from 'react';

export const Route = createFileRoute('/')({
  loader: () => { throw redirect({ to: '/home' }) },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/home/"!</div>
}
