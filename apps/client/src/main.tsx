import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import { routeTree } from './routeTree.gen';
import { createRouter, Router, RouterProvider } from '@tanstack/react-router';
import { trpcClient, queryClient } from './utils/trpc';


new EventSource('/esbuild').addEventListener('change', () => location.reload());

const router = createRouter({ 
  routeTree,
  context: {
    queryClient
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);