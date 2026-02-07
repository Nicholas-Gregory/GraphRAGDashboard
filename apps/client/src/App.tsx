import React from 'react';
import { trpc } from './utils/trpc';

export const App: React.FC = () => {
  const signUpMutation = trpc.signUp.useMutation();
  return (
    <>
      <h1>Sign Up Test</h1>

      <button onClick={() => signUpMutation.mutate({ email: 'me@me.com', password: 'meeeeeee', username: 'mee'})}>do it!!!</button>
    </>
  )
};