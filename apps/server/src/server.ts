import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { createConstructor } from './trpc';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:8000',
  credentials: true
}));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createConstructor,
  }),
);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});