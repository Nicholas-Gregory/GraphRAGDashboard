import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './trpc';
import cors from 'cors';
import { db } from './config'; 

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:8000',
  credentials: true
}));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  }),
);

const startup = async () => {
  try {
    // await db.cypher('RETURN 1 AS test', {});
    const serverInfo = await db.getServerInfo();  

    console.error('Database connection is healthy.', serverInfo);

    app.listen(4000, () => {
      console.error('Server is running on http://localhost:4000');
    });
  } catch (error) {
    console.error('Error starting up the server:', error);
  }
};

startup();
