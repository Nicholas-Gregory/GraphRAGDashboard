import React from 'react';
import { trpc } from './utils/trpc';

export const App: React.FC = () => {
  const pingQuery = trpc.ping.useQuery();
  return (
    <>
      <h1>Ping Test</h1>
      <p>{pingQuery.data}</p>
    </>
  )
};