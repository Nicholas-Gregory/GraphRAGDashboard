import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@graphragdashboard/server/src/procedures/router";

export const trpc = createTRPCReact<AppRouter>();