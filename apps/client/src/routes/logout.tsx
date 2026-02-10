import { createFileRoute, Navigate } from '@tanstack/react-router'
import { trpc } from '../utils/trpc'
import React, { useEffect } from 'react';

export const Route = createFileRoute('/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  const logout = trpc.logOut.useMutation();

  useEffect(() => {
    logout.mutate();
  }, []);

  return <Navigate to="/auth" />
}
