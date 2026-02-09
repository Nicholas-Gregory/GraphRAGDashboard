import { createTRPCQueryUtils, createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "@graphragdashboard/server/src/procedures/router";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

export const trpcUtils = createTRPCQueryUtils({
  queryClient,
  client: trpcClient
})