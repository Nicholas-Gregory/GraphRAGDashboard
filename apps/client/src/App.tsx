import React from 'react';
import { trpc } from './utils/trpc';
import { shadedBorders } from './utils/color';
import { ShadedCard } from './components/ShadedCard';

export const App: React.FC = () => {
  const signUpMutation = trpc.signUp.useMutation();
  return (
    <>
      <div className="flex flex-row p-1 gap-1">
        <ShadedCard color="#2e8b57">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ShadedCard>
        <ShadedCard color="#0055cc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ShadedCard>
      </div>
    </>
  )
};